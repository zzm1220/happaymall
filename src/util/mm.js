import $ from "jquery";
import Hogan from "hogan.js";

const config = {
  serverHost: ""
};

const mm = {
  // 网络请求
  request(params) {
    const self = this;
    $.ajax({
      type: params.methods || "GET",
      url: params.url || "",
      data: params.data || "",
      dataType: params.type || "json",
      success: function (res) {
        if (res.status === 0) {
          typeof params.success === "function" && params.success(res.data, res.msg);
        } // 没有登录，需要登录
        else if (res.status === 10) {
          self.doLogin();
        } // 请求数据错误
        else if (res.status === 1){
          typeof params.error === "function" && params.error(res.msg);
        }
      },
      error: function (err) {
          typeof params.error === "function" && params.error(err.statusText);
      },
    });
  },
  // 统一登录
  doLogin() {
    window.location.href = `./login.html?redirect=${encodeURIComponent(window.location.href)}`;
  },
  // 跳转主页
  goHome() {
    window.location.href = "./index.html";
  },
  // 获取后端接口地址
  getServerUrl(path) {
    return config.serverHost + path;
  },
  // 获取URL的参数
  getUrlParam(name) {
    // eg: www.baidu.com/index.html?query=123&page=1;
    const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
    var result = window.location.search.substr(1).match(reg);
    return result ? decodeURIComponent(result[2]) : "";
  },
  // 渲染html模版
  renderHtml(htmlTemplate, data) {
    const template = Hogan.compile(htmlTemplate);
    const result = template.render(data);
    return result;
  },
  // 成功提示
  successTips(msg) {
    alert(msg || "操作成功");
  },
  // 失败提示
  failTips(errMsg) {
    alert(msg || "出错啦");
  },
  // 验证 非空，手机，邮箱
  validate(val, type) {
    let value = $.trim(val);
    // 非空验证
    if (type === "require") {
      return !!value;
    }
    if (type === "phone") {
      return /^1\d{10}$/.test(value);
    }
    if (type === "email") {
      return /^[A-Za-z0-9]+([_\.][A-Za-z0-9]+)*@([A-Za-z0-9\-]+\.)+[A-Za-z]{2,6}$/.test(value);
    }
  }
};

export default mm;
