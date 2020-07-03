import React, { useState } from "react";
import Counter from "./Counter";
import Questions from "./Questions";

function StartGame(){

    const [countDownFinish, setCountDownFinish] = useState(false);
   

    function updateCountDownFinish(){
        return setCountDownFinish(true);
        
    }

    return(
     <div className="container-fluid game">
        {
        !countDownFinish ? <Counter onCountDownFinish={updateCountDownFinish}/> : <Questions />
        } 
     </div>
    );
}

export default StartGame;