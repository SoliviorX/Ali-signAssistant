const {
  globalData
} = getApp();
var app = getApp();

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
var loading
Page({
  data: {
    memberInfo: [],
    PageNum: 1,
    Size: 20,
    toshow: "tohidden",
    floorstatus: false,
    select_all: false
  },
  onLoad(options) {
    my.setNavigationBar({
      title: '群发短信',
    })
    console.log(options)
    this.setData({
      StartTime: options.StartTime,
      EndTime: options.EndTime
    })
    this.getMemberList(1)
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

  //输入框内容
  textInput(e) {
    console.log("输入框内容")
    this.setData({
      textContent: e.detail.value
    })
    console.log(this.data.textContent)
  },

  //全选与反全选
  selectall() {
    console.log("全选/反选")
    var that = this;
    for (let i = 0; i < that.data.memberInfo.length; i++) {
      that.data.memberInfo[i].checked = (!that.data.select_all)
    }
    that.setData({
      memberInfo: that.data.memberInfo,
      select_all: (!that.data.select_all)
    })
    if(that.data.select_all == true) {
      var memberInfomation = []
      for(var j in that.data.memberInfo) {
        memberInfomation[j] = that.data.memberInfo[j].Name + that.data.memberInfo[j].Phone
      }
      that.setData({
        memberInfomation: memberInfomation
      })
      console.log(that.data.memberInfomation)
    }
    if(that.data.select_all == true) {
      that.setData({
        memberInfomation: []
      })
    }
    console.log(that.data.memberInfomation)
  },
  onChange(e) {
    console.log("checkBoxOnchange")
    this.setData({
      memberInfomation: e.detail.value
    })
    console.log(this.data.memberInfomation)
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
