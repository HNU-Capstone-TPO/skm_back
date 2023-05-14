import { createContext, useState } from "react";

export const SaveContext = createContext();

const loadFromLocalStorage = (key) => {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  };

  export const SaveProvider = ({ children }) => {
    const [save, setSave] = useState(loadFromLocalStorage("save") || []);
  
    return (
      <SaveContext.Provider value={{ save, setSave }}>
        {children}
      </SaveContext.Provider>
    );
  };