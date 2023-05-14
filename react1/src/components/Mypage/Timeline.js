/*import { useContext } from "react";
import { SaveContext } from "../../contexts/SaveContext";



const Timeline = () => {
  const { save, setSave } = useContext(SaveContext); // SaveContext에서 save 배열과 setSave 함수 가져오기

  const handleReset = () => {
    setSave([]); // save 배열 초기화
  };

  return (
    <div>
      <h2>타임라인페이지</h2>
      {save.map((item, index) => (
        <p key={index}>{item}</p>
        
      ))}
      <button onClick={handleReset}>Reset</button>
    </div>
  );
};

export default Timeline;*/

import { useContext, useState, useEffect } from "react";
import { SaveContext } from "../../contexts/SaveContext";
import axios from "axios";
/*import { navigate } from "@reach/router";*/
import { useNavigate } from 'react-router-dom';

const Timeline = () => {
  const { save, setSave } = useContext(SaveContext);
  const [submitFlag, setSubmitFlag] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const navigate = useNavigate();

  const handleReset = () => {
    setSave([]);
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setSubmitFlag(true);
  };

  useEffect(() => {
    if (submitFlag && selectedItem !== null) {
      const formData = new FormData();
      formData.append("query", selectedItem);
      axios
        .post("http://127.0.0.1:8000/search/", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((response) => {
          navigate('/result', {
            state: { users: response.data.users },
          });
        })
        .catch((error) => {
          console.error(error);
        });
      setSubmitFlag(false);
    }
  }, [submitFlag, selectedItem, navigate]);

  return (
    <div>
      <h2>Timeline Page</h2>
      {save.map((item, index) => (
        <div key={index}>
          <p>{item}</p>
          <button onClick={() => handleItemClick(item)}>Send to Server</button>
        </div>
      ))}
      <button onClick={handleReset}>Reset</button>
    </div>
  );
};

export default Timeline;