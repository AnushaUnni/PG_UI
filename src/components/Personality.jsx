import React  from "react";

function Personality(props){

    return(
     <div className="container-fluid game">
       {
            <h2 className="answer">Your personality is <span className="personality">{props.name}</span></h2>
       }
     </div>
    );
}

export default Personality;