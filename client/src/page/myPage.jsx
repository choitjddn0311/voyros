import React, {useState, useEffect} from "react";
import styled from "styled-components";
import axios from "axios";
import moment from 'moment';
import { MdEdit } from "react-icons/md";

const container = 1400;

const Main = styled.main`
    width: 100%;
    display: flex;
    justify-content: center;
`;

const Container = styled.div`
    width: ${container}px;
    // height: 90vh;
`;

const DivideLine = styled.div`
    width: 100%;
    height: 3px;
    background: #333;
    margin: 20px 0;
`

const Notice = styled.div`
    width: 100%;
    height: 50px;
    align-content: center;
    text-align: end;
    
    &  sup {
        color: red;
    }
`

const Inner = styled.div`
    width: 100%;
    height: 80vh;
    display: flex;
`

const InputArea = styled.div`
    width: 70%;
    height: 100%;
    // background: red;
    padding: 50px 10px;
`;

const ProfileContainer = styled.div`
    width: 30%;
    height: 100%;
    display: flex;
    justify-content: start;
    padding: 50px 0;
`

const Profile = styled.div`
    width: 200px;
    height: 200px;
    border-radius: 50%;
    border: 1px solid #aaa;
    background: #eee;
    color: #111;
    text-align: center;
    align-content: center;
`;

const InputInner = styled.div`
    width: 100%;
    height: 120px;
    display: flex;
    flex-direction: column;
    justify-content: start;
    gap: 10px;
`;

const InputContainer = styled.div`
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: start;
    gap: 20px;

    & > p {
        padding: 20px 0;
    }
`;

const Button = styled.button`
    width: 100px;
    height: 100%;
    background: transparents;
    color: #111;
    border: none;
    outline: none;
    display: flex;
    align-items: center;
    gap: 5px;
    justify-content: start;
    color: #aaa;

    &:hover {
        color: #111;
    }
`

const Input = styled.input`
    width: 200px;
    height: 50px;
    background: #fff;
    border: 1px solid #ddd;
    color: #111;
    outline: none;
    padding-left: 20px;
    border-radius: 10px;

    &[type=radio] {
        width: 20px;
        height: 20px;
    }
    
    &[type=date] {
        padding-right: 20px;
    }
`;

const EmailInput = styled.input`
    width: 350px;
    height: 50px;
    background: #fff;
    border: 1px solid #ddd;
    color: #111;
    outline: none;
    padding-left: 20px;
    border-radius: 10px;
`;

const GenderInner = styled.div`
    display: flex;
    justify-content: start;
    align-items: center;
    gap: 10px;
`;

const UserManageContainer = styled.div`
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: end;
    align-items: center;
    gap: 15px;
`;

const QuitButton = styled.button`
    width: 200px;
    height: 50%;
    border: red 1px solid;
    background: #fff;
    color: red;
    outline: none;
    border-radius: 10px;

    &:hover {
        background: red;
        color: #fff;
    }
`;

const UpdateButton = styled.button`
    width: 200px;
    height: 50%;
    background: #fff;
    color: #111;
    border: 1px solid #111;
    outline: none;
    border-radius: 10px;

    &:hover {
        background: #111;
        color: #fff;
    }
`

