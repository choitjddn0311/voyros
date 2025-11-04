import { useEffect } from "react";
import React from "react";

const App = () => {
  useEffect(() => {
    fetch('http://localhost:5000/api')
      .then(res => res.json())
      .then(data => console.log(data.message))
      .catch((err) => console.error(err));
  },[]);

  return (
    <div>
      <h1>프론트엔드 테스트 확인합니다</h1>
    </div>
  );
}

export default App;