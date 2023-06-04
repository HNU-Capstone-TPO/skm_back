import Box from "@mui/material/Box";
import { ProductContext } from "../../contexts/Product";
import { useContext, useState } from "react";

const SelectedList = ({ selectedProducts }) => {
  const { product, setProduct } = useContext(ProductContext);
  const category = ["상의", "하의", "신발", "모자", "아우터", "부위테스트"];
  const [name1, setName1] = useState("");

  const handleSave = () => {
    if (name1) {
      setProduct((prevProduct) => {
        const newProduct = [{ name1: name1, products: selectedProducts }, ...prevProduct];
        return newProduct;
      });
    }
  };

  const handleReset = () => {
    setProduct([]);
  };

  return (
    <div>
      <Box
        sx={{
          width: 500,
          height: 200,
          border: 1,
          borderRadius: "16px",
        }}
      >
        
        {selectedProducts.map((product, index) =>
          product? (
            <div key={index}>
              <p>
                {product.name} Price: {product.price}
              </p>
            </div>
          ) : null
        )}
        <input type="text" placeholder="이름" value={name1} onChange={(event) => setName1(event.target.value)} />
        <button onClick={handleSave}>Save</button>
        <button onClick={handleReset}>Reset</button>
      </Box>
    </div>
  );
};

export default SelectedList;