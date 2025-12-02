import React, {useEffect, useState} from "react";
import styled from "styled-components";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

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
        text-align: center;
        align-content: center;
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
    background: #555;
    color: #fff;
    border: none;
    outline: none;
    border-radius: 15px;

    &:hover {
        background: #111;
    }
`;

// 로딩과 에러 컴포넌트 추가할 것
const Loading = styled.p`
  text-align: center;
  font-size: 1.2rem;
  margin-top: 50px;
  color: #555;
`;

const Error = styled.p`
  text-align: center;
  color: red;
  margin-top: 50px;
  font-size: 1.2rem;
`;

const Profile = () => {
    const { id } = useParams();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error,setError] = useState(null);
    useEffect(() => {
        if(!id) {
            setError("사용자가 없습니다.");
            setLoading(false);
            return;
        }

        const fetchProfile = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/profile/${id}`);

                if(res.data.success) {
                    setProfile(res.data.data);
                } else {
                    setError(res.data.message || "프로필을 불러올 수 없습니다");
                }
            } catch(err) {
                console.error(err);
                setError("서버 오류가 발생했습니다");
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [id]);

    if (loading) return <Loading>프로필 로딩 중...</Loading>;
    if (error) return <Error>{error}</Error>;
    if (!profile) return <Error>프로필 데이터가 비어 있습니다.</Error>;

    return (
        <>
            <Main>
                <Container>
                    <UserContainer>
                        <UserProfile>
                            <div>{profile.name}</div>
                        </UserProfile>
                        <UserInfo>
                           <UserName>
                                <h1>{profile.id}</h1><h1>|</h1><h1>{profile.name}</h1>
                            </UserName>
                            <UserFollowContainer>
                                <FollowInner>
                                    <FollowArea>
                                        <h2>팔로워</h2>
                                        <span>{profile.follower}</span>
                                    </FollowArea>
                                    <FollowArea>
                                        <h2>팔로잉</h2>
                                        <span>{profile.following}</span>
                                    </FollowArea>
                                </FollowInner>
                                <FollowBtnContainer>
                                    {localStorage.getItem("userId") === profile.id ?  <FollowBtn><Link to="/mypage">프로필 수정하기</Link></FollowBtn> : <FollowBtn>팔로우</FollowBtn>}
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