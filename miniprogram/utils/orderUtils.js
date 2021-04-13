import { ordersDB, seriesDB } from "./DBcollection";

/**
 * 获取套系数据
 * @param {*} that 页面实例
 */
export function getSeries(that) {
  seriesDB
    .get()
    .then((res) => {
      that.setData({
        seriesData: res.data,
      });
      getNameList(that);
    })
    .catch((err) => {
      console.log(err);
    });
}

// 获取套系名称列表
function getNameList(that) {
  let dataArr = that.data.seriesData;
  let photographyType = [];
  dataArr.forEach((item) => {
    photographyType.push({
      name: item.seriesName,
      id: item._id,
      count: item.count,
      no: true,
    });
  });
  that.setData({
    photographyType,
  });
}

/**
 * 获取相应类型的订单数据
 * @param {*} that 页面实例
 */
export function getOrderById(that, typeId, index, ok = false) {
  console.log(that, typeId, index, ok);
  let photographyType = that.data.photographyType;
  ordersDB
    .where({
      serverId: typeId,
      ok,
    })
    .get()
    .then((res) => {
      console.log(res);
      photographyType[index].children = res.data;
      that.setData({
        // ordersData: res.data,
        photographyType,
      });
      // getNameList();
      console.log(that.data);
    })
    .catch((err) => {
      console.log(err);
    });
}
