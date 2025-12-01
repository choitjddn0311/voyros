import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Logo from "../assets/images/logo/footerLogo.png"
import { FaInstagram } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { RiKakaoTalkFill } from "react-icons/ri";

const containerSize = 1400;

const Container = styled.footer`
    width: 100%;
    height: 400px;
    background: #fff;
    border-top: 1px solid #ddd;
    display: flex;
    justify-content: center;
`;

const Inner = styled.div`
    width: ${containerSize}px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 40px;
`;

const InnerLeft = styled.div`
    width: 30%;
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    &::after {
        position: absolute;
        content: '';
        width: 1px;
        height: 100%;
        background: #ddd;
        top: 0;
        right: 0;
    }
`;

const InnerLeftTop = styled.div`
    width: 100%;
    height: 100px;
`

const FooterLogo = styled.div`
    width: 100%;
    height: 50px;
    display: flex;
    align-items: start;

    & > img {
        width: 200px;
        height: 100%;
        filter: brightness(0);
    };
`;

const FooterSns = styled.ul`
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: start;
    align-items: center;
    gap: 15px;

    & > li {
        width: 30px;
        height: 100%;
        font-size: 30px;
        color: #aaa;
        align-content: center;
    }

    & > li:hover,
    & > li:active {
        color: #111;
    }
`;

const Copyright = styled.div`
    width: 100%;
    height: 70px;
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: end;

    & > p {
        color: #aaa;
    }
`;

const InnerRight = styled.div`
    width: 70%;
    height: 100%;
`;

const FooterNav = styled.ul`
    width: 100%;
    height: 70%;
    display: flex;
    justify-content: end;
    gap: 15px;
    align-items: center;

    & > li {
        width: 22%;
        height: 100%;
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
`;

const SubNav = styled.ul`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 5px;
    color: #111;


    & > li:hover {
        cursor: pointer;
    }
`

const Footer = () => {
    return(
        <>
            <Container>
                <Inner>
                    <InnerLeft>
                        <InnerLeftTop>
                            <FooterLogo>
                                <img src={Logo} alt="" />
                            </FooterLogo>
                            <FooterSns>
                                <li><Link to="https://www.instagram.com/404.moments"><FaInstagram /></Link></li>
                                <li><Link to="https://github.com/choitjddn0311"><FaGithub /></Link></li>
                                <li><Link to="https://open.kakao.com/o/sA2ZjgCh"><RiKakaoTalkFill /></Link></li>
                            </FooterSns>
                        </InnerLeftTop>
                        <Copyright>
                            <p>&copy;2025. choitjddn31 All rights reserved.</p> <br />
                            <p>대표: 최성우</p>
                        </Copyright>
                    </InnerLeft>
                    <InnerRight>
                        <FooterNav>
                            <li>
                                <h2>소개</h2>
                                <SubNav>
                                    <li>- 만들게 된 계기</li>
                                    <li>- 블로그 소개</li>
                                    <li>- 개발자 소개</li>
                                </SubNav>
                            </li>
                            <li>
                                <h2>추가사항</h2>
                                <SubNav>
                                    <li>- 추가사항1</li>
                                    <li>- 추가사항2</li>
                                    <li>- 추가사항3</li>
                                    <li>- 추가사항4</li>
                                    <li>- 추가사항5</li>
                                    <li>- 추가사항6</li>
                                </SubNav>
                            </li>
                            <li>
                                <h2>미정</h2>
                                <SubNav>
                                    <li>- 미정</li>
                                    <li>- 미정</li>
                                    <li>- 미정</li>
                                    <li>- 미정</li>
                                    <li>- 미정</li>
                                </SubNav>
                            </li>
                            <li>
                                <h2>미정</h2>
                                <SubNav>
                                    <li>- 미정</li>
                                    <li>- 미정</li>
                                    <li>- 미정</li>
                                </SubNav>
                            </li>
                        </FooterNav>
                    </InnerRight>
                </Inner>
            </Container>
        </>
    )
}

export default Footer;