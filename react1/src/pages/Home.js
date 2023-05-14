import Ad from "../components/common/Ad";
import Helper from "../components/Home/Helper";
import Input from "../components/Home/Input";
import './Home.css';
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { createContext } from 'react';
import { SaveContext } from "../contexts/SaveContext";
import { useContext } from "react";

const MyContext = createContext();

const Home = () => {
    
    const [tags, setTags] = useState([]);
    const [query, setQuery] = useState([]);
    const [submitFlag, setSubmitFlag] = useState(false);
    const { save, setSave } = useContext(SaveContext); // SaveContext에서 save 배열 가져오기
    
;    //const [users, setUsers] = useState([]);

    const navigate = useNavigate();

    const handleSubmit = () => {
      setSubmitFlag(!submitFlag);
    };

    const saveToLocalStorage = (key, value) => {
      localStorage.setItem(key, JSON.stringify(value));
    };

    const loadFromLocalStorage = (key) => {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    };

    useEffect(() => {
      saveToLocalStorage("save", save);
    }, [save]);

    useEffect(() => {
      const savedSave = loadFromLocalStorage("save");
      if (savedSave) {
        setSave(savedSave);
      }
    }, []);

    useEffect(() => {
      if (submitFlag) {
        const formData = new FormData();
        formData.append("query", tags);
        console.log('보내는 태그', tags);
        axios
          .post("http://127.0.0.1:8000/search/", formData, {
            headers: { "Content-Type": "multipart/form-data" },
          })
          .then((response) => {
            //setUsers(response.data.users);
            navigate('/result', {
                state: { users: response.data.users },
            });
          })
          .catch((error) => {
            console.error(error);
          });
        setQuery(tags);
      }
    }, [tags, submitFlag, navigate]);
  
  const getTags = async (newTag) => {
    setTags([...tags, newTag]);
  };
  
  const getSave = () => {
    const newSave = [...save, tags];
    setSave(newSave);
    saveToLocalStorage("save", newSave);
  };

  const Save = ({ save }) => {
    return (
      <div>
        <h2>Saved Tags</h2>
        {save.map((item, index) => (
          <p key={index}>{item}</p>
        ))}
      </div>
    );
  };
    
    return (
      <SaveContext.Provider value={{ getSave }}>
        <div className="home">
            <div className="right">
                <div className="helper" ><Helper tags={tags}/></div>
                <div className="input" ><Input onSubmit={handleSubmit} getTags={getTags} getSave={getSave}/></div>
                <Save save={save} />
            </div>
        </div>
      </SaveContext.Provider>
    )
}

export default Home;