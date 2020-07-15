import React, { useState } from "react";
import CharacterNotExist from "./CharacterNotExist";
import App from "./App";

function Character(props) {
  const [playAgain, setPlayAgain] = useState(false);
  const [characterNotExist, setCharacterNotExist] = useState(false);

  function handleSubmit(event) {
    if (event.target.value === "right") {
      console.log("right");
      return setPlayAgain(true);
    } else {
      console.log("wrong");
      return setCharacterNotExist(true);
    }
  }

  if (playAgain) {
    return <App />;
  } 
  
  if (characterNotExist) {
    return <CharacterNotExist />;
  }

  if(!playAgain && !characterNotExist) {
    return (
      <div className="container-fluid game">
        <form>
          <h2 className="answer">
            The Character you thought of is{" "}
            <span className="character">{props.name}</span>
          </h2>
          <h2 className="answer">
            You played well! Are you ready with another great character, bcoz am
            ready to guess!!
          </h2>
          <button
          onClick={handleSubmit}
            type="button"
            value="right"
            className="btn btn-lg btn-primary questionButton"
          >
            Play Again
          </button>
          <button
          onClick={handleSubmit}
            type="submit"
            value="wrong"
            className="btn btn-lg btn-primary questionButton"
          >
            Click Here If my guess is wrong
          </button>
        </form>
      </div>
    );
  }
}

export default Character;
