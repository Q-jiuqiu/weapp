const app = getApp();

Page({
  data: {
    value: "2018-11-11",
    week: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    lastMonth: "lastMonth",
    nextMonth: "nextMonth",
    selectVal: "",
    timeSlider: "",
    slideShow: true,
    slideWidth: "", //滑块宽
    slideLeft: 0, //滑块位置
    totalLength: "", //当前滚动列表总长
    slideRatio: "",
    chooseIndex: null,
    selectDate: "",
    selectTime: "",
    isTip: false,
    timer: null,
  },

  onLoad() {
    var systemInfo = wx.getSystemInfoSync();
    //计算比例
    this.setData({
      windowHeight: systemInfo.windowHeight,
      windowWidth: systemInfo.windowWidth,
      timeSlider: app.appConfig.timeSlider,
    });
    this.getRatio();
  },
  getRatio() {
    var _totalLength = this.data.timeSlider.length * 150; //分类列表总长度
    var _ratio = (230 / _totalLength) * (750 / this.data.windowWidth); //滚动列表长度与滑条长度比例
    var _showLength = (750 / _totalLength) * 230; //当前显示红色滑条的长度(保留两位小数)
    console.log(_showLength, _totalLength, true, _ratio);
    this.setData({
      slideWidth: _showLength,
      totalLength: _totalLength,
      slideShow: true,
      slideRatio: _ratio,
    });
  },
  //slideLeft动态变化
  getleft(e) {
    this.setData({
      slideLeft: e.detail.scrollLeft * this.data.slideRatio,
    });
  },

  //组件监听事件
  select(e) {
    // console.log(e)
    this.setData({
      selectVal: e.detail,
    });
  },

  toggleType() {
    this.selectComponent("#Calendar").toggleType();
  },
  chooseTime(event) {
    console.log(event);
    let index = event.currentTarget.dataset.index;
    this.setData({
      chooseIndex: index,
      selectTime: this.data.timeSlider[index],
    });
    console.log(this.data);
  },
  getSelect(select) {
    console.log(select.detail);
    this.setData({
      selectDate: select.detail.select,
      selectWeek: select.detail.week,
    });
  },
  // 确定
  submit() {
    app.globalData.selectDay = this.data.selectDate;
    app.globalData.selectTime = this.data.selectTime;
    app.globalData.selectWeek = this.data.selectWeek;
    if (!app.globalData.selectTime || app.globalData.selectTime === "") {
      this.setData({
        isTip: true,
      });
      setTimeout(() => {
        this.setData({
          isTip: false,
        });
      }, 1000);
      return;
    }
    wx.navigateTo({
      url: "../order/order",
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
});