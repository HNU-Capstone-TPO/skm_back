import Ad from "../components/common/Ad";
import Helper from "../components/Home/Helper";
import Input from "../components/Home/Input";
import './Home.css';
import { useState } from "react";
import InputList from "../InputList";
import Result1 from "../Result1";
import axios from "axios";



const Home = () => {

    const [query, setQuery] = useState([]);
    const [users, setUsers] = useState([]);

    const handleSubmit = (items) => {
    const formData = new FormData();
    formData.append("query", items);
    axios
      .post("http://127.0.0.1:8000/search/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        setUsers(response.data.users);
      })
      .catch((error) => {
        console.error(error);
      });
    setQuery(items);
  };

    const [tags, setTags] = useState([]);

    const getTags = (newTag) => {
        setTags([...tags, newTag]);
        console.log(tags);
    }

    return (
        <div className="home">
                        
            <div className="ad"><Ad /></div>
            <div className="right">
            <InputList onSubmit={handleSubmit} />
            <Result1 users={users} />
            </div>
        </div>
    )
}

export default Home;