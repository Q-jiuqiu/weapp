import { offDayDB } from "../../utils/DBcollection";
import { getData } from "../../utils/event";
const app = getApp();

Component({
  //初始默认为当前日期
  properties: {
    noWork: {
      type: Boolean,
      value: false,
    },
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
    offDay: [],
    conNotDay: [],
  },
  ready: function () {
    console.log(this.data);
    this.offDay = [];
    this.getoffDayByDB();
    this.today();
  },

  methods: {
    // 从数据库获取不营业的时间
    getoffDayByDB() {
      let that = this;
      offDayDB.get().then((res) => {
        console.log("从数据库获取不营业的时间", res);
        if (app.globalData.isAdmin == 2) {
          that.setData({
            conNotDay: res.data[0].offDay,
          });
        } else {
          that.setData({
            offDay: res.data[0].offDay,
          });
          that.offDay = res.data[0].offDay;
        }
      });
    },

    //初始化
    initCalendar(year, month, date) {
      this.setData({
        year,
        month,
        date,
        title: year + "年" + month + "月" + date + "日",
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
        today = (year + this.zero(month) + this.zero(date)) * 1;
      let select = 0;
      console.log("日历组件初始值", this.data, this.data.noWork);
      if (!this.data.noWork) {
        select = (year + this.zero(month) + this.zero(date)) * 1;
        console.log("默认选择", select);
      }
      // offDay=[
      if (app.globalData.isAdmin == 2) {
        this.setData({
          offDay: [],
        });
      }
      console.log(select, this.data.offDay);
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
      let week = this.data.weekText[DATE.getDay()];
      console.log(week);

      //初始化日历组件UI
      this.initCalendar(year, month, date);

      //发送事件监听
      if (!this.data.noWork) {
        this.triggerEvent("select", { select, week });
      }
    },

    //选择 并格式化数据
    select(e) {
      let offDay = [];
      let date = getData(e, "data");
      let select =
        (this.data.year + this.zero(this.data.month) + this.zero(date)) * 1;
      if (select < this.data.today) {
        return;
      }
      // 用户选择了休息日
      if (app.globalData.isAdmin == 2) {
        if (this.data.conNotDay.indexOf(select) > -1) {
          return;
        }
      }
      if (this.data.noWork) {
        let indexOf = this.offDay.indexOf(select);
        if (indexOf > -1) {
          this.offDay.splice(indexOf, 1);
        } else {
          this.offDay.push(select);
        }
        offDay = this.offDay;
      } else {
        offDay.push(select);
      }
      this.triggerEvent("offDay", this.offDay);
      this.setData({
        title: this.data.year + "年" + this.data.month + "月" + date + "日",
        select: select,
        year: this.data.year,
        month: this.data.month,
        date: date,
        offDay,
      });
      let week = this.data.weekText[
        new Date(Date.UTC(this.data.year, this.data.month - 1, date)).getDay()
      ];
      // console.log(week);
      //发送事件监听
      if (!this.data.noWork) {
        this.triggerEvent("select", { select, week });
      }
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
