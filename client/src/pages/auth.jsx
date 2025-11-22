import React from "react";
import styled from "styled-components";

const MainContainer = styled.main`
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #fff;
`

const FormContainer = styled.div`
    width: 50%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`

const AuthForm = styled.form`
    width: 500px;
    height: 650px;
    background: #fefefe;
    box-shadow: 0 0 20px #eee,
                0 0 40px #efefef;
    border-radius: 10px ;
`;

const AuthIntro = styled.div`
    width: 50%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`

const AuthPage = () => {
    return (
        <>
            <MainContainer>
                <FormContainer>
                    <AuthForm>

                    </AuthForm>
                </FormContainer>
                <AuthIntro />
            </MainContainer>
        </>
    )
}

export default AuthPage;