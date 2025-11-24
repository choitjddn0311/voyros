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
    // prop
    height: ${(props) => props.formHeight || "650px"};
    background: #fefefe;
    box-shadow: 0 0 20px #eee,
                0 0 40px #efefef;
    border-radius: 10px;
    padding: 15px;
    transition: height .3s ease;
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
        transition: .2s;
    }
    .focused {
        background: #fff;
        transition: .2s;
    }
    .tabMenu:hover {
        cursor: pointer;
    }
`;

const AuthInputContainer = styled.div`
    width: 100%;
    transition: height .3s ease;
    overflow-y: auto;
    background: red;
`;

const AuthIntro = styled.div`
    width: 50%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #212121;
`;

const LoginForm = () => {

}

const SignupForm = () => {

}

const AuthPage = () => {
    // 0과 1로 상태관리 (0: 로그인, 1: 회원가입)
    const [currentTab, isCurrentTab] = useState(0);

    const menuArray = [
        // 미리 AuthForm높이 지정)
        {name: "로그인", content: <LoginForm/>, formHeight: "500px"},
        {name: "회원가입", content: <SignupForm/>, formHeight: "600px"}
    ];

    const selectMenu = (i) => {
        isCurrentTab(i);
    }

    // currentTab이 0이면 500, 1이면 600
    const currentFormTotalHeight = menuArray[currentTab].formHeight;

    return (
        <>
            <MainContainer>
                <FormContainer>
                    <AuthForm formHeight={currentFormTotalHeight}>
                        <AuthLogo>
                            <img src={MainLogo} alt=""/>
                        </AuthLogo>
                        <AuthTab>
                            {menuArray.map((el,i) => (
                                <li className={i === currentTab ? "tabMenu focused" : "tabMenu" } onClick={() => selectMenu(i)}>{el.name}</li>
                            ))}
                        </AuthTab>
                        <AuthInputContainer>
                            <p>{menuArray[currentTab].content}</p>
                        </AuthInputContainer>
                    </AuthForm>
                </FormContainer>
                <AuthIntro />
            </MainContainer>
        </>
    )
}

export default AuthPage;