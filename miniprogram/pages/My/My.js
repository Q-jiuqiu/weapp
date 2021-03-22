import { getData } from "../../utils/event";
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
    isAdmin: false,
    avatarUrl: app.globalData.avatarUrl,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let globalData = app.globalData;
    this.setData({
      isAdmin: globalData.isAdmin,
      avatarUrl: globalData.avatarUrl,
    });
  },

  // 页面跳转
  navigate(event) {
    console.log(event);
    let type = getData(event, "name");
    let url = "";
    switch (type) {
      case "套系管理":
        url = "/pages/adminSeries/adminSeries";
        break;
      case "店员管理":
        url = "/pages/administrator/administrator";
        break;
      case "订单管理":
        url = "/pages/adminBusiness/adminBusiness";
        break;
      case "营业时间管理":
        url = "/pages/adminTime/adminTime";
        break;
      // case "clerk":
      //   break;
      // case "clerk":
      //   break;
      // case "clerk":
      //   break;
    }
    wx.navigateTo({
      url: url,
      success: function (res) {
        wx.setNavigationBarTitle({
          title: type,
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
