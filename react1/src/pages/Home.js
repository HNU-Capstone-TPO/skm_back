import Ad from "../components/common/Ad";
import Helper from "../components/Home/Helper";
import Input from "../components/Home/Input";
import TagRank from "../components/Home/TagRank";
import ItemRank from "../components/Home/ItemRank";
import Guide from "../components/Home/Guide";
import Navi from "../components/Home/Navi";
import './Home.css';
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { SaveContext } from "../contexts/SaveContext";
import { useContext } from "react";

const Home = () => {
    
    const [tags, setTags] = useState([]);
    const [query, setQuery] = useState([]);
    const [submitFlag, setSubmitFlag] = useState(false);
    const [button, setButton] = useState('');
    const {save, setSave} = useContext(SaveContext);
    //const [users, setUsers] = useState([]);
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
        formData.append("button", button);
        console.log('보내는 태그', tags);
        axios
          .post("http://127.0.0.1:8000/search/", formData, {
            headers: { "Content-Type": "multipart/form-data" },
          })
          .then((response) => {
            //setUsers(response.data.users);
            if(button==='N'||button==='E'){
              console.log(button);
            navigate('/result', {
                state: { users: response.data.users },
            });
          }
          else if(button==='S'){
            console.log(button);
            navigate('/search', {
              state: { users: response.data.users },
          })
          }
        })
          
          .catch((error) => {
            console.error(error);
          });
        setQuery(tags);
        console.log("query:", query);
      }
    }, [tags, submitFlag, navigate]);
   
  
  const getSave = () => {
    const newSave = [tags, ...save];
    setSave(newSave);
    saveToLocalStorage("save", newSave);
  };
    
    return (
      <SaveContext.Provider value={{ getSave }}>
        <div className="home">
            <div className="right">
                <div className="helper" ><Helper tags={tags}/></div>
                <div className="input" >
                  <Navi />
                  <Input onSubmit={handleSubmit} setTags={setTags} tags={tags} button={button} setButton={setButton} getSave={getSave}/> 
                  <Guide/>
                </div>
                <div>
                  <TagRank />
                  <ItemRank />
                </div>
            </div>
        </div>
        </SaveContext.Provider>
    )
}

export default Home;