// components/bottom/bottom.js
Component({
  // 使自定义组件可以使用app.wxss里的样式
  options: {
    addGlobalClass: true,
  },
  /**
   * 组件的属性列表
   */
  properties: {},

  /**
   * 组件的初始数据
   */
  data: {},

  /**
   * 组件的方法列表
   */
  methods: {
    // 点击复制号码
    copyText: function (e) {
      console.log(e);
      wx.setClipboardData({
        data: e.currentTarget.dataset.wenum,
        success: function (res) {
          wx.getClipboardData({
            success: function (res) {
              wx.showToast({
                title: "复制成功",
              });
            },
          });
        },
      });
    },
  },
});
