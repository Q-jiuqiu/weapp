import { getData, getId } from "../../utils/event";
import { adminDB, mailBoxDB, mailDB } from "../../utils/DBcollection";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    mailList: [],
    showLoading: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.Init();
  },
  // 初始化参数
  async Init() {
    this.setData({ showLoading: true });
    let { data } = await mailBoxDB.get();
    this.setData({ mailList: data, showLoading: false });
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
    let opinion = "拒绝";
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
                  clerkId: data.openId,
                  name: data.name.value,
                  sex: data.content[0].value,
                  tel: data.content[1].value,
                  idNum: data.content[2].value,
                  password: data.content[1].value,
                  portrait: data.cover.value,
                  status: 1,
                  applyId: data._openid,
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
                      content: [
                        {
                          value: data.content[0].value,
                          name: "性别",
                        },
                        {
                          value: data.content[1].value,
                          name: "电话",
                        },
                        {
                          value: data.content[2].value,
                          name: "身份证号码",
                        },
                      ],
                      name: { name: "姓名", value: data.name.value },
                      password: data.content[1].value,
                      cover: { name: "头像", value: data.cover.value },
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
            // 在邮件表中增加
            let time = new Date();
            console.log(time);
            mailDB
              .add({
                data: {
                  content: [
                    {
                      value: data.content[0].value,
                      name: "性别",
                    },
                    {
                      value: data.content[1].value,
                      name: "电话",
                    },
                    {
                      value: data.content[2].value,
                      name: "身份证号码",
                    },
                  ],
                  name: { name: "姓名", value: data.name.value },
                  password: data.content[1].value,
                  cover: { name: "头像", value: data.cover.value },
                  applyId: data._openid,
                  opinion,
                  time,
                },
              })
              .then((res) => {
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
  },
});
