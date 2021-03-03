import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [userObjects, setUserObjectsState] = useState([]);

  useEffect(() => {
    const fetcher = async () => {
      const response = await fetch("/users");
      const jsonResponse = await response.json();
      setUserObjectsState(jsonResponse.content);
    };
    fetcher();
  }, []);

  return (
    <div className="App">
      <ul>
        {userObjects.map((userObject) => (
          <li key={userObject.id}>
            {userObject.username} {userObject.password} {userObject.bio} {userObject.age}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
