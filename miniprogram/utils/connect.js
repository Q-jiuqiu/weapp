// https://www.jb51.net/article/161545.htm 操作云数据库

// 先连接数据库。对小程序云数据库进行操作的时候，先获取数据库的引用。
const db = wx.cloud.database();
// 要操作数据库的一个集合时。也是需要先获取该集合的引用。
const admin = db.collection("quling");
let name = null;
let password = null;

// Page({
//   data: {},
//   //输入用户名
//   inputName: function (event) {
//     name = event.detail.detail.value;
//   },
//   //输入密码
//   inputPassword(event) {
//     password = event.detail.detail.value;
//   },

//   // .where({
//   //      _openid: app.globalData.openid  // 填入当前用户 openid
//   //   })

//   // wx.showModal({
//   //   title: '提示',
//   //   content: '您已注册，确定要更新账号密码吗？',
//   //   success: function (res) {
//   //     if (res.confirm) {
//   //       console.log('用户点击确定')
//   //       that.saveuserinfo();
//   //     }
//   //   }
//   // })

//   //注册
//   register() {
//     let that = this;
//     let flag = false; //是否存在 true为存在
//     //查询用户是否已经注册
//     admin.get({
//       success: (res) => {
//         let admins = res.data; //获取到的对象数组数据
//         //  console.log(admins);
//         for (let i = 0; i < admins.length; i++) {
//           //遍历数据库对象集合
//           if (name === admins[i].name) {
//             //用户名存在
//             flag = true;
//             //   break;
//           }
//         }
//         if (flag === true) {
//           //已注册
//           wx.showToast({
//             title: "账号已注册！",
//             icon: "success",
//             duration: 2500,
//           });
//         } else {
//           //未注册
//           that.saveuserinfo();
//         }
//       },
//     });
//   },

//   //注册用户信息
//   saveuserinfo() {
//     // let that = this;
//     admin
//       .add({
//         //添加数据
//         data: {
//           name: name,
//           password: password,
//         },
//       })
//       .then((res) => {
//         console.log("注册成功！");
//         wx.showToast({
//           title: "注册成功！",
//           icon: "success",
//           duration: 3000,
//         });
//         wx.redirectTo({
//           url: "/pages/login/login",
//         });
//       });
//   },
// });
