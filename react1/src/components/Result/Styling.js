import { useState, useEffect } from "react";
import axios from "axios";
import "./Styling.css";

const InfoBox = ({ products, setSelectedProduct, index }) => {
  const handleCheckboxChange = (e, product) => {
    setSelectedProduct((prevState) => {
      const newSelected = [...prevState];
      if (e.target.checked) {
        newSelected[index] = product;
      } else {
        newSelected[index] = null;
      }
      return newSelected;
    });

    products.forEach((p) => {
      if (p !== product) {
        document.getElementById(`checkbox-${p.id}`).checked = false;
      }
    });
  };

  return (
    <div className="info-box">
      {products.map((product) => (
        <div key={product.id}>
          <h2>{product.title}</h2>
          <a href={product.url}>Link</a>
          <input
            type="checkbox"
            id={`checkbox-${product.id}`}
            onChange={(e) => handleCheckboxChange(e, product)}
          />
        </div>
      ))}
    </div>
  );
};

const CustomButton = ({ onClick, children }) => {
  return <button onClick={onClick}>{children}</button>;
};

const Styling = ({ setSelectedProducts }) => {
  const category = ['hat', 'top', 'bottom', 'shoes'];
  const [products, setProducts] = useState([]);
  const [boxes, setBoxes] = useState([false, false, false, false]);
  const [selectedProduct, setSelectedProduct] = useState([null, null, null, null]);
  //타이틀에 단어로 필터링해서 박스로 보여줌
  const filterProducts = (category) => {
    return products.filter((product) => product.title.toLowerCase().includes(category));
  };

  const handleClick = (index) => {
    setBoxes((prevState) => {
      const newBoxes = [...prevState];
      newBoxes[index] = !newBoxes[index];
      return newBoxes;
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/products/");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    setSelectedProducts(selectedProduct);
  }, [selectedProduct, setSelectedProducts]);

  return (
    <div className="app">
      {boxes.map((box, index) => (
        <div className="button-container" key={index}>
          <CustomButton onClick={() => handleClick(index)}>
            {category[index]}
          </CustomButton>
          {box && (
            <InfoBox
              products={filterProducts(category[index])}
              setSelectedProduct={setSelectedProduct}
              index={index}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default Styling;