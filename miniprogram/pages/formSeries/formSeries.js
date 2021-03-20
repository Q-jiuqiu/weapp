// miniprogram/pages/formSeries/formSeries.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    formData: {
      seriesName: {
        value: "",
        isError: false,
      },
      time: {
        value: "",
        isError: false,
      },
      shot: {
        value: "",
        isError: false,
      },
      negative: {
        value: false,
        isError: false,
      },
      makeUp: {
        value: false,
        isError: false,
      },
      extraCharge: {
        value: "",
        isError: false,
      },
      price: {
        value: "",
        isError: false,
      },
      refinement: {
        value: "",
        isError: false,
      },
      clothing: {
        value: "",
        isError: false,
      },
      album: {
        value: false,
        isError: false,
      },
      cover: {
        value: "",
        isError: false,
        message: "点击上传封面",
      },
      description: {
        value: "",
        isError: false,
      },
    },
  },
  // 校验表单每个值都输入
  check(data, type) {
    console.log(data);
    let flag = true;
    for (const key in data) {
      if (Object.hasOwnProperty.call(data, key)) {
        if (type == "upgrade") {
          if (data[key] === "") {
            console.log("ok");
            let type = `formData.${key}.isError`;
            this.setData({
              [type]: true,
            });
            flag = false;
          }
        } else if (type == "new") {
          if (!data[key].isError && data[key].value === "") {
            let type = `formData.${key}.isError`;
            this.setData({
              [type]: true,
            });
            flag = false;
          }
        }
      }
    }
    if (!flag) {
      wx.showToast({
        title: "请输入值",
        icon: "loading",
        duration: 1000,
      });
    }
    return flag;
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
    let cover = this.data.formData.cover.value;
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
          "formData.cover.value": res.fileID,
          "formData.cover.isError": false,
        });
        console.log(this.data);
        wx.showToast({
          title: "上传中",
          icon: "loading",
          duration: 1000,
        });
      },
      fail: console.error,
    });
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
    if (this.data.detail) {
      let isError = `formData.${type}.isError`;
      let typeValue = `detail.${type}`;
      if (value.length == 0) {
        if (type !== "description") {
          this.Debounce(() => {
            this.setData({
              [isError]: true,
              [typeValue]: "",
            });
          }, 800);
        }
      } else {
        this.Debounce(() => {
          this.setData({
            [isError]: false,
            [typeValue]: value,
          });
        }, 800);
      }
      console.log("new", this.data.detail);
    } else {
      let isError = `formData.${type}.isError`;
      let typeValue = `formData.${type}.value`;
      console.log(isError, typeValue);
      if (value.length == 0) {
        if (type !== "description") {
          this.Debounce(() => {
            this.setData({
              [isError]: true,
            });
          }, 800);
        }
      } else {
        this.Debounce(() => {
          this.setData({
            [isError]: false,
            [typeValue]: value,
          });
        }, 800);
      }
    }
  },
  //开关按钮的值
  switchChange(event) {
    //得到值
    var checkedValue = event.detail.value;
    let type = event.target.id;
    if (this.data.detail) {
      switch (type) {
        case "negative":
          this.setData({
            "formData.negative.isError": false,
            "detail.negative": checkedValue,
          });
          break;
        case "makeUp":
          this.setData({
            "formData.makeUp.isError": false,
            "detail.makeUp": checkedValue,
          });
          break;
        case "album":
          this.setData({
            "formData.album.isError": false,
            "detail.album": checkedValue,
          });
          break;
      }
    } else {
      switch (type) {
        case "negative":
          this.setData({
            "formData.negative.isError": false,
            "formData.negative.value": checkedValue,
          });
          break;
        case "makeUp":
          this.setData({
            "formData.makeUp.isError": false,
            "formData.makeUp.value": checkedValue,
          });
          break;
        case "album":
          this.setData({
            "formData.album.isError": false,
            "formData.album.value": checkedValue,
          });
          break;
      }
    }

    //打印输出
    console.info("当前开关按钮是否打开：" + checkedValue, type);
  },
  // 保存
  saveNewseries() {
    let detail = this.data.detail;
    let formData = this.data.formData;
    this.db = wx.cloud.database();
    this.seriesDB = this.db.collection("series");
    if (detail) {
      let id = detail._id;
      console.log(id);
      let isChecked = this.check(detail, "upgrade");
      console.log(isChecked);
      if (isChecked) {
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
          cover,
          album,
          description,
        } = detail;
        this.seriesDB
          .doc(id)
          .update({
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
              cover,
              album,
              description,
            },
          })
          .then((res) => {
            console.log(res);
            this.goToAdminSeries();
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } else {
      let isChecked = this.check(formData, "new");
      console.log(this.data.formData);
      if (isChecked) {
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
          cover,
          album,
          description,
        } = this.data.formData;
        this.seriesDB
          .add({
            data: {
              seriesName: seriesName.value,
              time: time.value,
              shot: shot.value,
              negative: negative.value,
              makeUp: makeUp.value,
              extraCharge: extraCharge.value,
              price: price.value,
              refinement: refinement.value,
              clothing: clothing.value,
              album: album.value,
              cover: cover.value,
              description: description.value,
            },
          })
          .then((res) => {
            wx.showToast({
              title: "上传成功",
            });
            this.goToAdminSeries();
          })
          .catch((err) => {
            console.log();
          });
      }
    }
  },
  // 跳转到管理套系页面
  goToAdminSeries() {
    wx.navigateTo({
      url: "/pages/adminSeries/adminSeries",
      success: function (res) {
        wx.setNavigationBarTitle({
          title: "套系管理",
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    wx.getStorage({
      key: "detail",
      success(res) {
        that.detail = res.data.formData;
        // console.log(res.data.formData);
        that.setData({
          detail: res.data.formData,
        });
      },
    });
  },

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
  onUnload: function () {
    // 清除derail缓冲避免影响新建套系的页面
    wx.removeStorage({
      key: "detail",
    });
  },

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
