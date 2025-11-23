import React from "react";
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

const AuthTab = styled.div`
    width: 100%;
    height: 50px;
    background: #efefef;
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
    return (
        <>
            <MainContainer>
                <FormContainer>
                    <AuthForm>
                        <AuthLogo>
                            <img src={MainLogo} alt=""/>
                        </AuthLogo>
                        <AuthTab>
                            <div>로그인</div>
                            <div>회원가입</div>
                        </AuthTab>
                    </AuthForm>
                </FormContainer>
                <AuthIntro />
            </MainContainer>
        </>
    )
}

export default AuthPage;