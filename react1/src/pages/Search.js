import { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
const Search = ({}) => {
    const location = useLocation();
    const users = location.state.users;
  
    const userStyle = {
        width: '60%',
      border: '1px solid #000',
      borderRadius: '10px',
      padding: '20px',
      margin: '10px',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'flex-start'
    };
  
    const infoStyle = {
      marginLeft: '20px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'flex-start'
    };
  
    if(users===null){
        console.log('users is null')
    }
    else
        console.log("users", users);
  
    return (
            <div className="search-results" style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'flex-start' 
            }}>
        {users.map((user) => (
          <div key={user.id} style={userStyle}>
            <img src={process.env.PUBLIC_URL + user.image} alt={user.name} style={{ width: "100px", height: "100px" }}/>
            <div style={infoStyle}>
              <h2>{user.name}</h2>
              <p>{user.gender_field} {user.color} {user.brand} {user.price} </p>
              <a href={user.rink} target="_blank" rel="noopener noreferrer">{user.rink}</a>
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  export default Search;