import React from "react";
import { BrowserRouter,Routes, Route, useLocation } from "react-router-dom";
import GlobalStyle from "./styles/globalStyle";
import Header from "./components/header";
import MainHome from "./pages/main";
import AuthPage from "./pages/auth";

const Layout = () => {
    const location = useLocation();
    // pathname이 /vid로 시작하는 모든 경로 설정
    const hideHeader = location.pathname.startsWith("/vid");

    return(
        <>
            {/* !hideHeader가 true일때 <Header />를 보여주고*/}
            {/* !hideHeader가 false일때 <Header />를 보여주지않음*/}
            {!hideHeader && <Header/>}
            {/* routes 추가 */}
            <Routes>
                <Route path="/" element={<MainHome />} />
                <Route path="/vid" element={<AuthPage />} />
            </Routes>
        </>
    )
};

const App = () => {

  return (
    <>
        <GlobalStyle/>
        <BrowserRouter>
            {/* 레이아웃 함수 */}
            <Layout />
        </BrowserRouter>
    </>
  )
}

export default App;