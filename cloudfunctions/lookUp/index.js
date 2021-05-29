// 云函数入口文件
// 云函数入口文件
const cloud = require("wx-server-sdk");
cloud.init();
//初始化数据库
const db = cloud.database();
const _ = db.command;
const $ = _.aggregate;

// 云函数入口函数
exports.main = async (event, context) => {
  return await db
    .collection("orders")
    .aggregate()
    .lookup({
      from: "series",
      localField: "serverId",
      foreignField: "_id",
      as: "orderList",
    })
    .match({
      ...event.condition,
    })
    .sort({
      serverTime: 1,
    })
    .end();
};
