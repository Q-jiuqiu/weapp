import { getSeries, getOrderById } from "../../utils/orderUtils";
import { getData, getId } from "../../utils/event";
Page({
  data: {
    defaultChoose: [],
  },
  //初始化-获取套系名称列表
  init() {
    getSeries(this);
    console.log(this.data);
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
  onLoad: function (options) {
    // 生命周期函数--监听页面加载
    this.init();
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
