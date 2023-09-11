import React from "react";
import Parallax from "../Component/Parallax";
import About from "../Component/About";
import Footer from "../../Components/Footer";
import Productscarousel from "../Component/Productscarousel";

export default function HomeGuest() {
  return (
    <>
      <Parallax />
      <Productscarousel />
      <About />
    </>
  );
}
