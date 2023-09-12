import React, { useContext, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import "../Pages/SignLog.css";
import { UserContext } from "../../Context/context.jsx";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"; // Added eye icons
import { useNavigate } from "react-router-dom";

export default function Sign() {
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Number, setNumber] = useState("");
  const [selectedRole, setSelectedRole] = useState("User");
  const [showPassword, setShowPassword] = useState(false); // State for password visibility

  const { state, dispatch } = useContext(UserContext);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const SignUpUser = (e) => {
    e.preventDefault();
    const payload = {
      Name: Name,
      Email: Email,
      Password: Password,
      Number: Number,
      Role: selectedRole,
    };

    axios
      .post("http://localhost:8765/api/users/signup", payload)
      .then((json) => {
        Cookies.set("token", json.data.token);
        console.log(json.data.token);
        if (json.data.message === "Successfully Created") {
          axios
            .post("http://localhost:8765/api/users/login", payload)
            .then((json) => {
              Cookies.set("token", json.data.token);

              dispatch({
                type: "USER_LOGIN",
                token: json.data.token,
              });
              navigate("/");
            })
            .catch((err) => console.log(err));
        }
      });
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

        <Form.Group className="mb-3">
          <div className="row">
            <div className="col-8 slpass">
              <Form.Control
                type={showPassword ? "text" : "password"} // Toggle password visibility
                placeholder="Password"
                value={Password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <div className="col-3 slvisib">
              {showPassword ? (
                <AiFillEyeInvisible
                  size={27}
                  className="mt-1 "
                  onClick={togglePasswordVisibility}
                />
              ) : (
                <AiFillEye
                  size={27}
                  className="mt-1 "
                  onClick={togglePasswordVisibility}
                />
              )}
            </div>
          </div>
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
        <div className="container">
          <Form.Group className="row">
            <Form.Label as="legend" variant="success" className="col-4">
              Role:
            </Form.Label>
            <Form.Check
              className="col-4 mt-2"
              type="radio"
              label="User"
              name="formHorizontalRadios"
              id="formHorizontalRadios1"
              checked={selectedRole === "User"}
              onChange={() => setSelectedRole("User")}
            />
            <Form.Check
              className="col-4 mt-2"
              type="radio"
              label="Admin"
              name="formHorizontalRadios"
              id="formHorizontalRadios2"
              checked={selectedRole === "Admin"}
              onChange={() => setSelectedRole("Admin")}
            />
          </Form.Group>
        </div>

        <Button type="submit" className="slbtn d-flex justify-content-center">
          Submit
        </Button>
      </Form>
    </>
  );
}
