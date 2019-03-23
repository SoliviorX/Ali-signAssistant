var app;
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
} from './util/tiny_util';
import {
  getAuthCode,
  saveAccountInfo,
  saveLocationInfo,
  getUserInfo
} from './util/account';
var uid;
var token;
App({
  onLaunch(options) {
    console.log('App Launch', options);
    console.log('getSystemInfoSync', my.getSystemInfoSync());
    console.log('SDKVersion', my.SDKVersion);
    app = this;
    if(app.globalData.account.openid == null) {
      my.showLoading({
        content: '登录中...'
      });
      app.myLogin()
    }
    
  },

  // 点击登录跳回原页面
  myLogin() {
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
  onShow() {
    console.log('App Show');
  },
  onHide() {
    console.log('App Hide');
  },
  globalData: {
    baseInfo: {
      openid: null
    },
    account: {
      openid: null,
      token: null
    },
    hasLogin: false,
    appId: "2017061607502211"
  },
});

