/* @refresh reload */
import { render } from "solid-js/web";

import "./index.css";
import App from "./App";
import { loadMathJax } from "./loadMathJax";

loadMathJax().then(() => {
  render(() => <App />, document.getElementById("root") as HTMLElement);
});
