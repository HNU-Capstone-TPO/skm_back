import React, { useContext, useState } from 'react';
import { SaveRecommendContext } from '../../contexts/SaveRecommend';
import "./InterestedProducts.css";

/*const InterestedProducts = () => {
  const { recommend, setRecommend } = useContext(SaveRecommendContext);

  const handleReset2 = () => {
    setRecommend([]);
  };

  return (
    <div>
      <button onClick={handleReset2}>Reset</button>
      <h2>관심 상품 페이지</h2>
      <table className="table-main">
        <h3>1번세트</h3>
        {recommend[0].map((user) => (
          <tr key={user.id}>
            {user.part === "상의" && (
              <td>
                <p className="my-div">{user.id}</p>
              </td>
            )}
          </tr>
        ))}
      </table>
      <table className="my-tablebig">
        {recommend.slice(1, 7).map((users, index) => (
          <td className="table-div1" key={index}>
            <th className="titlea">
              <table className="adf">
                {users.map((user) => (
                  <td className="my-divz"key={user.id}>
                    {user.part === "상의" && 
                        <img src="/img/모자.png" width="100%" height="100%"></img>
                    }
                    {user.part === "하의" && 
                        <img src="/img/모자.png" width="100%" height="100%"></img>
                    }
                    {user.part === "신발" && 
                        <img src="/img/모자.png" width="100%" height="100%"></img>
                    }
                    {user.part === "모자" && 
                        <img src="/img/모자.png" width="100%" height="100%"></img>
                    }
                  </td>
                ))}
              </table>
            </th>
            <table className="my-div"  >
              {users.map((user) => (
                  <td className="my-divz" key={user.id}>     
                    {user.part === "상의" && 
                      <div>
                        <p>{user.id}</p>
                        <p>{user.name}</p>
                      </div>
                    }
                    {user.part === "하의" &&
                      <div>
                        <p>{user.id}</p>
                        <p>{user.name}</p>
                      </div> 
                    }
                    {user.part === "신발" && 
                      <div>
                        <p>{user.id}</p>
                        <p>{user.name}</p>
                      </div> 
                    }
                    {user.part === "모자" && 
                      <div>
                        <p>{user.id}</p>
                        <p>{user.name}</p>
                      </div> 
                    }
                  </td>
              ))}
            </table>
          </td>
        ))}
      </table>
    </div>
  );
};*/

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
                    <img src={product.image} alt="모자1" width="80px" height="80px"></img>
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

export default InterestedProducts;


/*const InterestedProducts = () => {
  const { recommend, setRecommend } = useContext(SaveRecommendContext);

  const handleReset2 = () => {
    setRecommend([]);
  };

  const ProductDetails = ({ user }) => {
    return (
      <div>
        <h2>{user.name}</h2>
        <p>{user.id} {user.gender_field} {user.part} {user.color} {user.season} {user.brand} {user.price} {user.tag}</p>
        <img src={process.env.PUBLIC_URL + user.image} alt={user.name} style={{ width: "100px", height: "100px" }}/>
        <a href={user.rink} target="_blank" rel="noopener noreferrer">{user.name}</a>
      </div>
    );
  };

  return (
    <div>
      <button onClick={handleReset2}>Reset</button>
      <h2>관심 상품 페이지</h2>
      <table className="table-main">
        <h3>1번세트</h3>
        {recommend[0].map((user) => (
          <tr key={user.id}>
            {user.part === "상의" && (
              <td>
                <p className="my-div">{user.id}</p>
              </td>
            )}
          </tr>
        ))}
      </table>
      <table className="my-tablebig">
        {recommend.slice(1, 7).map((users, index) => (
          <td className="table-div1" key={index}>
            <h3>{index+2}번세트</h3>
            <table className="rigthfull"  >
              {users.map((user) => (
                  <td className="my-div" key={user.id}>
                    
                    {user.part === "상의" && 
                        <p>{user.id}</p>
                    }
                    {user.part === "하의" && 
                        <p>{user.id}</p>
                    }
                    {user.part === "신발" && 
                        <p>{user.id}</p>
                    }
                    {user.part === "모자" && 
                        <p>{user.id}</p>
                    }
                    {user.part === "아우터" ? ( 
                        <p>{user.id}</p>
                    ) : (
                      <img src="/img/모자.png" width="50px" height="50px"></img>
                    )}
                    {user.part === "악세사리" ? (
                        <p>{user.id}</p>
                    ) : (
                      <img src="/img/모자.png" width="100%" height="100%"></img>
                    )}
                  </td>
              ))}
            </table>
          </td>
        ))}
      </table>
    </div>
  );
};

export default InterestedProducts;*/