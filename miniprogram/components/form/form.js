import { getData } from "../../utils/event";
const app = getApp();
// components/form/form.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {},

  /**
   * 组件的初始数据
   */
  data: {
    formData: [],
    detail: {},
    radioList: {},
    radioIndex: 0,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 校验表单每个值都输入
    check(data) {
      console.log(data);
      let flag = true;
      for (const key in data) {
        if (Object.hasOwnProperty.call(data, key)) {
          console.log(data[key]);
          if (data[key].value === "") {
            let type = `detail.${key}.isError`;
            console.log(type);
            this.setData({
              [type]: true,
            });
            flag = false;
          }
        }
      }
      if (!flag) {
        wx.showToast({
          title: "请输入值",
          icon: "loading",
          duration: 1000,
        });
      }
      return flag;
    },
    // 防抖函数
    Debounce(fn, time) {
      clearTimeout(this.timer); // 每次进来的时候都将之前的清除掉，如果还没到一秒的时候就将之前的清除掉，这样就不会触发之前setTimeout绑定的事件， 如果超过一秒，之前的事件就会被触发下次进来的时候同样清除之前的timer
      this.timer = setTimeout(fn, time);
    },
    // 文本框输入
    inputDebounce(event) {
      let value = event.detail.value;
      let type = event.target.id;
      let key = `detail.${type}.value`;
      let isError = `detail.${type}.isError`;
      let flag = false;
      if (value.length == 0) {
        flag = true;
      }
      this.Debounce(() => {
        this.setData({
          [isError]: flag,
          [key]: value,
        });
      }, 300);
    },
    // 单选框
    chooseRadio(event) {
      let index = getData(event, "index");
      let data = this.data;
      this.setData({
        radioIndex: index,
        "detail.sex.value": data.radioList.sex[index],
      });
      console.log(data);
    },
    saveNew() {
      let detail = this.data.detail;
      let flag = this.check(detail);
      if (flag) {
        this.triggerEvent("saveNew", this.data.detail);
      }
    },
  },
  lifetimes: {
    attached() {
      this.timer = null;
      let detail = {};
      let radioList = {};
      app.globalData.formData.forEach((item) => {
        let key = item.title;
        if (item.type == "radio") {
          radioList[key] = item.list;
        }
        detail[key] = {
          isError: item.isError,
          value: item.value,
        };
      });
      this.setData({
        formData: app.globalData.formData,
        detail,
        radioList,
      });
      console.log(this.data);
    },
  },
});
