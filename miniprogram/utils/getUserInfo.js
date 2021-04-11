import { userDB } from "./DBcollection";
const app = getApp();
export default function getUserInfo({ url, urlTitle }) {
  wx.getUserProfile({
    desc: "正在获取", //不写不弹提示框
    success: function (res) {
      app.globalData.nickName = res.userInfo.nickName;
      app.globalData.avatarUrl = res.userInfo.avatarUrl;
      userDB.add({
        data: {
          nickName: app.globalData.nickName,
          avatarUrl: app.globalData.avatarUrl,
        },
      });
      wx.navigateTo({
        url,
        success: function (res) {
          wx.setNavigationBarTitle({
            title: urlTitle,
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
}
