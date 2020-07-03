import React, { useState }  from "react";
import InstructionsPopUp from "./InstructionsPopUp";

function MainPage(props){

    const [isInstructionsPopUp, setIsInstructionsPopUp] = useState(false);

    function showInstructions(){
        return setIsInstructionsPopUp(true);
    }

    function updateInstructionsPopUp(value){
        return setIsInstructionsPopUp(value);
    }

    function setStartGame(){
        props.onstartGame(true);
    }

    return(
        <div className="container-fluid mainPage">
       <button type="button" className="knowTheGameButton btn btn-primary btn-lg" onClick={showInstructions}>Know the Game Instructions</button>
       {
        isInstructionsPopUp? <InstructionsPopUp onClose={updateInstructionsPopUp}/> : null
       }
       <button type="button" className="startTheGameButton btn btn-primary btn-lg" onClick={setStartGame}>Start the game</button>
       </div>
    );
}

export default MainPage;