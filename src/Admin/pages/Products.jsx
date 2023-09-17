import axios from "axios";
import React, { useEffect, useState } from "react";
import ProductModal from "../components/ProductModal";

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8765/api/products/products")
      .then((response) => setProducts(response.data.Products)) // Assuming the response data contains an array named Products
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <div className="container">
        <div className="d-flex justify-content-between align-item-center rounded bg-lightb p-2 my-3">
          <div className="fs-4 fw-bold text-light">Products</div>
          <ProductModal />
        </div>
      </div>
      <div className="m-2 p-4">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Product Name</th>
              <th scope="col">Description</th>
              <th scope="col">Price</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(products) && products.length > 0 ? (
              products.map((product, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{product.ProductsName}</td>
                  <td>{product.ProductsDescription}</td>
                  <td>{product.ProductsPrice}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No products available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
