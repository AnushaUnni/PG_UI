import React from "react";

function InstructionsPopUp(props){

    function closePopUp(){
        props.onClose(false);
    }

    return(
       <div className="instructionsPopup">
           <ul>
               <li>
                   Its an game of guessing a famous celebrity within 24 questions
               </li>
               <li>
                   You will think of a celebrity and I will guess him
               </li>
               <li>
                   And how will i guess?? I will ask you 24 random questions, which you should answer by
                   yes or no.
               </li>
               <li>
                   By end of it, or befor, i will read your mind 
               </li>
               <li>
                   Lets see who wins!
               </li>
           </ul>
           <button type="button" className="closeButton btn btn-lg btn-light" onClick={closePopUp}>Close</button>
       </div>
    );
}

export default InstructionsPopUp;