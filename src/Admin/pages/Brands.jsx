import React from "react";
import BrandsModal from "../components/BrandsModal";

export default function Brands() {
  return (
    <>
      <div className="container">
        <div className="d-flex justify-content-between align-item-center bg-lightb rounded p-2 my-3">
          <span className="fs-4 fw-bold text-light">Brands</span>
          <BrandsModal />
        </div>
      </div>{" "}
    </>
  );
}
