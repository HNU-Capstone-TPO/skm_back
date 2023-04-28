import React, { useState } from "react";

function InputList({ onSubmit }) {
  const [items, setItems] = useState([]);

  const handleChange = (event, index) => {
    const newItems = [...items];
    newItems[index] = event.target.value;
    setItems(newItems);
  };

  const handleAdd = () => {
    setItems([...items, ""]);
  };

  const handleRemove = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(items);
  };

  return (
    <form onSubmit={handleSubmit}>
      {items.map((item, index) => (
        <div key={index}>
          <input
            type="text"
            value={item}
            onChange={(event) => handleChange(event, index)}
          />
          <button type="button" onClick={() => handleRemove(index)}>
            Remove
          </button>
        </div>
      ))}
      <button type="button" onClick={handleAdd}>
        Add
      </button>
      <button type="submit">Submit</button>
    </form>
  );
}

export default InputList;