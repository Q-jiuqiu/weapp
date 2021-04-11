//index.js
import { getData, getDetail } from "../../utils/event";
import { userDB } from "../../utils/DBcollection";

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
    dialogShow: false,
    showOneButtonDialog: false,
    buttons: [{ text: "取消" }, { text: "确定" }],
  },
  openConfirm: function () {
    this.setData({
      dialogShow: true,
    });
  },
  tapDialogButton(e) {
    console.log(e);
    let item = getDetail(e).item;
    if (item.text === "确定") {
      this.getUserInfo();
    }
    this.setData({
      dialogShow: false,
    });
  },
  getUserInfo() {
    wx.getUserProfile({
      desc: "正在获取", //不写不弹提示框
      success: function (res) {
        console.log("用户授权", res);
        app.globalData.nickName = res.userInfo.nickName;
        app.globalData.avatarUrl = res.userInfo.avatarUrl;
        userDB.add({
          data: {
            nickName: app.globalData.nickName,
            avatarUrl: app.globalData.avatarUrl,
          },
        });
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
      },
      fail: function (err) {
        console.log("获取失败: ", err);
      },
    });
  },
  getMyInfo(e) {
    let that = this;
    // that.getUserInfo();
    userDB
      .where({
        _openid: app.globalData.openId,
      })
      .get({
        success(res) {
          console.log(res);
          if (res.data.length == 0) {
            that.setData({
              dialogShow: true,
            });
          } else {
            app.globalData.avatarUrl = res.data[0].avatarUrl;
            app.globalData.nickName = res.data[0].nickName;
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
      });
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
  // 定义调用云函数获取openid
  getOpenId() {
    let page = this;
    wx.cloud.callFunction({
      name: "login",
      complete: (res) => {
        app.globalData.openId = res.result.openid;
      },
    });
  },

  onLoad() {
    this.getOpenId();
    this.setData({
      logo: app.appConfig.logo,
      photographBusiness: app.appConfig.photographBusiness,
      shopInfo: app.appConfig.shopInfo,
    });
    if (!wx.cloud) {
      wx.redirectTo({
        url: "../chooseLib/chooseLib",
      });
      return;
    }
    // 获取用户信息
    wx.getSetting({
      success: (res) => {
        if (res.authSetting["scope.userInfo"]) {
          wx.getUserProfile({
            desc: "正在获取", //不写不弹提示框
            success: function (res) {
              console.log("用户授权");
              app.globalData.nickName = res.userInfo.nickName;
              app.globalData.avatarUrl = res.userInfo.avatarUrl;
              app.globalData.status = 2; // 用户进入首页默认是用户身份
            },
            fail: function (err) {
              console.log("获取失败: ", err);
            },
          });
        }
      },
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
    console.log(app.globalData);
  },

  onGetUserInfo: function (e) {
    if (!this.data.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo,
      });
    }
  },

  onGetOpenid: function () {
    // 调用云函数
    wx.cloud.callFunction({
      name: "login",
      data: {},
      success: (res) => {
        console.log("[云函数] [login] user openid: ", res.result.openid);
        app.globalData.openid = res.result.openid;
        wx.navigateTo({
          url: "../userConsole/userConsole",
        });
      },
      fail: (err) => {
        console.error("[云函数] [login] 调用失败", err);
        wx.navigateTo({
          url: "../deployFunctions/deployFunctions",
        });
      },
    });
  },

  // 上传图片
  doUpload: function () {
    // 选择图片
    wx.chooseImage({
      count: 1,
      sizeType: ["compressed"],
      sourceType: ["album", "camera"],
      success: function (res) {
        wx.showLoading({
          title: "上传中",
        });

        const filePath = res.tempFilePaths[0];

        // 上传图片
        const cloudPath = `my-image${filePath.match(/\.[^.]+?$/)[0]}`;
        wx.cloud.uploadFile({
          cloudPath,
          filePath,
          success: (res) => {
            console.log("[上传文件] 成功：", res);

            app.globalData.fileID = res.fileID;
            app.globalData.cloudPath = cloudPath;
            app.globalData.imagePath = filePath;

            wx.navigateTo({
              url: "../storageConsole/storageConsole",
            });
          },
          fail: (e) => {
            console.error("[上传文件] 失败：", e);
            wx.showToast({
              icon: "none",
              title: "上传失败",
            });
          },
          complete: () => {
            wx.hideLoading();
          },
        });
      },
      fail: (e) => {
        console.error(e);
      },
    });
  },
});
