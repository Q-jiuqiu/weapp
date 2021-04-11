// components/toolsbar/toolsbar.js
import { getDetail } from "../../utils/event";
import getUserInfo from "../../utils/getUserInfo";
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
    animation: null,
    isShowTips: false,
  },

  lifetimes: {
    attached() {
      this.animation = wx.createAnimation({
        // 动画持续时间，单位ms，默认值 400
        duration: 1500,
        timingFunction: "linear", // 延迟多长时间开始
        delay: 100,
        transformOrigin: "left top 0",
        success: function (res) {
          console.log(res);
        },
      });
    },
  },
  /**
   * 组件的方法列表
   */
  methods: {
    showSubList() {
      console.log(this.data.isShow);
      this.setData({
        isShow: !this.data.isShow,
      });
      // this.animation.rotate(360).step();
      // this.setData({
      //   //输出动画
      //   animation: this.animation.export(),
      // });
    },
    // 客服会话
    handleContact(event) {
      console.log(event);
      // this.triggerEvent("contact", detail);
    },
    getMyInfoGoToOrder(e) {
      let userInfo = getDetail(e).userInfo;
      if (userInfo) {
        console.log("ok");
        getUserInfo(this, app, userInfo);
        wx.navigateTo({
          url: "/pages/order/order",
          success: function (res) {
            wx.setNavigationBarTitle({
              title: "预约",
            });
          },
          fail: function () {
            // fail
          },
          complete: function () {
            // complete
          },
        });
      } else {
        return;
      }
    },
    // 授权
    getMyInfo() {
      if (!app.globalData.isUser) {
        getUserInfo({ url: "/pages/My/My", urlTitle: "我的" });
        app.globalData.isUser = true;
      } else {
        // 跳转到预定页面
        wx.navigateTo({
          url: "/pages/My/My",
          success: function (res) {
            wx.setNavigationBarTitle({
              title: "我的",
            });
          },
          fail: function () {
            // fail
          },
          complete: function () {
            // complete
          },
        });
      }
    },
  },
});
