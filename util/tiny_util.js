export function toast(content) {
    my.showToast({
        content,
    });
}
export function co(content) {
    console.log(content)
}

export function getQueryString(location) {
    var index = location.lastIndexOf("\?");

    var qs = location.substring(index + 1, location.length), // 获取url中"?"符后的字串  
        args = {}, // 保存参数数据的对象
        items = qs.length ? qs.split("&") : [], // 取得每一个参数项,
        item = null,
        len = items.length;

    for (var i = 0; i < len; i++) {
        item = items[i].split("=");
        var name = decodeURIComponent(item[0]),
            value = decodeURIComponent(item[1]);
        if (name) {
            args[name] = value;
        }
    }
    return args;
}


export function getDistance(lat1, lng1, lat2, lng2) {

  lat1 = lat1 || 0;

  lng1 = lng1 || 0;

  lat2 = lat2 || 0;

  lng2 = lng2 || 0;

  var rad1 = lat1 * Math.PI / 180.0;

  var rad2 = lat2 * Math.PI / 180.0;

  var a = rad1 - rad2;

  var b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;

  var r = 6378137;

  var s= 2*Math.asin(Math.sqrt(Math.pow(Math.sin(a/2),2) + Math.cos(rad1)*Math.cos(rad2)*Math.pow(Math.sin(b/2),2)));
  var k = s*r
  if(k >1000){
    s = k/1000;
    s = s.toFixed(1);
    return s + 'km';
  } else {
    s = k.toFixed(0);
    return s + 'm';
  }

  // return (r * 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(rad1) * Math.cos(rad2) * Math.pow(Math.sin(b / 2), 2)))).toFixed(0)

}

export function transformDateA(time) {
  var d = new Date(time);
  var seperator1 = "-";
  var year = d.getFullYear();
  var month = d.getMonth() + 1;
  var strDate = d.getDate();
  var hour = d.getHours();
  var minutes = d.getMinutes();
  var seconds = d.getSeconds();
  if (month >= 1 && month <= 9) {
      month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
  }
  if (hour >= 0 && hour <= 9) {
      hour = "0" + hour;
  }
  if (minutes >= 0 && minutes <= 9) {
      minutes = "0" + minutes;
  }
  if (seconds >= 0 && seconds <= 9) {
      seconds = "0" + seconds;
  }
  var times = year + seperator1 + month + seperator1 + strDate + " " + hour + ":" + minutes + ":" + seconds;
  return times;
}

export function transformDate(time) {
  var d = new Date(time);
  var seperator1 = "-";
  var year = d.getFullYear();
  var month = d.getMonth() + 1;
  var strDate = d.getDate();
  var hour = d.getHours();
  var minutes = d.getMinutes();
  var seconds = d.getSeconds();
  if (month >= 1 && month <= 9) {
      month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
  }
  if (hour >= 0 && hour <= 9) {
      hour = "0" + hour;
  }
  if (minutes >= 0 && minutes <= 9) {
      minutes = "0" + minutes;
  }
  if (seconds >= 0 && seconds <= 9) {
      seconds = "0" + seconds;
  }
  var d1 = new Date(year,month,strDate,hour,minutes,seconds);
  var d2 = new Date(d1.getTime()+8*60*60*1000)
  var m = new Date(d2);
  var m1 = m.getFullYear();
  var m2 = m.getMonth();
  var m3 = m.getDate();
  var m4 = m.getHours();
  var m5 = m.getMinutes();
  var m6 = m.getSeconds();
  if (m2 >= 1 && m2 <= 9) {
      m2 = "0" + m2;
  }
  if (m3 >= 0 && m3 <= 9) {
      m3 = "0" + m3;
  }
  if (m4 >= 0 && m4 <= 9) {
      m4 = "0" + m4;
  }
  if (m5 >= 0 && m5 <= 9) {
      m5 = "0" + m5;
  }
  if (m6 >= 0 && m6 <= 9) {
      m6 = "0" + m6;
  }
  var times = m1 + seperator1 + m2 + seperator1 + m3 + " " + m4 + ":" + m5 + ":" + m6;
  return times;
}

