import React, { useState, useEffect } from "react";
import Heading from "./Header";
import Footer from "./Footer";
import MainPage from "./MainPage";
import StartGame from "./StartGame";

function App(props) {

  const [isStartGame, setIsStartGame] = useState(false);

  function updateStartGame(value){
    return setIsStartGame(value)
  }


  return (
    <div>
  <Heading /> 
  {
    isStartGame ? <StartGame resetStartGame={updateStartGame}/> :  <MainPage  sample="text" onstartGame={updateStartGame}/>
  }
  <Footer />
  </div>
  );
}

export default App;
