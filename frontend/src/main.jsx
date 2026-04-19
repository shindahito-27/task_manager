import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import {BrowserRouter} from "react-router-dom";
import {TaskProvider} from "./TaskContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <TaskProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </TaskProvider>
);
