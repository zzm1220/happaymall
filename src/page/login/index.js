import _ from "lodash";
import add from "../common";

function component() {
  var element = document.createElement("div");
  element.innerHTML = _.join(["Hello", "login"], add(3, 4));

  return element;
}

document.body.appendChild(component());
