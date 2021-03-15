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
    isSearch: false,
    formData: {},
    selectList: [],
    hotSearch: [
      { search: "证件照", select: false },
      { search: "结婚登记照", select: false },
      { search: "形象照", select: false },
      { search: "情侣", select: false },
      { search: "婚纱", select: false },
    ],
    warningTop: false,
    warningLow: false,
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
    // 防抖
    Debounce(fn, time) {
      clearTimeout(this.timer);
      this.timer = setTimeout(fn, time);
    },
    // 筛选面板显&隐
    searchShow() {
      let data = this.data;
      this.setData({ isSearch: !data.isSearch });
    },
    // 输入框绑定
    bindValue(event) {
      let value = event.detail.value;
      let type = event.target.id;
      let formData = this.data.formData;
      switch (type) {
        case "keyword":
          this.Debounce(() => {
            this.setData({
              "formData.keyword": value,
            });
          }, 800);
          break;
        case "low":
          this.Debounce(() => {
            // 最低价和最高价校验
            let isError = false;
            console.log("low", value * 1 > formData.top * 1);
            if (value * 1 > formData.top * 1) {
              isError = true;
            } else {
              isError = false;
            }
            this.setData({
              warningLow: isError,
              warningTop: false,
              "formData.low": value,
            });
          }, 800);
          break;
        case "top":
          this.Debounce(() => {
            // 最低价和最高价校验
            let isError = false;
            console.log("top", value * 1 < formData.low * 1);
            if (value * 1 < formData.low * 1) {
              isError = true;
            } else {
              isError = false;
            }
            this.setData({
              warningTop: isError,
              warningLow: false,
              "formData.top": value,
            });
          }, 800);
          break;
      }
    },
    // 阻止事件冒泡
    stop() {},
    // 重置表单
    reset() {
      console.log("重置表单");
      let formData = this.data.formData;
      let hotSearch = this.data.hotSearch;
      for (const key in formData) {
        if (Object.hasOwnProperty.call(formData, key)) {
          formData[key] = "";
        }
      }
      hotSearch.forEach((item) => {
        item.select = false;
      });
      this.setData({
        formData,
        hotSearch,
        warningTop: false,
        warningLow: false,
      });
    },
    // 提交表单
    submit() {},
    // 选择热门搜索按钮
    searchClick(event) {
      let hotSearch = this.data.hotSearch;
      let selectList = this.data.selectList;
      let index = event.target.dataset.index;
      hotSearch[index].select = !hotSearch[index].select;
      if (hotSearch[index].select) {
        selectList.push(hotSearch[index].search);
      } else {
        let indexOf = selectList.indexOf(hotSearch[index].search);
        selectList.splice(indexOf, 1);
      }
      let selectString = "";
      selectList.forEach((item) => {
        selectString = selectString + " " + item;
      });
      this.setData({
        hotSearch,
        selectList,
        "formData.keyword": selectString,
      });
      console.log(this.data.formData.keyword);
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
      this.timer = null;
    },
  },
});
