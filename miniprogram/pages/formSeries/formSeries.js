// miniprogram/pages/formSeries/formSeries.js
import { seriesDB } from "../../utils/DBcollection";
import navigateBack from "../../utils/navigateBack";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    error: "",
    tipsErr: "error",
    isDisabled: false,
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
    let flag = true;
    for (const key in data) {
      if (Object.hasOwnProperty.call(data, key)) {
        if (type == "upgrade") {
          if (data[key] === "" && key != "description") {
            console.log(key, "-", data[key]);
            let type = `formData.${key}.isError`;
            this.setData({
              [type]: true,
            });
            flag = false;
          }
        } else if (type == "new") {
          !data[key].isError, data[key].value === "";
          debugger;
          if (key != "description") {
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
    }
    if (!flag) {
      this.setData({ tipsErr: "error", error: "请输入值" });
    }
    return flag;
  },
  //上传文件
  upload() {
    //把this赋值给that，就相当于that的作用域是全局的。
    let that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ["original", "compressed"],
      sourceType: ["album", "camera"],
      success(res) {
        that.uploadImage(res.tempFilePaths[0]);
      },
    });
  },
  uploadImage(fileURL) {
    let cover = this.data.formData.cover.value;
    if (cover !== "") {
      wx.cloud.deleteFile({
        fileList: [cover],
        success: (res) => {},
        fail: console.error,
      });
    }
    wx.cloud.uploadFile({
      cloudPath: new Date().getTime() + ".jpg", // 上传至云端的路径
      filePath: fileURL, // 小程序临时文件路径
      success: (res) => {
        // 返回文件 ID
        //获取文件路径
        wx.cloud.getTempFileURL({
          fileList: [res.fileID],
          success: (res) => {
            // get temp file UR
            this.setData({
              "formData.cover.value": res.fileList[0].tempFileURL,
              "detail.cover": res.fileList[0].tempFileURL,
              "formData.cover.isError": false,
            });
          },
          fail: (err) => {
            // handle error
          },
        });
        //  ;

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
      let typeValue = `formData.${type}.value`;
      let detail = `detail.${type}`;
      if (value.length == 0) {
        if (type !== "description") {
          this.Debounce(() => {
            this.setData({
              [isError]: true,
              [typeValue]: value,
              [detail]: value,
            });
          }, 300);
        } else {
          console.log("描述");
          this.Debounce(() => {
            this.setData({
              [isError]: false,
              [typeValue]: value,
              [detail]: value,
            });
          }, 300);
        }
      } else {
        this.Debounce(() => {
          this.setData({
            [isError]: false,
            [typeValue]: value,
            [detail]: value,
          });
        }, 300);
      }
    } else {
      let isError = `formData.${type}.isError`;
      let typeValue = `formData.${type}.value`;
      if (value.length == 0) {
        if (type !== "description") {
          this.Debounce(() => {
            this.setData({
              [isError]: true,
              [typeValue]: value,
              [detail]: value,
            });
          }, 300);
        }
      } else {
        this.Debounce(() => {
          this.setData({
            [isError]: false,
            [typeValue]: value,
            [detail]: value,
          });
        }, 300);
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
  async saveNewseries() {
    let { detail, formData } = this.data;
    if (detail._id) {
      let id = detail._id;
      let isChecked = this.check(detail, "upgrade");
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
        await seriesDB.doc(id).update({
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
        });
        this.setData({ tipsErr: "info", error: "修改成功", isDisabled: true });
        this.goToAdminSeries();
      }
    } else {
      let isChecked = this.check(formData, "new");
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
        } = formData;
        await seriesDB.add({
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
        });
        this.setData({ tipsErr: "info", error: "上传成功", isDisabled: true });
        this.goToAdminSeries();
      }
    }
  },
  // 跳转到管理套系页面
  goToAdminSeries() {
    navigateBack({
      url: "/pages/adminSeries/adminSeries",
      urlTitle: "套系管理",
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let that = this;
    wx.getStorage({
      key: "detail",
      success({ data }) {
        that.setData({
          detail: data.formData,
          pageType: options.type,
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
