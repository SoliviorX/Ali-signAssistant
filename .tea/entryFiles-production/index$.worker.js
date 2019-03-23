require('./config$');
require('./importScripts$');
function success() {
require('../..//app');
require('../..//pages/mainpage/mainpage');
require('../..//pages/shopdetail/shopdetail');
require('../..//pages/todos/todos');
require('../..//pages/reserlogin/reserlogin');
require('../..//pages/errorview/index');
require('../..//pages/error-view/index');
}
self.bootstrapApp ? self.bootstrapApp({ success }) : success();
