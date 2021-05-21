// components/toolsbar/toolsbar.js
import getUserInfo from "../../utils/getUserInfo";
import redirectTo from "../../utils/redirectTo";
const app = getApp();

Component({
  options: {
    addGlobalClass: true,
  },
  /**
   * 组件的属性列表
   */
  properties: {},

  /**
   * 组件的初始数据
   */
  data: {
    isShow: false,
  },
  /**
   * 组件的方法列表
   */
  methods: {
    showSubList() {
      this.setData({
        isShow: !this.data.isShow,
      });
    },
    // 客服会话
    // handleContact(event) {
    //   console.log(event);
    // },
    getMyInfoGoToOrder(e) {
      redirectTo({ url: "/pages/order/order", urlTitle: "预约" });
    },
    // 授权
    getMyInfo() {
      if (!app.globalData.isUser) {
        getUserInfo({ url: "/pages/My/My", urlTitle: "我的" });
        app.globalData.isUser = true;
      } else {
        // 跳转到预定页面
        redirectTo({ url: "/pages/My/My", urlTitle: "我的" });
      }
    },
  },
});
