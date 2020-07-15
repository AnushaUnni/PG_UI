import React, { useState, useEffect } from "react";
import axios from "axios";
import Character from "./Character";
import CharacterNotExist from "./CharacterNotExist";

function Questions() {
  const [game, setGame] = useState({
    gameId: "",
    foundCharacter: "",
    answer: "",
    question: "Is your character a male?",
    uniqueFeature: "",
    checkCharacterByUniqueFeature:""
  });

  const [isFoundCharacter, setIsFoundCharacter] = useState(false);
  const [characterNotExist, setCharacterNotExist] = useState(false);
  const [characterName, setCharacterName] = useState();
  const [request, setRequest] = useState(false);

  const options = {
    headers: {
      "Content-Type": "application/json", // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *client
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
  };
  
  function submitAnswer(event) {
    event.persist();
    setGame((prevState) => ({
      ...prevState,
      question: game.question,
      answer: event.target.value,
    }));
    setRequest(true);
  }

  useEffect(() => {
    if (request === true) {
      console.log("Game request is", game);
      axios
        .post(
          "http://localhost:8000/character/questions",
          {
            gameId: game.gameId,
            question: game.question,
            answer: game.answer,
            uniqueFeature: game.uniqueFeature,
            checkCharacterByUniqueFeature : game.checkCharacterByUniqueFeature
          },
          options
        )
        .then(
          (response) => {
            console.log("API response is", response.data);
            if (response.data.foundCharacter === 'Yes') {
              setIsFoundCharacter(true);
              setCharacterName(response.data.name);
              setRequest(false);
            }
            else if(response.data.characterNotExist === "Yes"){
              setCharacterNotExist(true);
            }
             else {
              setGame((prevState) => ({
                ...prevState,
                answer: "",
                gameId: response.data.gameId,
                question: response.data.question,
                uniqueFeature: response.data.uniqueFeature,
                checkCharacterByUniqueFeature: response.data.checkCharacterByUniqueFeature
              }));
              setRequest(false);
            }
          },
          (error) => {
            console.log(error);
          }
        );
    }
  }, [request]);

  if (isFoundCharacter) {
    return <Character name={characterName} />;
  } 
  else if(characterNotExist){
    return <CharacterNotExist />
  }
  else {
    return (
      <div className="container-fluid questions">
        <p className="question">{game.question}</p>
        <button
          onClick={submitAnswer}
          value="1"
          type="button"
          className="btn btn-lg btn-primary questionButton"
        >
          Yes
        </button>
        <button
          onClick={submitAnswer}
          value="0"
          type="button"
          className="btn btn-lg btn-primary questionButton"
        >
          No
        </button>
      </div>
    );
  }
}

export default Questions;
