// components/search/search.js
const app = getApp();

Component({
  /**
   * 组件的属性列表
   */

  properties: {
    list: {
      type: Object,
      default: {},
    },
    ok: {
      type: String,
      default: "haha",
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    // 作品
    photographyType: [
      {
        title: "全部",
        active: true,
        children: [
          "../../assets/images/xiezhen/christmas2.jpg",
          "../../assets/images/xiezhen/qipao1.jpg",
        ],
      },
      {
        title: "写真",
        active: true,
        children: [
          "../../assets/images/xiezhen/christmas2.jpg",
          "../../assets/images/xiezhen/qipao1.jpg",
        ],
      },
      {
        title: "证件",
        active: false,
        children: [
          "../../assets/images/marry/dengji1.jpg",
          "../../assets/images/marry/marry2.jpg",
        ],
      },
      {
        title: "结婚登记照",
        active: false,
        children: [
          "../../assets/images/ZhengJian/zhengjian1.jpg",
          "../../assets/images/ZhengJian/zhengjian2.jpg",
        ],
      },
      {
        title: "形象照",
        active: false,
        children: [
          "../../assets/images/xingxiang/xingxiang1.jpg",
          "../../assets/images/xingxiang/xingxiang2.jpg",
        ],
      },
    ],
    // 当前作品
    currentPage: 0,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // imageLoad: function (e) {
    //   //获取图片真实宽度
    //   var imgwidth = e.detail.width,
    //     imgheight = e.detail.height,
    //     //宽高比
    //     ratio = imgwidth / imgheight;
    //   console.log(imgwidth, imgheight);
    //   //计算的高度值
    //   var viewHeight = 750 / ratio;
    //   var imgheight = viewHeight;
    //   var imgheights = this.data.imgheights;
    //   //把每一张图片的对应的高度记录到数组里
    //   imgheights[e.target.dataset.id] = imgheight;
    //   this.setData({
    //     imgheights: imgheights,
    //   });
    // },
    // bindchange: function (e) {
    //   // console.log(e.detail.current)
    //   this.setData({
    //     current: e.detail.current,
    //   });
    // },
    /**
     * 点击切换一级页面
     */
    changeType(event) {
      let index = event.currentTarget.dataset.index;
      this.setData({
        currentPage: index,
      });
    },
  },
  lifetimes: {
    // created() {
    // console.log(app.appConfig);
    // this.setData({
    //   list: app.appConfig.photographyType,
    // });
    //   console.log(this.list);
    // },
  },
});
