import React, {useState} from "react";
import styled from "styled-components";
import MainLogo from "../assets/imgs/logo/logo_350.png";

const MainContainer = styled.main`
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #fff;
`;

const FormContainer = styled.div`
    width: 50%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const AuthForm = styled.form`
    width: 500px;
    height: 650px;
    background: #fefefe;
    box-shadow: 0 0 20px #eee,
                0 0 40px #efefef;
    border-radius: 10px;
    padding: 15px;
`;

const AuthLogo = styled.div`
    width: 100%;
    height: 76px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const AuthTab = styled.ul`
    width: 100%;
    height: 50px;
    background: #efefef;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    padding: 0 10px;
    border-radius: 10px;
    
    .tabMenu {
        width: 50%;
        height: calc(100% - 20px);
        background: transparent;
        text-align: center;
        align-content: center;
        border-radius: 5px;
    }
    .focused {
        background: #fff;
    }
    .tabMenu:hover {
        cursor: pointer;
    }
`

const AuthIntro = styled.div`
    width: 50%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #212121;
`;

const AuthPage = () => {
    const [currentTab, isCurrentTab] = useState(0);

    const menuArray = [
        {name: "로그인", content: "로그인부분입니다"},
        {name: "회원가입", content: "회원가입부분입니다"}
    ];

    const selectMenu = (i) => {
        isCurrentTab(i);
    }

    return (
        <>
            <MainContainer>
                <FormContainer>
                    <AuthForm>
                        <AuthLogo>
                            <img src={MainLogo} alt=""/>
                        </AuthLogo>
                        <AuthTab>
                            {menuArray.map((el,i) => (
                                <li className={i === currentTab ? "tabMenu focused" : "tabMenu" } onClick={() => selectMenu(i)}>{el.name}</li>
                            ))}
                        </AuthTab>
                        <p>{menuArray[currentTab].content}</p>
                    </AuthForm>
                </FormContainer>
                <AuthIntro />
            </MainContainer>
        </>
    )
}

export default AuthPage;