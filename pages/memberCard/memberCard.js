const {
  globalData
} = getApp();
var app = getApp();
var loading;
import {
  co,
  toast,
  alert,
  switchTabDelay,
  getRequest,
  getDistance,
  showLoading,
  hideLoading,
  transformDate,
  StoUTCTime,
  EtoUTCTime,
  isEmpty
} from '../../util/tiny_util';
Page({
  data: {
    StartTimeA: '',
    EndTimeA: '',
    StartTime: '',
    EndTime: '',
    flag: false,
    memberInfo: [],
    PageNum: 1,
    Size: 20,
    floorstatus: false,
    toshow: "tohidden"
  },
  onLoad() {
    this.getNowFormatDate();
  },
  getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate;
    console.log(currentdate)
    this.setData({
      currentdate: currentdate,
      StartTimeA: currentdate,
      EndTimeA: currentdate,
      StartTime: currentdate,
      EndTime: currentdate
    })
    this.getMemberList(1)
  },
  getStartTime() {
    var that = this
    my.datePicker({
      endDate: that.data.currentdate,
      success: (res) =>{
        that.setData({
          StartTimeA: res.date
        })
        that.compareDate()
        console.log(that.data.flag)
        if(that.data.flag == true) {
          //更新时间后memberInfo清空
          that.setData({
            memberInfo: [],
            StartTime: res.date
          })
          that.getMemberList(1)
        }
      }
    })
  },
  getEndTime() {
    var that = this
    my.datePicker({
      endDate: that.data.currentdate,
      success: (res) =>{
        //比较日期大小，结束日期不能早于开始日期
        that.setData({
          EndTimeA: res.date
        })
        that.compareDate()
        console.log(that.data.flag)
        if(that.data.flag == true) {
          that.setData({
            memberInfo: [],
            EndTime: res.date
          })
          that.getMemberList(1)
        }
      
      }
    })
  },
  compareDate() {
    //为了防止在没有比较前就在视图上变动了EndTime和StartTime，所以在此比较EndTimeA和StartTimeA
    var that = this
    var arysA1=that.data.StartTimeA.split('-');
    var arysA2= Number(arysA1.join(''))
    var arysB1=that.data.EndTimeA.split('-');
    var arysB2= Number(arysB1.join(''))
    console.log(arysA2)
    console.log(arysB2)
    if(arysB2 < arysA2) {
      that.setData({
        flag: false
      })
      my.confirm({
        title: '温馨提示',
        content: '结束时间不能早于开始时间',
        confirmButtonText: '我知道了',
      });
    } else {
      that.setData({
        flag: true
      })
    }
  },

  //上拉加载
  onReachBottom() {
    // 下拉触底，先判断是否有请求正在进行中
    // 以及检查当前请求页数是不是小于数据总页数，如符合条件，则发送请求
    // if (!this.loading && this.data.PageNum < this.data.pages) {

    if (!loading && this.data.memberInfo.length % 20 == 0) {
      this.getMemberList(this.data.PageNum + 1)
    }
    if(this.data.memberInfo.length % 20 !== 0) {
      my.showToast({
        content: '没有了~',
        duration: 1500
      })
    }
  },

  //获取用户列表
  getMemberList(PageNum) {
    var that = this
    my.showLoading({
      content: "加载中..."
    })
    loading = true
    var st = StoUTCTime(that.data.StartTime)
    console.log(st)
    var et = EtoUTCTime(that.data.EndTime)
    console.log(et)

    var that = this
    console.log('https://open.10010.org/api/MerchantService/GetMemberList?Uid=2088111105593181&Token=123456&StartTime=' + st + "&EndTime=" + et + "&PageNum=1&Size=20")
    my.httpRequest({
      url: 'https://open.10010.org/api/MerchantService/GetMemberList',
      data: {
        // Uid: globalData.account.uid,
        // Token: globalData.account.Token,
        Uid: '2088111105593181',
        Token: "123456",
        StartTime: st,
        EndTime: et,
        PageNum: PageNum,
        Size: 20
      },
      success: (res) => {
        my.hideLoading();
        console.log("获取用户列表成功")
        console.log(res)
        if (res.data.Result !== null) {
          var memberInfo = res.data.Result
          for(var i in memberInfo) {
            var A = transformDate(memberInfo[i].AddTime)
            memberInfo[i]["AddTime"] = A
          }
          co(memberInfo)
          that.setData({
            memberInfo: that.data.memberInfo.concat(memberInfo),
            PageNum: PageNum,
            toshow: "toshow"
          })
          if (memberInfo.length < 20) {
            // my.showToast({
            //   content: '没有了~',
            //   duration: 1500
            // })
          }
        }
        loading = false
      },
      fail: (res) => {
        my.hideLoading();
        console.log("失败")
      }
    });
  },

  sendMessage() {
    var that = this
    my.navigateTo({
      url: "../sendMessage/sendMessage?StartTime=" + that.data.StartTime + "&EndTime=" + that.data.EndTime
    });
  },

  // 获取滚动条当前位置
  onPageScroll: function (e) {
    // console.log("页面发生滚动")
    // console.log(e.scrollTop)
    if (e.scrollTop > 150) {
      this.setData({
        floorstatus: true
      });
    } else {
      this.setData({
        floorstatus: false
      });
    }
  },

   //回到顶部
  goTop: function (e) {  // 一键回到顶部
    if (my.pageScrollTo) {
      my.pageScrollTo({
        scrollTop: 0
      })
    } else {
      my.showModal({
        title: '提示',
        content: '当前支付宝版本过低，无法使用该功能，请升级到最新支付宝版本后重试。'
      })
    }
  },

});
