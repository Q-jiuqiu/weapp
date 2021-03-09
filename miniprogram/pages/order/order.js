//index.js
//获取应用实例
var app = getApp();
Page({
  data: {
    photographyType: [
      // { id: 13, name: "1室1厅1卫" },
      // { id: 14, name: "1室2厅1卫" },
      // { id: 15, name: "2室1厅1卫" },
      // { id: 16, name: "3室1厅2卫" },
      // { id: 17, name: "4室1厅2卫" },
      // { id: 18, name: "5室1厅3卫" },
      // { id: 19, name: "6室1厅3卫" },
      // { id: 20, name: "7室以上" },
    ],
    hx_index: null,
    name: "",
    time: "",
  },
  // 生命周期
  onLoad() {
    // this.setGridItemWidth();
    let photographBusiness = app.appConfig.photographBusiness;
    let type = [];
    for (const key in photographBusiness) {
      if (Object.hasOwnProperty.call(photographBusiness, key)) {
        if (
          photographBusiness[key].children &&
          photographBusiness[key].children.length > 0
        ) {
          let children = photographBusiness[key].children;
          for (let i = 0; i < children.length; i++) {
            if (children[i].title !== "全部") {
              type.push(children[i]);
            }
          }
        }
      }
    }
    this.setData({
      photographyType: type,
      name: app.globalData.nickName,
    });
    this.setTime();
    console.log(this.data);
  },
  // 设置服务时间
  setTime() {
    // console.log();
    let globalData = app.globalData;
    let day = globalData.selectDay + "";
    let time = globalData.selectTime;
    let week = globalData.selectWeek;
    let formatTime = `${day.substring(0, 4)}年${day.substring(
      4,
      6
    )}月${day.substring(6, 8)}日(周${week})${time}`;
    this.setData({ time: formatTime });
  },
  // 跳转到日历页面
  goToCalendar() {
    wx.navigateTo({
      url: "/pages/calendar/calendar",
      success: function (res) {
        // success
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      },
    });
  },
  bindPickerChange_hx: function (e) {
    // console.log("picker发送选择改变，携带值为", e.detail.value);
    this.setData({
      //给变量赋值
      hx_index: e.detail.value, //每次选择了下拉列表的内容同时修改下标然后修改显示的内容，显示的内容和选择的内容一致
    });
    // console.log("自定义值:", this.data.hx_select);
  },
  /**
   * 滑动切换tab
   */
  bindChange: function (e) {
    var that = this;
    that.setData({ currentTab: e.detail.current });
  },
});
