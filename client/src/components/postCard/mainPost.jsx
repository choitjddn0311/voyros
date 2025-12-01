import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Card = styled.div`
    width: 450px;
    height: 370px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    &:hover,
    &:active {
        cursor: pointer;
    }
`;

const CardImg = styled.div`
    width: 100%;
    height: 200px;
    background: #111;
    text-align: center;
    align-content: center;
    color: #fff;
`

const CardTextContainer = styled.div`
    width: 100%;
    height: 80px;
    background: #f9f9f9;
    padding: 0 10px;
    display: flex;
    flex-direction: column;
    gap: 10px;

    & > h3 {
        height: 30px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    & > p {
        overflow: hidden;
        word-wrap:break-word;
    }
`;

const CardWriter = styled.div`
    width: 100%;
    height: 50px;
    background: #f9f9f9;
    padding: 0 10px;
    display: flex;
    justify-content: start;
    align-items: center;
    gap: 10px;

    & > div {
        width: 35px;
        height: 35px;
        border-radius: 50%;
        background: #fff;
        text-align: center;
        align-content: center;
    }
    & > p > span {
        font-weight: bold;
    }
`;

const CardDateTime = styled.div`
    width: 100%;
    height: 30px;
    background: #f9f9f9;
    padding: 0 10px;
    align-content: center;

    & > p {
        color: #555;
        font-size: 15px;
    }
`

const PostCard = ({title, post_text, id, dateTime}) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/post/${title}`);
    }
    return (
        <>
            <Card onClick={handleClick}>
                <CardImg>포스트 메인 이미지 준비중입니다... 🔧</CardImg>
                <CardWriter>
                    <div>프사</div>
                    <p><span>{id}</span> 님이 작성한 포스트</p>
                </CardWriter>
                <CardTextContainer>
                    <h3>{title}</h3>
                    <p>{post_text}</p>
                </CardTextContainer>
                <CardDateTime>
                    <p>{dateTime}</p>
                </CardDateTime>
            </Card>
        </>
    )
}
export default PostCard;