import { getData } from "../../utils/event";
import redirectTo from "../../utils/redirectTo";
const app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    info: null,
    isShow: false,
    isCollect: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(data) {
    let info = "";
    if (JSON.stringify(data) != "{}") {
      info = JSON.parse(data.info);
    }
    this.setData({
      info: info || app.globalData.seriesDate,
      shopInfo: app.appConfig.shopInfo,
    });
    this.data.info;
  },
  // 收藏提示消失
  showCollect() {
    this.setData({
      isCollect: false,
    });
  },
  // 收藏提示出现
  like() {
    this.setData({
      isCollect: true,
    });
  },
  // 查看详情
  more() {
    console.log("more");
    this.setData({
      isShow: true,
    });
  },
  // 关闭详情
  close() {
    console.log("more");
    this.setData({
      isShow: false,
    });
  },
  // 点击复制号码
  copyText(e) {
    console.log(e);
    wx.setClipboardData({
      data: getData(e, num),
      success: function (res) {
        wx.getClipboardData({
          success: function (res) {
            wx.showToast({
              title: "复制成功",
            });
          },
        });
      },
    });
  },
  // 回到主页
  goToIndex() {
    redirectTo({ url: "/pages/index/index", urlTitle: app.appConfig.shopName });
  },
  // 跳转到订单页
  goToOder() {
    redirectTo({ url: "/pages/order/order", urlTitle: "预约" });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
});
