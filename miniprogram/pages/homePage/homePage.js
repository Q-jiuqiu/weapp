// components/search/search.js
import { getData } from "../../utils/event";
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
    // imageLoad: function (e) {
    //   //获取图片真实宽度
    //   var imgwidth = e.detail.width,
    //     imgheight = e.detail.height,
    //     //宽高比
    //     ratio = imgwidth / imgheight;
    //   console.log(imgwidth, imgheight);
    //   //计算的高度值
    //   var viewHeight = 750 / ratio;
    //   var imgheight = viewHeight;
    //   var imgheights = this.data.imgheights;
    //   //把每一张图片的对应的高度记录到数组里
    //   imgheights[e.target.dataset.id] = imgheight;
    //   this.setData({
    //     imgheights: imgheights,
    //   });
    // },
    // bindchange: function (e) {
    //   // console.log(e.detail.current)
    //   this.setData({
    //     current: e.detail.current,
    //   });
    // },
    /**
     * 点击切换一级页面
     */
    changeType(event) {
      let index = getData(event, "index");
      this.setData({
        currentPage: index,
      });
    },
    getmyinfo(e) {
      console.log(e.detail.userInfo);
      let info = e.detail.userInfo.nickName;
      this.setData({
        name: info,
        src: e.detail.userInfo.avatarUrl,
      });
      console.log("store", app.globalData);
      // 跳转到预定页面
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
