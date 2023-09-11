import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import axios from "axios";
import Offcanvas from "react-bootstrap/Offcanvas";
import { MdKeyboardDoubleArrowUp } from "react-icons/md";
import { Button } from "react-bootstrap";

export default function UserNav() {
  const [categories, setCategories] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:8765/api/category/get-all-categories`)
      .then((json) => setCategories(json.data.category)) // Update to json.data.category
      .catch((err) => console.log(err));
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark" expand="lg">
        <Container>
          <Link className="brand-font navbar-brand" to="/">
            Zephyr
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Link className="nav-link" onClick={handleShow}>
                Categories
              </Link>
              <Offcanvas
                className="bg-dark text-white"
                show={show}
                onHide={handleClose}
                placement="top"
              >
                <Offcanvas.Header>
                  <Offcanvas.Title>Categories</Offcanvas.Title>
                  <Button
                    variant="dark"
                    onClick={handleClose}
                    style={{
                      position: "absolute",
                      bottom: "20px",
                      right: "20px",
                    }}
                  >
                    <MdKeyboardDoubleArrowUp size={24} />
                  </Button>
                </Offcanvas.Header>
                <Offcanvas.Body data-bs-theme="dark">
                  <div className="container">
                    <div className="row">
                      {Array.isArray(categories) && categories.length > 0 ? (
                        categories.map((category, index) => (
                          <div key={index}>
                            <Link
                              className="nav-link text-decoration-none text-white"
                              to={`/products/category/${category.CategoryName}`}
                            >
                              {category.CategoryName}
                              <br />
                            </Link>
                          </div>
                        ))
                      ) : (
                        <p>No categories available.</p>
                      )}
                    </div>
                  </div>
                </Offcanvas.Body>
              </Offcanvas>
              <Link className="nav-link" to="/Products">
                Products
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
