const {
  globalData
} = getApp();
import {
  checkLogin
} from '../../util/checklogin.js';

Page({
  data: {},
  onLoad() {

  },
  onShow() {
    //现在直接在app.js中登录了
    // checkLogin(function() {
    //   console.log("检查登陆状态")
    // })
  },
  memberCard() {
    my.navigateTo({
      url: "../memberCard/memberCard"
    });
  }
});
