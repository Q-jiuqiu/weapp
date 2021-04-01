// 页面代码中
import { objToPath } from "./wx-updata/index"; // 你的库文件路径

export function upData(data) {
  return this.setData(objToPath(data));
}
