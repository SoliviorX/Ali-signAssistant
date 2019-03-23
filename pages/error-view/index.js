import ErrorView from '../errorview';

Page({
    ...ErrorView,
    data: {
        errorData: {
            type: 'empty',
            title: '什么都没有了',
            button: '返回',
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
          content: '重新加载',
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