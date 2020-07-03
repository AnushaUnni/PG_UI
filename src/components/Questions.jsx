import React, { useState, useEffect } from "react";
import axios from "axios";
import Personality from "./Personality";
import PersonalityNotExist from "./PersonalityNotExist";

function Questions() {
  const [game, setGame] = useState({
    gameId: "",
    foundPersonality: "",
    answer: "",
    question: "Is your personality a male?",
  });

  const [isFoundPersonality, setIsFoundPersonality] = useState(false);
  const [personalityNotExist, setPersonalityNotExist] = useState(false);
  const [personalityName, setPersonalityName] = useState();
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
          "http://localhost:8000/personality/questions",
          {
            gameId: game.gameId,
            question: game.question,
            answer: game.answer,
          },
          options
        )
        .then(
          (response) => {
            console.log("API response is", response.data);
            if (response.data.foundPersonality === 'Yes') {
              setIsFoundPersonality(true);
              setPersonalityName(response.data.name);
              setRequest(false);
            }
            else if(response.data.personalityNotExist === "Yes"){
              setPersonalityNotExist(true);
            }
             else {
              setGame((prevState) => ({
                ...prevState,
                answer: "",
                gameId: response.data.gameId,
                question: response.data.question,
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

  if (isFoundPersonality) {
    return <Personality name={personalityName} />;
  } 
  else if(personalityNotExist){
    return <PersonalityNotExist />
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
