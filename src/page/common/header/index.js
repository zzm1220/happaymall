import $ from "jquery";
import "./index.css";
import mm from "util/mm";

const header = {
    init: function() {
        this.onLoad();
        this.bindEvent();
    },
    onLoad: function () {
        let keyword = mm.getUrlParam("keyword");
        if (keyword) {
            $("#search-input").val(keyword);
        }
    },
    bindEvent: function () {
        const self = this;
        $("#search-btn").click(function() {
            self.searchSubmit();
        });
        $("#search-input").keyup(function(event) {
            if (event.keyCode === 13) {
                self.searchSubmit();
            }
        })
    },
    searchSubmit: function () {
        const keyword = $.trim($("#search-input").val());
        console.log(keyword);
        if(keyword) {
            window.location.href = `./list.html?keyword=${keyword}`;
        } else {
            mm.goHome();
        }
    }

};

header.init();