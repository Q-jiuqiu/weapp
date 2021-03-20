// miniprogram/pages/mailBox/mailBox.js
import { getData, getId } from "../../utils/event";
import { adminDB, mailBoxDB, mailDB } from "../../utils/DBcollection";
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    mailList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.Init();
  },
  // 初始化参数
  Init() {
    let that = this;
    mailBoxDB
      .get()
      .then((res) => {
        that.setData({
          mailList: res.data,
        });
        console.log(that.data.mailList);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  /**
   * 处理申请
   * @param {dom} event dom节点
   */
  handleApply(event) {
    let that = this;
    let index = getData(event, "index");
    let data = that.data.mailList[index];
    let type = getId(event);
    let opinion = "";
    console.log(data);
    if (type === "agree") {
      wx.showModal({
        title: "同意加入成为店员?",
        content: "成为店员后将有权限对订单、套系进行操作",
        showCancel: true,
        cancelText: "取消",
        cancelColor: "#000000",
        confirmText: "同意",
        confirmColor: "#70D0CF",
        success: (result) => {
          if (result.confirm) {
            opinion = "同意";
            // 在管理表中增加数据
            adminDB
              .add({
                data: {
                  clerkId: data.openid,
                  name: data.name.value,
                  sex: data.content[0].value,
                  tel: data.content[1].value,
                  idNum: data.content[2].value,
                },
              })
              .then((res) => {
                console.log(res);
                wx.showToast({
                  title: "已同意",
                  icon: "success",
                });
                // 在邮件表中增加
                let time = new Date();
                console.log(time);
                mailDB
                  .add({
                    data: {
                      applyId: data._openid,
                      opinion,
                      time,
                    },
                  })
                  .then((res) => {
                    console.log(res);
                  })
                  .catch((err) => {
                    console.log(err);
                  });
                // 删除掉邮箱表中的数据
                mailBoxDB
                  .doc(data._id)
                  .remove()
                  .then((res) => {
                    console.log(res);
                    this.Init();
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              })
              .catch((err) => {
                console.log(err);
              });
          } else {
            return;
          }
        },
        fail: () => {},
        complete: () => {},
      });
    } else {
      wx.showModal({
        title: "确定拒绝该申请?",
        showCancel: true,
        cancelText: "取消",
        cancelColor: "#000000",
        confirmText: "同意",
        confirmColor: "#70D0CF",
        success: (result) => {
          if (result.confirm) {
            opinion = "您与我们的岗位不符";
            // 删除掉邮箱表中的数据
            mailBoxDB
              .doc(data._id)
              .remove()
              .then((res) => {
                this.Init();
              })
              .catch((err) => {
                console.log(err);
              });
          } else {
            return;
          }
        },
        fail: () => {},
        complete: () => {},
      });
    }
    // 建mail表,用于存储提示
    // 同意时间
    // let time = that.getFormatTime();

    // 删除数据库中这条数据
  },
  // 获取格式化时间https://www.jb51.net/article/176589.htm
  // getFormatTime() {},
  // 操作提示
  // optionTips(success) {

  // },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {},
});
