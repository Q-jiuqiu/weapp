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
    defaultArr: [],
    sort: "default",
  },

  /**
   * 组件的方法列表
   */
  methods: {
    async getDataArr() {
      let data = this.data;
      this.db = wx.cloud.database();
      this.seriesDB = this.db.collection("series");

      this.seriesDB
        .get()
        .then((res) => {
          console.log(res);
          this.setData({
            dataArr: res.data,
            defaultArr: JSON.parse(JSON.stringify(res.data)), //深拷贝
          });
          this.getNameList();
          this.triggerEvent("seriesList", data.nameList);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 跳转到套系详情
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
    // 默认排序
    default() {
      let data = this.data;
      this.setData({
        dataArr: data.defaultArr,
        sort: "default",
      });
    },
    // 价格排序
    sort() {
      let data = this.data;
      let type = "top";
      if (data.sort !== "top") {
        data.dataArr.sort((a, b) => {
          return a.price - b.price;
        });
      } else {
        data.dataArr.sort((a, b) => {
          return b.price - a.price;
        });
        type = "low";
      }
      this.setData({
        dataArr: data.dataArr,
        sort: type,
      });
      console.log(data.dataArr, data.defaultArr);
    },
    // 热门
    hot() {
      console.log("热门");
      this.seriesDB
        .where({
          description: "hot",
        })
        .get()
        .then((res) => {
          console.log(res);
          this.setData({
            dataArr: res.data,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 筛选
    screen() {
      console.log("筛选");
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
