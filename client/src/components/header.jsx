import React, {useEffect, useState} from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import {Moblie, Tablet, Desktop} from "./responsive";
import MainLogo from "../assets/imgs/logo/logo_350.png";

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

const Logo = styled.div`
    width: 350px;
    height: 75px;
`;

const MoblieLogo = styled.div`
    width: 200px;
    
    & img {
        width: 100%;
    }
`;

const TabletLogo = styled.div`
    width: 250px;
    
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
                        <MoblieLogo>
                            <Link to="/"><img src={MainLogo} alt=""  /></Link>
                        </MoblieLogo>
                    </HeaderInner>
                </MainHeader>
            </Moblie>
            <Tablet>
                <Util>
                    <UtilInner>
                        <li><Link to="/vid">로그인</Link></li>/
                        <li><Link to="/vid">회원가입</Link></li>
                    </UtilInner>
                </Util>
                <MainHeader>
                    <HeaderInner>
                        <TabletLogo>
                            <Link to="/"><img src={MainLogo} alt="" /></Link>
                        </TabletLogo>
                    </HeaderInner>
                </MainHeader>
            </Tablet>
            <Desktop>
                <Util>
                    <UtilInner>
                        <Ul>
                            <li><Link to="/vid">로그인</Link></li>
                            <li><Link to="/vid">회원가입</Link></li>
                        </Ul>
                    </UtilInner>
                </Util>
                <MainHeader>
                    <HeaderInner>
                        <Logo>
                            <Link to="/"><img src={MainLogo} alt="" /></Link>
                        </Logo>
                    </HeaderInner>
                </MainHeader>
            </Desktop>
        </>
    )
}

export default Header;