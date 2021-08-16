import React from "react";

const TestComponent = () => {
  const [count, setCount] = React.useState(0);
  const [text, setText] = React.useState("");


  return (
    <React.Fragment>
      <h3>{count}</h3>
      <span>
        <button id="count-up" type="button" onClick={() => setCount(count + 1)}>
          Count Up
        </button>
        <button
          id="count-down"
          type="button"
          onClick={() => setCount(count - 1)}
        >
          Count Down
        </button>
        
        <button id="zero-count" type="button" onClick={() => setCount(0)}>
          Zero
        </button>
      </span>

      <div>
        <button id="btn-setLabel" onClick={() => setText("Hello world!")}>
          Set label
        </button>
      </div>
    </React.Fragment>
  );
};

export default TestComponent;
