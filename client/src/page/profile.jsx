import React from "react";
import styled from "styled-components";

const containerSize = 1400;
const mainColor = '#111';

const Main = styled.main`
    width: 100%;
    display: flex;
    justify-content: center;
`;

const Container = styled.div`
    width: ${containerSize}px;
`;

const UserContainer = styled.div`
    width: 100%;
    height: 300px;
    display: flex;
    justify-content: center;
`;

const UserProfile = styled.div`
    width: 30%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    & > div {
        width: 250px;
        height: 250px;
        border-radius: 50%;
        background: #aaa;
    }
`;

const UserInfo = styled.div`
    width: 70%;
    height: 100%;
    padding: 20px;
    display: flex;
    justify-content: space-between;
    gap: 20px;
`;

const UserName = styled.div`
    width: 35%;
    height: 50px;
    display: flex;
    justify-content: start;
    gap: 20px;

    & > h1 {
        align-content: center;
    }
`

const UserFollowContainer = styled.div`
    width: 45%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    border-left: 1px solid #aaa;
`;

const FollowInner = styled.div`
    width: 100%;
    height: 100px;
    display: flex;
`

const FollowArea = styled.div`
    width: 50%;
    height: 100%;
    
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    gap: 15px;

    & > h2 {
        height: 50px;
        align-content: center;
    }
`;

const FollowBtnContainer = styled.div`
    width: 100%;
    height: 50%;
    display: flex;
    justify-content: center;
    align-items: end;
`;

const FollowBtn = styled.button`
    width: 65%;
    height: 50px;
    background: #aaa;
`;

const Profile = () => {
    return (
        <>
            <Main>
                <Container>
                    <UserContainer>
                        <UserProfile>
                            <div></div>
                        </UserProfile>
                        <UserInfo>
                           <UserName>
                                <h1>choitjddn0311</h1><h1>|</h1><h1>최성우</h1>
                            </UserName>
                            <UserFollowContainer>
                                <FollowInner>
                                    <FollowArea>
                                        <h2>팔로워</h2>
                                        <span>200</span>
                                    </FollowArea>
                                    <FollowArea>
                                        <h2>팔로잉</h2>
                                        <span>200</span>
                                    </FollowArea>
                                </FollowInner>
                                <FollowBtnContainer>
                                    <FollowBtn>팔로우</FollowBtn>
                                </FollowBtnContainer>
                            </UserFollowContainer>
                        </UserInfo>
                    </UserContainer>
                </Container>
            </Main>
        </>
    )
}

export default Profile;