import { useContext, useState, useEffect } from "react";
import { SaveItemContext } from "../../contexts/SaveItem";
import "./Favorites.css";

const Favorites = () => {
  const { users, setUsers } = useContext(SaveItemContext);
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호

  const handleReset1 = () => {
    setUsers([]);
  };

  const handleDeleteClick = (id) => {
    setUsers((prevUsers) => {
      const newUsers = prevUsers.filter((user) => user.id!== id); // id로 비교해서 같은 id인것들을 제거
      localStorage.setItem("users", JSON.stringify(newUsers)); // 로컬 스토리지에 저장
      return newUsers;
    });
  };

  const handlePrevClick = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNextClick = () => {
    setCurrentPage(currentPage + 1);
  };

  // 페이지당 보여줄 아이템 개수
  const itemsPerPage = 10;

  // 페이지당 보여줄 아이템들
  const pageItems = users.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="favorites-container">
      <table className="table-wrap">
        <h2 className="table-title">찜 목록</h2>
        <tbody>
          {pageItems.map((user) => (
            <tr className="my-div2" key={user.id}>
              <td className="keyward">
                <img src={user.image} alt="모자1" width="80px" height="80px"></img>
              </td>
              <td className="Favorites-itemkeyward">
                <td className="Favorites-my-divin">
                  {user.name}
                </td>
                <td className="Favorites-my-divin">
                  {user.price}
                </td>
                <td className="Favorites-my-divin">
                  {user.link}
                </td>
              </td>
              <td className="Favorites-delete">
                <button className="Favorites-button2" onClick={() => handleDeleteClick(user.id)}>삭제</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={handlePrevClick} disabled={currentPage === 1}>이전</button>
        <button onClick={handleNextClick} disabled={pageItems.length < itemsPerPage}>다음</button>
      </div>
    </div>
  );
};

export default Favorites;

/*import { useContext } from "react";
import { SaveItemContext } from "../../contexts/SaveItem";
import "./Favorites.css";

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

  const handlePrevClick = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNextClick = () => {
    setCurrentPage(currentPage + 1);
  };

  const itemsPerPage = 10;

  // 페이지당 보여줄 아이템들
  const pageItems = users.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);


  return (
    <table className="table-wrap">
      <h2 className="table-title">찜 목록</h2>
        {users.map((user) => (
          <tr className="my-div2" key={user.id}>
            <td className="keyward">
              {user.image}
            </td>
            <td className="Favorites-itemkeyward">
              <td className="Favorites-my-divin">
                {user.name}
              </td>
              <td className="Favorites-my-divin">
                {user.price}
              </td>
              <td className="Favorites-my-divin">
                {user.tag}
              </td>
            </td>
            <td className="Favorites-delete">
              <button className="Favorites-button2" onClick={() => handleDeleteClick(user.id)}>삭제</button>
            </td>
            
          </tr>
        ))}
    </table>
  );
};

export default Favorites;*/