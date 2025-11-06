import { useEffect } from "react";

function App() {
  useEffect(() => {
    fetch("http://localhost:5000/api/exif")
      .then(res => res.json())
      .then(data => console.log("서버에서 받은 EXIF 데이터:", data))
      .catch(console.error);
  }, []);

  return <h1>EXIF 데이터 콘솔 확인!</h1>;
}

export default App;
