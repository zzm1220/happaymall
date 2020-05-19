import mm from "util/mm";

const cart = {
    getCartCount: function(resolve, reject) {
        mm.request({
          url: mm.getServerUrl("/api/cart/get_cart_product_count.do"),
          success: resolve,
          error: reject,
        }); 
    }
}

export default cart;