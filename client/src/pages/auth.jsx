import React, {useState} from "react";
import styled from "styled-components";
import {Link} from "react-router-dom";
import MainLogo from "../assets/imgs/logo/logo_350.png";

const color1 = "344e41";
const color2 = "3a5a40";
const color3 = "588157";
const color4 = "a3b18a";
const color5 = "dad7cd";

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
    background: #eee;
    color: #111;
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
    //background: red;
    padding: 20px 10px;
    display: flex;
    flex-direction: column;
    gap: 30px;
    
    & > div {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: start;
        gap: 20px;
    }
    
    & > p {
        color: #111;
    }
    
    & > p > a {
        color: #588157;
    }
    & > p > a:hover {
        text-decoration: underline;
    }
`;

const LoginInput = styled.input`
    width: 100%;
    height: 50px;
    border: 1px solid #aaa;
    outline: none;
    padding-left: 10px;
    border-radius: 5px;
    
    &[type="submit"]:hover {
        cursor: pointer;
        background: #344e41;
    }
`;

const AuthIntro = styled.div`
    width: 50%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #588157;
`;

const LoginForm = () => {
    return (
        <>
            <div>
                <LoginInput type="text" placeholder="아이디를 입력해주세요."/>
                <LoginInput type="password" placeholder="비밀번호를 입력해주세요."/>
            </div>
            <p>비밀번호를 잊으셨나요? <Link to="/">비밀번호찾기</Link></p>
            <LoginInput type="submit" value="로그인" style={{background: "#588157", color: "#fff"}}/>
        </>
    )
}

const SignupForm = () => {

}

const AuthPage = () => {
    // 0과 1로 상태관리 (0: 로그인, 1: 회원가입)
    const [currentTab, isCurrentTab] = useState(0);

    const menuArray = [
        // 미리 AuthForm높이 지정)
        {name: "로그인", content: <LoginForm/>, formHeight: "440px"},
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
                            {menuArray[currentTab].content}
                        </AuthInputContainer>
                    </AuthForm>
                </FormContainer>
                <AuthIntro />
            </MainContainer>
        </>
    )
}

export default AuthPage;