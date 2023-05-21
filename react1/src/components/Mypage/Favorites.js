import { useContext } from "react";
import { SaveItemContext } from "../../contexts/SaveItem";

const Favorites = () => {
  const { users, setUsers } = useContext(SaveItemContext);

  const handleReset1 = () => {
    setUsers([]);
  };

  const handleDeleteClick = (id) => {
    setUsers((prevUsers) => {
      const newUsers = prevUsers.filter((user) => user.id !== id); // id로 비교해서 같은 id인것들을 제거
      localStorage.setItem("users", JSON.stringify(newUsers)); // 로컬 스토리지에 저장
      return newUsers;
    });
  };


  return (
    <div>
      <button onClick={handleReset1}>Reset</button>
      <h2>찜 목록</h2>
      {users.map((user) => (
        <div key={user.id}>
          <h3>{user.name}</h3>
          <p>{user.brand} {user.price} {user.tag}</p>
          <img src={process.env.PUBLIC_URL + user.image} alt={user.name} style={{ width: "100px", height: "100px" }}/>
          <a href={user.link} target="_blank" rel="noopener noreferrer">{user.name}</a>
          <button onClick={() => handleDeleteClick(user.id)}>X</button>
        </div>
      ))}
    </div>
  );
};

export default Favorites;