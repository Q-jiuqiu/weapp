import { getDetail } from "../../utils/event";
import { offDayDB } from "../../utils/DBcollection";
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
  },
  // radio改变
  radioChange(event) {
    this.setData({
      type: getDetail(event).value,
    });
  },

  // 获取不营业的时间
  getoffDay(event) {
    this.setData({
      offDay: getDetail(event),
    });
  },
  // 保存
  save() {
    let offDay = this.data.offDay;
    console.log(offDay);
    offDayDB
      .get()
      .then((res) => {
        console.log(res);
        // 如果数据库为空
        if (res.data.length == 0) {
          offDayDB
            .add({
              data: {
                offDay,
              },
            })
            .then((res) => {
              console.log(res);
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          offDayDB
            .doc(res.data[0]._id)
            .update({
              data: {
                offDay,
              },
            })
            .then((res) => {
              console.log(res);
            })
            .catch((err) => {
              console.log(err);
            });
        }
        wx.showToast({
          title: "保存成果",
        });
      })
      .catch((err) => {
        console.log(err);
      });
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
