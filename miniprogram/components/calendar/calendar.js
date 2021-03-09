Component({
  //初始默认为当前日期
  properties: {
    defaultValue: {
      type: String,
      value: "",
    },
    //星期数组
    weekText: {
      type: Array,
      value: ["日", "一", "二", "三", "四", "五", "六"],
    },
    lastMonth: {
      type: String,
      value: "<",
    },
    nextMonth: {
      type: String,
      value: ">",
    },
  },

  // 组件的初始数据
  data: {
    //当月格子
    thisMonthDays: [],
    //上月格子
    empytGridsBefore: [],
    //下月格子
    empytGridsAfter: [],
    //显示日期
    title: "",
    //格式化日期
    format: "",
    today: "",

    year: 0,
    month: 0,
    date: 0,
    // toggleType: "large",
    //常量 用于匹配是否为当天
    YEAR: 0,
    MONTH: 0,
    DATE: 0,
  },
  ready: function () {
    this.today();
    // console.log(this.data);
  },

  methods: {
    //切换展示
    toggleType() {
      // this.setData({
      //   toggleType: this.data.toggleType == "mini" ? "large" : "mini",
      // });
      //初始化日历组件UI
      this.initCalendar(this.data.year, this.data.month, this.data.date);
    },

    //初始化
    initCalendar(year, month, date) {
      this.setData({
        year,
        month,
        date,
        title: year + "年" + this.zero(month) + "月",
      });
      this.createDays(year, month);
      this.createEmptyGrids(year, month);
    },
    //默认选中当天 并初始化组件
    today() {
      let DATE = this.data.defaultValue
          ? new Date(this.data.defaultValue)
          : new Date(),
        year = DATE.getFullYear(),
        month = DATE.getMonth() + 1,
        date = DATE.getDate(),
        select = (year + this.zero(month) + this.zero(date)) * 1,
        today = (year + this.zero(month) + this.zero(date)) * 1;

      this.setData({
        format: select,
        select: select,
        year: year,
        month: month,
        date: date,
        YEAR: year,
        MONTH: month,
        DATE: date,
        today: today,
      });

      //初始化日历组件UI
      this.initCalendar(year, month, date);

      //发送事件监听
      // this.triggerEvent("select", select);
    },

    //选择 并格式化数据
    select(e) {
      let date = e.currentTarget.dataset.date;
      let select =
        (this.data.year + this.zero(this.data.month) + this.zero(date)) * 1;
      if (select < this.data.today) {
        return;
      }
      this.setData({
        title:
          this.data.year +
          "年" +
          this.zero(this.data.month) +
          "月" +
          this.zero(date) +
          "日",
        select: select,
        year: this.data.year,
        month: this.data.month,
        date: date,
      });
      console.log(this.data.select);
      //发送事件监听
      this.triggerEvent("select", select);
    },
    //上个月
    lastMonth() {
      let month = this.data.month == 1 ? 12 : this.data.month - 1;
      let year = this.data.month == 1 ? this.data.year - 1 : this.data.year;
      //初始化日历组件UI
      this.initCalendar(year, month, 0);
    },
    //下个月
    nextMonth() {
      let month = this.data.month == 12 ? 1 : this.data.month + 1;
      let year = this.data.month == 12 ? this.data.year + 1 : this.data.year;
      //初始化日历组件UI
      this.initCalendar(year, month, 0);
    },
    //获取当月天数
    getThisMonthDays(year, month) {
      return new Date(year, month, 0).getDate();
    },
    // 绘制当月天数占的格子
    createDays(year, month) {
      let thisMonthDays = [],
        days = this.getThisMonthDays(year, month);
      for (let i = 1; i <= days; i++) {
        thisMonthDays.push({
          date: i,
          dateFormat: this.zero(i),
          monthFormat: this.zero(month),
          week: this.data.weekText[
            new Date(Date.UTC(year, month - 1, i)).getDay()
          ],
          judge: (this.data.year + this.zero(month) + this.zero(i)) * 1,
        });
      }
      this.setData({
        thisMonthDays,
      });
    },
    //获取当月空出的天数
    createEmptyGrids(year, month) {
      //当月天数
      let thisMonthDays = this.getThisMonthDays(year, month),
        // 求出本月1号是星期几，本月前面空出几天，就是上月的日期
        // 0（周日） 到 6（周六）
        before = new Date(Date.UTC(year, month - 1, 1)).getDay(),
        // 后面空出的天数
        after =
          7 - new Date(Date.UTC(year, month - 1, thisMonthDays)).getDay() - 1,
        empytGridsBefore = [],
        empytGridsAfter = [];
      //上月天数
      let prpxonthDays =
        month - 1 < 0
          ? this.getThisMonthDays(year - 1, 12)
          : this.getThisMonthDays(year, month - 1);

      //前面空出日期
      for (let i = 1; i <= before; i++) {
        empytGridsBefore.push(prpxonthDays - (before - i));
      }

      // 后面空出的日期
      for (let i = 1; i <= after; i++) {
        empytGridsAfter.push(i);
      }
      this.setData({
        empytGridsAfter,
        empytGridsBefore,
      });
    },

    //补全0
    zero(i) {
      return i >= 10 ? i : "0" + i;
    },
  },
});
