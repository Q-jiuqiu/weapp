import redirectTo from "../../utils/redirectTo";
import { mailBoxDB, mailDB } from "../../utils/DBcollection";
import { getData, getDetail } from "../../utils/event";
const app = getApp();
Page({
  data: {
    tabs: [{ title: "待审核" }, { title: "已审核" }],
    current: 0,
    radioList: [],
  },
  onLoad: function () {
    this.initData();
  },
  formatTime(Date) {
    console.log(Date);
    let year = Date.getFullYear();
    let mouth = Date.getMonth() + 1;
    let day = Date.getDate();
    let hours = Date.getHours();
    let minutes = Date.getMinutes();
    let seconds = Date.getSeconds();
    return `${year}-${mouth}-${day} ${hours}:${minutes}:${seconds}`;
  },
  async changeSwiper(event) {
    let current = getDetail(event).current || getData(event, "current");
    let DB = current ? mailDB : mailBoxDB;
    let openId = app.globalData.openId;
    let condition = current ? { applyId: openId } : { _openid: openId };
    let { data } = await DB.where(condition).get();
    data.forEach((item) => {
      item.time = this.formatTime(item.time);
    });
    this.setData({ order: data, current });
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
  async initData() {
    let openId = app.globalData.openId;
    let { data } = await mailBoxDB
      .where({
        _openid: openId,
      })
      .get();
    data.forEach((item) => {
      item.time = this.formatTime(item.time);
    });
    this.setData({ order: data });
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
    mailBoxDB
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
