import { seriesDB, _ } from "../../utils/DBcollection";
import { getData, getDetail, getId } from "../../utils/event";
import redirectTo from "../../utils/redirectTo";
const app = getApp();

// pages/SetMeal/SetMeal.js
Component({
  options: {
    addGlobalClass: true,
    styleIsolation: "shared", // 用于WeUI中ext-class的样式穿透
  },
  /**
   * 组件的属性列表
   */
  properties: {
    searchId: {
      type: String,
      default: "",
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    dataArr: [],
    noData: false, // 无数据的提示
    currentIndex: null,
    nameList: [],
    defaultArr: [],
    sort: "default",
    isSearch: true,
    formData: {},
    selectList: [],
    warningTop: false,
    warningLow: false,
    isDisabled: false,
    searchInfo: [],
    showLoading: true,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 下拉框搜索
    async searchId(id) {
      if (id != "all") {
        let { data } = await seriesDB
          .where({
            _id: id,
          })
          .get();
        this.setData({
          dataArr: data,
          noData: data.length < 1,
          showLoading: false,
        });
      } else {
        this.init();
      }
    },
    // 根据缓冲初始化
    init() {
      let that = this;
      let data = this.data;
      wx.getStorage({
        key: "defaultArr",
        success: function (res) {
          that.setData({
            dataArr: res.data,
            noData: res.data.length < 1,
            defaultArr: JSON.parse(JSON.stringify(res.data)),
            showLoading: false,
          });
          that.getNameList();
          that.triggerEvent("seriesList", data.nameList);
        },
        fail: function () {
          that.getInitData();
        },
      });
    },
    // 获取套系数据库数据
    async getInitData() {
      let data = this.data;
      let { data: DBData } = await seriesDB.get();
      this.setData({
        dataArr: DBData,
        noData: DBData.length < 1,
        defaultArr: JSON.parse(JSON.stringify(DBData)), //深拷贝,用于默认排序
        showLoading: false,
      });
      wx.setStorage({
        key: "defaultArr",
        data: JSON.parse(JSON.stringify(DBData)),
      });
      this.getNameList();
      this.triggerEvent("seriesList", data.nameList);
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
      let value = getDetail(event).value;
      let type = getId(event);
      let formData = this.data.formData;
      switch (type) {
        case "keyword":
          this.Debounce(() => {
            this.setData({
              "formData.keyword": value,
            });
          }, 300);
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
          }, 300);
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
          }, 300);
          break;
      }
    },
    // 阻止事件冒泡
    stop() {},
    // 重置表单
    reset() {
      let formData = this.data.formData;
      for (const key in formData) {
        if (Object.hasOwnProperty.call(formData, key)) {
          formData[key] = "";
        }
      }
      this.setData({
        formData,
        warningTop: false,
        warningLow: false,
      });
    },
    // 删除关键字搜索的内容
    delete() {
      this.setData({
        "formData.keyword": "",
      });
    },
    // 提交表单
    async submit() {
      let formData = this.data.formData;
      if (JSON.stringify(formData) == "{}") {
        this.searchShow();
        return;
      }
      let keyword = formData.keyword || "";
      let low = formData.low || "";
      let top = formData.top || "";
      let query = [];
      if (low == "" && top != "") {
        query.push({
          price: _.lt(top * 1),
        });
      } else if (low != "" && top == "") {
        query.push({
          price: _.gt(low * 1),
        });
      } else if (low != "" && top != "") {
        query.push({
          price: _.and(_.gt(low * 1), _.lt(top * 1)),
        });
      }
      if (keyword != "") {
        query.push({
          seriesName: {
            $regex: ".*" + keyword + ".*", //‘.*’等同于SQL中的‘%’
            $options: "i",
          },
        });
      }
      let { data } = await seriesDB.where(_.and(query)).get({});
      this.setData({
        dataArr: data,
        noData: data.length < 1,
        showLoading: false,
      });
      this.searchShow();
    },
    // 跳转到套系详情
    goToSeries(event) {
      let index = getData(event, "index");
      app.globalData.seriesDate = this.data.dataArr[index];
      redirectTo({
        url: "/pages/series/series",
        urlTitle: app.globalData.seriesDate.seriesName,
      });
    },
    // 获取套系名称列表
    getNameList() {
      let dataArr = this.data.dataArr;
      let nameList = [{ name: "全部", id: "all" }];
      dataArr.forEach((item) => {
        nameList.push({ name: item.seriesName, id: item._id });
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
        noData: data.defaultArr.length < 1,
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
        noData: data.dataArr.length < 1,
        sort: type,
      });
      console.log(data.dataArr, data.defaultArr);
    },
  },
  /**
   * 组件的生命周期列表
   */
  lifetimes: {
    attached() {
      this.init();
      this.timer = null;
    },
  },
});
