// miniprogram/pages/addSeries/addSeries.js
import { seriesDB, ordersDB } from "../../utils/DBcollection";
import { getData } from "../../utils/event";
import redirectTo from "../../utils/redirectTo";
import navigateTo from "../../utils/navigateTo";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    current: 1,
    total: 0,
    count: 3,
    toolList: [
      { title: "搜索", icon: "icon-search" },
      { title: "新增", icon: "icon-jia" },
    ],
    isSearch: false,
    showLoading: true,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.setData({
      search: this.search.bind(this),
    });
  },
  // 处理adminTool的事件
  handleClick(data) {
    let type = data.detail;
    if (type == "搜索") {
      this.setData({ isSearch: true });
    } else {
      navigateTo({
        url: "/pages/formSeries/formSeries",
        urlTitle: "修改套系",
      });
    }
  },
  // 取消输入框
  handleCancel() {
    this.setData({
      isSearch: false,
    });
  },
  // 按套系名称进行模糊搜索
  search(value) {
    return new Promise((resolve) => {
      seriesDB
        .where({
          seriesName: {
            $regex: ".*" + value + ".*", //‘.*’等同于SQL中的‘%’
            $options: "i",
          },
        })
        .get()
        .then(({ data }) => {
          let resultList = [];
          if (data.length > 0) {
            data.forEach((series) => {
              resultList.push({
                text: series.seriesName,
                formData: series,
              });
            });
          } else {
            resultList.push({
              text: "无匹配数据",
            });
          }
          resolve(resultList);
        });
    });
  },
  // 选择查询结果
  selectResult: function (e) {
    let detail = e.detail.item.formData;
    if (detail) {
      wx.setStorage({
        key: "detail",
        data: { formData: detail },
      });
      navigateTo({ url: "/pages/formSeries/formSeries", urlTitle: "修改套系" });
    }
  },
  //回到顶部
  goTop() {
    // 一键回到顶部
    if (wx.pageScrollTo) {
      wx.pageScrollTo({
        scrollTop: 0,
      });
    }
  },
  // 获取分页组件的当前页
  changePage(data) {
    let now = this.data.current;
    let current = data.detail;
    if (now == current) {
      return;
    }
    this.setData({
      current,
    });
    this.goTop();
    this.init();
  },

  // 获取数据库总条数用于分页查询
  getTotal() {
    let that = this;
    seriesDB.count({
      success(res) {
        let page = Math.ceil(res.total / that.data.count);
        that.setData({
          total: res.total,
          page,
        });
      },
    });
  },
  // 初始化列表
  async init() {
    this.setData({ showLoading: true });
    let { current, count } = this.data;
    this.getTotal();
    let { data } = await seriesDB
      .skip((current - 1) * count)
      .limit(current * count)
      .get();
    this.setData({ list: data, showLoading: false });
  },
  // 跳转到增加套系页
  goToFormSeries() {
    wx.redirectTo({
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
  async delete(event) {
    let that = this;
    let index = getData(event, "index");
    let id = this.data.list[index]._id;
    let { data } = await ordersDB.where({ serverId: id }).get();
    if (data && data.length > 0) {
      that.setData({
        error: "该套系主题已被预约",
      });
      return;
    }
    let title = `删除"${this.data.list[index].seriesName}"套系`;
    wx.showModal({
      title,
      content: "确认删除?",
      success(res) {
        if (res.confirm) {
          seriesDB
            .doc(id)
            .remove()
            .then((res) => {
              that.init();
            });
        } else {
          console.log("用户取消操作");
        }
      },
    });
  },
  // 修改套系
  upgrade(event) {
    let index = getData(event, "index");
    let detail = { formData: this.data.list[index] };
    wx.setStorage({
      key: "detail",
      data: detail,
    });
    navigateTo({
      url: "/pages/formSeries/formSeries?type=change",
      urlTitle: "修改套系",
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
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
