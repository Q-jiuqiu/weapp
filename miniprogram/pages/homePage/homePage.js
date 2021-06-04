// components/search/search.js
import { getData, getDetail } from "../../utils/event";
import getUserInfo from "../../utils/getUserInfo";
const app = getApp();

Component({
  /**
   * 组件的属性列表
   */

  properties: {
    list: {
      type: Object,
      default: {},
    },
    ok: {
      type: String,
      default: "haha",
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    title: "主页",
    // 作品
    photographyType: [],
    // 当前作品
    currentPage: 0,
    swiperList: [],
    logo: "../../assets/logo.jpg",
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getMyInfo() {
      if (!app.globalData.isUser) {
        getUserInfo({ url: "/pages/order/order", urlTitle: "预约" });
      } else {
        // 跳转到预定页面
        wx.redirectTo({
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
      }
    },
  },
  // 组件生命周期
  lifetimes: {
    attached() {
      this.setData({
        photographyType: app.appConfig.photographyType,
      });
      // console.log(this.data.photographyType);
      let photographBusiness = app.appConfig.photographBusiness;
      for (const key in photographBusiness) {
        if (Object.hasOwnProperty.call(photographBusiness, key)) {
          if (photographBusiness[key].title === this.data.title) {
            this.setData({
              swiperList: photographBusiness[key].pictureArr,
            });
            return;
          }
        }
      }
    },
  },
});
