import React from "react";

function Result1(props) {
  return (
    <div>
      {props.users.map((user) => (
        <div key={user.id}>
          <h2>{user.name}</h2>
          <p>{user.id} {user.gender_field} {user.part} {user.color} {user.season} {user.brand} {user.price} {user.tag}</p>
          <img src={process.env.PUBLIC_URL + user.image} alt={user.name} style={{ width: "100px", height: "100px" }}/>
          <a href={user.rink} target="_blank" rel="noopener noreferrer">{user.name}</a>
        </div>
      ))}
    </div>
  );
}

export default Result1;