import {useState} from 'react';
import { Button, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';

const Guide = () => {
    let keyword = ["부위", "상황", "조건", "가격"];
    let options = {
        "부위": ["상의", "하의", "신발", "모자", "아우터", "악세사리"],
        "상황": ["학교", "결혼식", "소풍", "데이트", "면접"],
        "조건": ["루즈핏", "와이드핏", "슬림핏", "크롭"],
        "가격": ["20000", "30000", "40000", "50000"]
    };
    
    const [openDropdown, setOpenDropdown] = useState('');

    const toggleDropdown = (keyword) => {
        if (openDropdown === keyword) {
            setOpenDropdown('');
        } else {
            setOpenDropdown(keyword);
        }
    }

    return (
        <div>
            {keyword.map((word, index) => (
                <ButtonDropdown isOpen={openDropdown === word} toggle={() => toggleDropdown(word)} key={index}>
                    <DropdownToggle caret>{word}</DropdownToggle>
                    <DropdownMenu>
                        {options[word].map((option, index) => (
                            <DropdownItem key={index}>{option}</DropdownItem>
                        ))}
                    </DropdownMenu>
                </ButtonDropdown>
            ))}
        </div>
    )
}
export default Guide;