const Mypage = () => {
    const [user, setUser] = useState(null);
 
    useEffect(() => {
        // localstorge에서 id가져오고
        const id = localStorage.getItem('userId');
        // console.log(id)

        if(!id) return;

        axios.post(`${process.env.REACT_APP_API_URL}/user/info` , {id})
            .then(res => {
                if(res.data.success) {
                    setUser(res.data.user);
                }
            })
            .catch(err => {
                console.error('정보 가져오기 실패' , err)
            })
    },[]);

    // db에서 넘어오는거 case문으로 한글로 출력해줌
    const getGenderKorean = (gender) => {
        switch(gender) {
            case 'male':
                return '남성';
            case 'female':
                return '여성';
            case 'other':
                return '기타';
            default:
                return '미입력';
        }
    }

    const handleQuit = async () => {
        const id = localStorage.getItem('userId');
        if(!id) {
            alert("뭘 가져왔노;;");
            return;
        }
        const checkQuit = window.confirm("정말 회원 탈퇴를 진행하시겠습니까? 이 진행과정을 되돌릴 수 없습니다.");
        if(!checkQuit) return;

        try {
            const res = await axios.delete(`${process.env.REACT_APP_API_URL}/user/delete` , {
                data: { id },
            });

            if(res.data.success) {
                alert('회원 탈퇴 완료');
                localStorage.removeItem('userId');
                window.location.href = '/';
            } else {
                alert('회원탈퇴 실패')
            }
        } catch(err) {
            console.error('회원가입중 오류:', err);
            alert('회원탈퇴중 오류')
        }
    };
    return (
        <>
            <Main>
                <Container>
                    {user? (
                        <>
                            <h1>내 정보</h1>
                            <DivideLine />
                            <Notice>
                                <p><sup>*</sup> 정보를 수정하려면 수정버튼을 클릭 후 수정해주시기 바랍니다. <sup>*</sup></p>
                                <p><sup>*</sup> 아직 작동하지 않습니다. <sup>*</sup></p>
                            </Notice>
                            <Inner>
                                <ProfileContainer>
                                    <Profile></Profile>
                                </ProfileContainer>
                                <InputArea>
                                    <InputInner>
                                        <h3>내 아이디</h3>
                                        <InputContainer>
                                            <Input type="text" value={user.id} />
                                            <Button>수정<MdEdit /></Button>
                                        </InputContainer>
                                    </InputInner>
                                    <InputInner>
                                        <h3>내 이름</h3>
                                        <InputContainer>
                                            <Input type="text" value={user.name} />
                                            <Button>수정<MdEdit /></Button>
                                        </InputContainer>
                                    </InputInner>
                                    <InputInner>
                                        <h3>이메일</h3>
                                        <InputContainer>
                                            <EmailInput type="email" value={user.email}/>
                                            <Button>수정<MdEdit /></Button>
                                        </InputContainer>
                                    </InputInner>
                                    <InputInner>
                                        <h3>성별</h3>
                                        <InputContainer>
                                            <GenderInner>
                                                <Input type="radio" value='male' name='gender' checked={user.gender === 'male'}/> <p>남성</p>    
                                            </GenderInner>
                                            <GenderInner>
                                                <Input type="radio" value='female' name='gender' checked={user.gender === 'female'} /> <p>여성</p>    
                                            </GenderInner>
                                            <GenderInner>
                                                <Input type="radio" value='other' name='gender' checked={user.gender === 'other'} /> <p>기타</p>    
                                            </GenderInner>
                                            <GenderInner>
                                                <Input type="radio" value='' name='gender' checked={!user.gender ||user.gender === ''} /> <p>밝히고싶지않음</p>
                                            </GenderInner>
                                        </InputContainer>
                                    </InputInner>
                                    <InputInner>
                                        <h3>생년월일</h3>
                                        <InputContainer>
                                            <Input type="date" value={moment(user.birthday).format('YYYY-MM-DD')} />
                                            <Button>수정<MdEdit /></Button>
                                        </InputContainer>
                                    </InputInner>
                                    <InputInner>
                                        <h3>가입일자</h3>
                                        <InputContainer>
                                            <p>{moment(user.created_at).format('YYYY년 MM월 DD일')}</p>
                                        </InputContainer>
                                    </InputInner>
                                </InputArea>
                            </Inner>
                            <UserManageContainer>
                                <UpdateButton>수정사항 저장</UpdateButton>
                                <QuitButton onClick={handleQuit}>회원 탈퇴</QuitButton>
                            </UserManageContainer>
                        </>
                    ) : (
                        <p>오류가 발생했습니다.</p>
                    )}
                </Container>
            </Main>
        </>
    )
}
export default Mypage;