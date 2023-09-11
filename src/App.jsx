import React, { useContext } from "react";
import Admin from "./Admin";
import User from "./User";
import Guest from "./Guest";
import { UserContext } from "./Context/context";
import { decodeToken } from "react-jwt";
import "../src/App.css";

const ComponentByRoles = {
  admin: Admin,
  user: User,
  guest: Guest,
};

const getUserRole = (Role) =>
  ComponentByRoles[Role] || ComponentByRoles["guest"];
const getDecodeToken = (token) => decodeToken(token) || { Role: "guest" };

export default function App() {
  const { state, dispatch } = useContext(UserContext);

  const currentToken = getDecodeToken(state.token);

  const CurrentUser = getUserRole(currentToken.Role);
  return <CurrentUser />;
}
