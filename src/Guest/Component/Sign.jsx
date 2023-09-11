import React, { useContext, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import "../Pages/SignLog.css";
import { UserContext } from "../../Context/context.jsx";
import Cookies from "js-cookie";

export default function Sign() {
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Number, setNumber] = useState("");

  const { state, dispatch } = useContext(UserContext);

  const SignUpUser = (e) => {
    e.preventDefault();
    const payload = {
      Name: Name,
      Email: Email,
      Password: Password,
      Number: Number,
    };
    console.log(payload);
    axios
      .post("http://localhost:8765/api/users/signup", payload)
      .then((json) => {
        Cookies.set("token", json.data.token);

        dispatch({
          type: "SET_USER",
          token: json.data.token,
        });
      })
      .catch((err) => console.log(err.message));
  };

  const myFunction = () => {
    var x = document.getElementById("myInput");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  };

  return (
    <>
      <Form onSubmit={SignUpUser}>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="Name"
            value={Name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control
            type="email"
            placeholder="Enter Email"
            value={Email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control
            type="password"
            placeholder="Password"
            value={Password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type="tel"
            placeholder="Phone number"
            value={Number}
            onChange={(e) => {
              setNumber(e.target.value);
            }}
          />
        </Form.Group>
        <Button type="submit" className="slbtn d-flex justify-content-center">
          Submit
        </Button>
      </Form>
    </>
  );
}
