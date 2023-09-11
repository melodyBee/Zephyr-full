import React, { useContext, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import "../Guest.css";
import { UserContext } from "../../Context/context";
import Cookies from "js-cookie";

export default function LogIn() {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const { state, dispatch } = useContext(UserContext);

  const LoginUser = (e) => {
    e.preventDefault();

    const payload = {
      Email: Email,
      Password: Password,
    };
    console.log(payload);
    axios
      .post("http://localhost:8765/api/users/login", payload)
      .then((json) => {
        Cookies.set("token", json.data.token);

        dispatch({
          type: "USER_LOGIN",
          token: json.data.token,
        });
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <Form onSubmit={LoginUser}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control
            type="email"
            placeholder="Enter email"
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
        <Button className="slbtn d-flex justify-content-center" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
}
