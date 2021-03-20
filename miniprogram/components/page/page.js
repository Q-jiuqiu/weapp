// components/page/page.js
import { getId } from "../../utils/event";

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    total: {
      type: Number,
      default: 0,
    },
    current: {
      type: Number,
      default: 1,
    },
    page: {
      type: Number,
      default: 1,
    },
    isRight: {
      type: Boolean,
      default: false,
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    left: "<",
    right: ">",
    isLeft: true,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 触发页面改变
    changPage(event) {
      let type = getId(event);
      let page = this.data.page;
      let current = this.data.current;
      let isLeft = true,
        isRight = false;
      if (type === "left") {
        if (current >= 2) {
          isLeft = true;
          isRight = false;
          current--;
        }
      } else {
        if (current + 1 >= page) {
          console.log("ok");
          isRight = true;
          isLeft = false;
        }
        if (current + 1 <= page) {
          current++;
        }
      }
      this.setData({
        isLeft,
        isRight,
        current,
      });
      this.triggerEvent("changePage", current);
    },
  },
});
