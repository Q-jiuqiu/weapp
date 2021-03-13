const app = getApp();

// miniprogram/pages/series/series.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    info: null,
    isShow: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.setData({
      info: app.globalData.seriesDate,
    });
    console.log(this.data.info);
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
  // 回到主页
  goToIndex() {
    wx.navigateTo({
      url: "/pages/index/index",
      success: function (res) {
        wx.setNavigationBarTitle({
          title: "拾亿摄影馆",
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
  // 跳转到订单页
  goToOder() {
    wx.navigateTo({
      url: "/pages/order/order",
      success(res) {
        // 改变小程页面标题
        wx.setNavigationBarTitle({
          title: "预约",
        });
      },
      fail() {
        // fail
      },
      complete() {
        // complete
      },
    });
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
