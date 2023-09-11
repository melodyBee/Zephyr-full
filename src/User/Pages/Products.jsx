import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8765/api/products/products`)
      .then((response) => {
        setProducts(response.data.Products);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <div>
        <h1 className="head mx-5 my-5 py-5 px-5">Products</h1>
        <div className="container">
          <div className="row">
            {Array.isArray(products) && products.length > 0 ? (
              products.map((val, index) => (
                <Card
                  className="procard col-2 m-2"
                  key={index}
                  style={{ width: "18rem" }}
                >
                  <Card.Img
                    className="image-container mt-2"
                    variant="top"
                    src={val.ProductsImage}
                  />
                  <Card.Body>
                    <Card.Title>
                      {val.ProductsName} {val.ProductsPrice}$
                    </Card.Title>
                    <Card.Text>{val.ProductsDescription}</Card.Text>
                    <Button variant="dark">More Details</Button>
                  </Card.Body>
                </Card>
              ))
            ) : (
              <div>
                <p>No products</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
