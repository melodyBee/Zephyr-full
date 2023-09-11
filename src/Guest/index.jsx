import React from "react";
import SignLog from "./Pages/SignLog";
import Button from "react-bootstrap/esm/Button";
import NavGuest from "./Component/NavGuest";
import Footer from "./Component/Footer";
import HomeGuest from "./Pages/HomeGuest";
import { Link, Route, Routes } from "react-router-dom";
export default function Guest() {
  return (
    <>
      <NavGuest />
      <Routes>
        <Route path="/" element={<HomeGuest />} />
        <Route path="/SignLog" element={<SignLog />} />
        <Route path="*" element={<SignLog />} />
      </Routes>
      <Footer />
    </>
  );
}
