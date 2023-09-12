import React, { useContext } from "react";
import { HiOutlineHomeModern } from "react-icons/hi2";
import { MdOutlineCategory } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import { UserContext } from "../../Context/context";
export default function Sidebar() {
  const location = useLocation();
  const { dispatch } = useContext(UserContext);

  const NavItems = [
    {
      tab: "Home",
      url: "/",
      icon: <HiOutlineHomeModern />,
    },
    {
      tab: "Category",
      url: "/category",
      icon: <MdOutlineCategory />,
    },
    {
      tab: "Brands",
      url: "/brands",
      icon: <MdOutlineCategory />,
    },
  ];

  const handleLogout = () => {
    dispatch({ type: "USER_LOGOUT" });
  };

  return (
    <>
      <div className="container ">
        <div className="row bg-brand rounded p-3 headcont">
          <span className="mt-2 col-md-8">Admin Name</span>
          <button
            className="btn btn-outline-secondary col-md-4"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
      <ul className="nav flex-column pt-2">
        {NavItems.map((val, key) => (
          <li
            key={key}
            className={`nav-item  ${
              location.pathname === val.url ? "bg-lightb rounded text-dark" : ""
            } `}
          >
            <Link
              className={`nav-link d-flex align-item-center gap-3 text-light ${
                location.pathname === val.url
                  ? "bg-lightb rounded text-dark"
                  : ""
              } `}
              to={val.url}
            >
              <span>{val.icon}</span>
              <span>{val.tab}</span>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
