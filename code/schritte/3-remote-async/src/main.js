// polyfill for IE
require("es6-promise").polyfill();
require("whatwg-fetch");
// needed for async / await
require("babel-polyfill");

import React from "react";
import ReactDOM from "react-dom";

import GreetingController from "./GreetingController";

const mountNode = document.getElementById("mount");
ReactDOM.render(<GreetingController />, mountNode);
