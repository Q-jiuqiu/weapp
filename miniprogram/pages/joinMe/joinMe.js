// miniprogram/pages/formSeries/formSeries.js
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    formData: {},
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) { },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () { },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () { },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () { },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    // 清除derail缓冲避免影响新建套系的页面
    wx.removeStorage({
      key: "detail",
    });
  },

  // 判断是否有店主已提交的记录
  check() {
    let openid = app.globalData.openid;
    // 根据openid查询
    this.mailBoxDB
      .where({
        openid,
      })
      .get()
      .then((res) => {
        console.log(res);
        if (res.data.length > 0) {
          return true;
        }
      })
      .catch((err) => {
        console.log(err);
      });
    return false;
  },

  // 保存
  saveNew(data) {
    console.log(data);
    this.db = wx.cloud.database();
    this.mailBoxDB = this.db.collection("mailBox");
    let flag = this.check();
    if (flag) {
      wx.showModal({
        title: "",
        content: "已提交待店长审核",
        showCancel: true,
        cancelText: "取消",
        cancelColor: "#000000",
        confirmText: "确定",
        confirmColor: "#3CC51F",
        success: (result) => {
          if (result.confirm) {
          }
        },
        fail: () => { },
        complete: () => { },
      });
    } else {
      this.mailBoxDB
        .add({
          data: {
            name: {
              value: data.detail.name.value,
              name: "姓名",
            },
            content: [
              {
                value: data.detail.sex.value,
                name: "性别",
              },
              {
                value: data.detail.tel.value,
                name: "电话",
              },
              {
                value: data.detail.idNum.value,
                name: "身份证号码",
              },
            ],
          },
        })
        .then((res) => {
          wx.navigateTo({
            url: "/pages/index/index",
            success: function (res) {
              // success
              app.globalData.indexPage = 2; //主页路由默认为当前也
            },
            fail: function () {
              // fail
            },
            complete: function () {
              // complete
            },
          });
        })
        .catch((err) => {
          console.log(err);
          return;
        });
    }
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () { },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () { },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () { },
});
