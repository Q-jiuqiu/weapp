//index.js
import { getData, getDetail } from "../../utils/event";
import { userDB } from "../../utils/DBcollection";
import getUserInfo from "../../utils/getUserInfo";

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
      getUserInfo({ url: "/pages/My/My", urlTitle: "我的" });
      app.globalData.isUser = true;
    } else {
      wx.navigateTo({
        url: "/pages/My/My",
        success: function (res) {
          wx.setNavigationBarTitle({
            title: "我的",
          });
        },
        fail: function () {
          // fail
        },
        complete: function () {
          // complete
        },
      });
    }
  },
  changeType(event) {
    let index = getData(event, "index");
    this.setData({
      currentPage: index,
    });
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

  // onGetUserInfo: function (e) {
  //   if (!this.data.logged && e.detail.userInfo) {
  //     this.setData({
  //       logged: true,
  //       avatarUrl: e.detail.userInfo.avatarUrl,
  //       userInfo: e.detail.userInfo,
  //     });
  //   }
  // },

  // onGetOpenid: function () {
  //   // 调用云函数
  //   wx.cloud.callFunction({
  //     name: "login",
  //     data: {},
  //     success: (res) => {
  //       console.log("[云函数] [login] user openId: ", res.result.openId);
  //       app.globalData.openId = res.result.openId;
  //       wx.navigateTo({
  //         url: "../userConsole/userConsole",
  //       });
  //     },
  //     fail: (err) => {
  //       console.error("[云函数] [login] 调用失败", err);
  //       wx.navigateTo({
  //         url: "../deployFunctions/deployFunctions",
  //       });
  //     },
  //   });
  // },

  // // 上传图片
  // doUpload: function () {
  //   // 选择图片
  //   wx.chooseImage({
  //     count: 1,
  //     sizeType: ["compressed"],
  //     sourceType: ["album", "camera"],
  //     success: function (res) {
  //       wx.showLoading({
  //         title: "上传中",
  //       });

  //       const filePath = res.tempFilePaths[0];

  //       // 上传图片
  //       const cloudPath = `my-image${filePath.match(/\.[^.]+?$/)[0]}`;
  //       wx.cloud.uploadFile({
  //         cloudPath,
  //         filePath,
  //         success: (res) => {
  //           console.log("[上传文件] 成功：", res);

  //           app.globalData.fileID = res.fileID;
  //           app.globalData.cloudPath = cloudPath;
  //           app.globalData.imagePath = filePath;

  //           wx.navigateTo({
  //             url: "../storageConsole/storageConsole",
  //           });
  //         },
  //         fail: (e) => {
  //           console.error("[上传文件] 失败：", e);
  //           wx.showToast({
  //             icon: "none",
  //             title: "上传失败",
  //           });
  //         },
  //         complete: () => {
  //           wx.hideLoading();
  //         },
  //       });
  //     },
  //     fail: (e) => {
  //       console.error(e);
  //     },
  //   });
  // },
});
