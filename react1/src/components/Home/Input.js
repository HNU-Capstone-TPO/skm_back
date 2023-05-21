/*import {useState, useEffect} from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useContext } from "react";
import { SaveContext } from "../../contexts/SaveContext";


const Input = ({setTags, onSubmit, tags}) => {
    const [input, setInput] = useState('');
    const [start, setStart] = useState(0);
    const [check, setCheck] = useState(false); 
    const [isDisabled, setIsDisabled] = useState(false);
    const { getSave } = useContext(SaveContext);
    var newTag = null;
    
    useEffect(()=>{
      //성별 감지->버튼 활성화
      if(input.includes("공용")||input.includes("남자")||input.includes("여자")){
        setCheck(true);
        setIsDisabled(true);
        console.log("감지");
      }
      
    },[input])

    const handleOnKeyPress = async (e) => {
      if (e.key === "Enter" || e.key === " ") {
        console.log("before:" + start);
        newTag = input.substr(start, input.length).trim();
        if (newTag === "") {
          return;
        }
        await setTags([...tags, newTag]);
        setStart(input.length);
        
        
      }
    };
      
    const handleSubmit = async (e) => {
      await handleOnKeyPress({ key: " " });
      onSubmit();
      getSave();
    
    };
    
    return (
        <div className="textfield-wrapper" style={{ display: 'flex', flexDirection: 'column' }}>
            <TextField
                style={{width: '500px'}}
                id="outlined-multiline-static"
                multiline
                rows={20}
                placeholder="입력"
                onChange={(e)=>setInput(e.target.value)}
                onKeyDown={(e) => handleOnKeyPress(e, e.target.value)}
            />
                
                    <Button style={{marginLeft: 'auto'}} disabled={!isDisabled} variant="contained" onClick={handleSubmit}>
                    입력
                    </Button>
      </div>
    )
}
export default Input;*/

import {useState} from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useContext } from "react";
import { SaveContext } from "../../contexts/SaveContext";


const Input = ({getTags, onSubmit}) => {
    const [input, setInput] = useState('');
    const [start, setStart] = useState(0);
    const { getSave } = useContext(SaveContext);
    var newTag = null;

    
    const handleOnKeyPress = async (e, callback) => {
      if (e.key === "Enter" || e.key === " ") {
        console.log("before:" + start);
        newTag = input.substr(start, input.length).trim();
        if (newTag === "") {
          return;
        }
        await getTags(newTag);
        setStart(input.length);
      }
    };
      
    const handleSubmit = async (e) => {
      e.preventDefault();
      onSubmit();
      getSave();
    };
    
    return (
        <div className="textfield-wrapper">
            <TextField
                style={{width: '500px'}}
                id="outlined-multiline-static"
                multiline
                rows={20}
                placeholder="입력"
                onChange={(e)=>setInput(e.target.value)}
                onKeyDown={(e) => handleOnKeyPress(e, e.target.value)}
            />
                
                    <Button variant="contained" onClick={handleSubmit}>
                    입력
                    </Button>
               
              
      </div>
    )
}
export default Input;