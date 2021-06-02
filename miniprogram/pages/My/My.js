import { getData, getDetail, getId } from "../../utils/event";
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
    isAdmin: false, // 判断是否是管理员身份
    avatarUrl: "",
    nickName: "",
    option: false,
    status: 2, // 用户身份
    formData: {
      username: { value: "", isError: false },
      password: { value: "", isError: false },
    },
    massage: {
      type: "",
      show: false,
      value: "",
    },
    error: "",
  },
  goToMyApply() {
    navigateTo({
      url: `/pages/MyApply/MyApply`,
      urlTitle: "我的申请",
    });
  },

  ongoing() {
    navigateTo({
      url: `/pages/orderDetail/orderDetail?current=${0}`,
      urlTitle: "进行中",
    });
  },
  complete() {
    navigateTo({
      url: `/pages/orderDetail/orderDetail?current=${1}`,
      urlTitle: "已完成",
    });
  },
  allOders() {
    navigateTo({
      url: `/pages/orderDetail/orderDetail?current=${2}`,
      urlTitle: "全部订单",
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let globalData = app.globalData;
    console.log(globalData);
    this.checkIsAdmin();
    this.timer = null;
    this.setData({
      avatarUrl: globalData.avatarUrl,
      nickName: globalData.nickName,
      status: globalData.status,
    });
    console.log("My", this.data);
  },
  // 切换身份
  switchIdentity() {
    let status = this.data.status;
    if (status == 2) {
      this.setData({
        option: true,
      });
    } else {
      this.setData({
        status: 2,
      });
      app.globalData.status = 2;
    }
  },
  // 判断是否是管理员
  checkIsAdmin() {
    let that = this;
    adminDB.where({ _openid: app.globalData.openId }).get({
      success({ data }) {
        debugger;
        if (data.length > 0) {
          that.setData({
            isAdmin: true,
          });
        }
      },
    });
  },
  // 返回首页
  goToIndex() {
    wx.reLaunch({
      url: "/pages/index/index",
      success: (result) => {},
      fail: () => {},
      complete: () => {},
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
        that.setData({
          [key]: value,
          [isError]: true,
        });
      }, 100);
    } else {
      this.Debounce(() => {
        that.setData({
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
        if (!formData[key].value || formData[key].isError) {
          flag = false;
        }
      }
    }
    return flag;
  },
  // 取消管理员登录
  CancelForm() {
    this.setData({
      option: false,
    });
  },
  // 提交登录
  SubmitForm() {
    let that = this;
    let formData = that.data.formData;
    let checkout = that.check();
    let openId = app.globalData.openId;
    if (checkout) {
      adminDB.where({ _openid: openId }).get({
        success({ data }) {
          console.log("data", data);
          if (
            data[0].password == formData.password.value &&
            data[0].name == formData.username.value
          ) {
            that.setData({
              massage: {
                type: "ok",
                show: false,
                value: "",
              },
              option: false,
              status: data[0].status,
            });
            app.globalData.status = data[0].status;
          } else {
            that.setData({
              error: "账号或密码错误",
            });
          }
        },
        fail(err) {
          console.log(err);
        },
      });
    } else {
      this.setData({
        error: "必填",
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
    }
    navigateTo({
      url,
      urlTitle: type,
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
