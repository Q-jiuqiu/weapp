import { getDetail } from "../../utils/event";
import { offDayDB } from "../../utils/DBcollection";
import redirectTo from "../../utils/redirectTo";
const app = getApp();

// pages/aboutMe/aboutMe.js
Page({
  data: {
    noWorkDay: [0],
    noWorkDayValue: [
      {
        year: "",
        month: "",
        day: "",
        yearError: false,
        monthError: false,
        dayError: false,
      },
    ],
    type: "all",
    error: "",
  },
  // radio改变
  radioChange(event) {
    this.setData({
      type: getDetail(event).value,
    });
  },

  // 获取不营业的时间
  async getoffDay(event) {
    let offDay = getDetail(event);
    this.setData({
      offDay,
    });
  },
  // 保存
  async save() {
    let offDay = this.data.offDay;
    console.log(offDay);
    if (offDay) {
      let { data } = await offDayDB.get();
      if (data.length == 0) {
        await offDayDB.add({
          data: {
            offDay,
          },
        });
      } else {
        await offDayDB.doc(data[0]._id).update({
          data: {
            offDay,
          },
        });
      }
    }
    redirectTo({ url: "/pages/My/My", urlTitle: "我的" });
  },

  // },
  onLoad: function (options) {
    // 生命周期函数--监听页面加载
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
  onShareAppMessage: function () {},
});
