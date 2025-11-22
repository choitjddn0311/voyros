import React, {useEffect, useState} from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import {Moblie, Tablet, Desktop} from "./responsive";
import MainLogo from "../assets/imgs/logo/logo_350.png";
import MoblieLogo from "../assets/imgs/logo/logo_250.png";

const Util = styled.div`
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const UtilInner = styled.div`
    width: 80%;
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
    width: 80%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const LogoArea = styled.div`
    width: 350px;
    height: 75px;
`;

const MoblieLogoArea = styled.div`
    width: 200px;
    
    & img {
        width: 100%;
    }
`

const Header = () => {
    return (
        <>
            <Moblie>
                <Util>
                    <UtilInner>
                        <li><Link to="/vid">로그인 / 회원가입</Link></li>
                    </UtilInner>
                </Util>
                <MainHeader>
                    <HeaderInner>
                        <MoblieLogoArea>
                            <Link to="/"><img src={MainLogo} alt=""  /></Link>
                        </MoblieLogoArea>
                    </HeaderInner>
                </MainHeader>
            </Moblie>
            <Tablet>
                <h1>테블릿 반응형입니다</h1>
            </Tablet>
            <Desktop>
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
                        <LogoArea>
                            <Link to="/"><img src={MainLogo} alt="" /></Link>
                        </LogoArea>
                    </HeaderInner>
                </MainHeader>
            </Desktop>
        </>
    )
}

export default Header;