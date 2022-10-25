import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import NProgress from "nprogress";
import { Provider } from "react-redux";

import store from "src/redux/store";
import AppRoutes from "./routes";

import "bootstrap/dist/css/bootstrap.min.css";
import "nprogress/nprogress.css";
import "react-notifications/lib/notifications.css";
import "react-datepicker/dist/react-datepicker.css";
import "./styles/App.scss";


NProgress.configure({ minimum: 1 });

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </Provider>
  );
}

const ROOT = document.getElementById("root");
ReactDOM.render(<App />, ROOT);
