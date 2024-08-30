import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
//import { Auth, Expense, Feedback, Home, Income } from "./pages/index.js";
import { Provider } from "react-redux";
import store from "./store/store.js";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path={"/"} element={<App />}>
      {/* <Route path="/" element={<Home />} /> */}
      {/* <Route path="/expenses" element={<Expense />} />
      <Route path="/incomes" element={<Income />} />
      <Route path="/feedback" element={<Feedback />} />
      <Route path="/auth" element={<Auth />} /> */}
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}>
        <App className="dark" />
      </RouterProvider>
    </Provider>
  </React.StrictMode>
);