export function StoUTCTime(time) {
  var SB = time.substring(0,4);
  var SC = time.substring(5,7)-1;
  var SD = time.substring(8,10);
  var d1 = new Date(SB,SC,SD,'00','00','00');
  var d2 = new Date(d1.getTime()-8*60*60*1000)
  var str = transformDateA(d2)
  return str;
}

export function EtoUTCTime(time) {
  var SB = time.substring(0,4);
  var SC = time.substring(5,7)-1;
  var SD = time.substring(8,10);
  var d1 = new Date(SB,SC,SD,'23','59','59');
  var d2 = new Date(d1.getTime()-8*60*60*1000)
  var str = transformDateA(d2)
  return str;
}

export function isEmpty(obj) {
    if (typeof obj == "undefined" || obj == null || obj == "") {
        return true;
    } else {
        return false;
    }
}


export function getTime(time, type) {
    var newdate;
    var value;
    if (time.charAt(time.length - 1) == 'Z') {
        newdate = new Date(time);
    } else {
        newdate = new Date(time + "Z");
    }

    switch (type) {
        case "Y":
            value = formatFunc(newdate.getFullYear());
            break
        case "M":
            value = formatFunc(newdate.getMonth() + 1);
            break
        case "D":
            value = formatFunc(newdate.getDate());
            break
        case "h":
            value = formatFunc(newdate.getHours());
            break
        case "m":
            value = formatFunc(newdate.getMinutes());
            break
        case "s":
            value = formatFunc(newdate.getSeconds());
            break
        case "YYY":
            value = formatFunc(newdate.getFullYear()) + "-" + formatFunc(newdate.getMonth() + 1) + "-" + formatFunc(newdate.getDate()) + " " + formatFunc(newdate.getHours()) + ":" + formatFunc(newdate.getMinutes()) + ":" + formatFunc(newdate.getSeconds());
            break
        case "YY_DD":
            value = formatFunc(newdate.getFullYear()) + "年" + formatFunc(newdate.getMonth() + 1) + "月" + formatFunc(newdate.getDate())+'日';
            break
        case "MM_SS":
            value = formatFunc(newdate.getHours()) + ":" + formatFunc(newdate.getMinutes());
            break
    }
    return value;


}

export function getBeforeDay(time, beforedays) {

    var curDate = new Date(time);
    var newdate = new Date(curDate.getTime() - 24 * 60 * 60 * 1000 * beforedays);  //前一天

    return formatFunc(newdate.getFullYear()) + "-" + formatFunc(newdate.getMonth() + 1) + "-" + formatFunc(newdate.getDate())

}

export function getBeforeTime(time, mins) {

    var curDate = new Date(time);
    var newdate = new Date(curDate.getTime() - 60 * 1000 * mins);  

    return formatFunc(newdate.getFullYear()) + "-" + formatFunc(newdate.getMonth() + 1) + "-" + formatFunc(newdate.getDate())+' '+formatFunc(newdate.getHours())+':'+formatFunc(newdate.getMinutes())+':'+formatFunc(newdate.getSeconds())

}

export function getRealDate(TimeDate) {
    var strDate = "";
    var week = new Date(TimeDate).getDay();
    if (week == 0) {
        strDate = "星期日";
    } else if (week == 1) {
        strDate = "星期一";
    } else if (week == 2) {
        strDate = "星期二";
    } else if (week == 3) {
        strDate = "星期三";
    } else if (week == 4) {
        strDate = "星期四";
    } else if (week == 5) {
        strDate = "星期五";
    } else if (week == 6) {
        strDate = "星期六";
    }
    return strDate;
}




export function formatFunc(str) {    //格式化显示
    return str > 9 ? str : '0' + str;
}

export function Time_Countdown(that, startOrend, order_time) {
    // co(order_time);
    var timertrigger = setInterval(function () {
        // var timedate = new Date(order_time);                //自定义结束时间  
        var now = new Date();                                         //获取当前时间
        var date = parseInt(order_time.getTime() - now.getTime()) / 1000; //得出的为秒数；
         if(date<=0){
          clearInterval(timertrigger);
        }
        // co(date<=0);
        // if (date <= 0) {
        //     clearInterval(timertrigger);
        //     var str = '没有到预约时间';
        //    that.setData({
        //    list_btn_name:{
        //     titlename:str
        //   }
        // })
        // }
        // else{
        var day = parseInt(date / 60 / 60 / 24);
        var hour = parseInt(date / 60 / 60 % 24);
        var minute = parseInt(date / 60 % 60);
        var second = parseInt(date % 60);
        hour = formatFunc(hour);
        minute = formatFunc(minute);
        second = formatFunc(second);
        var str = day + ":" + hour + ":" + minute + ":" + second;
        //co(str);
        that.setData({
            list_btn_name: {
                titlename: '距离预约时间还有  ' + str,
                backcolor: '#d43f40;',
                weather_btn:false
            }
        })
       
        // }
    }, 1000);




}

