import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Carousel from "react-bootstrap/Carousel";
import Button from "react-bootstrap/Button";
import axios from "axios";

export default function Productscarousel() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:8765/api/products/products`)
      .then((response) => {
        setProducts(response.data.Products);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="dark">
      <div className="container buffer ">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <Carousel
            interval={null}
            indicators={false}
            style={{ width: "100%", height: "80vh" }}
          >
            {Array.isArray(products) && products.length > 0 ? (
              products.map((val, index) => (
                <Carousel.Item key={index}>
                  <div
                    className="container"
                    style={{
                      color: "white",
                    }}
                  >
                    <Card
                      style={{
                        color: "white",
                        backgroundColor: "#2b3035",
                        border: "none",
                      }}
                    >
                      <div className="row mt-5">
                        <div className="col-12 col-md-6">
                          <Card.Img
                            variant="top"
                            className="thumb img-fluid image-container"
                            src={val.ProductsImage}
                            style={{
                              objectFit: "contain",
                              width: "100%",
                              height: "200px",
                            }}
                          />
                        </div>
                        <div className="col-12 col-md-6">
                          <Card.Body>
                            <h1
                              className="brand-font"
                              style={{ color: "white" }}
                            >
                              {val.ProductsName}
                            </h1>
                            <h4>{val.ProductsPrice}$</h4>
                            <h6 className="text-secondary">
                              Brand: {val.ProductsBrand}
                            </h6>
                            <p className="text-secondary">
                              {val.ProductsDescription}
                            </p>
                            <Button variant="light">Shop Now</Button>
                          </Card.Body>
                        </div>
                      </div>
                    </Card>
                  </div>
                </Carousel.Item>
              ))
            ) : (
              <div>
                <p>No products available.</p>
              </div>
            )}
          </Carousel>
        )}
      </div>
    </div>
  );
}
