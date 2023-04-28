import Ad from "../components/common/Ad";
import RelatedImage from "../components/Result/RelatedImage";
import RelatedLink from "../components/Result/RelatedLink";
import SelectedList from "../components/Result/SelectedList";
import Styling from "../components/Result/Styling";
import './Result.css';
import { useState } from "react";
const Result = () => {
    const [selectedProducts, setSelectedProducts] = useState([null, null, null, null]);


    return (
        
        <div className="page-content">
            {/*
        <div className="left-section">
            <Ad />
        </div>
    */}
        <div className="center-section">
            <Styling setSelectedProducts={setSelectedProducts}/>
        </div>
        {/*
        <div className="right-section">
            <RelatedImage />
            <RelatedLink />
        </div>
*/}
        <div className="bottom-section">
            <SelectedList selectedProducts={selectedProducts}/>
        </div>
    </div>
    )
}

export default Result;