import { createContext, useState, useEffect } from "react";

export const SaveItemContext = createContext();

const loadFromLocalStorage = (key) => {
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) : null;
};

export const SaveItemContextProvider = ({ children }) => {
  const [users, setUsers] = useState(loadFromLocalStorage("users") || []);

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  return (
    <SaveItemContext.Provider value={{ users, setUsers }}>
      {children}
    </SaveItemContext.Provider>
  );
};