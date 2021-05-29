import redirectTo from "../../utils/redirectTo";
import { ordersDB } from "../../utils/DBcollection";
import { getData, getDetail } from "../../utils/event";
const app = getApp();
Page({
  options: {
    styleIsolation: "shared", // 用于WeUI中ext-class的样式穿透
  },
  data: {
    tabs: [{ title: "进行中" }, { title: "已完成" }, { title: "所有" }],
    current: 0,
    radioList: [],
    all: false,
    showLoading: true,
  },
  onLoad: function (data) {
    this.setData({
      current: data.current * 1,
      slideButtons: [
        {
          text: "完成",
          extClass: "complete",
        },
        {
          text: "详情",
          extClass: "detail",
        },
        {
          type: "warn",
          text: "删除",
        },
      ],
    });
    this.initData();
  },
  changeSwiper(event) {
    // 滑动或者点击tab
    let detail = getDetail(event).current;
    let current;
    if (detail != undefined) {
      current = detail;
    } else {
      current = getData(event, "current");
    }
    if (current != undefined) {
      this.setData({
        current,
        // 清空checkbox相关
        all: false,
        radioList: [],
      });
      this.initData();
    }
  },
  // 点击全选按钮
  chooseAll() {
    let all = !this.data.all,
      radioList = [];
    let { order } = this.data;
    this.setData({ all });
    if (all) {
      if (order && order.length > 0) {
        order.forEach((item, index) => {
          radioList.push(index);
        });
      }
    }
    this.setData({ radioList });
  },
  // 阻止冒泡事件
  chooseCheckBox(event) {
    let index = getData(event, "index");
    let { radioList } = this.data;
    let indexOf = radioList.indexOf(index);
    if (indexOf > -1) {
      radioList.splice(indexOf, 1);
    } else {
      radioList.push(index);
    }
    this.setData({ radioList });
    console.log(this.data.radioList);
    this.isCheckAll(radioList);
  },
  // CheckBox是否全选
  isCheckAll(radioList) {
    let order = this.data.order;
    let all = false;
    if (order.length == radioList.length) {
      all = true;
    }
    this.setData({ all });
  },
  // 批量删除
  async deleteMore() {
    let { radioList, order } = this.data;
    let openId = app.globalData.openId;
    if (radioList && radioList.length > 0) {
      await wx.showModal({
        title: "是否删除这些订单",
        showCancel: true,
        cancelText: "取消",
        cancelColor: "#000000",
        confirmText: "确定",
        confirmColor: "#3CC51F",
        success: (result) => {
          if (result.confirm) {
            for (let i = 0; i < radioList.length; i++) {
              console.log(radioList[i]);
              ordersDB
                .where({ _id: order[radioList[i]]._id, _openid: openId })
                .remove();
              this.initData();
              this.setData({ all: false });
            }
            this.setData({ radioList: [] });
          }
        },
      });
    }
  },
  async handleDeleteMore() {},
  // 批量完成
  async completeMore() {
    let { radioList, order } = this.data;
    if (radioList && radioList.length > 0) {
      let openId = app.globalData.openId;
      for (let i = 0; i < radioList.length; i++) {
        console.log(radioList[i]);
        await ordersDB
          .where({ _id: order[radioList[i]]._id, _openid: openId })
          .update({
            data: {
              ok: true,
            },
          });
        this.initData();
        this.setData({ all: false });
      }
      this.setData({ radioList: [] });
    }
  },
  onTabClick(e) {
    console.log("onTabClick", e);
  },
  onChange(e) {
    console.log("onChange", e);
  },
  // 初始化数据
  async initData() {
    let openId = app.globalData.openId;
    let current = this.data.current;
    let condition = {},
      that = this;
    that.setData({
      showLoading: true,
    });
    switch (current) {
      case 0:
        condition = { _openid: openId, ok: false };
        break;
      case 1:
        condition = { _openid: openId, ok: true };
        break;
      default:
        condition = { _openid: openId };
    }
    await wx.cloud.callFunction({
      name: "lookUp",
      data: { condition },
      success: ({ result: { list } }) => {
        that.setData({
          order: list,
          showLoading: false,
        });
      },
      fail: (err) => {
        console.error("[云函数] [login] 调用失败", err);
      },
    });
  },
  // 删除订单
  delete(event) {
    let id = getData(event, "id");
    let openId = app.globalData.openId;
    let that = this;
    wx.showModal({
      title: "是否删除该订单",
      content: "删除该订单默认为取消预约",
      showCancel: true,
      cancelText: "取消",
      cancelColor: "#000000",
      confirmText: "确定",
      confirmColor: "#3CC51F",
      success: (result) => {
        if (result.confirm) {
          ordersDB.where({ _id: id, _openid: openId }).remove({
            success(res) {
              that.initData();
            },
          });
        }
      },
      fail: () => {},
      complete: () => {},
    });
  },
  // 完成订单
  async complete(event) {
    let id = getData(event, "id");
    let openId = app.globalData.openId;
    let that = this;
    let res = await ordersDB.where({ _id: id, _openid: openId }).update({
      data: {
        ok: true,
      },
    });
    this.initData();
    console.log(res);
  },
  // 订单详情
  detail(event) {
    let index = getData(event, "index");
    let data = JSON.stringify(this.data.order[index]);
    redirectTo({ url: `/pages/order/order?type=change&data=${data}` });
  },
});
