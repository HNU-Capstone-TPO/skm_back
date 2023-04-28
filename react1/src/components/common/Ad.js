import { useState, useEffect } from "react";

function getAd () {
    const ad = [ "Ad_1.jpg" ,"Ad_2.jpg", "Ad_3.jpg" ];
    return ad[Math.floor(Math.random() * ad.length)];
    
}

const Ad = () => {
    const [adImg, setAdImg] = useState("");

    useEffect(() => {
        setAdImg(getAd());
    }, []);
    
    return (

        <div>
            <img src={ process.env.PUBLIC_URL +'/img/'+ adImg } alt="ad"/>
        </div>
    )
}

export default Ad;