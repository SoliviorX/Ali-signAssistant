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
  showLoading,
  hideLoading,
  getDistance,
  isEmpty
} from '../../util/tiny_util';
import {
  getAuthCode,
  saveAccountInfo,
  saveLocationInfo,
  getUserInfo
} from '../../util/account';
var uid;
var token;
Page({
  data: {},
  onLoad(options) {
    console.log("login")
    my.setNavigationBar({
      title: '登录',
    })

  },
  bindGetUserInfo() {
    my.showLoading({
      content: '登录中...'
    });
    this.bindLogin();
  },

  // 点击登录跳回原页面
  bindLogin() {
    let successCallback = (res) => {
      co("success---获取到登录信息" + JSON.stringify(res));
      my.hideLoading();
      if (isEmpty(res.data)) {
        return;
      }

      var ji = {};
      ji["openid"] = res.data.result.Id;
      ji["Token"] = res.data.result.Token;
      ji.uid= res.data.result.AlipayUserId;
      console.log(ji);
      saveAccountInfo(ji);
      console.log(app.globalData)
      my.navigateBack({
        delta: 1
      })
      
    };
    let failCallback = (res) => {
      my.hideLoading();
      console.log("fail1---", res);
    };
    let completeCallback = (res) => {
      console.log("fail2---", res);
      hideLoading();
    };

    getAuthCode().then((res) => {
      console.log("getAuthCode:", res);
      co("https://portal.cens.cn/api/OpenShop/AlipayLogin?code=" + res + "&appid=2017061607502211")
      getRequest("https://portal.cens.cn/api/OpenShop/AlipayLogin", { code: res, appid: "2017061607502211" }, { successCallback, failCallback });
    });

  },
});
