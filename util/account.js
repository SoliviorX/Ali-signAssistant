import {setStorage,co} from './tiny_util';

export function getAuthCode(scopes) {
    return new Promise((resolve, reject) => {
        my.getAuthCode({
            scopes, // 主动授权：auth_user，静默授权：auth_base
            success: (res) => {
                console.log(scopes + " getAuthCode: ", res);
                let authcode = "";
                if (res.authCode) {
                    authcode = res.authCode;
                }
                resolve(authcode);
            },
        });
    });
}

export function getBaseAuthCode() {
    return getAuthCode("auth_base")
}

export function getEcardAuthCode() {
    return getAuthCode("auth_ecard")
}

export function getUserInfo() {

    return new Promise((resolve, reject) => {
        my.getAuthCode({
            scopes: 'auth_user',
            success: (res) => {
                my.getAuthUserInfo({
                    success: ({nickName, avatar}) => {
                        console.log({nickName, avatar});


                        // my.setStorage({
                        //     key: 'nickName',
                        //     data: nickName
                        // });

                        resolve(nickName);
                    }
                });
            },
        });
    });
}

export function getAuthCodeAndUserInfo() {

    return new Promise((resolve, reject)=> {

        Promise.all([getAuthCode(), getUserInfo()]).then((arr)=> {
            const userInfo = {};
            console.log("arr:", arr);
            userInfo.authCode = arr[0];
            userInfo.nickName = arr[1];
            resolve(userInfo);
        });

        // getAuthCode().then((res)=>{
        //     userInfo.authCode = res;
        //     // console.log("getAuthCodeAndUserInfo",res);
        //     resolve(userInfo);
        // }).then(()=>{
        //     getUserInfo().then((res)=>{
        //         userInfo.nickName=res;
        //         console.log("getAuthCodeAndUserInfo",res);
        //         resolve(userInfo);
        //     })
        // }).then(()=>{
        //     console.log("userInfo:",userInfo);
        //     resolve(userInfo);
        // });

    });
}

export function saveAccountInfo(account) {
    const {globalData} = getApp();
    globalData.account = account;
    co("保存成功"+globalData.account.openid)
    setStorage("account",account);
}
export function getAccountInfo() {
     my.getStorage({
      key: 'account',
      success: function (res) {
        console.log("res-acoount:", JSON.stringify(res.data));
        var account = res.data;
        if (account != undefined) {
          app.globalData.account = account;
        }
      }
    });

}
export function saveLocationInfo(location) {
    const {globalData} = getApp();
    globalData.location = location;

    setStorage("location",location);

}

