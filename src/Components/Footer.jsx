import React from "react";
import { Link } from "react-router-dom";
export default function Footer() {
  return (
    <>
      <footer
        className="bd-footer py-4 py-md-5 bg-body-tertiary"
        bg="dark"
        data-bs-theme="dark"
      >
        <div className="container py-4 py-md-5 px-5 px-md-3 text-body-secondary">
          <div className="row">
            <div className="col-lg-3 mb-4">
              <Link
                to="/"
                className="d-inline-flex align-items-center mb-2 text-body-emphasis text-decoration-none"
                aria-label="Zephyr"
              >
                <title className="brand-font">Zephyr</title>
                <span className="fs-2 brand-font">Zephyr</span>
              </Link>
              <ul className="list-unstyled small">
                <li className="mb-2">
                  Designed and built with all the love in the world by the
                  Zephyr team.
                </li>

                <li className="mb-2"> &#169; All rights reserved</li>
              </ul>
            </div>
            <div className="col-4 col-lg-2 offset-lg-1 mb-3">
              <h5 className="mb-2">Links</h5>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <Link to="/">Home</Link>
                </li>
                <li className="mb-2">
                  <Link to="/Products">Products</Link>
                </li>
              </ul>
            </div>

            <div className="col-4 col-lg-2 mb-3">
              <h5 className="mb-2">Projects</h5>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <Link to="https://github.com/melodyBee/GlamTrove">
                    GlamTrove
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-4 col-lg-2 mb-3">
              <h5 className="mb-2">LinkedIn</h5>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <Link to="https://www.linkedin.com/in/abeera-fatima/">
                    Abeera Fatima
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
