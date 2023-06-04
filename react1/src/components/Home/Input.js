import {useState, useEffect} from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useContext } from "react";
import { SaveContext } from "../../contexts/SaveContext";

const Input = ({setTags, onSubmit, tags, button, setButton}) => {
    const [input, setInput] = useState('');
    const [start, setStart] = useState(0);
    const [check, setCheck] = useState(false); 
    const [isDisabled, setIsDisabled] = useState(false);
    //const [button, setButton] = useState('');
    const [btnActive, setBtnActive] = useState("");
    const {getSave} = useContext(SaveContext);

    var newTag = null;
    let btn = ['N', 'E', 'S'];

    const toggleActive = (e) => {
      setBtnActive((prev) => {
        setButton(btn[e.target.value]);
        return e.target.value;
      });
      console.log(button);
    };
    /*
    const removeTag = (tag) => {
      setTags(prevTags => prevTags.filter((t) => t !== tag))
    }
    */
    useEffect(()=>{
      //성별 감지->버튼 활성화
      if(input.includes("공용")||input.includes("남자")||input.includes("여자")){
        setCheck(true);
        setIsDisabled(true);
        console.log("감지");
        console.log(btnActive);
      }
      /*입력 수정
      for(let tag of tags){
        if(!input.includes(tag)&&tags.length!==0){
          removeTag(tag);
          console.log("태그", tag);
          console.log("태그들", tags);
        }
      }
      */
    },[input])

    const handleOnKeyPress = async (e) => {
      if (e.key === "Enter" || e.key === " ") {
        console.log("before:" + start);
        newTag = input.substr(start, input.length).trim();
        if (newTag === "") {
          return;
        }
        await setTags([...tags, newTag]);
        const count = localStorage.getItem(newTag);
        if (count === null) {
          localStorage.setItem(newTag, 1);
        } else {
          localStorage.setItem(newTag, Number(count) + 1);
        }
        setStart(input.length);
        
        /*if (callback) {
          callback();
        }*/
      }
    };
      
    const handleSubmit = async (e) => {
      await handleOnKeyPress({ key: " " });
      onSubmit();
      getSave();
    };

    return (
        <div className="textfield-wrapper" style={{ display: 'flex', flexDirection: 'column' }}>
    <div className="container">
      {btn.map((item, idx) => {
        return (
          <>
            <button
              value={idx}
              className={"btn" + (idx === btnActive ? " active" : "")}
              onClick={toggleActive}
            >
              {item}
            </button>
          </>
        );
      })}
    </div>
            <TextField
                style={{width: '500px'}}
                id="outlined-multiline-static"
                multiline
                rows={20}
                placeholder="입력"
                onChange={(e)=>setInput(e.target.value)}
                onKeyDown={(e) => handleOnKeyPress(e, e.target.value)}
            >
              </TextField>
                
                    <Button style={{marginLeft: 'auto'}} disabled={!isDisabled} variant="contained" onClick={handleSubmit}>
                    입력
                    </Button>
      </div>
    )
}
export default Input;