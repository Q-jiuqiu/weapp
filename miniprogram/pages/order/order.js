//index.js
//获取应用实例
var app = getApp();
Page({
  data: {
    photographyType: [],
    index: null,
    formData: {
      name: {
        value: "",
        isError: false,
        massage: "请输入联系人",
      },
      time: {
        value: "",
        isError: false,
        massage: "请选择服务时间",
      },
      server: {
        value: "",
        isError: false,
        massage: "请选择服务项目",
      },
      phone: {
        value: "",
        isError: false,
        massage: "请输入联系电话",
      },
    },
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
      "formData.name.value": app.globalData.nickName,
    });
    console.log("初始化", this.data);
    this.setTime();
  },
  // 设置服务时间
  setTime() {
    // console.log();
    let globalData = app.globalData;
    let day = globalData.selectDay + "";
    let time = globalData.selectTime;
    let week = globalData.selectWeek;
    let formatTime = "";
    if (!day || !time || !week) {
    } else {
      formatTime = `${day.substring(0, 4)}年${day.substring(
        4,
        6
      )}月${day.substring(6, 8)}日(周${week})${time}`;
    }
    this.setData({
      "formData.time.value": formatTime,
    });
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
    let value = this.data.photographyType[e.detail.value].title;
    console.log(value);
    this.setData({
      //给变量赋值
      // index: e.detail.value, //每次选择了下拉列表的内容同时修改下标然后修改显示的内容，显示的内容和选择的内容一致
      "formData.server.value": value,
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

  // 立即预约
  submit() {
    console.log(this.data);
    let formData = this.data.formData;
    for (const key in formData) {
      if (Object.hasOwnProperty.call(formData, key)) {
        if (formData[key].value === "") {
          let isError = `formData.${key}.isError`;
          console.log(isError);
          this.setData({
            [isError]: true,
          });
        }
      }
    }
    console.log(this.data.formData);
  },

  // input失焦
  inputBlur(event) {
    console.log(event);
    let value = event.detail.value;
    let type = event.target.id;
    switch (type) {
      case "name":
        console.log("name");
        if (value.length == 0) {
          this.setData({
            "formData.name.isError": true,
            "formData.name.massage": "请输入联系人",
          });
        } else {
          this.setData({
            "formData.name.isError": false,
            "formData.name.value": value,
          });
        }
        break;
      case "phone":
        console.log("phone");
        if (value.length == 0) {
          this.setData({
            "formData.phone.isError": true,
            "formData.phone.massage": "请输入联系电话",
          });
        } else {
          let reg = /^1(3[0-9]|4[5,7]|5[0,1,2,3,5,6,7,8,9]|6[2,5,6,7]|7[0,1,7,8]|8[0-9]|9[1,8,9])\d{8}$/;
          if (reg.test(value)) {
            this.setData({
              "formData.phone.isError": false,
              "formData.phone.vaule": value,
            });
          } else {
            this.setData({
              "formData.phone.isError": true,
              "formData.phone.massage": "请输入正确的号码",
            });
          }
        }
        break;
    }
  },
});
