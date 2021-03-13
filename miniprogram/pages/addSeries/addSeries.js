// miniprogram/pages/addSeries/addSeries.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    FormData: {
      seriesName: "",
      time: "",
      shot: "",
      negative: "",
      makeUp: "",
      extraCharge: "",
      price: "",
      refinement: " ",
      clothing: "",
      album: "",
      cover: "",
      description: "",
    },
  },
  // 提交表单
  Submit(event) {
    let {
      seriesName,
      time,
      shot,
      negative,
      makeUp,
      extraCharge,
      price,
      refinement,
      clothing,
      album,
      description,
    } = event.detail.value;
    let cover = this.data.FormData.cover;
    this.db = wx.cloud.database();
    this.db.collection("series").add({
      data: {
        seriesName,
        time,
        shot,
        negative,
        makeUp,
        extraCharge,
        price,
        refinement,
        clothing,
        album,
        cover,
        description,
      },
    });
  },
  //上传文件
  upload() {
    //把this赋值给that，就相当于that的作用域是全局的。
    let that = this;
    console.log("jaj");
    wx.chooseImage({
      count: 1,
      sizeType: ["original", "compressed"],
      sourceType: ["album", "camera"],
      success(res) {
        console.log("成功", res);
        that.uploadImage(res.tempFilePaths[0]);
      },
    });
  },
  uploadImage(fileURL) {
    let cover = this.data.FormData.cover;
    if (cover !== "") {
      wx.cloud.deleteFile({
        fileList: [cover],
        success: (res) => {
          // handle success
          console.log("删除");
          console.log(res.fileList);
        },
        fail: console.error,
      });
    }
    wx.cloud.uploadFile({
      cloudPath: new Date().getTime() + ".png", // 上传至云端的路径
      filePath: fileURL, // 小程序临时文件路径
      success: (res) => {
        // 返回文件 ID
        console.log("上传成功", res);
        //获取文件路径
        this.setData({
          "FormData.cover": res.fileID,
        });
        console.log(this.data);
      },
      fail: console.error,
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
});
