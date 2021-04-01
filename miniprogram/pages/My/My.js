import { getData, getDetail, getId } from "../../utils/event";
import { adminDB } from "../../utils/DBcollection"
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
    avatarUrl: "",
    nickName: "",
    option: true,
    formData: {
      username: { value: "", isError: false },
      password: { value: "", isError: false },
    },
    massage: {
      type: "",
      show: false,
      value: "",
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let globalData = app.globalData;
    console.log(globalData);
    this.timer = null;
    this.setData({
      isAdmin: globalData.isAdmin,
      avatarUrl: globalData.avatarUrl,
      nickName: globalData.nickName,
    });
  },
  // 防抖函数
  Debounce(fn, time) {
    clearTimeout(this.timer);
    this.timer = setTimeout(fn, time);
  },
  // 文本框输入
  inputDebounce(event) {
    let that = this;
    let value = getDetail(event).value;
    let type = getId(event);
    let key = `formData.${type}.value`;
    let isError = `formData.${type}.isError`;
    if (value.length == 0) {
      this.Debounce(() => {
        that.upData({
          [key]: value,
          [isError]: true,
        });
      }, 100);
    } else {
      this.Debounce(() => {
        that.upData({
          [key]: value,
          [isError]: false,
        });
      }, 100);
    }
  },
  // 检验登录表单
  check() {
    let formData = this.data.formData;
    let flag = true;
    for (const key in formData) {
      if (Object.hasOwnProperty.call(formData, key)) {
        console.log(formData[key].value, formData[key].isError);
        if (!formData[key].value || formData[key].isError) {
          flag = false;
        }
      }
    }
    return flag;
  },
  // 提交登录
  SubmitForm() {
    let checkout = this.check();
    console.log(this.data.formData);
    if (checkout) {
      adminDB.get({
        success(res) {
          console.log(res);
        },
        fail(err) {
          console.log(err);
        }
      })
    } else {
      this.upData({
        massage: {
          show: true,
          type: "error",
          value: "请必填哦!",
        },
      });
    }
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
  onUnload: function () { },

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
