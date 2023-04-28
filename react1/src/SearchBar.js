import React, { useState } from "react";
import axios from "axios";

function SearchBar() {
  const [query, setQuery] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (query.length === 0) {
      return;
    }
    axios
      .post(
        "http://127.0.0.1:8000/search/",
        { query: query },
        { headers: { "Content-Type": "application/json" } }
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChange = (event, index) => {
    const newQuery = [...query];
    newQuery[index] = event.target.value;
    setQuery(newQuery);
  };

  return (
    <form className="form-inline my-2 my-lg-0" onSubmit={handleSubmit}>
      <input
        className="form-control mr-sm-2"
        type="text"
        placeholder="gender"
        aria-label="text"
        value={query[0] || ""}
        onChange={(event) => {
          setQuery([]);
          handleChange(event, 0);
        }}
      />
      <input
        className="form-control mr-sm-2"
        type="text"
        placeholder="part"
        aria-label="text"
        value={query[1] || ""}
        onChange={(event) => {
          setQuery([]);
          handleChange(event, 1);
        }}
      />
      <input
        className="form-control mr-sm-2"
        type="text"
        placeholder="color"
        aria-label="text"
        value={query[2] || ""}
        onChange={(event) => {
          setQuery([]);
          handleChange(event, 2);
        }}
      />
      <input
        className="form-control mr-sm-2"
        type="text"
        placeholder="tag1"
        aria-label="text"
        value={query[3] || ""}
        onChange={(event) => {
          setQuery([]);
          handleChange(event, 3);
        }}
      />
      <input
        className="form-control mr-sm-2"
        type="text"
        placeholder="tag2"
        aria-label="text"
        value={query[4] || ""}
        onChange={(event) => {
          setQuery([]);
          handleChange(event, 4);
        }}
      />
      <button className="btn btn-outline-success my-2 my-sm-0" type="submit">
        Search
      </button>
    </form>
  );
}

export default SearchBar;