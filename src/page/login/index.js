import _ from "lodash";
import common from "../common";

function component() {
  var element = document.createElement("div");
  element.innerHTML = _.join(["Hello", "login"]);

  return element;
}

document.body.appendChild(component());
