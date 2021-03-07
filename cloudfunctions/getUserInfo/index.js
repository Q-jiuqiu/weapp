// // 云函数入口文件
// const cloud = require('wx-server-sdk')

// cloud.init()

// // 云函数入口函数
// exports.main = async (event, context) => {
//   const wxContext = cloud.getWXContext()

//   return {
//     event,
//     openid: wxContext.OPENID,
//     appid: wxContext.APPID,
//     unionid: wxContext.UNIONID,
//   }
// }

const appid = 'wxffcb16e6a6881133'; //你的小程序appid
const secret = 'eab93bee91c243055aaecb4bb3b912df'; //你的小程序密钥secret，可以在小程序后台中获取

const envid = "quling"; //云环境id
const cloud = require('wx-server-sdk');
const TcbRouter = require('tcb-router'); //云函数路由
const rq = require('request');
const wxurl = 'https://api.weixin.qq.com';
// var WXBizDataCrypt = require('./RdWXBizDataCrypt') // 用于手机号解密
cloud.init({
  env: envid
})
const db = cloud.database();
const _ = db.command;
// 云函数入口函数
exports.main = async (event, context) => {

  const app = new TcbRouter({
    event
  });
  //获取电话号码
  app.router('phone', async (ctx) => {
    ctx.body = new Promise(resolve => {
      rq({
        url: wxurl + '/sns/jscode2session?appid=' + appid + '&secret=' + secret + '&js_code=' + event.code + '&grant_type=authorization_code',
        method: "GET",
        json: true,
      }, function (error, response, body) {
        console.log(error, response, body);
        // const decrypt1 = new WXBizDataCrypt(appid, body.session_key) // -解密第一步
        // const decrypt2 = decrypt1.decryptData(event.encryptedData, event.iv) // 解密第二步*/
        // resolve(
        //   ctx.body = {
        //     decrypt2
        //   }
        // )
      });
    });
  });
}