import React, {useState} from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import MainLogo from "../assets/imgs/logo/logo_350.png";

const Util = styled.div`
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const UtilInner = styled.div`
    width: 1400px;
    height: 100%;
    display: flex;
    justify-content: end;
    align-items: center;
`;

const Ul = styled.ul`
    display: flex;
    justify-content: end;
    gap: 20px;
    
`;

const MainHeader = styled.header`
    width: 100%;
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const HeaderInner = styled.div`
    width: 1400px;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const Header = () => {
    return (
        <>
            <Util>
                <UtilInner>
                    <Ul>
                        <li><a href="#">로그인</a></li>
                        <li><a href="#">회원가입</a></li>
                    </Ul>
                </UtilInner>
            </Util>
            <MainHeader>
                <HeaderInner>
                    <img src={MainLogo} alt="" />
                </HeaderInner>
            </MainHeader>
        </>
    )
}

export default Header;