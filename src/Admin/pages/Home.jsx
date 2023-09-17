import axios from "axios";
import React, { useEffect, useState } from "react";
import image from "../assets/undraw_discount_d-4-bd.svg";
import { BsCartDash } from "react-icons/bs";
import { BsFillCartCheckFill } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8765/api/products/products`)
      .then((response) => {
        setProducts(response.data.Products); // Updated to use "Products" key
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <div className="p-3 my-0 " id="bg-brand">
        <span className="fs-4 fw-bold ">Home</span>
      </div>
      <div className="container">
        <div className="my-3 mx-5 px-5">
          {Array.isArray(products) && products.length > 0 ? (
            products.map((product, index) => (
              <div className="center">
                <div className="card cardProducts" key={product._id}>
                  <div className="m-2">
                    <div className="d-flex justify-content-between">
                      <h3>{product.ProductsName}</h3>
                      <div>
                        <button className="btn mx-2" variant="outline-dark">
                          <BsCartDash size={20} />
                        </button>
                      </div>
                    </div>
                    <span className="fs-0 text-muted">
                      {product.ProductsBrand}
                    </span>
                    <hr />
                    <div className="m-3">
                      <img
                        className=" productImage mr-3 rounded"
                        src={product.ProductsImage}
                        alt="ProductImage"
                      />
                    </div>
                    <button className="btn" variant="outline-dark">
                      <AiOutlineHeart size={25} />
                    </button>
                    <span className="d-flex text-muted">
                      {product.ProductsCategories}
                    </span>
                    <p>{product.ProductsDescription}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No products available</p>
          )}
        </div>
      </div>
    </>
  );
}
