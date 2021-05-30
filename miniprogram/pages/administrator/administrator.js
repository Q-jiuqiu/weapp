import { getData } from "../../utils/event";
import { adminDB } from "../../utils/DBcollection";
import redirectTo from "../../utils/redirectTo";
import navigateTo from "../../utils/navigateTo";
const app = getApp();
// miniprogram/pages/My/My.js
Page({
  options: {
    addGlobalClass: true,
  },
  /**
   * 页面的初始数据
   */
  data: {
    toolList: [{ title: "收信箱", icon: "icon-jia" }],
    list: [],
    current: 1,
    total: 0,
    showLoading: true,
  },

  // 删除
  delete(event) {
    let index = getData(event, "index");
    let data = this.data.list[index];
    wx.showModal({
      title: `确认删除"${data.name}"店员`,
      content: "他/她将失去管理员权限",
      showCancel: true,
      cancelText: "取消",
      cancelColor: "#000000",
      confirmText: "确定",
      confirmColor: "#3CC51F",
      success: (result) => {
        if (result.confirm) {
          adminDB
            .doc(data._id)
            .remove()
            .then((res) => {
              this.init();
              wx.showToast({
                title: "删除成功",
                icon: "success",
              });
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          return;
        }
      },
      fail: () => {},
      complete: () => {},
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 获取管理员admin数据
    // this.init();
  },
  //回到顶部
  goTop() {
    // 一键回到顶部
    if (wx.pageScrollTo) {
      wx.pageScrollTo({
        scrollTop: 0,
      });
    }
  },
  // 获取分页组件的当前页
  changePage(data) {
    let now = this.data.current;
    let current = data.detail;
    if (now == current) {
      return;
    }
    this.setData({
      current,
    });
    this.goTop();
    this.init();
  },
  // 获取数据库总条数用于分页查询
  getTotal() {
    let that = this;
    adminDB.count({
      success(res) {
        let page = Math.ceil(res.total / 10);
        let isRight = page > 1 ? false : true;
        that.setData({
          total: res.total,
          page,
          isRight,
        });
      },
    });
  },
  async init() {
    this.setData({ showLoading: true });
    let that = this;
    let current = that.data.current,
      count = 10;
    this.getTotal();
    let { data } = await adminDB
      .skip((current - 1) * count)
      .limit(current * count)
      .get();
    this.setData({ list: data, showLoading: false });
  },
  // 处理管理员工具栏点击事件
  handleClick(data) {
    console.log("管理员功能", data);
    if (data.detail === "收信箱") {
      navigateTo({ url: "/pages/mailBox/mailBox" });
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log(1);
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    //  页面显示获取/更新数据
    this.init();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log(3);
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log(4);
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    // 下拉刷新
    this.init();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
});
