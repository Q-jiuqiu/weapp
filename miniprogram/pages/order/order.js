//index.js
import { seriesDB, ordersDB, _ } from "../../utils/DBcollection";
import { getDetail, getData } from "../../utils/event";
//获取应用实例
var app = getApp();
Page({
  data: {
    logo: "../../assets/defalut-logo.png",
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
      tips: {
        value: "",
        isError: true,
        massage: "",
      },
    },
    error: "",
  },
  // onShow() {
  //   this.setData({
  //     error: "这是一个错误提示",
  //   });
  // },
  init() {
    let data = this.data;
    seriesDB
      .get()
      .then((res) => {
        console.log(res);
        this.setData({
          dataArr: res.data,
        });
        this.getNameList();
      })
      .catch((err) => {
        console.log(err);
      });
  },
  // 获取套系名称列表
  getNameList() {
    let dataArr = this.data.dataArr;
    let photographyType = [];
    dataArr.forEach((item) => {
      photographyType.push({ name: item.seriesName, id: item._id });
    });
    this.setData({
      photographyType,
    });
  },
  // 点击复制号码
  copyText: function (e) {
    wx.setClipboardData({
      data: getData(e, "wenum"),
      success: function (res) {
        wx.getClipboardData({
          success: function (res) {
            wx.showToast({
              title: "复制成功",
            });
          },
        });
      },
    });
  },
  // 生命周期
  onLoad(data) {
    this.init();
    if (JSON.stringify(data) != "{}") {
      let type = data.type;
      let detail = JSON.parse(data.data);
      console.log(detail);
      this.setData({
        "formData.server.value": detail.server,
        "formData.time.value": detail.time,
        "formData.phone.value": detail.phone,
        "formData.name.value": detail.name,
        "formData.tips.value": detail.tips,
        shopInfo: app.appConfig.shopInfo,
      });
    } else {
      this.setData({
        "formData.name.value": app.globalData.nickName,
        shopInfo: app.appConfig.shopInfo,
      });
    }

    this.setTime();
    this.setParams();
    this.timer = null;
  },
  // 若表单已经填写在切换页面回来之后数据仍然存在(设置数据)
  setParams() {
    // 设置服务
    if (app.globalData.selectServer) {
      this.setData({
        "formData.server.value": app.globalData.selectServer,
        "formData.server.isError": false,
        "formData.server.id": app.globalData.selectServerId,
      });
    }
    // 设置联系人
    if (app.globalData.name) {
      this.setData({
        "formData.name.value": app.globalData.name,
        "formData.name.isError": false,
      });
    }
    // 设置电话
    if (app.globalData.phone) {
      this.setData({
        "formData.phone.value": app.globalData.phone,
        "formData.phone.isError": false,
      });
    }
    // 设置备注
    if (app.globalData.tips) {
      this.setData({
        "formData.tips.value": app.globalData.tips,
      });
    }
  },
  // 设置服务时间
  setTime() {
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
    let timeDate = new Date(
      `${day.substring(0, 4)}-${day.substring(4, 6)}-${day.substring(
        6,
        8
      )} ${time}`
    );
    this.setData({
      "formData.time.value": formatTime,
      "formData.time.isError": false,
      orderTime: timeDate,
    });
  },
  // 跳转到日历页面
  goToCalendar() {
    wx.redirectTo({
      url: "/pages/calendar/calendar",
      success(res) {
        wx.setNavigationBarTitle({
          title: "选择预约时间",
        });
      },
      fail: function () {},
      complete: function () {},
    });
  },
  //picker值改变
  bindPickerChange_hx(e) {
    let index = getDetail(e).value;
    let value = this.data.photographyType[index].name;
    let id = this.data.photographyType[index].id;

    this.setData({
      "formData.server.value": value,
      "formData.server.isError": false,
      "formData.server.id": id,
    });
    app.globalData.selectServer = value;
    app.globalData.selectServerId = id;
  },
  // 客服会话
  handleContact(event) {
    console.log(event);
    // this.triggerEvent("contact", detail);
  },
  /**
   * 滑动切换tab
   */
  bindChange: function (e) {
    var that = this;
    that.setData({ currentTab: e.detail.current });
  },

  // 数据库操作
  dateBaseOperation() {
    let getData = this.data;
    let that = this;
    ordersDB
      .add({
        data: {
          name: getData.formData.name.value,
          time: getData.formData.time.value,
          server: getData.formData.server.value,
          serverId: getData.formData.server.id,
          phone: getData.formData.phone.value,
          tips: getData.formData.tips.value,
          ordersDB: that.data.orderTime,
          ok: false,
        },
      })
      .then((res) => {
        that.setData({
          error: "提交成功",
        });
        wx.redirectTo({
          url: "/pages/index/index",
          success: function (res) {},
          fail: function () {
            // fail
          },
          complete: function () {
            // complete
          },
        });
      })
      .catch((err) => {
        console.log("添加失败", err);
      });
  },

  // 立即预约
  submit() {
    let formData = this.data.formData;
    let flag = true;
    for (const key in formData) {
      if (Object.hasOwnProperty.call(formData, key)) {
        if (formData[key].value === "" && key != "tips") {
          flag = false;
          let isError = `formData.${key}.isError`;
          this.setData({
            [isError]: true,
          });
        }
      }
    }
    if (flag) {
      this.dateBaseOperation();
    }
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
    switch (type) {
      case "name":
        if (value.length == 0) {
          this.Debounce(() => {
            this.setData({
              "formData.name.isError": true,
              "formData.name.massage": "请输入联系人",
            });
          }, 300);
        } else {
          this.Debounce(() => {
            this.setData({
              "formData.name.isError": false,
              "formData.name.value": value,
            });
            app.globalData.name = value;
          }, 300);
        }
        break;
      case "phone":
        if (value.length == 0) {
          this.Debounce(() => {
            this.setData({
              "formData.phone.isError": true,
              "formData.phone.massage": "请输入联系电话",
            });
          }, 300);
        } else {
          this.Debounce(() => {
            let reg =
              /^1(3[0-9]|4[5,7]|5[0,1,2,3,5,6,7,8,9]|6[2,5,6,7]|7[0,1,7,8]|8[0-9]|9[1,8,9])\d{8}$/;
            if (reg.test(value)) {
              this.setData({
                "formData.phone.isError": false,
                "formData.phone.value": value,
              });
              app.globalData.phone = value;
            } else {
              this.setData({
                "formData.phone.isError": true,
                "formData.phone.massage": "请输入正确的号码",
              });
            }
          }, 300);
        }
        break;
      case "tips":
        this.Debounce(() => {
          this.setData({
            "formData.tips.value": value,
          });
          app.globalData.tips = value;
        }, 300);
        break;
    }
  },
});
