import React, { createContext, useEffect, useReducer } from "react";
import { reducer } from "./reducer";
import Cookies from "js-cookie";

let data = {
  user: undefined,
  role: undefined,
  token: Cookies.get("token") || undefined,
};

export const UserContext = createContext();

export default function ContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, data);

  useEffect(() => {
    Cookies.set("token", state.token);
  }, [state.token]);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
}
