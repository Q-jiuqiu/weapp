// {
//   url: "/pages/index/index",
// }
export default function redirectTo({ url, urlTitle = "拾忆摄影馆" }) {
  wx.redirectTo({
    url,
    success: function (res) {
      // success
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
}