export function alert(title, successCallback) {
    my.alert({
        title,
        success: successCallback,
    });
}

export function alertObj(obj) {
    // my.alert({content: JSON.stringify(res)});
    alert(JSON.stringify(obj));
}

export function log(obj, prefix) {
    if (prefix != undefined) {
        console.log(prefix + " : ", obj);
    } else {
        console.log(obj)
    }

}

export function showLoading(content) {
    my.showLoading({
        content: content,
        success: (res) => {

        },
    });
}

export function hideLoading() {
    my.hideLoading();
}

export function navigateToDelay(pageUrl, ms) {
    setTimeout(() => {
        my.navigateTo({
            url: pageUrl,
        });
    }, ms);

}

export function redirectToDelay(pageUrl, ms) {
    setTimeout(() => {
        my.redirectTo({
            url: pageUrl,
        });
    }, ms);

}

export function switchTab(pageUrl) {
    my.switchTab({
        url: pageUrl, // 需要跳转的 tabBar 页面的路径（需在 app.json 的 tabBar 字段定义的页面），路径后不能带参数
    });
}

export function switchTabAfterBack(pageUrl, ms, delta) {
    setTimeout(() => {
        my.navigateBack({
            delta
        });
        my.switchTab({
            url: pageUrl, // 需要跳转的 tabBar 页面的路径（需在 app.json 的 tabBar 字段定义的页面），路径后不能带参数
        });
    }, ms);
}

export function switchTabDelay(pageUrl, ms) {
    setTimeout(() => {
        my.switchTab({
            url: pageUrl, // 需要跳转的 tabBar 页面的路径（需在 app.json 的 tabBar 字段定义的页面），路径后不能带参数
        });
    }, ms);

}

export function oriRequest(url, data, method, callback, headers, dataType) {
    console.log("oriRequest url: ", url)
    console.log("oriRequest data: ", data)
    console.log("oriRequest: headers", headers)
    const { successCallback, failCallback, completeCallback } = callback;
    my.httpRequest({
        url,
        method,
        data,
        headers,
        dataType,
        success: successCallback,
        fail: failCallback,
        complete: completeCallback
    });



}



export function request(url, data, method, callback) {
    const { successCallback, failCallback, completeCallback } = callback;

    my.httpRequest({
        url,
        method,
        data,
        dataType: 'json',
        success: successCallback,
        fail: failCallback,
        complete: (res) => {

            hideLoading();

        }
    });
}

export function postRequest(url, data, callback) {
    showLoading("加载中...");
    request(url, data, "POST", callback);
}

export function getRequest(url, data, callback) {
    showLoading("加载中...");
    request(url, data, "GET", callback);
}

export function setStorage(key, data, successCallBack, failCallback, completeCallback) {
    my.setStorage({
        key,
        data,
        success: successCallBack,
        fail: failCallback,
        complete: completeCallback
    });
}

export function getStorage(key, successCallBack, failCallback, completeCallback) {
    my.getStorage({
        key,
        success: successCallBack,
        fail: failCallback,
        complete: completeCallback
    });
}

export function removeStorage(key, successCallBack) {
    my.removeStorage({
        key,
        success: successCallBack,
    });
}

export function tradePay(orderStr, successCallBack) {
    my.tradePay({
        orderStr,
        success: successCallBack,
    });
}

export function buttonClicked(self) {
  self.setData({
    buttonClicked: true
  })
  setTimeout(function () {
    self.setData({
      buttonClicked: false
    })
  }, 800)
}

export function Trim(str) { 
  return str.replace(/(^\s*)|(\s*$)/g, "");
}
