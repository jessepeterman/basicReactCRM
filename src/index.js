import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import MainApp from "./MainApp";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(<MainApp />, document.getElementById("root"));
registerServiceWorker();
