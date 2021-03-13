// miniprogram/pages/detail/detail.js
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    loadingHidden: false,
    list: [],
    cover: "",
    description: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    const eventChannel = this.getOpenerEventChannel();
    // eventChannel.emit("acceptDataFromOpenedPage", { data: "test" });
    // eventChannel.emit("someEvent", { data: "test" });
    // 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
    eventChannel.on("acceptDataFromOpenerPage", (data) => {
      // console.log(data, app.appConfig[data.data]);
      console.log(data);
      this.setData({
        list: app.appConfig[data.name].imgArr,
        description: app.appConfig[data.name].description,
        cover: data.cover,
      });
      console.log(this.data.list);
    });
  },

  // 跳转到订单页
  goToOrder() {
    wx.navigateTo({
      url: "/pages/order/order",
      success: function (res) {
        wx.setNavigationBarTitle({
          title: "预约",
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

  // 分享页面
  share(event) {
    console.log(event);
    // let link = event.webViewUrl.split("?");
    // let url = encodeURIComponent(event.webViewUrl);
    // console.log(link, url);
  },
  onShareAppMessage: function () {
    console.log("转发");
  },
  onShareTimeline() {
    console.log("转发朋友圈");
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
