import React, {useState,useEffect} from "react";
import styled from "styled-components";
import axios from "axios";
import moment from "moment";
import {useAuth} from '../components/authContext';
import { useNavigate,useLocation } from "react-router-dom";

const containerSize = 1400;
const mainColor = '#111';

const Main = styled.main`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Container = styled.div`
    width: ${containerSize}px;
`;

const Form = styled.form`
    width: 100%;
    height: 90vh;
    position: sticky;
    top: 0;
    background: #fff;
    overflow-y: scroll;
    // padding: 10px;

    -ms-overflow-style: none;

    &::-webkit-scrollbar {
        display: none;
    }

    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const FormInner = styled.div`
    width: 100%;
    height: 85%;
    // padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const FromTop = styled.div`
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: space-between;
`;

const FromTopLeft = styled.div`
    width: 80%;
    height: 100%;

    & > h3 {
        width: 100%;
        height: 30px;
        align-content: center;
        color: #111;
    }
`;

const TitleInput = styled.input`
    width: 100%;
    height: 70px;
    background: #fff;
    border: none;
    outline: none;
    font-size: 20px;
    font-weight: bold;
    border-bottom: 1px solid #ddd;
`

const FromTopRight = styled.div`
    width: 20%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: end;
    align-items: end;
    position: relative;
`;

const TemporailyPostBtn = styled.div`
    width: 90%;
    height: 70%;
    background: #111;
    color: #fff;
    text-align: center;
    align-content: center;
    border-radius: 5px;
    cursor: pointer;
`;

const FormMain = styled.main`
    width: 100%;
    height: 85%;
`;

const ContentTextArea = styled.textarea`
    width: 100%;
    height: 100%;
    background: #fff;
    resize: none;
    outline: none;
    font-size: 18px;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    overflow-y: scroll;
`;

const FormSubmitCon = styled.div`
    width: 100%;
    height: 15%;
    background: #fff;
    display: flex;
    justify-content: end;
    align-items: center;
    gap: 25px;
`;

const FormSubmitBtn = styled.input`
    width: 200px;
    height: 50%;
    background: ${mainColor};
    color: #fff;
    border: none;
    outline: none;
    font-weight: bold;
    font-size: 18px;
    border-radius: 5px;
    
    &:hover {
        cursor: pointer;
        background: #000;
    }
    `
    
    const FromTemporailySaveBtn = styled.input`
    width: 200px;
    height: 50%;
    border: 1px solid ${mainColor};
    background: #fff;
    color: ${mainColor};
    outline: none;
    font-weight: bold;
    font-size: 18px;
    border-radius: 5px;

    &:hover {
        cursor: pointer;
    }
`;

const TemporailyListContainer = styled.div`
    width: 100%;
    height: 200px;
    background: #f9f9f9;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 10px;
    margin-top: 10px;
    max-height: 300px;
    overflow-y: auto;
    position: absolute;
    top: 100px;

`;

const TemporailyListItem = styled.div`
    padding: 8px;
    border-bottom: 1px solid #eee;
    cursor: pointer;

    &:hover {
        background: #f0f0f0;
    }

    &:last-child {
        border-bottom: none;
    }
`;

const Post = () => {
    const routerLocation = useLocation();
    const {user} = useAuth();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [temporailyList, setTemporailyList] = useState([]);
    const [showTemporailyList, setShowTemporailyList] = useState(false);
    const [idx,setIdx] = useState(null);
    const [originalTitle, setOriginalTitle] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (routerLocation.state) {
            setTitle(routerLocation.state.title || "");
            setContent(routerLocation.state.content || "");
            setIdx(routerLocation.state.idx || null);
            setOriginalTitle(routerLocation.state.title || "");
        }
    }, [routerLocation.state]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const post_text = content.slice(0,50);
        console.log(user);

        try {
            if(idx) {
                await axios.patch(`${process.env.REACT_APP_API_URL}/manage/edit/${encodeURIComponent(originalTitle)}`, {
                    userId: user?.id,
                    newTitle: title,
                    newContent: content
                });
                alert("게시글이 수정되었습니다");
                navigate(`/post/${encodeURIComponent(title)}`);
            } else {
                await axios.post(`${process.env.REACT_APP_API_URL}/api/upload` , {
                    id: user?.id,
                    title,
                    content,
                    post_text,
                });
                alert("글이 게시되었습니다.");
                navigate('/');
            }
        } catch(err) {
            console.error(err);
            alert('글 게시 실패');
        }
        if(!idx) {
            setTimeout(() => {
                navigate('/')
            },1000)
        }
    }


    const handleTemporailySave = async () => {
        if(!title || !content) {
            alert('내용이 비어있습니다.');
            return;
        }

        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/api/upload/temporaily_save` , {
                id: user.id,
                title,
                content,
            });
            alert("임시저장되었습니다");
        } catch(err) {
            console.error(err);
            alert('임시저장에 실패했습니다')
        }
    }

    const handleTemporailyList = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/upload/temporaily_list/${user.id}`);
            if(res.data.success) {
                setTemporailyList(res.data.data);
                setShowTemporailyList(true);
            } else {
                alert("글 불러오기에 실패했습니다")
            }
        } catch(err) {
            console.error(err);
            alert("글 불러오기에 실패했습니다")
        }
    }

    


    // 현재 날짜 출력하기
    const today = new Date();
    return(
        <>
            <Main>
                <Container>
                    <Form onSubmit={handleSubmit}>
                        <FormInner>
                            <FromTop>
                                <FromTopLeft>
                                    <h3>{moment(today).format('YYYY년 MM월 DD일')}</h3>
                                    <TitleInput 
                                        name="title" 
                                        placeholder="제목을 입력해주세요." 
                                        type="text"
                                        value={title}
                                        onChange={(e) => {
                                            const newTitle = e.target.value;
                                            if(newTitle.length > 132) {
                                                alert('제목은 최대 132글자입니다');
                                                setTitle(newTitle.slice(0,132));
                                                return;
                                            } else {
                                                setTitle(newTitle);
                                            }
                                        }}
                                        />
                                </FromTopLeft>
                                <FromTopRight>
                                    <TemporailyPostBtn onClick={handleTemporailyList}><h3>임시저장본 불러오기</h3></TemporailyPostBtn>
                                    {showTemporailyList && temporailyList.length > 0 && (
                                    <TemporailyListContainer>
                                        {/* 스타일 조정하기 */}
                                        {temporailyList.map((item) => (
                                            <TemporailyListItem
                                                key={item.idx}
                                                onClick={() => {
                                                    setTitle(item.title);
                                                    setContent(item.content);
                                                    setShowTemporailyList(false);
                                                }}
                                            >
                                                <strong>{item.title}</strong>
                                                <p style={{ margin: 0, fontSize: '14px', color: '#555' }}>
                                                    {item.content.slice(0,20)}...
                                                </p>
                                            </TemporailyListItem>
                                        ))}
                                    </TemporailyListContainer>
                                )}
                                </FromTopRight>
                            </FromTop>
                            <FormMain>
                                <ContentTextArea 
                                        placeholder="내용을 입력해주세요." 
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                    >
                                </ContentTextArea>
                            </FormMain>
                        </FormInner>
                        <FormSubmitCon>
                            <FromTemporailySaveBtn type="button" value="임시저장" onClick={handleTemporailySave}/>
                            <FormSubmitBtn type="submit" value={idx? '글 수정하기' : '글 올리기'}/>
                        </FormSubmitCon>
                    </Form>
                </Container>
            </Main>
        </>
    )
}

export default Post;