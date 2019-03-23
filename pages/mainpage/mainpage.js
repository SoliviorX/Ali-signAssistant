import formatLocation from './format-lacation.js';
import { extQr } from '../../util/qrcode';


var totalist = [];
var contentlist = [];
var Uid = '';
var token = '';
var result = '';
var left_pic = '/image/giftlogored.png';
var ecard_code = "";
var cardId = "";
var card_src = "";
var tip_content = "";
var isSign = "";
var merchant_pid = '';
var shop_id = '';
var savedata = '';
var varch_src = '/image/giftbg2.png';

var a_lang = '';
var lation = '';


var qcode_src = '';
var index_qrcode = '';


Page({
  data: {
    hasLocation: false,
  }, 
  onLoad(option) {
    //  my.clearStorage("UserInfo");
    my.getLocation({
      success: (res) => {
        a_lang = res.longitude;
        lation = res.latitude;
      },
    });
    this.setData({
      merchant_pid: option.merchant_pid,
      shop_id: option.shop_id,
      index: "none",
      card_index: "none",
      index_line: "none",
      index_qrcode: "none",
      varch_src: varch_src,
      onItemTap: 'handleListItemTap',
      data: [
        // {   
        //   varch_name: '标题文字',
        // },
        // {  
        //   varch_name: '标题图片',
        // },
        // {  
        //   varch_name: '标题文字',
        // },
      ]

    })
  }, 
  mkQrBase64Image(data) {
    // 详细可参考 https://github.com/neocotic/qrious
    var typeNumber = 6;
    var errorCorrectionLevel = 'M';
    var qr = extQr(typeNumber, errorCorrectionLevel);
    qr.addData(data);
    qr.make();
    return qr.createImgTag(5); // this is a base64 data
  }, 
  mkRandomString(len) {
    len = len || 32;
    var $chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890';
    var maxPos = $chars.length;
    var pwd = '';
    for (var i = 0; i < len; i++) {
      pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
  },
  showQrImg() {
    var str = qcode_src;
    var base64Img = this.mkQrBase64Image(str);
    qcode_src = base64Img;
    // console.log(base64Img)
    // this.setData({qcode_src: base64Img});
  }, 

  onReady() {
    // 页面显示(e) {
    var that = this;
    my.showLoading({
      success: (res) => { },
    });
    if (my.canIUse('form.report-submit')) {

    } else {
      // my.alert({ content: '当前版本不支持该参数' });
      console.log('当前版本不支持该参数')
    }
    if (my.canIUse('getLocation')) {
    } else {
      // 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
      my.alert({
        title: '提示',
        content: '当前支付宝版本过低，无法使用此功能，请升级最新版本的支付宝'
      });
    }
    my.getStorage({
      key: 'UserInfo',
      success: function (res) {
        //  my.alert({content: '获取成功：' +JSON.stringify(res)});
        savedata = JSON.stringify(res);
        if (res.data == null) {
        } else {
          Uid = res.data.Uid;
          token = res.data.token;
        }

        if (Uid == '') {
          console.info("第一次");
        
          my.getAuthCode({
            scopes: 'auth_base', // 主动授权：auth_user，静默授权：auth_base
            success: (res) => {

              if (res.authCode) {
                //  my.alert({ content: "Code--" + res.authCode });
                // 认证成功
                // 调用自己的服务端接口，让服务端进行后端的授权认证，并且种session，需要解决跨域问题
                my.httpRequest({
                  url: 'https://open.10010.org/api/MicApp/GetAliBaseInfo?code=' + res.authCode + '&appid=2017061607502211', // 目标服务器 url
                  method: 'get',
                  dataType: 'json',
                  success: (res) => {
                    console.log(JSON.stringify(res));
                    // my.alert({ content: "Code" + JSON.stringify(res) });
                    Uid = res.data.Result.uid;
                    token = res.data.Result.token;

                    my.setStorageSync({
                      key: 'UserInfo',
                      data: {
                        Uid: Uid,
                        token: token,
                      }
                    });
                    //  my.alert({ content: "Code" +JSON.stringify(res.data.Result.Voucher)  });
                    my.httpRequest({
                      // url: 'https://open.10010.org/api/MicApp/GetSignIn?user_id=' + Uid + '&merchant_pid=2088111105593181&shop_id=2088111105593181', // 目标服务器 url
                      url: 'https://open.10010.org/api/MicApp/GetSignIn?user_id=' + Uid + '&merchant_pid=' + merchant_pid + '&shop_id=' + shop_id + '&token=' + token + "&lon=" + a_lang + "&lat=" + lation, // 目标服务器 url
                      method: 'get',
                      dataType: 'json',
                      success: (res) => {
                        console.log("----" + JSON.stringify(res));
                        // my.alert({ content: "Code" + JSON.stringify(res) });

                        if (res.data.Value == 403) {

                          my.hideLoading();
                          my.navigateTo({ url: "/pages/reserlogin/reserlogin" });

                        }

                        if (res.data.Result.ActivityLogo != null) {
                          left_pic = res.data.Result.ActivityLogo;
                          //  console.log("----"+left_pic);
                        }

                        if (res.data.Result.qrcode_url == null || res.data.Result.qrcode_url == '') {
                          index_qrcode = "none"
                          qcode_src = "";

                          //  console.log("----"+left_pic);
                        } else {
                          qcode_src = res.data.Result.qrcode_url;
                          that.showQrImg();
                          index_qrcode = "flow-root";

                        }


                        if (res.data.Result.IfFirst == 1) {
                          tip_content = '签到成功，金币 +' + res.data.Result.AddScore + ' 个';
                        } else {
                          tip_content = "已签到";

                        }

                        // id_check_info.
                        if (Uid == "2088111105593181" || Uid == '' || merchant_pid == "") {
                          if (res.data.Result.AlipayCardId == "") {
                            card_src = "/image/checkin_card_dark.png";

                          } else {
                            card_src = "/image/checkin_card.png";
                            cardId = res.data.Result.AlipayCardId;
                          }
                        } else {
                          if (res.data.Result.AlipayCardId == "") {
                            card_src = "/image/check_card_demo_dark.png";

                          } else {
                            card_src = "/image/check_card_demo.png";
                            cardId = res.data.Result.AlipayCardId;
                          }

                        }

                        that.setData({
                          title: res.data.Result.ShopName,
                          total_bean: "金币总额：" + res.data.Result.PreScore + "个",
                          num: " 您已经连续签到" + res.data.Result.ContinuousTime + "天，明天签到将获得" + res.data.Result.AfterAddScore + "个金币",

                          check_position: "您是本店今日第" + res.data.Result.STimes + "位签到顾客，累计签到：" + res.data.Result.CTimes + "次",
                          txt_title: res.data.Result.ActivityName,
                          txt_content: res.data.Result.ActibityType,
                          left_head: left_pic,
                          items: [{ name: '0', value: '退订每日提醒服务' },],
                          info: '开店助手',
                          info1: '|技术驱动',
                          tip: tip_content,
                          card_src: card_src,
                          head_src: "/image/icon-checkin.png",
                          index: "inline-block",
                          card_index: "flow-root",
                          index_line: "flow-root",
                          alipay_uid: res.data.Result.qrcode_text + res.data.Result.qrcode_value,
                          card_info: "点击会员卡即可获取优惠权益并订阅每日签到提醒（有效期3天）",
                          data: res.data.Result.Voucher,
                          qcode_src: qcode_src,
                          index_qrcode: index_qrcode,
                        });

                      }, fail: function (res) {
                        my.hideLoading();
                        // my.alert({ content: JSON.stringify(res) });
                      },
                      complete: function (res) {
                        // my.alert({ title: '访问结束' });
                        my.hideLoading();
                      }
                    });

                  }, fail: function (res) {
                    my.hideLoading();
                    my.alert({ content: JSON.stringify(res) });
                  },
                  complete: function (res) {
                    // my.alert({ title: '访问结束' });
                    my.hideLoading();
                  }
                });
              }
            },
          });

        } else {
          var url = 'https://open.10010.org/api/MicApp/GetSignIn?user_id=' + Uid + '&merchant_pid=' + merchant_pid + '&shop_id=' + shop_id + '&token=' + token + "&lon=" + a_lang + "&lat=" + lation;
          console.info("第er次");
          console.log(url);
          
          my.httpRequest({
            // url: 'https://open.10010.org/api/MicApp/GetSignIn?user_id=' + Uid + '&merchant_pid=2088111105593181&shop_id=2088111105593181', // 目标服务器 url
            url: 'https://open.10010.org/api/MicApp/GetSignIn?user_id=' + Uid + '&merchant_pid=' + merchant_pid + '&shop_id=' + shop_id + '&token=' + token + "&lon=" + a_lang + "&lat=" + lation, // 目标服务器 url
            method: 'get',
            dataType: 'json',
            success: (res) => {

              console.log("----" + JSON.stringify(res));
              // my.navigateTo({ url: "/pages/reserlogin/reserlogin" });
              if (res.data.Value == 403) {
                my.hideLoading();
                my.navigateTo({ url: "/pages/reserlogin/reserlogin" });
              }

              // my.alert({ content: "Code" + JSON.stringify(res) });
              if (res.data.Result.ActivityLogo != null) {
                left_pic = res.data.Result.ActivityLogo;
                //  console.log("----"+left_pic);
              }

              if (res.data.Result.IfFirst == 1) {
                tip_content = '签到成功，金币 +' + res.data.Result.AddScore + ' 个';
              } else {
                tip_content = "已签到";

              }
              if (Uid == "2088111105593181" || Uid == '' || merchant_pid == "") {
                if (res.data.Result.AlipayCardId == "") {
                  card_src = "/image/checkin_card_dark.png";

                } else {
                  card_src = "/image/checkin_card.png";
                  cardId = res.data.Result.AlipayCardId;
                }
              } else {
                if (res.data.Result.AlipayCardId == "") {
                  card_src = "/image/check_card_demo_dark.png";

                } else {
                  card_src = "/image/check_card_demo.png";
                  cardId = res.data.Result.AlipayCardId;
                }

              }

              // id_check_info.

              if (res.data.Result.qrcode_url == null || res.data.Result.qrcode_url == '') {
                index_qrcode = "none"
                qcode_src = "";

                //  console.log("----"+left_pic);
              } else {
                qcode_src = res.data.Result.qrcode_url;
                that.showQrImg();
                index_qrcode = "flow-root";

              }

              that.setData({

                title: res.data.Result.ShopName,
                total_bean: "金币总额：" + res.data.Result.PreScore + "个",
                num: " 您已经连续签到" + res.data.Result.ContinuousTime + "天，明天签到将获得" + res.data.Result.AfterAddScore + "个金币",
                check_position: "您是本店今日第" + res.data.Result.STimes + "位签到顾客，累计签到：" + res.data.Result.CTimes + "次",
                txt_title: res.data.Result.ActivityName,
                txt_content: res.data.Result.ActibityType,
                left_head: left_pic,
                items: [{ name: '0', value: '退订每日提醒服务' },],
                info: '开店助手',
                info1: '|技术驱动',
                tip: tip_content,
                card_src: card_src,
                head_src: "/image/icon-checkin.png",
                index: "inline-block",
                card_index: "flow-root",
                index_line: "flow-root",
                alipay_uid: res.data.Result.qrcode_text + res.data.Result.qrcode_value,
                card_info: "点击会员卡即可获取优惠权益并订阅每日签到提醒（有效期3天）",
                data: res.data.Result.Voucher,
                qcode_src: qcode_src,
                index_qrcode: index_qrcode,
              });

            }, fail: function (res) {
              my.hideLoading();
              my.navigateTo({ url: "/pages/error-view/index" });
              // my.alert({ content: JSON.stringify(res) });
            },
            complete: function (res) {
              // my.alert({ title: '访问结束' });
              my.hideLoading();
            }
          });

        }

      },
      fail: function (res) {
        my.alert({ content: JSON.stringify(res) });
        my.hideLoading();
      }
    });

  }, 
  handleListItemTap(e) {
    console.log("点击了一次");
    // ${e.currentTarget.dataset.index}  ?clubId=totalist[e.currentTarget.dataset.index]
    // my.alert({ content: JSON.stringify(totalist[e.currentTarget.dataset.index]) });
    // my.navigateTo({ url: "../shopdetail/shopdetail?Name=" + totalist[e.currentTarget.dataset.index].Name + "&Photo=" + totalist[e.currentTarget.dataset.index].Photo + "&hot=" + totalist[e.currentTarget.dataset.index].HotValue });
  }, 
  onChange(e) {
    var ifcheck = "";

    if (e.detail.value == "0") {
      ifcheck = "false";
    } else {
      ifcheck = "true";
    }
    //  my.alert({ content:  ifcheck});
    my.httpRequest({
      url: 'https://open.10010.org/api/MicApp/UpdateCensLifeWindowSubscriber', // 目标服务器 url
      method: 'get',
      data: {
        user_id: Uid,
        ifchecked: ifcheck,
      },
      dataType: 'json',
      success: (res) => {
        //  my.alert({ content: JSON.stringify(res)+"${e.detail.value}" });
        // my.alert({ title: JSON.stringify(res) });
      }, 
      fail: function (res) {
        my.hideLoading();
        my.navigateTo({ url: "/pages/error-view/index" });
        console.log(JSON.stringify(res));
      },
      complete: function (res) {
        // my.alert({ title: '访问结束' });
        my.hideLoading();
      }
    });

  }, 
  SharePacket(e) {
    if (cardId == "") {
      my.showLoading({
        success: (res) => { },
      });
      my.getAuthCode({
        scopes: 'auth_ecard',
        success: (res) => {

          ecard_code = res.authCode;
          console.log(ecard_code);
          my.httpRequest({
            url: 'https://open.10010.org/api/MicApp/CreateAlipayCardForSignIn', // 目标服务器 url
            method: 'get',
            data: {
              code: ecard_code,
              appid: "2017061607502211",
              merchant_pid: merchant_pid,
              shop_id: shop_id,
            },
            dataType: 'json',
            success: (res) => {

              if (Uid == "2088111105593181" || Uid == '' || merchant_pid == "") {
                card_src = '/image/checkin_card.png';
              } else {
                card_src = "/image/check_card_demo.png";
              }

              this.setData({
                card_src: card_src,
              });

              console.log(res.data.Result);
              cardId = res.data.Result;
              my.openCardDetail({ passId: cardId + "" });

            }, fail: function (res) {
              my.hideLoading();
              my.navigateTo({ url: "/pages/error-view/index" });
              // my.alert({ content: JSON.stringify(res) });
            },
            complete: function (res) {
              // my.alert({ title: '访问结束' });
              my.hideLoading();
            }
          });

        }, 
        fail: function (res) {
          my.hideLoading();
        },
        complete: function (res) {
          // my.alert({ title: '访问结束' });
          my.hideLoading();
        }
      });

    } else {
      // cardId = res.data.Result.AlipayCardId;
      my.openCardDetail({ passId: cardId });
    }

  }, 
  loadpage(e) {
    my.navigateTo({ url: "../antui/app_checkin?Name=" + totalist[e.currentTarget.dataset.index].Name + "&Photo=" + totalist[e.currentTarget.dataset.index].Photo + "&hot=" + totalist[e.currentTarget.dataset.index].HotValue });
  }, 
  AskForCard() {

  }, 
  formSubmit: function (e) {
    //  my.alert({ content: JSON.stringify(e) });
    //  my.alert({ content:'form发生了submit事件，携带数据为：'+   JSON.stringify(e)});
    my.httpRequest({
      url: 'https://open.10010.org/api/MicApp/SaveFormId', // 目标服务器 url
      method: 'get',
      data: {
        Uid: Uid,
        Token: token,
        FormId: e.detail.formId,
        Time: e.timeStamp + "",
        MerchantPid: merchant_pid,
        ShopId:shop_id,
      },
      dataType: 'json',
    
      success: (res) => {
        console.log("SaveFormId------"+JSON.stringify(res))
        //  my.alert({ content: JSON.stringify(res) });
      }, fail: function (res) {
        my.hideLoading();
        console.log(JSON.stringify(res))
      },
      complete: function (res) {
        // my.alert({ title: '访问结束' });
        my.hideLoading();
      }
    });

  },
  onReset: function () {
    console.log('form发生了reset事件')
  }

});
