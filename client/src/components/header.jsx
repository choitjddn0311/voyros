import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import LogoImg from "../assets/images/logo/logo_350.png";
import { GoSearch } from "react-icons/go";
import UserAlert from "./alert/userAlert";

const containerSize = 1400;

const MainHeader = styled.header`
    width: 100%;
    height: 100px;
    background: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    position: sticky;
    top: 0;
    z-index: 3;
`;

const HeaderContainer = styled.div`
    width: ${containerSize}px;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const LogoContainer = styled.div`
    height: 75px;
    width: 350px;

    & img {
        width: 100%;
        height: 100%;
        filter: brightness(0);
    }
`;

const Nav = styled.nav`
    width: 900px;
    height: 100%;
`;

const GnbContainer = styled.ul`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: end;
    gap: 50px;
    align-items: center;
`;

const Gnb = styled.li`
    height: 100%;
    font-size: 25px;
    font-weight: bold;
    align-content: center;
    position: relative;

    a {
        color: ${(props) => props.$active ? '#111' : "#ddd"};
        text-decoration: none;

        &:hover {
            color: #111;
        }
    }
`;

const SearchForm = styled.form`
    width: 250px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    & input {
        width: 100%;
        height: 50%;
        outline: none;
        border: none;
        border-bottom: 3px solid ${props => props.$hasValue ? '#111' : '#ddd'};
        font-size: 17px;
        caret-color: ${props => props.$hasValue ? '#111' : '#ddd'};
        color: #111;
        font-weight: 500;
    }

    & input::placeholder {
        color: #ddd;
        font-weight: 300;
    }
`;

const SearchBtn = styled.div`
    width: 50px;
    height: 50px;
    font-size: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${props => props.$hasValue ? '#111' : '#ddd'};
`;

const Header = () => {
    const location = useLocation();
    const currentPath = location.pathname;
    const [search, setSearch] = useState("");
    const navigate = useNavigate();
    const [showAlert,setShowAlert] = useState(false);

    const user = JSON.parse(localStorage.getItem("user"));
    const isAdmin = user?.role === "admin";

    const handleProtectedCheck = (path) => {
        const isLoggedIn = localStorage.getItem("isLoggedIn") == "true";

        if(!isLoggedIn) {
            setShowAlert(true);
            return;
        }

        navigate(path);
    };

    return (
        <MainHeader>
            <HeaderContainer>
                <LogoContainer>
                    <Link to="/"><img src={LogoImg} alt="logo" /></Link>
                </LogoContainer>
                <Nav>
                    <GnbContainer>
                        {showAlert && (
                          <UserAlert
                            message="로그인이 필요한 서비스입니다."
                            onClose={() => setShowAlert(false)}
                          />
                        )}
                        <Gnb $active={currentPath === "/"}>
                            <Link to="/">홈</Link>
                        </Gnb>
                        {/* 오류나면 여기바꿔 */}
                        <Gnb $active={currentPath === "/write"}>
                            <Link
                                to="/write"
                                onClick={(e) => {
                                    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
                                    if(!isLoggedIn) {
                                        e.preventDefault();
                                        setShowAlert(true);
                                    }
                                }}
                            >
                                글쓰기
                            </Link>
                        </Gnb>
                        <Gnb $active={currentPath === "/intro"}>
                            <Link to="/intro">소개</Link>
                        </Gnb>
                        <Gnb $active={currentPath === "/profile"}>
                            <Link
                                to="/profile"
                                onClick={(e) => {
                                    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
                                    if(!isLoggedIn) {
                                        e.preventDefault();
                                        setShowAlert(true);
                                    }
                                }}
                            >
                                프로필
                            </Link>
                        </Gnb>

                        {isAdmin && (
                            <Gnb $active={currentPath === "/admin"}>
                                <Link to="/admin">관리자</Link>
                            </Gnb>
                        )}
                        {currentPath === '/' && (
                            <SearchForm $hasValue={search !== ""}>
                                <input
                                    type="text"
                                    placeholder="내용을 입력하세요."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                                <SearchBtn $hasValue={search !== ""}>
                                    <GoSearch />
                                </SearchBtn>
                            </SearchForm>
                        )}
                    </GnbContainer>
                </Nav>
            </HeaderContainer>
        </MainHeader>
    );
};

export default Header;
