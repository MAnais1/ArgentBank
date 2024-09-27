import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./store/authSlice";

import Home from "./Pages/Home";
import User from "./Pages/User";
import SignIn from "./Pages/SignIn";
import Footer from "./components/Footer";
import Header from "./components/Header";


const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      {" "}
      <Provider store={store}>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/sign-in" element={<SignIn />} />
          <Route
            path="/user"
            element={
              
                <User />
              
            }
          />
        </Routes>
        <Footer />
      </Provider>
    </Router>
  </React.StrictMode>
);
