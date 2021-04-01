// components/bottom/bottom.js
import { getData } from "../../utils/event";
const app = getApp();
Component({
  // 使自定义组件可以使用app.wxss里的样式
  options: {
    addGlobalClass: true,
    multipleSlots: true, // 启用插槽
  },
  /**
   * 组件的属性列表
   */
  properties: {
    type: {
      type: String,
      default: "submit"
    }
  },

  /**
   * 组件的初始数据
   */
  data: {},

  /**
   * 组件的方法列表
   */
  methods: {
    // 点击复制号码
    handleClick() {
      this.triggerEvent("SubmitForm");
    },
  },
});
