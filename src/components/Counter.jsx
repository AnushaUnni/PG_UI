import React, { useState, useEffect } from "react";

function Counter(props) {
  const [counter, setCounter] = useState(2);

  useEffect(() => {
    let timeout = setTimeout(() => {
      setCounter(counter - 1);
      if (counter === 1) {
        props.onCountDownFinish(false);
      }
    }, 1000);
    
    return () => {
      clearTimeout(timeout);
    };
  });

  return (
    <div className="container-fluid game">
      <h3>Think of a real famous character</h3>
      <h4 className="counter">{counter}</h4>
    </div>
  );
}

export default Counter;
