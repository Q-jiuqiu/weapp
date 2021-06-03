// miniprogram/pages/formSeries/formSeries.js
import { mailBoxDB } from "../../utils/DBcollection";
import redirectTo from "../../utils/redirectTo";
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    formData: {},
    error: "",
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},

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
  onUnload: function () {
    // 清除derail缓冲避免影响新建套系的页面
    wx.removeStorage({
      key: "detail",
    });
  },

  // 判断是否有店主已提交的记录
  check() {
    let openId = app.globalData.openId;
    // 根据openid查询
    mailBoxDB
      .where({
        openId,
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
  async saveNew(data) {
    let time = new Date();
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
        fail: () => {},
        complete: () => {},
      });
    } else {
      await mailBoxDB.add({
        data: {
          time,
          name: {
            value: data.detail.name.value,
            name: "姓名",
          },
          cover: {
            value: data.detail.cover.value,
            name: "头像",
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
      });
      redirectTo({ url: "/pages/index/index" });
    }
  },
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
