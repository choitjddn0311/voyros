import React from "react";
import { BrowserRouter,Routes, Route } from "react-router-dom";
import GlobalStyle from "./styles/globalStyle";
import Header from "./components/header";
import MainHome from "./pages/main";


const App = () => {
  return (
    <>
      <GlobalStyle/>
      <BrowserRouter>
        <Header/>
          <Routes>
            <Route path="/" element={<MainHome />}></Route>
          </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;