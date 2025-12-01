import React, { useEffect, useState} from "react";
import styled from "styled-components";
import { useParams,useNavigate } from "react-router-dom";
import axios from "axios";
import { LuClock5 } from "react-icons/lu";
import moment from "moment";

const container = 1400;

const Main = styled.main`
    width: 100%;
    display: flex;
    justify-content: center;
`;

const Container = styled.div`
    width: ${container}px;
    border-top: 5px solid #111;
    display: flex;
    flex-direction: column;
    gap: ${props => props.hasManageBtn ? '0px' : '50px'};
`;

const OtherCon = styled.div`
    width: ${container}px;
    height: 45vh;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 50px;
    text-align: center;
    
    & > h2 {
        align-content: center;
    }
`
    
    const PostTitle = styled.div`
    width: 100%;
    height: 250px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-bottom: 1px solid #ddd;

    & > h1 {
        font-size: 55px;
        max-height: 200px;
        width: 100%;
        align-content: start;
        padding-top: 10px;
    }
`;

const PostAbout = styled.div`
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    & > p {
        display: flex;
        align-items: center;
        gap: 10px;
    }

    & > div {
        display: flex;
        gap: 10px;
    }
    & > div > div {
        width: 35px;
        height: 35px;
        border: 1px solid #ddd;
        background: #fff;
        border-radius: 50%;
        text-align: center;
        align-content: center;
        font-size: 12px;
    }
    & > div > p {
        align-content: center;
        font-size: 20px;
    }
`;

const PostContents = styled.section`
    width: 100%;
    min-height: 400px;
    padding-bottom: 50px;
    overflow-x: hidden;

    & > p {
        font-size: 20px;
        white-space: pre-line;
        word-break: break-all;
    }
`

const LoaderCon = styled.div`
    width: 100%;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    background: #111;
    display: flex;
    justify-content: center;
    align-items: center;
`

const Loader = styled.div`
    width: 60px;
    aspect-ratio: 1;
    --g: conic-gradient(from -90deg at 10px 10px,#fff 90deg,#0000 0);
    background: var(--g), var(--g), var(--g);
    background-size: 50% 50%;
    animation: l16 1s infinite;
    @keyframes l16 {
        0%   {background-position:0    0   ,10px 10px,20px 20px} 
        50%  {background-position:0    20px,10px 10px,20px 0   } 
        100% {background-position:20px 20px,10px 10px,0    0   } 
    }
`;

const PostManageBtnContainer = styled.div`
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: end;
    align-items: center;
    gap: 30px;
    
    & > button {
        height: 100%;
        background: transparents;
        font-size: 17px;
        text-decoration: underline;
        color: #aaa;
    }
    
    & > button:hover,
    & > button:active {
        color: #111;
    }
`;


const PostShow = () => {
    const {title} = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isMyPost, setIsMypost] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
      const fetchPost = async () => {
        try {
          const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/posts/title/${encodeURIComponent(title)}`);
          setPost(res.data);
          const userId = localStorage.getItem('userId');
          if(userId && userId === res.data.id) {
            setIsMypost(true);
          }
        } catch (err) {
          setError('');
        } finally {
          setLoading(false);
        }
      };
      fetchPost();
    }, [title]);

    const handleEdit = () => {
        navigate('/write' , {state: {title: post.title, content: post.content, idx: post.idx}});
    };

    const handleDelete = async () => {
        if (!window.confirm("이 게시글을 삭제하시겠습니까?")) return;
        try {
            const userId = localStorage.getItem('userId');
            await axios.delete(`${process.env.REACT_APP_API_URL}/manage/delete/${post.title}`, {
                data: {userId}
            });
            alert("삭제되었습니다.");
            window.location.href = "/";
        } catch (err) {
            console.error(err);
            alert("삭제 중 오류가 발생했습니다.");
        }
    };


    if(loading) {
        return (
            <>
                <LoaderCon>
                    <Loader/>
                </LoaderCon>
            </>
        )
    }
    if(error) {
        return (
            <>
                <p>{error}</p>
            </>
        )
    }
    if(!post) {
        return (
            <>
                <Main>
                    <OtherCon>
                        <h2>더이상 존재하지않거나 삭제된 포스트입니다.</h2>
                    </OtherCon>
                </Main>
            </>
        )
    }

    return (
        <Main>
            <Container hasManageBtn={isMyPost}>
                <PostTitle>
                    <h1>{post.title}</h1>
                    <PostAbout>
                        <p><LuClock5 />{moment(post.created_at).format('YYYY.MM.DD')}</p>
                        <div>
                            <div>{post.name}</div>
                            <p><span>{post.id}</span></p>
                        </div>
                    </PostAbout>
                </PostTitle>
                {isMyPost && (
                        <PostManageBtnContainer>
                            <button onClick={handleEdit}>수정</button>
                            <button onClick={handleDelete}>삭제</button>
                        </PostManageBtnContainer>
                    )}
                <PostContents>
                    
                    <p>{post.content}</p>
                </PostContents>
            </Container>
        </Main>
    )
};

export default PostShow;