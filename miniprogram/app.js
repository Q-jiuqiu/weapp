//app.js
const appConfig = require("./public/appconfig");

App({
  // 注入全局配置
  appConfig: appConfig,

  onLaunch: function () {
    // 微信登录方法
    // this.login();

    if (!wx.cloud) {
      console.error("请使用 2.2.3 或以上的基础库以使用云能力");
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        env: "quling-wgzt3",
        traceUser: true,
      });
    }

    this.globalData = {};
  },
  login() {
    //封装成方法，方便在小程序其他页面调用
    console.log("进入登录-------");
    var that = this;
    wx.login({
      //微信官方登录方法
      fail: function (err) {
        console.log("login.fail", err);
      },
      complete: function (msg) {
        console.log("login.complete", msg);
      },
      success: function (loginInfo) {
        console.log("this.success", loginInfo);
        //登录成功，拿到第三方平台code
        //这里因为产品需求，调用了第三方平台的code,做了判断和保存
        that.globalData.loginInfo = loginInfo.code; //存取第三方平台code到公用数据字段
        if (wx.getExtConfig) {
          //第三方平台判断，具体不知道啥意思，API这么写的
          wx.getExtConfig({
            //确定第三方平台信息拿到，开始调用登录接口。
            success: function (res) {
              that.globalData.code = res.extConfig.code; //这个code是微信的code和第三方的code不一样。
              wx.request({
                //请求方式和参数，做过交互的一看就懂，不多BB
                url: that.globalData.server_root2 + "/v1/user/login",
                method: "POST",
                header: {
                  "content-type": "application/x-www-form-urlencoded",
                },
                data: {
                  wxcode: loginInfo.code,
                  code: res.extConfig.code,
                },
                success: function (result) {
                  //登录接口调用成功以后，会拿到两个参数
                  //1.用户的唯一标识（每个用户的唯一标识都不一样）
                  //2.sessionKey  ，每次登录的sessionKey 都不一样。

                  var userInfo = {
                    //这是我自己定义的一个对象，这里面的数据是根据微信获取用户信息的格式来定义的，方便做获取用户信息的时候，获取的数据存储位置统一。
                    //生日
                    birthday: result.data.data.birthday,
                    //性别 0未知 1男 2女
                    gender: result.data.data.gender,
                    //用户头像
                    head_photo: result.data.data.head_photo,
                    //用户微信昵称
                    nick_name: result.data.data.nick_name,
                    // 真实姓名
                    real_name: result.data.data.real_name,
                  };
                },
              });
            },
          });
        }
      },
    });
  },
});
