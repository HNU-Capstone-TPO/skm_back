import React, { useContext, useState } from 'react';
import { SaveRecommendContext } from '../../contexts/SaveRecommend';
import "./InterestedProducts.css";

const InterestedProducts = () => {
  const { recommend } = useContext(SaveRecommendContext);
  const [selectedSet, setSelectedSet] = useState(null);

  const handleSetClick = (index) => {
    if (selectedSet === index) {
      setSelectedSet(null);
    } else {
      setSelectedSet(index);
    }
  };

  return (
    <div className="wraptalbe">
      <div className="table-title">추천 상품</div>
      <div className="set-buttons">
        <td className="table-div0">
          <div className="table-button-wrapper0">
            <td className="table-button0">
              <td className="abc0">
                <img className="imgmain1" src="/img/상의.png" alt="상의" width="90%" height="9%"></img>
                <img className="imgmain1" src="/img/하의.png" alt="하의" width="90%" height="90%"></img>
                <img className="imgmain1" src="/img/신발.png" alt="신발" width="90%" height="90%"></img>
                <img className="imgmain1" src="/img/모자.png" alt="모자" width="90%" height="90%"></img>
                <td className="mainbacka">
                  <img className="mainbackb" src="/img/logo.png" alt="아우터" width="90%" height="90%"></img>
                </td>
                <img className="imgmain1" src="/img/악세.png" alt="악세사리" width="90%" height="90%"></img>
              </td>
              {recommend[0].map((user) => (
              <td className="imga0" key={user.id}>
                {user.part === "상의" && (
                  <div className="main">
                    <button className="mainback1" onClick={() => window.open(user.rink, '_blank')}>{user.name}</button>
                    <img src={user.image} alt="6000" width="100%" height="100%"></img> 
                    <img className="mainbacktwo" src="/img/상의.PNG" alt="1" width="50%" height="50%"></img>
                    <div></div>
                  </div>
                )}
                {user.part === "하의" && (
                  <div className="main">
                  <button className="mainback1" onClick={() => window.open(user.rink, '_blank')}>{user.name}</button>
                  <img src={user.image} alt="6000" width="100%" height="100%"></img> 
                  <img className="mainbackone" src="/img/상의.PNG" alt="1" width="50%" height="50%"></img>
                  <div></div>
                </div>
                )}
                {user.part === "신발" && <img src="/img/신.png" alt="신발1" width="100%" height="100%"></img>}
                {user.part === "모자" && <img src="/img/모.png" alt="모자1" width="100%" height="100%"></img>}
                {user.part === "아우터" && <img src="/img/아.png" alt="아우터1" width="100%" height="100%"></img>}
                {user.part === "악세사리" && <img src="/img/악.png" alt="악세사리1" width="100%" height="100%"></img>}
              </td>
              ))}
            </td>
          </div>
        </td>
        {recommend.slice(1, 7).map((users, index) => (
          <td className="table-div1" key={index+1}>
            <div className="table-button-wrapper">
              <td>
              <button className="table-button" onClick={() => handleSetClick(index+1)}>
                <td className="abc">
                  <img className="imgmain1" src="/img/상의.png" alt="상의" width="100%" height="100%"></img>
                  <img className="imgmain1" src="/img/하의.png" alt="하의" width="100%" height="100%"></img>
                  <img className="imgmain1" src="/img/신발.png" alt="신발" width="100%" height="100%"></img>
                  <img className="imgmain1" src="/img/모자.png" alt="모자" width="100%" height="100%"></img>
                  <img className="imgmain1" src="/img/아우터.png" alt="아우터" width="100%" height="100%"></img>
                  <img className="imgmain1" src="/img/악세.png" alt="악세사리" width="100%" height="100%"></img>
                </td>
                {users.map((user) => (
                  <td className="imga" key={user.id}>
                    {user.part === "상의" && <img src="/img/상의1.png" alt="상의1" width="100%" height="100%"></img>}
                    {user.part === "하의" && <img src="/img/하의1.png" alt="하의1" width="100%" height="100%"></img>}
                    {user.part === "신발" && <img src="/img/신발1.png" alt="신발1" width="100%" height="100%"></img>}
                    {user.part === "모자" && <img src="/img/모자1.png" alt="모자1" width="100%" height="100%"></img>}
                    {user.part === "아우터" && <img src="/img/아우터1.png" alt="아우터1" width="100%" height="100%"></img>}
                    {user.part === "악세사리" && <img src="/img/악세사리1.png" alt="악세사리1" width="100%" height="100%"></img>}
                  </td>
                ))}
              </button>
              </td> 
            </div>
          </td>
        ))}
        {selectedSet !== null && (
        <div className="InterestedProducts-table-detail">               
          <table>
            <thead className="InterestedProducts-table-head">
              <td className="InterestedProducts-headcss">
                상세 보기
              </td>
              <button className="Xbutton" onClick={() => setSelectedSet(null)}>
                X
              </button>
            </thead>
            <tbody>
              {recommend[selectedSet].map((product) => (
                <tr className="InterestedProducts-table-detail2" key={product.id}>
                  <td className="table-detail-img">
                    <img src="/img/Ad_1.jpg" alt="모자1" width="100%" height="100%"></img>
                  </td>
                  <td className="table-set">
                    <td className="table-detail-name">{product.name}</td>
                    <td className="table-detail-price">{product.price}</td>
                    <td className="table-detail-rink">
                      <a href={product.rink} target="_blank" rel="noopener noreferrer">
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
    </div>
  );
};

export default InterestedProducts;


/*const InterestedProducts = () => {                                            정상작동되는거
  const { recommend } = useContext(SaveRecommendContext);
  const [selectedSet, setSelectedSet] = useState(null);

  const handleSetClick = (index) => {
    if (selectedSet === index) {
      setSelectedSet(null);
    } else {
      setSelectedSet(index);
    }
  };

  return (
    <div>
      <h2>추천 상품 페이지</h2>
      <div className="set-buttons">
        <td className="table-div0">
          <div className="table-button-wrapper">
            <button className="table-button" onClick={() => handleSetClick(0)}>
              <td className="abc">
                <img className="imgmain1" src="/img/상의.png" alt="상의" width="100%" height="100%"></img>
                <img className="imgmain1" src="/img/하의.png" alt="하의" width="100%" height="100%"></img>
                <img className="imgmain1" src="/img/신발.png" alt="신발" width="100%" height="100%"></img>
                <img className="imgmain1" src="/img/모자.png" alt="모자" width="100%" height="100%"></img>
                <img className="imgmain1" src="/img/아우터.png" alt="아우터" width="100%" height="100%"></img>
                <img className="imgmain1" src="/img/악세.png" alt="악세사리" width="100%" height="100%"></img>
              </td>
              {recommend[0].map((user) => (
                <div className="imga" key={user.id}>
                  {user.part === "상의" && <img src="/img/상의1.png" alt="상의1" width="100%" height="100%"></img>}
                  {user.part === "하의" && <img src="/img/하의1.png" alt="하의1" width="100%" height="100%"></img>}
                  {user.part === "신발" && <img src="/img/신발1.png" alt="신발1" width="100%" height="100%"></img>}
                  {user.part === "모자" && <img src="/img/모자1.png" alt="모자1" width="100%" height="100%"></img>}
                  {user.part === "아우터" && <img src="/img/아우터1.png" alt="아우터1" width="100%" height="100%"></img>}
                  {user.part === "악세사리" && <img src="/img/악세사리1.png" alt="악세사리1" width="100%" height="100%"></img>}
                </div>
              ))}
            </button>
          </div>
        </td>
        {recommend.slice(1, 7).map((users, index) => (
          <td className="table-div1" key={index+1}>
            <div className="table-button-wrapper">
              <button className="table-button" onClick={() => handleSetClick(index+1)}>
                <td className="abc">
                  <img className="imgmain1" src="/img/상의.png" alt="상의" width="100%" height="100%"></img>
                  <img className="imgmain1" src="/img/하의.png" alt="하의" width="100%" height="100%"></img>
                  <img className="imgmain1" src="/img/신발.png" alt="신발" width="100%" height="100%"></img>
                  <img className="imgmain1" src="/img/모자.png" alt="모자" width="100%" height="100%"></img>
                  <img className="imgmain1" src="/img/아우터.png" alt="아우터" width="100%" height="100%"></img>
                  <img className="imgmain1" src="/img/악세.png" alt="악세사리" width="100%" height="100%"></img>
                </td>
                {users.map((user) => (
                  <td className="imga" key={user.id}>
                    {user.part === "상의" && <img src="/img/상의1.png" alt="상의1" width="100%" height="100%"></img>}
                    {user.part === "하의" && <img src="/img/하의1.png" alt="하의1" width="100%" height="100%"></img>}
                    {user.part === "신발" && <img src="/img/신발1.png" alt="신발1" width="100%" height="100%"></img>}
                    {user.part === "모자" && <img src="/img/모자1.png" alt="모자1" width="100%" height="100%"></img>}
                    {user.part === "아우터" && <img src="/img/아우터1.png" alt="아우터1" width="100%" height="100%"></img>}
                    {user.part === "악세사리" && <img src="/img/악세사리1.png" alt="악세사리1" width="100%" height="100%"></img>}
                  </td>
                ))}
              </button>
            </div>
          </td>
        ))}
        {selectedSet !== null && (
        <div className="table-detail">
          <button className="Xbutton" onClick={() => setSelectedSet(null)}>
                  X
          </button>
          <table>
            <tbody>
              {recommend[selectedSet].map((product) => (
                <tr className="table-detail2" key={product.id}>
                  <td className="table-detail-img">
                    <img src="/img/Ad_1.jpg" alt="모자1" width="80px" height="80px"></img>
                  </td>
                  <td className="table-detail-name">{product.name}</td>
                  <td className="table-detail-price">{product.price}</td>
                  <td className="table-detail-img">
                    <a href={product.rink} target="_blank" rel="noopener noreferrer">
                      <img src="/img/Ad_1.jpg" alt="Ad_1" width="80px" height="80px" />
                    </a>
                  </td>
                 </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      </div>
    </div>
  );
};

export default InterestedProducts;*/