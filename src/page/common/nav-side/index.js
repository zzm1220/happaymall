import $ from "jquery";
import "./index.css";
import mm from "util/mm";
import templateIndex from "./index.string";

const navSide = {
  option: {
    name: "user-center",
    navList: [
      {
        name: "user-center",
        desc: "个人中心",
        href: "./user-center.html",
      },
      {
        name: "order-list",
        desc: "我的订单",
        href: "./order-list.html",
      },
      {
        name: "pass-update",
        desc: "修改密码",
        href: "./pass-update.html",
      },
      {
        name: "about",
        desc: "关于MMall",
        href: "./about.html",
      },
    ],
  },
  init: function (option) {
      console.log(option)
    $.extend(this.option, option);
    this.renderNav();
  },
  renderNav: function () {
    for (
      var i = 0, navLength = this.option.navList.length;
      i < navLength;
      i++
    ) {
      if (this.option.navList[i].name === this.option.name) {
        this.option.navList[i].isActive = true;
      }
    }
    const navHtml = mm.renderHtml(templateIndex, {
      navList: this.option.navList
    });
    $(".nav-side").html(navHtml);
  },
};

export default navSide;
