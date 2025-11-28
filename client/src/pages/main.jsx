import React from "react";
import styled from "styled-components";
import {Moblie, Tablet, Desktop} from "../components/responsive";

const color1 = "#344e41";
const color2 = "#3a5a40";
const color3 = "#588157";
const color4 = "#a3b18a";
const color5 = "#dad7cd";

const VoyrosIntro = styled.div`
    width: 100%;
    height: 700px;
    background: #344e41;
`

const MainHome = () => {
    return (
        <>
            <VoyrosIntro></VoyrosIntro>
        </>
    )
}

export default MainHome;