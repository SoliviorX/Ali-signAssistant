import ErrorView from '../errorview';

Page({
    ...ErrorView,
    data: {
        errorData: {
          type: 'empty',
          title: '您的登录信息已过期',
          button: '重新登录',
          onButtonTap: 'handleBack',
          href: '/pages/list/index'
        },
    },
    handleBack() {
         my.setStorageSync({
                      key: 'UserInfo',
                      data: {
                        Uid: "",
                        token: "",
                      }
                    });
        my.showToast({
          content: '正在登录',
          success: (res) => {
            setTimeout(() => {
                my.navigateBack();
            }, 200);
            
          },
        });
    },onUnload(){
  my.redirectTo({ url: "/pages/mainpage/mainpage" });
  }
})