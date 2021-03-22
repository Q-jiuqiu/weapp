// miniprogram/pages/addSeries/addSeries.js
import { seriesDB } from "../../utils/DBcollection";
import { getData } from "../../utils/event";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    current: 1,
    total: 0,
    count: 3,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    console.log("onLoad");
  },

  // 获取分页组件的当前页
  changePage(data) {
    let current = data.detail;
    this.setData({
      current,
    });
    this.init();
  },

  // 获取数据库总条数用于分页查询
  getTotal() {
    let that = this;
    seriesDB.count({
      success(res) {
        console.log(res);
        let page = Math.ceil(res.total / that.data.count);
        that.setData({
          total: res.total,
          page,
        });
      },
    });
  },
  // 初始化列表
  init() {
    let that = this;
    let current = that.data.current,
      count = that.data.count;
    this.getTotal();
    seriesDB
      .skip((current - 1) * count)
      .limit(current * count)
      .get()
      .then((res) => {
        that.setData({
          list: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  },
  // 跳转到增加套系页
  goToFormSeries() {
    wx.navigateTo({
      url: "/pages/formSeries/formSeries",
      success: function (res) {
        wx.setNavigationBarTitle({
          title: "新增套系",
        });
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      },
    });
  },
  // 删除套系
  delete(event) {
    let that = this;
    let index = getData(event, "index");
    let id = this.data.list[index]._id;
    let title = `删除"${this.data.list[index].seriesName}"套系`;
    let res = wx.showModal({
      title,
      content: "确认删除?",
      success(res) {
        if (res.confirm) {
          seriesDB
            .doc(id)
            .remove()
            .then((res) => {
              console.log(res);
              that.init();
            });
        } else {
          console.log("用户取消操作");
        }
      },
    });
    console.log(res);
  },
  // 修改套系
  upgrade(event) {
    let index = getData(event, "index");
    let detail = { formData: this.data.list[index] };
    wx.setStorage({
      key: "detail",
      data: detail,
    });
    wx.navigateTo({
      url: "/pages/formSeries/formSeries",
      success: function (res) {
        // success
        wx.setNavigationBarTitle({
          title: "修改套系",
        });
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      },
    });
    // let title = `删除"${this.data.list[index].seriesName}"套系`;
    // let res = wx.showModal({
    //   title,
    //   content: "确认删除?",
    //   success(res) {
    //     if (res.confirm) {
    //       that.seriesDB
    //         .doc(id)
    //         .remove()
    //         .then((res) => {
    //           console.log(res);
    //           that.init();
    //         });
    //     } else {
    //       console.log("用户取消操作");
    //     }
    //   },
    // });
    // console.log(res);
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log("onReady");
    this.init();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.init();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log("onHide");
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log("onUnload");
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    console.log("onPullDownRefresh");
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log("onReachBottom");
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
});
