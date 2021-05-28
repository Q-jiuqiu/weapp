import { getData } from "../../utils/event";
import navigateBack from "../../utils/navigateBack";
const app = getApp();

Page({
  data: {
    detail: {},
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
    chooseIndex: null, // 选择的时间场次下标
    selectDate: "",
    selectTime: "",
    isTip: false,
    timer: null,
    tip: "请确定具体档期",
  },

  onLoad(data) {
    let day = "";
    if (data.type == "change" && data.data != "{}") {
      let select = JSON.parse(data.data).time;
      for (let i = 0; i < select.length; i++) {
        let reg = /\d/;
        if (reg.test(select[i])) {
          day = day + select[i];
        }
      }
    }
    let time = day.substr(8, 12);
    let time_ = time.substr(0, 2) + ":" + time.substr(2, 5);
    let timeSlider = app.appConfig.timeSlider;
    let index = timeSlider.indexOf(time_);
    var systemInfo = wx.getSystemInfoSync();
    //计算比例
    this.setData({
      windowHeight: systemInfo.windowHeight,
      windowWidth: systemInfo.windowWidth,
      timeSlider,
      chooseIndex: index,
      selectTime: time_,
      detail: data.data,
      selectDay: day,
    });
    this.getRatio();
  },
  // 提示
  tips(detail) {
    this.setData({
      isTip: true,
      tip: (detail && detail.detail) || "请确定具体档期",
    });
    setTimeout(() => {
      this.setData({
        isTip: false,
      });
    }, 1000);
    return;
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
  chooseTime(event) {
    let index = getData(event, "index");
    this.setData({
      chooseIndex: index,
      selectTime: this.data.timeSlider[index],
    });
  },
  getSelect(select) {
    this.setData({
      selectDate: select.detail.select,
      selectWeek: select.detail.week,
    });
  },
  // 确定
  submit() {
    let { selectDate, selectTime, selectWeek } = this.data;
    if (selectDate === "" || !selectTime || selectTime === "") {
      this.tips();
      return;
    }
    let formatTime = "";
    if (!selectDate || !selectTime || !selectWeek) {
    } else {
      selectDate = selectDate + "";
      formatTime = `${selectDate.substring(0, 4)}年${selectDate.substring(
        4,
        6
      )}月${selectDate.substring(6, 8)}日(周${selectWeek})${selectTime}`;
    }
    let timeDate = new Date(
      `${selectDate.substring(0, 4)}-${selectDate.substring(
        4,
        6
      )}-${selectDate.substring(6, 8)} ${selectTime}`
    ).getTime();
    // 缓存订单时间
    wx.setStorage({
      key: "order",
      data: { time: formatTime, ordersDB: timeDate },
    });
    // 路由回退
    navigateBack({ delta: 1 });
  },
});
