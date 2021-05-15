import { userDB } from "./DBcollection";
const app = getApp();
export default function getUserInfo({ url, urlTitle }) {
  wx.getUserProfile({
    desc: "正在获取", //不写不弹提示框
    success: function (res) {
      app.globalData.nickName = res.userInfo.nickName;
      app.globalData.avatarUrl = res.userInfo.avatarUrl;
      app.globalData.isUser = true;
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
      });
    },
    fail: function (err) {
      console.log("获取失败: ", err);
    },
  });
}

function search(value) {
  return new Promise((resolve) => {
    seriesDB
      .where({
        seriesName: {
          $regex: ".*" + value + ".*", //‘.*’等同于SQL中的‘%’
          $options: "i",
        },
      })
      .get()
      .then(({ data }) => {
        let resultList = [];
        if (data.length > 0) {
          data.forEach((series) => {
            resultList.push({
              text: series.seriesName,
              formData: series,
            });
          });
        } else {
          resultList.push({
            text: "无匹配数据",
          });
        }
        resolve(resultList);
      });
  });
}
