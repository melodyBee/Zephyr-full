import React, { useEffect, useReducer, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import ReactStars from "react-stars";
import Swal from "sweetalert2";
import Carousel from "react-bootstrap/Carousel";
import Button from "react-bootstrap/Button";

export default function ProductPage() {
  const dataobj = {
    counter: 0,
  };
  const call = (state, action) => {
    switch (action.type) {
      case "Increase":
        return { ...state, counter: state.counter++ };
        break;
      case "Decrease":
        return { ...state, counter: state.counter-- };
        break;
      default:
        break;
    }
  };
  const [state, dispatch] = useReducer(call, dataobj);
  const { productID } = useParams();
  const [product, setproduct] = useState({});
  const [review, setReview] = useState("");
  const [ratingstar, setratingStar] = useState(0);
  const [favourite, setFavourite] = useState(false);

  const ratingChanged = (newRating) => {
    setratingStar(newRating);
  };

  const submitReview = () => {
    const payload = {
      productID: productID,
      review: review,
      rating: ratingstar,
    };
    console.log(payload);

    Swal.fire({
      title: "Successfully Submitted!",
      text: "Thanks for reviewing our product",
      icon: "success",
      confirmButtonText: "Continue Shopping",
    });

    setReview("");
    setratingStar(0);
  };

  const addToCart = () => {
    const payload = {
      ...product,
      productQuantity,
      totalPrice: product.price * productQuantity,
    };
    console.log(payload);

    Swal.fire({
      title: "Added to Cart!",
      text: "Check your Cart for Check Out",
      icon: "success",
      confirmButtonText: "Continue Shopping",
    });
  };

  useEffect(() => {
    axios
      .get(`https://dummyjson.com/products/${productID}`)
      .then((json) => setproduct(json.data))
      .catch((err) => {
        setproduct({
          id: 1,
          title: "iPhone 9",
          description: "An apple mobile which is nothing like apple",
          price: 549,
          discountPercentage: 12.96,
          rating: 4.69,
          stock: 94,
          brand: "Apple",
          category: "smartphones",
          thumbnail: "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
          images: [
            "https://i.dummyjson.com/data/products/1/1.jpg",
            "https://i.dummyjson.com/data/products/1/2.jpg",
            "https://i.dummyjson.com/data/products/1/3.jpg",
            "https://i.dummyjson.com/data/products/1/4.jpg",
            "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
          ],
        });
      });
  }, []);

  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <div className="col-6">
            <Carousel>
              {product?.images?.map((val, key) => (
                <Carousel.Item key={key}>
                  <img
                    src={val}
                    alt={`Product Image ${key}`}
                    style={{
                      objectFit: "contain",
                      width: "100%",
                      height: "45vh",
                    }}
                  />
                </Carousel.Item>
              ))}
            </Carousel>
          </div>
          <div className="col-6">
            <h1 className="brand-font">{product.title}</h1>
            <h4>{product.price}$</h4>

            <h6 className="text-secondary">Brand: {product.brand}</h6>
            <p className="text-secondary">{product.description}</p>
            <ReactStars
              className=""
              count={5}
              size={25}
              edit={false}
              value={product.rating}
              color2={"#ffd700"}
            />
            <Button
              className="btn mx-3"
              variant="dark"
              disabled={state.counter > 1 ? false : true}
              onClick={() =>
                dispatch({
                  type: "Decrease",
                })
              }
            >
              -
            </Button>
            {state.counter}
            <Button
              className="btn mx-3"
              variant="dark"
              onClick={() =>
                dispatch({
                  type: "Increase",
                })
              }
            >
              +
            </Button>
            <Button
              className="d-block"
              active={favourite}
              variant="outline-dark"
              onClick={addToCart}
            >
              Add to Cart
            </Button>
          </div>
        </div>
        <div className="row">
          <h2 className="brand-font">Reviews Us</h2>
          <div className="col-6">
            <div className="form-floating">
              <textarea
                className="form-control"
                placeholder="Leave a comment here"
                id="floatingTextarea2"
                style={{ height: 100 }}
                defaultValue={review}
                onChange={(e) => setReview(e.target.value)}
              />
              <label htmlFor="floatingTextarea2">Comments</label>
            </div>
            <Button className="my-3 btn btn-dark" onClick={submitReview}>
              Submit review
            </Button>
          </div>
          <div className="col-6">
            <div className="d-flex align-items-center">
              <ReactStars
                count={5}
                size={24}
                value={ratingstar}
                onChange={ratingChanged}
                color2={"#ffd700"}
              />
              <span className="ms-3">({ratingstar})</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
