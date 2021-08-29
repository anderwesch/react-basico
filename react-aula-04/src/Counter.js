import React, { useState, useEffect } from "react";

function Counter() {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    document.title = count;
    return () => {
      console.log("unmount");
    }
  }, []);

  return (
    <div>
      { count }
    </div>
  );
}

export default Counter;
