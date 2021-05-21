export default function navigateTo({ url, urlTitle = "拾忆摄影馆" }) {
  wx.navigateTo({
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
