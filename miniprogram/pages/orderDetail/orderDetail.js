import navigateTo from "../../utils/navigateTo";
import { ordersDB } from "../../utils/DBcollection";
import { getData, getDetail } from "../../utils/event";
const app = getApp();
Page({
  data: {
    tabs: [{ title: "进行中" }, { title: "已完成" }, { title: "所有" }],
    current: 2,
    radioList: [],
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
    console.log(event);
    let current = getDetail(event).current || getData(event, "current");
    this.setData({
      current,
    });
  },
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
  },
  onTabClick(e) {
    console.log("onTabClick", e);
    // const index = e.detail.index;
    // this.setData({
    //   activeTab: index,
    // });
  },
  onChange(e) {
    console.log("onChange", e);
  },
  // 初始化数据
  initData() {
    let that = this;
    let openId = app.globalData.openId;
    ordersDB
      .where({
        _openid: openId,
        ok: false,
      })
      .get({
        success({ data }) {
          console.log("订单数据", data);
          that.setData({
            order: data,
          });
        },
      });
  },
  // 滑块点击事件
  slideButtonTap(e) {
    let _id = getData(e, "id");
    let index = e.detail.index;
    switch (index) {
      case 0:
        this.handleComplete(_id);
        break;
    }
  },
  // 完成订单
  handleComplete(_id) {
    ordersDB
      .doc(_id)
      .update({
        data: { ok: true },
      })
      .then((res) => {
        console.log(res);
        this.initData();
        wx.showToast({
          title: "订单已完成",
          icon: "success",
        });
      })
      .catch((res) => {
        console.log(res);
      });
    console.log("完成", _id);
  },
  // 删除订单
  delete(event) {
    let id = getData(event, "id");
    let openId = app.globalData.openId;
    let that = this;
    wx.showModal({
      title: "是否删除该订单订单",
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
              console.log(res);
              that.initData();
            },
          });
        }
      },
      fail: () => {},
      complete: () => {},
    });
  },
  // 订单详情
  detail(event) {
    let index = getData(event, "index");
    let data = JSON.stringify(this.data.order[index]);
    navigateTo({ url: `/pages/order/order?type=change&data=${data}` });
  },
});
