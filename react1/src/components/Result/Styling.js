import { useContext, useState, useEffect } from "react";
import "./Styling.css";
import { SaveItemContext } from "../../contexts/SaveItem";
import { SaveRecommendContext } from "../../contexts/SaveRecommend";
import axios from "axios";

const InfoBox = ({ users, setSelectedProduct, index }) => {
  const { users: savedUsers, setUsers: setSavedUsers } = useContext(SaveItemContext);
  const { recommend, setRecommend } = useContext(SaveRecommendContext);
  const handleReset = () => {
    setRecommend([]);
  };

  const handleCheckboxChange = (e, user) => {
    setSelectedProduct((prevState) => {
      const newSelected = [...prevState];
      if (e.target.checked) {
        newSelected[index] = user;
      } else {
        newSelected[index] = null;
      }
      return newSelected;
    });

    users.forEach((u) => {
      if (u !== user) {
        document.getElementById(`checkbox-${u.id}`).checked = false;
      }
    });
  };

  const handleSaveButtonClick = (user) => {
    setSavedUsers((prevState) => [user, ...prevState]);
  }; /*이부분에서 user랑 ...prevState 바꾸면 역순으로 저장*/

  const handleSaveRecommend = (user) => {
    axios.post("http://127.0.0.1:8000/inter/", { userId: user.id })
     .then((response) => {
        console.log(response.data);
        setRecommend((prevState) => {
          const newRecommend = prevState.filter((item) => item.namea!== response.data.setnum);
          newRecommend.push({ namea: response.data.setnum, products: response.data.users });
          return newRecommend;
        });
      })
     .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div className="info-box">
      <button onClick={handleReset}>Save</button>
      {users.map((user) => (
        <div key={user.id}>
          <h2>{user.name}</h2>
          <p>{user.id} {user.gender_field} {user.part} {user.color} {user.season} {user.brand} {user.price} {user.tag}</p>
          <img src={process.env.PUBLIC_URL + user.image} alt={user.name} style={{ width: "100px", height: "100px" }}/>
          <a href={user.rink} target="_blank" rel="noopener noreferrer">{user.name}</a>
          <input
            type="checkbox"
            id={`checkbox-${user.id}`}
            onChange={(e) => handleCheckboxChange(e, user)}
          />
          <button onClick={() => {handleSaveButtonClick(user); handleSaveRecommend(user)}}>찜</button>
        </div>
      ))}
    </div>
  );
};

const CustomButton = ({ onClick, children }) => {
  return <button onClick={onClick}>{children}</button>;
};

const Styling = ({ users=[], setSelectedProducts }) => {
  
  const category = ['상의', '하의', '신발', '모자', '아우터', '포인트'];
  //const [products, setProducts] = useState([]);
  const [boxes, setBoxes] = useState([false, false, false, false, false, false]);
  const [selectedProduct, setSelectedProduct] = useState([null, null, null, null, null, null]);
  //타이틀에 단어로 필터링해서 박스로 보여줌
  const filterProducts = (category) => {
    console.log(users);
    return users.filter((user) => user.part && user.part.includes(category));
  };
  
  const handleClick = (index) => {
    setBoxes((prevState) => {
      const newBoxes = [...prevState];
      newBoxes[index] = !newBoxes[index];
      return newBoxes;
    });
  };
  
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
              users={filterProducts(category[index] || [])}
              setSelectedProduct={setSelectedProduct}
              index={index}
            />
          )}
        </div>
      ))}
       <div>
    </div>
    </div>
  );
};

export default Styling;