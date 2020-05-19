import $ from "jquery";
import mm from "util/mm";
import user from "service/user-service";
import cart from "service/cart-service";
import "./index.css";

const nav = {
    init: function() {
        this.bindEvent();
        this.loadUserInfo();
        this.loadCartCount();
        return this;
    },
    // 绑定事件
    bindEvent: function() {
        $(".js-login").click(function() {
            mm.doLogin();
        });
        $(".js-register").click(function(){
            window.location.href = "./register.html";
        });
        $(".js-logout").click(function(){
            user.logout(function(res) {
                window.location.reload();
            }, function(errMsg) {
                mm.failTips(errMsg)
            });
        });
    },
    // 加载用户信息
    loadUserInfo: function() {
        user.checkLogin(function(res){
            $(".user.not-login")
                .hide()
                .siblings(".user.login").show()
                .find(".username").text(res.username);
        },function(errMsg) {
            // do nothing
        });
    },
    // 加载购物车数量
    loadCartCount: function() {
        cart.getCartCount(function(res){
            $(".nav .cart-count").text(res || 0 );
        }, function(err){
            $(".nav .cart-count").text(0);
        })
    }
}

export default nav.init();