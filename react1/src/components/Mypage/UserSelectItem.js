import { useContext, useState} from "react";
import { ProductContext } from "../../contexts/Product";
import "./UserSelectItem.css";

const UserSelectItem = () => {
  const { product, setProduct } = useContext(ProductContext);
  const [selectedSet, setSelectedSet] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const handleReset = () => {
    setProduct([]);
  };

  const handleSetClick = (index) => {
    if (selectedSet === index) {
      setSelectedSet(null);
    } else {
      setSelectedSet(index);
    }
  };

  const handlePrevClick = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNextClick = () => {
    setCurrentPage(currentPage + 1);
  };

  const itemsPerPage = 4;

  const pageItems = product.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);


  return (
    <div className="table-wrap">
      <div className="table-title">선택 품목 확인</div>
      <div className="UserSelectItem-set-buttons">
        {pageItems.map((users, index) => (
          <table className="UserSelectItem-itemset">
            <thead className="UserSelectItem-keyward">
              작성자: {users.name1}
            </thead>
            <td className="UserSelectItem-table-div1" key={index}>
              <div className="UserSelectItem-table-button-wrapper">
                <button className="UserSelectItem-table-button" onClick={() => handleSetClick(index)}>
                <td className="UserSelectItem-abc">
                  <img className="UserSelectItem-imgmain1" src="/img/상의.png" alt="상의" width="100%" height="100%"></img>
                  <img className="UserSelectItem-imgmain1" src="/img/하의.png" alt="하의" width="100%" height="100%"></img>
                  <img className="UserSelectItem-imgmain1" src="/img/신발.png" alt="신발" width="100%" height="100%"></img>
                  <img className="UserSelectItem-imgmain1" src="/img/모자.png" alt="모자" width="100%" height="100%"></img>
                  <img className="UserSelectItem-imgmain1" src="/img/아우터.png" alt="아우터" width="100%" height="100%"></img>
                  <img className="UserSelectItem-imgmain1" src="/img/악세.png" alt="악세사리" width="100%" height="100%"></img>
                </td>
                {users.products.filter((item) => item !== null).map((item, index) => (
                  <tr className="UserSelectItem-imga" key={index}>
                    <td>
                      {item.part === "상의" && <img src="/img/상.png" alt="상의1" width="100%" height="100%"></img>}
                      {item.part === "하의" && <img src="/img/하.png" alt="하의1" width="100%" height="100%"></img>}
                      {item.part === "신발" && <img src="/img/신.png" alt="신발1" width="100%" height="100%"></img>}
                      {item.part === "모자" && <img src="/img/모.png" alt="모자1" width="100%" height="100%"></img>}
                      {item.part === "아우터" && <img src="/img/아.png" alt="아우터1" width="100%" height="100%"></img>}
                      {item.part === "악세사리" && <img src="/img/악.png" alt="악세사리1" width="100%" height="100%"></img>}
                    </td>
                  </tr>
                ))}
                </button>
              </div>
            </td>
          </table>
        ))}
        {selectedSet !== null && (
        <div className="UserSelectItem-table-detail">
          <table> 
            <thaed className="UserSelectItem-table-head">
              <td className="UserSelectItem-headcss">
                상세 보기
               </td>
              <button className="Xbutton" onClick={() => setSelectedSet(null)}>
                X
              </button>
            </thaed>
            <tbody>
              {product[selectedSet].products.filter((item) => item !== null).map((item, index) => (
                <tr className="UserSelectItem-table-detail2" key={index}>
                  <td className="table-detail-img">
                    <img src="/img/Ad_1.jpg" alt="모자1" width="80px" height="80px"></img>
                  </td>
                  <td className="table-set">
                    <td className="table-detail-name">{item.name}</td>
                    <td className="table-detail-price">{item.price}</td>
                    <td className="table-detail-rink">
                      <a href={item.rink} target="_blank" rel="noopener noreferrer">
                        <img src="/img/Ad_1.jpg" alt="Ad_1" width="80px" height="80px" />
                      </a>
                    </td>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        )}
      </div>
      <td>
        <button onClick={handlePrevClick} disabled={currentPage === 1}>이전</button>
        <p>{currentPage}</p>
        <button onClick={handleNextClick} disabled={pageItems.length < itemsPerPage}>다음</button>
      </td>
      <button onClick={handleReset}>초기화</button>
    </div>
  );
};

export default UserSelectItem;