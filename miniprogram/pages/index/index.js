//index.js
import { getData, getDetail } from "../../utils/event";
import { userDB } from "../../utils/DBcollection";
import getUserInfo from "../../utils/getUserInfo";
import redirectTo from "../../utils/redirectTo";

const app = getApp();

Page({
  data: {
    src: "./user-unlogin.png",
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: "",
    current: "homepage",
    currentPage: 0, //当前摄影类型页
    logo: "",
    photographBusiness: "", // 摄影业务列表
    name: "",
    isShow: true,
    // tab切换
    currentTab: 0,
    searchId: "",
    isShowTips: true,
  },
  getMyInfo(e) {
    let isUser = app.globalData.isUser;
    if (!isUser) {
      // 用户授权登录
      getUserInfo({
        url: "/pages/My/My",
        urlTitle: "我的",
      });
    } else {
      redirectTo({ url: "/pages/My/My", urlTitle: "我的" });
    }
  },
  // 隐藏下拉框
  noneDropdown() {
    this.setData({
      isShow: false,
    });
  },

  //子组件向父组件传值
  seriesList(data) {
    let nameList = data.detail;
    this.setData({
      nameList,
    });
  },

  // 显示指定内容
  search(event) {
    let searchId = getData(event, "id");
    this.setData({
      searchId,
    });
    // 父组件触发子组件事件
    this.selectComponent("#SetMeal").searchId(searchId);
  },
  /**
   * 点击切换一级页面
   */
  swichNav(e) {
    let index = e.target.dataset.index;
    this.setData({
      currentTab: index,
    });
    this.isHomeAndAbout();
  },
  // 主页和关于隐藏下拉框
  isHomeAndAbout() {
    let data = this.data;
    let title = data.photographBusiness[data.currentTab].title;
    if (title === "主页" || title === "关于") {
      this.noneDropdown();
    } else {
      this.setData({
        isShow: true,
      });
    }
  },
  // 判断用户是否第一次授权
  initUserInfo() {
    let that = this;
    userDB
      .where({
        _openid: app.globalData.openId,
      })
      .get({
        success({ data }) {
          if (data.length == 0) {
            app.globalData.isUser = false;
          } else {
            app.globalData.isUser = true;
            app.globalData.nickName = data[0].nickName;
            app.globalData.avatarUrl = data[0].avatarUrl;
          }
        },
      });
  },

  onLoad() {
    this.initUserInfo();
    this.setData({
      logo: app.appConfig.logo,
      photographBusiness: app.appConfig.photographBusiness,
      shopInfo: app.appConfig.shopInfo,
    });
    if (app.globalData.indexPage) {
      this.setData({
        currentTab: app.globalData.indexPage,
      });
      wx.showToast({
        title: "申请成功待确定",
        duration: 1000,
      });
    }
  },
});
