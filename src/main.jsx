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
import { Home, Notes, Requests, Leaderboard, NotesByTeachers, Review, Auth } from "./pages/index.js";
import { Provider } from "react-redux";
import store from "./store/store.js";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path={"/"} element={<App />}>
      <Route path="/" element={<Home />} />
      <Route path="/notes" element={<Notes />} />
      <Route path="/requests" element={<Requests />} />
      <Route path="/leaderboard" element={<Leaderboard />} />
      <Route path="/notesByTeachers" element={<NotesByTeachers />} />
      <Route path="/reviews" element={<Review />} />
      <Route path="/auth" element={<Auth />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </Provider>
  </React.StrictMode>
);
