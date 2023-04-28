import {useState} from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';


const Input = ({getTags}) => {
    const [input, setInput] = useState('');
    const [start, setStart] = useState(0);
    var newTag = null;

    const [items, setItems] = useState([]);

    const handleChange = (event, index) => {
    const newItems = [...items];
    newItems[index] = event.target.value;
    setItems(newItems);
    };

    

    const handleOnKeyPress = (e) => {
        if ((e.key === "Enter" || e.key === " ")) {

          console.log("before:"+start);
          newTag = input.substr(start, input.length).trim();
          if(newTag===""){
            return;
          }
          getTags(newTag);
          setStart(input.length);
        }
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
                onKeyDown={handleOnKeyPress}
            />
                < Link to="/result">
                    <Button variant="contained">
                    입력
                    </Button>
                </Link>
      </div>
    )
}
export default Input;

