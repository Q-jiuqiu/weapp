let appConfig = {
  // 摄影业务
  photographBusiness: [
    { title: "主页" },
    {
      title: "作品",
      children: [
        { title: "全部" },
        { title: "写真" },
        { title: "证件" },
        { title: "结婚登记照" },
        { title: "形象照" },
      ],
    },
    {
      title: "套系",
      children: [
        { title: "证件照" },
        { title: "结婚登记照" },
        { title: "形象照" },
        { title: "情侣" },
        { title: "写真" },
        { title: "主题写真" },
        { title: "婚纱" },
      ],
    },
    { title: "关于" },
  ],
  // 摄影类型
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
  logo: "../../assets/logo.jpg",
  activities: [
    {
      title: "跨年主题摄影活动",
      time: "2020/12/27-2021/1/5",
      content: "活动1",
      hot: true,
      limitTime: true,
    },
    {
      title: "跨摄影活动",
      time: "2020/12/27-2021/1/5",
      content: "活动2",
      hot: true,
      limitTime: false,
    },
    {
      title: "跨动",
      time: "2020/12/27-2021/1/5",
      content: "活动3",
      hot: false,
      limitTime: true,
    },
    {
      title: "跨年主题摄影活动",
      time: "2020/12/27-2021/1/5",
      content: "活动1",
      hot: true,
      limitTime: true,
    },
    {
      title: "跨摄影活动",
      time: "2020/12/27-2021/1/5",
      content: "活动2",
      hot: false,
      limitTime: false,
    },
    {
      title: "跨动",
      time: "2020/12/27-2021/1/5",
      content: "活动3",
      hot: false,
      limitTime: true,
    },
    {
      title: "跨年主题摄影活动",
      time: "2020/12/27-2021/1/5",
      content: "活动1",
      hot: true,
      limitTime: false,
    },
    {
      title: "跨摄影活动",
      time: "2020/12/27-2021/1/5",
      content: "活动2",
      hot: false,
      limitTime: true,
    },
    {
      title: "跨动",
      time: "2020/12/27-2021/1/5",
      content: "活动3",
      hot: false,
      limitTime: false,
    },
  ],
  searchHistory: ["古风主题", "和服主题", "111"],
};

module.exports = appConfig;
