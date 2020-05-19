import $ from "jquery";
import "./index.css";
import "page/common/nav-simple/index.js";
import mm from "util/mm.js";

 $(function() {
     const type = mm.getUrlParam("type")||"default";
     const $elem = $(`.${type}-success`);
     $elem.show();
 })