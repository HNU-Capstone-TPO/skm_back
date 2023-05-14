import React, { useState } from 'react';

const InputSave = ({ tags, onSave }) => {
  const [save, setSave] = useState([]);

  const handleSave = () => {
    setSave([...save, ...tags]); // tags 값을 배열에 추가
    onSave(tags); // onSave 함수 호출
  };

  return (
    <div>
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default InputSave;