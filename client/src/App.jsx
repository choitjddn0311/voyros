import React, {useState} from "react";
import {BrowserRouter, Routes, Route, useLocation} from 'react-router-dom';
import HeaderUtil from "./components/headerUtil";
import Header from "./components/header";  
import Home from "./page/home";
import Post from "./page/post";
import Intro from "./page/intro";
import Mypage from "./page/myPage";
import Footer from "./components/footer";
import GlobalStyle from "./style/globalStyle";
import PermitRoute from "./page/permit";
import PostShow from "./page/postShow";
import SideBar from "./components/sidebar";
import UpdateLog from "./page/updateLog";
import UserManagement from "./page/userManagement";
import MainDashboard from "./page/mainDashboard";

// 라우터 내부에서 location 사용을 위해 컴포넌트 분리
const AppContent = () => {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();

  // /admin으로 시작하는지 체크
  const isAdminPage = location.pathname.startsWith("/admin");

  return (
    <>
      {/* 관리자 페이지일 때만 사이드바 노출 */}
      {isAdminPage && <SideBar isOpen={isOpen} setIsOpen={setIsOpen} />}

      {/* 일반 페이지에서는 헤더 노출 */}
      {!isAdminPage && (
        <>
          <HeaderUtil />
          <Header />
        </>
      )}

      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/write" element={<PermitRoute><Post /></PermitRoute>}></Route>
        <Route path="/post/:title" element={<PostShow/>}></Route>
        <Route path="/intro" element={<Intro />}></Route>
        <Route path="/mypage" element={<PermitRoute><Mypage /></PermitRoute>}></Route>

        {/* 관리자 페이지 */}
        <Route path="/admin" element={<MainDashboard isOpen={isOpen}/>}></Route>
        <Route path="/admin/userList" element={<UserManagement isOpen={isOpen}/>} ></Route>
        <Route path="/admin/UpdateLog" element={<UpdateLog/>}></Route>
      </Routes>

      {/* 일반 페이지일 때만 푸터 노출 */}
      {!isAdminPage && <Footer />}
    </>
  );
};


const App = () => {
  return (
    <>
      <GlobalStyle/>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </>
  );
}

export default App;
