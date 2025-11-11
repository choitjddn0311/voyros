import React, {useState} from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import MainLogo from "../assets/imgs/logo/logo_350.png";

const Util = styled.div`
    width: 100%;
    height: 20px;
    background: red;
`

const MainHeader = styled.header`
    width: 100%;
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
`

const Header = () => {
    return (
        <>
            <Util></Util>
            <MainHeader>
                <img src={MainLogo} alt="" />
            </MainHeader>
        </>
    )
}

export default Header;