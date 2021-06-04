// components/share/share.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    shareInfo: { type: Object },
  },

  /**
   * 组件的初始数据
   */
  data: {},

  /**
   * 组件的方法列表
   */
  methods: {
    share(event) {
      let info = JSON.stringify(this.data.shareInfo);
      debugger;
      console.log("分享");
      return {
        title: "这个小程序真好",
        path: `/pages/series/series?info=${info}`,
      };
    },
  },
});
