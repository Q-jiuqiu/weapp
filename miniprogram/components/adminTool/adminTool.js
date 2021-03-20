// components/adminTool/adminTool.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    toolList: {
      type: Array,
      default: [],
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    count: "",
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getMailBox() {
      let that = this;
      wx.cloud
        .database()
        .collection("mailBox")
        .get()
        .then((res) => {
          console.log(res);
          that.setData({
            count: res.data.length,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleClick(event) {
      let type = event.currentTarget.dataset.type;
      this.triggerEvent("click", type);
    },
  },
  lifetimes: {
    attached() {
      this.getMailBox();
    },
  },
  pageLifetimes: {
    hide() {
      console.log("父组件被隐藏");
    },
    show() {
      console.log("父组件被展示");
      // 父组件显示重新获取页面条数
      this.getMailBox();
    },
  },
});
