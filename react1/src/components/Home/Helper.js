import Box from '@mui/material/Box';
import { useState, useEffect } from 'react';

const tagList = [
    "결혼식", "데이트", "검은색", "초록색"
]
const helpList = [
    "성별이 무엇입니까?",
    "어디에서 입으실 건가요?",
    "어떤 색깔의 옷을 원하시나요?",
    "검은색 상의를 입으시려는 건가요?"
]

const Helper = ({tags}) => {
    const [check1, setCheck1]=useState(true);
    const [check2, setCheck2]=useState(true);
    const [helpMessage, setHelpMessage] = useState(helpList[0]);

    useEffect(() => {
        console.log("helper", tags);
        if (tags.length !== 0 && check2) {
            setHelpMessage(helpList[1]);
            setCheck2(false);
        } else if (tags.length !== 0 && check1) {
            for (let i = 0; i < tags.length; i++) {
                if (tags.includes(tagList[2])) {
                    setHelpMessage(helpList[3]);
                    setCheck1(false);
                    
                    break;
                }
            }
        }
        setTimeout(() => {setHelpMessage("")}, 5000);
    }, [tags, check1, check2]);


/*const Helper = ({tags}) => {
    const [check1, setCheck1]=useState(true);
    const [check2, setCheck2]=useState(true);
    const [helpMessage, setHelpMessage] = useState(helpList[0]);

    useEffect(() => {
        console.log(tags);
        if (tags.length !== 0 && check2) {
            setHelpMessage(helpList[1]);
            setCheck2(false);
        } else if (tags.length !== 0 && check1) {
            for (let i = 0; i < tags.length; i++) {
                if (tags.includes(tagList[2])) {
                    setHelpMessage(helpList[3]);
                    setCheck1(false);
                    
                    break;
                }
            }
        }
        setTimeout(() => {setHelpMessage("")}, 5000);
    }, [tags, check1, check2]);*/       //  05.15 이상한거 있으면 이부분 그냥 쓰기

    /*var helpMessage = "";
    var i;
    
    if(Array.isArray(tags)&&tags.length===0){
        helpMessage=helpList[0];
        console.log(helpMessage)
    }
    else if(tags.length!==0&&check2){
        helpMessage=helpList[1];
        setCheck2(false);
        console.log("check2")
        console.log(helpMessage)
    }
    else if(tags.length!==0&&check1){
        for(i =0; i<tags.length; i++){
            if(tags.includes(tagList[2])){
                helpMessage=helpList[3];
                console.log("검은색 포함");
                setCheck1(false);
                console.log(helpMessage)
                break;
            }
        }
    }
*/
    return (
        <div>
            <Box 
            sx={{
        width: 500,
        height: 200,
        border: 1,
        borderRadius: '16px'
      }}>
                <h1>{helpMessage}</h1>
            </Box>
        </div>
    )
}

export default Helper;