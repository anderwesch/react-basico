import React, { useState, useEffect } from "react";
import Counter from './Counter';

function App() {
  const [visible, setVisible] = useState(true);

  return (
    <div>
      { visible &&
        <Counter />
      }
      <button onClick={() => setVisible(!visible)}>toggle</button>
    </div>
  );
}

export default App;
