import { seriesDB } from "../../utils/DBcollection";
import { getData } from "../../utils/event";
const app = getApp();

// pages/SetMeal/SetMeal.js
Component({
  options: {
    addGlobalClass: true,
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
    currentIndex: null,
    nameList: [],
    defaultArr: [],
    sort: "default",
    isSearch: false,
    formData: {},
    selectList: [],
    warningTop: false,
    warningLow: false,
    isDisabled: false,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    searchId(id) {
      let that = this;
      if (id != "all") {
        seriesDB
          .where({
            _id: id,
          })
          .get({
            success(res) {
              that.setData({
                dataArr: res.data,
              });
            },
            fail(err) {
              console.log(err);
            },
          });
      } else {
        this.init();
      }
    },
    init() {
      let data = this.data;
      seriesDB
        .get()
        .then((res) => {
          console.log("套系数据", res);
          // res.data.forEach((item) => {
          //   console.log(item.cover);
          // });
          this.setData({
            dataArr: res.data,
            defaultArr: JSON.parse(JSON.stringify(res.data)), //深拷贝,用于默认排序
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
      console.log("重置表单");
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
    // 提交表单
    submit() {
      let formData = this.data.formData;
      seriesDB
        .where({
          // seriesName: "形象照",
          // in不是区间查询,是是否包含
          // price: this.db.command.in([123, 455]),

          price: this.db.command.lt(25).and(this.db.command.gt(100)),
          _openid: "oFovG5NM5zvLoRHFpN54z3IpVdd0",
        })
        .get()
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 使用热门搜索时提示
    InputValue() {
      console.log("input");
    },
    // 跳转到套系详情
    goToSeries(event) {
      let index = getData(event, "index");
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
      this.init();
      this.timer = null;
    },
  },
});
