import mm from "util/mm";

const user = {
  logout: function (resolve, reject) {
    mm.request({
      url: mm.getServerUrl("/api/user/logout.do"),
      method: "POST",
      success: resolve,
      error: reject,
    });
  },
  checkLogin: function (resolve, reject) {
    mm.request({
      url: mm.getServerUrl("/api/user/get_user_info.do"),
      method: "GET",
      success: resolve,
      error: reject,
    });
  }
};

export default user;