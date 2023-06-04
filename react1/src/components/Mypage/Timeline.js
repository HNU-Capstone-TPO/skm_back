import { useContext, useState, useEffect } from "react";
import { SaveContext } from "../../contexts/SaveContext";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import "./Timeline.css";

const Timeline = () => {
  const { save, setSave } = useContext(SaveContext);
  const [submitFlag, setSubmitFlag] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호

  const navigate = useNavigate();

  const handleReset = () => {
    setSave([]);
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setSubmitFlag(true);
  };

  const handleDeleteClick = (index) => {
    setSave((prevSave) => {
      const newSave = [...prevSave];
      newSave.splice(index, 1); // 해당 인덱스의 아이템을 삭제
      localStorage.setItem("save", JSON.stringify(newSave)); // 로컬 스토리지에 저장
      return newSave;
    });
  };

  const handlePrevClick = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNextClick = () => {
    setCurrentPage(currentPage + 1);
  };

  useEffect(() => {
    if (submitFlag && selectedItem!== null) {
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

  // 페이지당 보여줄 아이템 개수
  const itemsPerPage = 5;

  // 페이지당 보여줄 아이템들
  const pageItems = save.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="timeline-container">
      <table className="timeline-table-wrap">
        {/*<button onClick={handleReset}>Reset</button>*/}
        <h2 className="table-title">타임라인</h2>
        <tbody>
          {pageItems.map((item, index) => (
            <tr className="my-div2" key={index}>
              <td className="Timeline-keyward">검색어</td>
              <td className="itemkeyward">
                <td className="aim-2">
                  {item.map((subItem) => (
                    <div className="my-divin">{subItem}</div>
                  ))}
                </td>
              </td>
              <td className="Timeline-button2">
                <button onClick={() => handleItemClick(item)}>이동</button>
                <button onClick={() => handleDeleteClick(index)}>X</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <td>
        <button onClick={handlePrevClick} disabled={currentPage === 1}>이전</button>
        <button onClick={handleNextClick} disabled={pageItems.length < itemsPerPage}>다음</button>
      </td>
    </div>
  );
};

export default Timeline;