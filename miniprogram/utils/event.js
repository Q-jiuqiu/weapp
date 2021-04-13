/**
 * 获取节点的dataset数据
 * @param {dom} event dom节点
 * @param {string} type 查询值
 * @returns
 */
export function getData(event, type) {
  return event.currentTarget.dataset[type];
}

/**
 * 获取节点的id
 * @param {dom} event dom节点
 * @returns 节点id
 */
export function getId(event) {
  return event.target.id;
}
/**
 * 用于监听自定义事件
 * @param {dom} event dom节点
 * @returns
 */
export function getDetail(event) {
  return event.detail;
}
