import { createContext, useState, useEffect } from "react";

export const SaveRecommendContext = createContext();

const loadFromLocalStorage = (key) => {
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) : null;
};

export const SaveRecommendContextProvider = ({ children }) => {
  const [recommend, setRecommend] = useState(loadFromLocalStorage("recommend") || []);

  useEffect(() => {
    localStorage.setItem("recommend", JSON.stringify(recommend));
  }, [recommend]);

  return (
    <SaveRecommendContext.Provider value={{ recommend, setRecommend }}>
      {children}
    </SaveRecommendContext.Provider>
  );
};