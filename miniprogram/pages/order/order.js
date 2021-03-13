//index.js
//获取应用实例
var app = getApp();
Page({
  data: {
    logo:
      "cloud://quling-wgzt3.7175-quling-wgzt3-1303088105/assets/photoLogo.png",
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
    this.setParmas();
    this.timer = null;
  },
  // 若表单已经填写在切换页面回来之后数据仍然存在(设置数据)
  setParmas() {
    // 设置服务
    console.log(app.globalData);
    if (app.globalData.selectServer) {
      this.setData({
        "formData.server.value": app.globalData.selectServer,
        "formData.server.isError": false,
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
    this.setData({
      "formData.time.value": formatTime,
      "formData.time.isError": false,
    });
  },
  // 跳转到日历页面
  goToCalendar() {
    wx.navigateTo({
      url: "/pages/calendar/calendar",
      success: function (res) {},
      fail: function () {},
      complete: function () {},
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
      "formData.server.isError": false,
    });
    app.globalData.selectServer = value;
    // console.log("自定义值:", this.data.hx_select);
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
    const db = wx.cloud.database();
    db.collection("orders")
      .add({
        data: {
          name: getData.formData.name.value,
          time: getData.formData.time.value,
          server: getData.formData.server.value,
          phone: getData.formData.phone.value,
          tips: getData.formData.tips.value,
        },
      })
      .then((res) => {
        // res:{_id: "79550af2604b798f09b98f242ee96b4b", errMsg: "collection.add:ok"}
        console.log("添加成功", res);
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
        if (formData[key].value === "") {
          flag = false;
          console.log(key);
          let isError = `formData.${key}.isError`;
          console.log(isError);
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
          }, 800);
        } else {
          this.Debounce(() => {
            this.setData({
              "formData.name.isError": false,
              "formData.name.value": value,
            });
            app.globalData.name = value;
          }, 800);
        }
        break;
      case "phone":
        if (value.length == 0) {
          this.Debounce(() => {
            this.setData({
              "formData.phone.isError": true,
              "formData.phone.massage": "请输入联系电话",
            });
          }, 800);
        } else {
          this.Debounce(() => {
            let reg = /^1(3[0-9]|4[5,7]|5[0,1,2,3,5,6,7,8,9]|6[2,5,6,7]|7[0,1,7,8]|8[0-9]|9[1,8,9])\d{8}$/;
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
          }, 800);
        }
        break;
      case "tips":
        this.Debounce(() => {
          this.setData({
            "formData.tips.value": value,
          });
          app.globalData.tips = value;
        }, 800);
        break;
    }
  },
});
