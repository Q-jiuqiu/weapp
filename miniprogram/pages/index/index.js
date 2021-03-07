//index.js
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
    // tab切换
    currentTab: 0,
  },
  getmyinfo(e) {
    console.log(e.detail.userInfo);
    let info = e.detail.userInfo.nickName;
    this.setData({
      name: info,
      src: e.detail.userInfo.avatarUrl,
    });
  },
  changeType(event) {
    let index = event.currentTarget.dataset.index;
    this.setData({
      currentPage: index,
    });
  },

  goToMy() {
    wx.navigateTo({
      url: "/pages/My/My",
      success: function (res) {
        // success
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
   * 点击切换一级页面
   */
  swichNav(e) {
    let index = e.target.dataset.index;
    if (this.data.currentTab === index) {
      return false;
    } else {
      this.setData({
        currentTab: index,
      });
    }
  },

  // handleChangeScroll({ detail }) {
  //   this.setData({
  //     current_scroll: detail.key,
  //   });
  // },
  //获取用户手机号
  getPhoneNumber: function (e) {
    console.log(e)
    let that = this;
    //判断用户是否授权确认
    if (!e.detail.errMsg || e.detail.errMsg != "getPhoneNumber:ok") {
      wx.showToast({
        title: '获取手机号失败',
        icon: 'none'
      })
      return;
    }
    wx.showLoading({
      title: '获取手机号中...',
    })
    wx.login({
      success(re) {
        console.log(re)
        wx.cloud.callFunction({
          name: 'regist', // 对应云函数名
          data: {
            $url: "phone", //云函数路由参数
            encryptedData: e.detail.encryptedData,
            iv: e.detail.iv,
            code: re.code
          },
          success: res => {
            console.log(res);
            wx.hideLoading();
            if (res.result == null) {
              wx.showToast({
                title: '获取失败,请重新获取',
                icon: 'none',
                duration: 2000
              })
              return false;
            }
            //获取成功，设置手机号码
            that.setData({
              phone: res.result.decrypt2.phoneNumber
            })
          },
          fail: err => {
            console.error(err);
            wx.hideLoading()
            wx.showToast({
              title: '获取失败,请重新获取',
              icon: 'none',
              duration: 2000
            })
          }
        })
      },
      fail: err => {
        console.error(err);
        wx.hideLoading()
        wx.showToast({
          title: '获取失败,请重新获取',
          icon: 'none',
          duration: 2000
        })
      }
    })
  },

  onLoad: function () {
    // console.log(app.appConfig);
    this.setData({
      logo: app.appConfig.logo,
      photographBusiness: app.appConfig.photographBusiness,
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
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: (res) => {
              console.log("用户信息", res);
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo,
              });
            },
          });
        }
      },
    });
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