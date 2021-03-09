// components/toolsbar/toolsbar.js

Component({
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
  data: {
    isShow: false,
    animation: null,
  },

  lifetimes: {
    attached() {
      this.animation = wx.createAnimation({
        // 动画持续时间，单位ms，默认值 400
        duration: 1500,
        timingFunction: "linear", // 延迟多长时间开始
        delay: 100,
        transformOrigin: "left top 0",
        success: function (res) {
          console.log(res);
        },
      });
    },
  },
  /**
   * 组件的方法列表
   */
  methods: {
    showSubList() {
      // console.log(111);
      console.log(this.data.isShow);
      this.setData({
        isShow: !this.data.isShow,
      });
      this.animation.rotate(360).step();
      this.setData({
        //输出动画
        animation: this.animation.export(),
      });
    },
  },
});
