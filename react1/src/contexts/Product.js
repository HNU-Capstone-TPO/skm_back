import { createContext, useState, useEffect } from "react";

export const ProductContext = createContext();

const loadFromLocalStorage = (key) => {
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) : null;
};

export const ProductContextProvider = ({ children }) => {
  const [product, setProduct] = useState(loadFromLocalStorage("product") || []);

  useEffect(() => {
    localStorage.setItem("product", JSON.stringify(product));
  }, [product]);

  return (
    <ProductContext.Provider value={{ product, setProduct }}>
      {children}
    </ProductContext.Provider>
  );
};