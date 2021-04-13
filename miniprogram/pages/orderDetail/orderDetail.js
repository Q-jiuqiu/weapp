import navigateTo from "../../utils/navigateTo";
import { ordersDB } from "../../utils/DBcollection";
import { getData } from "../../utils/event";
const app = getApp();
Page({
  onLoad: function () {
    this.initData();
    this.setData({
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
  },
  // 初始化数据
  initData() {
    let that = this;
    let openid = app.globalData.openid;
    ordersDB
      .where({
        _openid: openid,
        ok: false,
      })
      .get({
        success({ data }) {
          console.log(data);
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
});
