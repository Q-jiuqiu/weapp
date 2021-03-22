// components/photoShow.js
import { getData } from "../../utils/event";
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    photoList: {
      type: Array,
    },
  },

  /**
   * 组件的初始数据
   */
  data: {},

  /**
   * 组件的方法列表
   */
  methods: {
    goToDetail(event) {
      let index = getData(event, "index");
      let photoList = this.properties.photoList;
      wx.navigateTo({
        url: "/pages/detail/detail",
        // events: {
        // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
        // acceptDataFromOpenedPage: function (data) {
        //   console.log(data);
        // },
        // someEvent: function (data) {
        //   console.log(data);
        // },
        // },
        success: function (res) {
          // 通过eventChannel向被打开页面传送数据
          res.eventChannel.emit("acceptDataFromOpenerPage", {
            name: photoList[index].name,
            cover: photoList[index].src,
          });
          wx.setNavigationBarTitle({
            title: "详情",
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
      // console.log(this.properties);
    },
  },
});
