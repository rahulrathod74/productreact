import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";

import Product from "../pages/Product";
import Login from "../pages/Login";
import PrivateRoute from "./PrivateRoute";
const AllRoutes = () => {
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        
       
        <Route
          path="/product"
          element={
            <PrivateRoute>
              <Product />
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
};

export default AllRoutes;
