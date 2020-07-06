import React, { useState, useEffect } from "react";
import axios from "axios";
import App from "./App";

function PersonalityNotExist(props) {
  const [name, setName] = useState("");
  const [text, setText] = useState(false);
  const [playAgain, setPlayAgain] = useState(false);

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

  function handleName(event) {
    setName(event.target.value);
  }

  function handleSubmit(event) {
    axios
      .post(
        "http://localhost:8000/personality/save",
        {},
        {
          params: {
            name: name,
          },
        },
        options
      )
      .then((response) => {
        console.log(response);
        setText(true);
        return response.status;
      })
      .catch((err) => console.warn(err));
    event.preventDefault();
  }

  function handlePlayAgain() {
    return setPlayAgain(true);
  }

  useEffect(() => {
    if (playAgain === true) {
      return <App />;
    }
  });

  if (text) {
    return (
      <div className="container-fluid game">
        <form onSubmit={handlePlayAgain}>
          <h2 className="answer">
            Thanks! I will read about this personality, and remember him if he
            is really worthy!
          </h2>
          <button
            type="submit"
            className="btn btn-lg btn-primary questionButton"
          >
            Play Again
          </button>
        </form>
      </div>
    );
  } else {
    return (
      <div className="container-fluid game">
        <form onSubmit={handleSubmit}>
          <h2 className="answer">
            You are smart! I dont know any real famous personality with these
            characterstics.
          </h2>
          <h3>Please enter your personality Name!</h3>
          <input type="text" value={name} onChange={handleName} />
          <button
            type="submit"
            className="btn btn-lg btn-primary questionButton"
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default PersonalityNotExist;
