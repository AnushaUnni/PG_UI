import React, { useState, useEffect } from "react";
import App from "./App";

function Personality(props) {
  const [playAgain, setPlayAgain] = useState(false);

  function handlePlayAgain() {
    return setPlayAgain(true);
  }

  useEffect(() => {
    if (playAgain === true) {
      return <App />;
    }
  }, [playAgain]);

  return (
    <div className="container-fluid game">
      <form onSubmit={handlePlayAgain}>
        <h2 className="answer">
          Your personality is <span className="personality">{props.name}</span>
        </h2>
        <h2 className="answer">
          You played well! Are you ready with another great personality, bcoz am
          ready to guess!!
        </h2>
        <button type="submit" className="btn btn-lg btn-primary questionButton">
          Play Again
        </button>
      </form>
    </div>
  );
}

export default Personality;
