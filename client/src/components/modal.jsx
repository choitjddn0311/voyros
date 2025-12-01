import React from "react";
import styled from "styled-components";
import { IoCloseOutline } from "react-icons/io5";

const ModalOverlay = styled.div `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: rgba(0,0,0,0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 5;
`

const ModalBox = styled.div`
    padding: 15px;
    background: #fff;
    border-radius: 5px;
    width: 400px;
    position: relative;

    ${(props) => 
        props.$type === "signup" &&
        `
        width: 800px;
        height: 550px;
        `
    }
    ${(props) => 
        props.$type === "login" && 
        `
        height: 300px;
        `
    }

    & h2 {
        width: 100%;
        height: 45px;
        text-align: start;
        align-content: start;
    }
`;

const CloseBtn = styled.button`
    width: 50px;
    height: 50px;
    position: absolute;
    top: 0px;
    right: 0px;
    text-align: center;
    align-content: center;
    color: #ddd;
    font-size: 25px;
    
    &:hover {
        color: red;
    }
`

const Modal = ({isOpen, onClose, type, children}) => {
    if (!isOpen) return null;

    return (
        <>
            <ModalOverlay>
                <ModalBox $type={type}>
                    <CloseBtn onClick={onClose}>
                        <IoCloseOutline />
                    </CloseBtn>
                    {children}
                </ModalBox>
            </ModalOverlay>
        </>
    )
}

export default Modal;