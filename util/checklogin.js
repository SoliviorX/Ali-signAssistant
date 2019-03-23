export function checkLogin(callback) {
  var app = getApp();
  console.log(app);
  if (app.globalData.account.openid == null) {
    if (app.globalData.baseInfo.openid == null) {

      console.log("checklogin")
      my.showLoading({
        content: '登录中',
      })
      checkMember(app.globalData.baseInfo.openId, callback)
    }
  }

}

export function checkLoginOnlyWechat(callback) {
  var app = getApp();
  console.log(app);
  if (app.globalData.baseInfo.openid == null) {

    console.log("checklogin")
    my.showLoading({
      content: '登录中',
      // mask: true
    })
    app.baseInfoCallback = () => {
      console.log("回调信息");
      callback();
    }
  }
  else {
    console.log("不等回调信息");
    console.log(app);
    callback()
  }
}

function checkMember(openid, callback) {

  var app = getApp();
  var pages = getCurrentPages();
  var currentPage = pages[pages.length - 1];
  console.log(currentPage);
  my.hideLoading();
  console.log(app.globalData);
  console.log((app.globalData.account.openid != null));
  console.log((app.globalData.account.openid != undefined));
  if (app.globalData.account.openid != null) {
    console.log(1);
    currentPage.setData({
      iflogin: ""
    });
    console.log(callback);
    callback();
  }
  else {
    console.log(3);
    my.navigateTo({
      url: '../login/login?from=checklogin'
    })
  }
}

export function LoginCallBack(res) {

  console.log("LoginCallBack");
  var app = getApp();
  if (app.baseInfoCallback) {
    console.log(app.baseInfoCallback);
    app.baseInfoCallback(res);

  }

}