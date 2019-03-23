const app = getApp();
var totalist = [];
var contentlist = [];
Page({
  data: {},
  onLoad() {
    app.getUserInfo().then(
      user => this.setData({
        user,
      }),
    );
  },onLoad(){


    my.httpRequest({
          url: 'https://Open.10010.org/api/CreditFit/GetClubsByLocation?Longitude=' + lang + "&Latitude=" + lation, // 目标服务器 url
          method: 'get',
          dataType: 'json',
          success: (res) => {

            totalist = res.data.Result;

            for (let i = 0; i < totalist.length; i++) {
              contentlist[i] = {
                thumb: totalist[i].Photo,
                title: totalist[i].Name,
                hot:totalist[i].HotValue,
                arrow: 'horizontal'
              };
            }

            that.setData({

              listData: {
                onItemTap: 'handleListItemTap',
                header: null,
                data: contentlist
              },


            });

          }, fail: function (res) {
            my.alert({ content: "访问失败" + JSON.stringify(res) });
            my.hideLoading();
          },
          complete: function (res) {
            // my.alert({title: 'complete'});
            my.hideLoading();
          }
        });



  },
  onShow() {
    this.setData({ todos: app.todos });
  },
  onTodoChanged(e) {
 
  },
  addTodo() {
    my.navigateTo({ url: '../add-todo/add-todo' });
  },
});
