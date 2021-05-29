import { getOrderById } from "../../utils/orderUtils";
import { getData, getId, getDetail } from "../../utils/event";
import { ordersDB, seriesDB } from "../../utils/DBcollection";
Page({
  data: {
    defaultChoose: [],
    tabs: [],
    activeTab: 0,
    checkBox: [
      { key: "所有", value: true },
      { key: "未完成", value: false },
      { key: "已完成", value: false },
    ],
    showLoading: true,
  },
  // 单选框
  radioChange(e) {
    let value = getDetail(e).value;
    let checkBox = this.data.checkBox;
    checkBox.forEach((item) => {
      if (item.key == value) {
        item.value = true;
      } else {
        item.value = false;
      }
    });
    this.setData({ checkBox: checkBox });
    switch (value) {
      case "所有":
        this.init();
        break;
      case "未完成":
        this.init(false);
        break;
      case "已完成":
        this.init(true);
        break;
    }
  },
  slideButtonTap(e) {
    console.log("slide button tap", e.detail);
  },
  //初始化-获取套系名称列表
  async init(condition) {
    this.setData({ showLoading: true });
    let { activeTab, tabs } = this.data;
    let server = tabs[activeTab].title;
    let { data } = await ordersDB
      .where({ ok: condition, server })
      .orderBy("serverTime", "desc")
      .get();
    tabs[activeTab].children = data;
    this.setData({ tabs, showLoading: false });
  },
  // 获取套系名称列表
  async getNameList() {
    let { data: dataArr } = await seriesDB.get();
    let tabs = [];
    dataArr.forEach((item) => {
      tabs.push({ title: item.seriesName });
    });
    this.setData({
      tabs,
    });
  },
  changeTabs(e) {
    let index = getDetail(e).index;
    let checkBox = this.data.checkBox;
    // 初始化单选框
    checkBox.forEach((item, index) => {
      if (index == 0) {
        item.value = true;
      } else {
        item.value = false;
      }
    });
    this.init();
    this.setData({ checkBox, activeTab: index });
  },
  // 改变面板
  change(event) {
    let index = getData(event, "index");
    let defaultChoose = this.data.defaultChoose;
    let indexOf = defaultChoose.indexOf(index);
    let photographyType = this.data.photographyType;
    let id = photographyType[index].id;
    if (indexOf > -1) {
      defaultChoose.splice(indexOf, 1);
    } else {
      getOrderById(this, id, index, false);
      defaultChoose.push(index);
    }
    this.setData({
      defaultChoose,
    });
  },
  // 改变查看子项
  choosePage(event) {
    let type = getId(event);
    let index = getData(event, "index");
    let photographyType = this.data.photographyType;
    let id = photographyType[index].id;
    if (type == "no") {
      photographyType[index].no = true;
      getOrderById(this, id, index, false);
    } else {
      photographyType[index].no = false;
      getOrderById(this, id, index, true);
    }
    this.setData({
      photographyType,
    });
  },
  async onLoad() {
    // 生命周期函数--监听页面加载
    await this.getNameList();
    await this.init();
  },
  onReady: function () {
    // 生命周期函数--监听页面初次渲染完成
  },
  onShow: function () {
    // 生命周期函数--监听页面显示
  },
  onHide: function () {
    // 生命周期函数--监听页面隐藏
  },
  onUnload: function () {
    // 生命周期函数--监听页面卸载
  },
  onPullDownRefresh: function () {
    // 页面相关事件处理函数--监听用户下拉动作
  },
  onReachBottom: function () {
    // 页面上拉触底事件的处理函数
  },
  onShareAppMessage: function () {
    // 用户点击右上角分享
    return {
      title: "title", // 分享标题
      desc: "desc", // 分享描述
      path: "path", // 分享路径
    };
  },
});
