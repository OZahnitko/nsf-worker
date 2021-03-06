import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import { theme } from "./theme";

ReactDOM.render(
  <React.StrictMode>
    <theme.GlobalStyle />
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
