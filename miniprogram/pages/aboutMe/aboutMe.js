import { adminDB, mailBoxDB } from "../../utils/DBcollection";
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
    error: "",
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 加入我们
    async join() {
      let { data: adminData } = await adminDB
        .where({
          _openid: app.globalData.openId,
        })
        .get();
      // 已经是店员
      if (adminData && adminData.length > 0) {
        this.setData({
          error: "已是店员请勿重复申请",
        });
        return;
      }
      let { data: mailData } = await mailBoxDB
        .where({
          _openid: app.globalData.openId,
        })
        .get();
      // 已经申请
      if (mailData && mailData.length > 0) {
        this.setData({
          error: "已申请,请耐心等待审核结果",
        });
        return;
      }
      wx.showModal({
        title: "申请成为店员?",
        success(res) {
          if (res.confirm) {
            app.globalData = {
              formData: [
                {
                  value: "",
                  isError: false,
                  type: "input",
                  title: "name",
                  titleZH: "名称",
                  unit: "",
                  placeholder: "请输入名字",
                },
                {
                  value: "男",
                  isError: false,
                  type: "radio",
                  title: "sex",
                  titleZH: "性别",
                  unit: "",
                  list: ["男", "女"],
                },
                {
                  value: "",
                  isError: false,
                  type: "input",
                  title: "tel",
                  number: true,
                  titleZH: "联系方式",
                  placeholder: "请输入联系方式",
                  unit: "",
                },
                {
                  value: "",
                  isError: false,
                  type: "input",
                  number: true,
                  placeholder: "请输入身份证号",
                  title: "idNum",
                  titleZH: "身份证号",
                  unit: "",
                },
              ],
            };
            wx.redirectTo({
              url: "/pages/joinMe/joinMe",
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
          }
        },
      });
    },
  },
  lifetimes: {
    attached() {
      this.setData({
        shopInfo: app.appConfig.shopInfo,
      });
    },
  },
});
