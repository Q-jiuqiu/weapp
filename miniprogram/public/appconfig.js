let appConfig = {
  // 摄影业务
  photographBusiness: [
    {
      title: "主页",
      pictureArr: [
        "../../assets/homePage/homePage1.jpg",
        "../../assets/homePage/homePage2.jpg",
        "../../assets/homePage/homePage3.jpg",
      ],
    },
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
      cover: [
        {
          title: "社交头像照",
          name: "social",
          time: "2019-9-14",
          src: "../../assets/images/cover/social.png",
        },
        {
          title: "结婚登记照，情侣照，花絮照",
          name: "lovers",
          time: "2019-9-14",
          src: "../../assets/images/cover/lovers.png",
        },
        {
          title: "最美证件照",
          name: "certificates",
          time: "2019-9-14",
          src: "../../assets/images/cover/certificates.png",
        },
        {
          title: "结婚登记照",
          name: "marry",
          time: "2019-9-14",
          src: "../../assets/images/cover/marry.png",
        },
        {
          title: "职业形象照",
          name: "figure",
          time: "2019-9-14",
          src: "../../assets/images/cover/figure.png",
        },
      ],
    },
    {
      title: "写真",
      active: false,
      cover: [
        {
          title: "社交头像照",
          time: "2019-9-14",
          name: "social",
          src: "../../assets/images/cover/social.png",
        },
        {
          title: "结婚登记照，情侣照，花絮照",
          name: "lovers",
          time: "2019-9-14",
          src: "../../assets/images/cover/lovers.png",
        },
      ],
    },
    {
      title: "证件",
      active: false,
      cover: [
        {
          title: "最美证件照",
          time: "2019-9-14",
          name: "certificates",
          src: "../../assets/images/cover/certificates.png",
        },
      ],
    },
    {
      title: "结婚登记照",
      active: false,
      cover: [
        {
          title: "结婚登记照",
          time: "2019-9-14",
          name: "marry",
          src: "../../assets/images/cover/marry.png",
        },
      ],
    },
    {
      title: "形象照",
      active: false,
      cover: [
        {
          title: "职业形象照",
          time: "2019-9-14",
          name: "figure",
          src: "../../assets/images/cover/figure.png",
        },
      ],
    },
  ],
  // 形象照
  figure: {
    description:
      "#你与HR面试之间就差一张简历照#为了让简历在HR面前脱颖而出 ，求职者们往往会专门拍摄一张证件照或照。作为简历照 增加面试的几率",
    discover: {},
    imgArr: [
      "../../assets/images/figure/01.jpeg",
      "../../assets/images/figure/02.jpeg",
      "../../assets/images/figure/03.jpeg",
      "../../assets/images/figure/04.jpeg",
      "../../assets/images/figure/05.jpeg",
    ],
  },
  // 结婚登记照
  marry: {
    description:
      "“我爱你”需要仪式感莫过于对彼此说出「我愿意」而为此携手走进婚姻的那一场婚礼结婚证上  一张24平方厘米的照片这辈子   一个和你一起到老的决定",
    discover: {},
    imgArr: [
      "../../assets/images/marry/01.jpeg",
      "../../assets/images/marry/02.jpeg",
      "../../assets/images/marry/03.jpg",
    ],
  },
  // 情侣照
  lovers: {
    description:
      "我想和你一起生活在某个小镇，开一家甜品店每天听着绵绵不绝的钟声像时间轻轻滴落我们倚着对方慵懒的望着窗外，这就是生活",
    discover: {},
    imgArr: [
      "../../assets/images/lovers/01.jpeg",
      "../../assets/images/lovers/02.jpeg",
      "../../assets/images/lovers/03.jpeg",
      "../../assets/images/lovers/04.jpeg",
    ],
  },
  // 证件照
  certificates: {
    description:
      "拍证件照是最日常、最简单，却最有仪式感的事。入学时、入职时、考出证书时、结婚登记时，证件照记录着生活中每个片段的每一次蜕变时刻。在廿一，我们全心为您记录下，属于您自己的自信和美好时刻。",
    discover: {},
    imgArr: [
      "../../assets/images/certificates/01.jpeg",
      "../../assets/images/certificates/02.jpeg",
      "../../assets/images/certificates/03.jpeg",
      "../../assets/images/certificates/04.jpeg",
      "../../assets/images/certificates/05.jpeg",
      "../../assets/images/certificates/06.jpeg",
    ],
  },
  // 社交照
  social: {
    description: "你嘴角上扬的弧度就是最好的妆容。",
    discover: {},
    imgArr: [
      "../../assets/images/social/02.jpeg",
      "../../assets/images/social/03.jpeg",
    ],
  },
  timeSlider: [
    "9:00",
    "9:00",
    "9:00",
    "9:00",
    "9:00",
    "9:00",
    "9:00",
    "9:00",
    "9:00",
    "9:00",
    "9:00",
    "9:00",
    "9:00",
    "9:00",
    "9:00",
    "9:00",
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
