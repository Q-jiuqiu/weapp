let appConfig = {
  // 摄影业务
  photographBusiness: [
    {
      title: "主页",
      pictureArr: [
        "https://7175-quling-wgzt3-1303088105.tcb.qcloud.la/assets/homePage/homePage1.jpg?sign=e25dc3365b5a066014cb7ed68e2995e7&t=1615602671",
        "https://7175-quling-wgzt3-1303088105.tcb.qcloud.la/assets/homePage/homePage2.jpg?sign=fec27e2b8e123c0b8512832aa7025154&t=1615602692",
        "https://7175-quling-wgzt3-1303088105.tcb.qcloud.la/assets/homePage/homePage3.jpg?sign=8225ddc7df13703d00ad794a90d69920&t=1615602704",
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
          src:
            "https://7175-quling-wgzt3-1303088105.tcb.qcloud.la/assets/images/cover/social.png?sign=a418456e23abefd4c950deccd0ac822e&t=1615602829",
        },
        {
          title: "结婚登记照，情侣照，花絮照",
          name: "lovers",
          time: "2019-9-14",
          src:
            "https://7175-quling-wgzt3-1303088105.tcb.qcloud.la/assets/images/cover/lovers.png?sign=35e2f2792c07f448436b1ee3f829efc9&t=1615602857",
        },
        {
          title: "最美证件照",
          name: "certificates",
          time: "2019-9-14",
          src:
            "https://7175-quling-wgzt3-1303088105.tcb.qcloud.la/assets/images/cover/figure.png?sign=f49bfa75c5a100534cd6f1ea62f21feb&t=1615602878",
        },
        {
          title: "结婚登记照",
          name: "marry",
          time: "2019-9-14",
          src:
            "https://7175-quling-wgzt3-1303088105.tcb.qcloud.la/assets/images/cover/marry.png?sign=7c6835ad0d402dcc7374e508805b15d6&t=1615602840",
        },
        {
          title: "职业形象照",
          name: "figure",
          time: "2019-9-14",
          src:
            "https://7175-quling-wgzt3-1303088105.tcb.qcloud.la/assets/images/cover/certificates.png?sign=2433934a272d3b2952630aaea587e66a&t=1615602887",
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
          src:
            "cloud://quling-wgzt3.7175-quling-wgzt3-1303088105/assets/images/cover/social.png",
        },
        {
          title: "结婚登记照，情侣照，花絮照",
          name: "lovers",
          time: "2019-9-14",
          src:
            "cloud://quling-wgzt3.7175-quling-wgzt3-1303088105/assets/images/cover/lovers.png",
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
          src:
            "cloud://quling-wgzt3.7175-quling-wgzt3-1303088105/assets/images/cover/certificates.png",
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
          src:
            "cloud://quling-wgzt3.7175-quling-wgzt3-1303088105/assets/images/cover/marry.png",
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
          src:
            "cloud://quling-wgzt3.7175-quling-wgzt3-1303088105/assets/images/cover/figure.png",
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
      "https://7175-quling-wgzt3-1303088105.tcb.qcloud.la/assets/images/figure/01.jpeg?sign=284ab9c739c48ea30bb3f850c99b29e9&t=1615602925",
      "https://7175-quling-wgzt3-1303088105.tcb.qcloud.la/assets/images/figure/02.jpeg?sign=fc4aad7d47531e22fd77a54858377bb7&t=1615602934",
      "https://7175-quling-wgzt3-1303088105.tcb.qcloud.la/assets/images/figure/03.jpeg?sign=da874744e3dc6c998ee1c6c49dce2fc7&t=1615602941",
      "https://7175-quling-wgzt3-1303088105.tcb.qcloud.la/assets/images/figure/04.jpeg?sign=b09d3815c0b7a433a3bb458f05804c31&t=1615602948",
      "https://7175-quling-wgzt3-1303088105.tcb.qcloud.la/assets/images/figure/05.jpeg?sign=b15255acd804c450cf921ceaab090e20&t=1615602955",
    ],
  },
  // 结婚登记照
  marry: {
    description:
      "“我爱你”需要仪式感莫过于对彼此说出「我愿意」而为此携手走进婚姻的那一场婚礼结婚证上  一张24平方厘米的照片这辈子   一个和你一起到老的决定",
    discover: {},
    imgArr: [
      "https://7175-quling-wgzt3-1303088105.tcb.qcloud.la/assets/images/marry/01.jpeg?sign=78eb915d282a14c407b946bb4444ce31&t=1615603015",
      "https://7175-quling-wgzt3-1303088105.tcb.qcloud.la/assets/images/marry/02.jpeg?sign=4737cc71d431afe189c0b78bc9d2f678&t=1615603025",
      "https://7175-quling-wgzt3-1303088105.tcb.qcloud.la/assets/images/marry/03.jpg?sign=e065d8426c4de3f726297b5526854f7b&t=1615603033",
    ],
  },
  // 情侣照
  lovers: {
    description:
      "我想和你一起生活在某个小镇，开一家甜品店每天听着绵绵不绝的钟声像时间轻轻滴落我们倚着对方慵懒的望着窗外，这就是生活",
    discover: {},
    imgArr: [
      "https://7175-quling-wgzt3-1303088105.tcb.qcloud.la/assets/images/lovers/01.jpeg?sign=c6ee1d359f37cc9ab0724a29be03c8e1&t=1615602977",
      "https://7175-quling-wgzt3-1303088105.tcb.qcloud.la/assets/images/lovers/02.jpeg?sign=e512d037497b419fab941397422b3a35&t=1615602984",
      "https://7175-quling-wgzt3-1303088105.tcb.qcloud.la/assets/images/lovers/03.jpeg?sign=8936580c971b78069f29c97c0955cb80&t=1615602992",
      "https://7175-quling-wgzt3-1303088105.tcb.qcloud.la/assets/images/lovers/04.jpeg?sign=0a9ae144acf6f4f74fa2f1a72eed06ec&t=1615602999",
    ],
  },
  // 证件照
  certificates: {
    description:
      "拍证件照是最日常、最简单，却最有仪式感的事。入学时、入职时、考出证书时、结婚登记时，证件照记录着生活中每个片段的每一次蜕变时刻。在廿一，我们全心为您记录下，属于您自己的自信和美好时刻。",
    discover: {},
    imgArr: [
      "https://7175-quling-wgzt3-1303088105.tcb.qcloud.la/assets/images/certificates/01.jpeg?sign=0f70143c741e3ce1eeb16e40024bb015&t=1615602750",
      "https://7175-quling-wgzt3-1303088105.tcb.qcloud.la/assets/images/certificates/02.jpeg?sign=339ed2e1a2faa18a71c81a6f66087063&t=1615602761",
      "https://7175-quling-wgzt3-1303088105.tcb.qcloud.la/assets/images/certificates/03.jpeg?sign=2626bbfd16b37cad84b7d558eb73b6cf&t=1615602768",
      "https://7175-quling-wgzt3-1303088105.tcb.qcloud.la/assets/images/certificates/04.jpeg?sign=740d9355b0cd41df3f11ca5cd53cac1a&t=1615602775",
      "https://7175-quling-wgzt3-1303088105.tcb.qcloud.la/assets/images/certificates/04.jpeg?sign=0875b42301f0a881bcc2bb3e7bba1f03&t=1615602785",
      "https://7175-quling-wgzt3-1303088105.tcb.qcloud.la/assets/images/certificates/06.jpg?sign=06dc12967c2268f329cf2b8356a6f6b4&t=1615602798",
    ],
  },
  // 社交照
  social: {
    description: "你嘴角上扬的弧度就是最好的妆容。",
    discover: {},
    imgArr: [
      "https://7175-quling-wgzt3-1303088105.tcb.qcloud.la/assets/images/social/02.jpeg?sign=ffd25728e12a24658bacfc2f60a2e35b&t=1615603052",
      "https://7175-quling-wgzt3-1303088105.tcb.qcloud.la/assets/images/social/03.jpeg?sign=6b34d6b6243c958a865ef51653b3c9a1&t=1615603058",
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
  logo:
    "https://7175-quling-wgzt3-1303088105.tcb.qcloud.la/assets/logo.jpg?sign=ea9cc78e0146bdcdaaaeef4907574cbb&t=1615603341",
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
