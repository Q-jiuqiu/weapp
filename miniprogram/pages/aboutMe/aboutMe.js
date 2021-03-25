const app = getApp();

// pages/aboutMe/aboutMe.js
Component({
  options: {
    addGlobalClass: true,
  },
  /**
   * 组件的属性列表
   */
  properties: {},

  /**
   * 组件的初始数据
   */
  data: {
    shopInfo: app.appConfig.shopInfo,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 加入我们
    //   join() {
    //     wx.showModal({
    //       title: "申请成为店员?",
    //       success(res) {
    //         if (res.confirm) {
    //           app.globalData = {
    //             formData: [
    //               {
    //                 value: "",
    //                 isError: false,
    //                 type: "input",
    //                 title: "name",
    //                 titleZH: "名称",
    //                 unit: "",
    //                 placeholder: "请输入名字",
    //               },
    //               {
    //                 value: "男",
    //                 isError: false,
    //                 type: "radio",
    //                 title: "sex",
    //                 titleZH: "性别",
    //                 unit: "",
    //                 list: ["男", "女"],
    //               },
    //               {
    //                 value: "",
    //                 isError: false,
    //                 type: "input",
    //                 title: "tel",
    //                 number: true,
    //                 titleZH: "联系方式",
    //                 unit: "",
    //               },
    //               {
    //                 value: "",
    //                 isError: false,
    //                 type: "input",
    //                 number: true,
    //                 title: "idNum",
    //                 titleZH: "身份证号",
    //                 unit: "",
    //               },
    //             ],
    //           };
    //           wx.navigateTo({
    //             url: "/pages/joinMe/joinMe",
    //             success: function (res) {
    //               // success
    //             },
    //             fail: function () {
    //               // fail
    //             },
    //             complete: function () {
    //               // complete
    //             },
    //           });
    //         }
    //       },
    //     });
    //   },
  },
  lifetimes: {
    attached() {
      this.setData({
        shopInfo: app.appConfig.shopInfo,
      });
    },
  },
});