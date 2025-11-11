import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'paperlogy';
    }
    li {
        list-style: none;
    }
    a {
        color: inherit;
        text-decoration: none;
    }
    button {
        border: none;
        outline: none;
    }
`;

export default GlobalStyle;