import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from "rehype-highlight";
import remarkGfm from 'remark-gfm';
import Profile from "../assets/images/my/profile.jpg";
import styled from 'styled-components';

const Main = styled.main`
    width: 100%;
    height: 200vh;
    display: flex;
    justify-content: center;
    align-items: start;
`;

const Container = styled.div`
    width: 1400px;
    height: 100%;
    font-size: 20px;
    display: flex;
    justify-content: space-between;

    blockquote {
        border-left: 4px solid #111;
        padding-left: 1em;
        color: #111;
        margin: 1em 0;
        background: #eee;
    }

    h1,h2,h3,h4,h5,h6 {
        margin-bottom: 10px;
    }

    h1 {
        font-size: 70px;
    }

    code {
        background: #eee;
        color: #111;  
    }

    li {
        list-style: disc;
    }

    table {
        border-collapse: collapse;
        width: 50%;
        margin: 1em 0;
    }

    th, td {
        border: 1px solid #ccc;
        padding: 0.5em 1em;
        text-align: left;
    }

    th {
        background: #f0f0f0;
    }
`;

const MarkdownContainer = styled.div`
    width: 60%;
    padding: 0 30px;
`;

const markdown = `
# #개발 #사진 최성우입니다
## 좋아하는 일 하면서 살고싶습니다.

> 사진과 개발을 접목시켜 저의 큰 꿈을 이뤄나가고싶습니다.

|자격증 목록| 취득일자 |
|---|---|
|정보처리기능사|2025.01|
|정보처리산업기사(과정평가형)|2025.03|
|웹디자인개발기능사|2025.06|
`;

const Intro = () => {
    return (
        <Main>
            <Container>
                <img src={Profile} alt="profile" style={{width: '40%', height: '65%'}}/>
                <MarkdownContainer>
                    <ReactMarkdown
                        rehypePlugins={[rehypeHighlight]}
                        remarkPlugins={[remarkGfm]}
                    >
                        {markdown}
                    </ReactMarkdown>
                </MarkdownContainer>
            </Container>
        </Main>
    );
};

export default Intro;
