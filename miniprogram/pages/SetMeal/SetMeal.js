const app = getApp();

// pages/SetMeal/SetMeal.js
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
    dataArr: [],
    currentIndex: null,
    nameList: [],
  },

  /**
   * 组件的方法列表
   */
  methods: {
    async getDataArr() {
      let data = this.data;
      this.db = wx.cloud.database();
      // const countResult = await this.db.collection("series").count();

      this.db
        .collection("series")
        .get()
        .then((res) => {
          console.log(res);
          this.setData({
            dataArr: res.data,
          });
          this.getNameList();
          this.triggerEvent("seriesList", data.nameList);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    goToSeries(event) {
      let index = event.currentTarget.dataset.index;
      app.globalData.seriesDate = this.data.dataArr[index];
      wx.navigateTo({
        url: "/pages/series/series",
        success(res) {
          wx.setNavigationBarTitle({
            title: app.globalData.seriesDate.seriesName,
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
    // 获取套系名称列表
    getNameList() {
      let dataArr = this.data.dataArr;
      console.log(dataArr);
      let nameList = ["全部"];
      dataArr.forEach((item) => {
        nameList.push(item.seriesName);
      });
      this.setData({
        nameList,
      });
    },
  },
  /**
   * 组件的生命周期列表
   */
  lifetimes: {
    attached() {
      this.getDataArr();
    },
  },
});
