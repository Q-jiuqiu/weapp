export default function getUserInfo(that, app, userInfo) {
  let nickName = userInfo.nickName;
  app.globalData.avatarUrl = userInfo.avatarUrl;
  app.globalData.nickName = nickName;
  that.setData({
    name: nickName,
  });
}
