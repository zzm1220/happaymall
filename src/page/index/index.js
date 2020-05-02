import _ from "lodash";
import add from "../common";
import "./style.css";
import football from "../../images/football.jpg";

 function component() {
    var element = document.createElement("div");
    element.innerHTML = _.join(["Hello", "webpack"], add(1, 2));
    element.classList.add("hello");
    var myIcon = new Image();
    myIcon.src = football;
    element.appendChild(myIcon);
    return element;
 };

 document.body.appendChild(component());