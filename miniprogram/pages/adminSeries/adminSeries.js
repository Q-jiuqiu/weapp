// miniprogram/pages/addSeries/addSeries.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    list: [],
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    console.log("onLoad");
    this.getInit();
  },
  // 初始化列表
  getInit() {
    this.db = wx.cloud.database();
    this.seriesDB = this.db.collection("series");
    this.seriesDB
      .get()
      .then((res) => {
        this.setData({
          list: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(this.data);
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
    let index = event.currentTarget.dataset.index;
    let id = this.data.list[index]._id;
    let title = `删除"${this.data.list[index].seriesName}"套系`;
    let res = wx.showModal({
      title,
      content: "确认删除?",
      success(res) {
        if (res.confirm) {
          that.seriesDB
            .doc(id)
            .remove()
            .then((res) => {
              console.log(res);
              that.getInit();
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
    let that = this;
    let index = event.currentTarget.dataset.index;
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
    //           that.getInit();
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
    this.getInit();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log("onShow");
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
