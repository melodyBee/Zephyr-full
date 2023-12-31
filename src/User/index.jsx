import React from "react";
import Home from "./Pages/HomeUser";
import UserNav from "./Component/UserNav";
import { Route, Routes } from "react-router-dom";
import Products from "./Pages/Products";
import Footer from "../Components/Footer";
export default function User() {
  return (
    <>
      <>
        {/* we need a chat option also review and add to faves and add to cart */}

        <UserNav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Products" element={<Products />} />
          <Route path="/" element={<Home />} />
          <Route path="/" element={<Home />} />
        </Routes>
        <Footer />
      </>
    </>
  );
}
