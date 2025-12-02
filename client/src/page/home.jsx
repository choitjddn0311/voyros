import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import PostCard from "../components/postCard/mainPost";
import { GoDiscussionOutdated } from "react-icons/go";
import { FaUserFriends } from "react-icons/fa";
import { HiOutlineDocumentDuplicate } from "react-icons/hi";
import moment from 'moment'

const containerSize = 1400;

const Main = styled.main`
    width: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    margin-bottom: 25px;
`;

const PostTab = styled.ul`
    width: ${containerSize}px;
    height: 100px;
    padding: 20px 0;
    color: #ddd;
    display: flex;
    flex-direction: start;
    align-items: center;
    gap: 25px;
`;

const TabItem = styled.li`
    height: 100%;
    align-content: center;
    position: relative;
    color: ${(props) => (props.active ? "#111" : "#ddd")};
    cursor: pointer;

    &:hover {
      color: #111;
    }

    & > h2 {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    &::before {
      content: '';
      width: 100%;
      height: ${(props) => (props.active ? "3px" : "0")};
      background: #111;
      position: absolute;
      bottom: 0;
      border-radius: 3px;
      left: 0;
    }

    &:hover::before {
      height: 3px;
    }
`;

const ErrorText = styled.div`
  width: ${containerSize}px;
  height: 50px;
  text-align: start;
  align-content: center;
  font-size: 20px;
  
  & > sup {
    color: red;
  }

  & > span {
    font-weight: bold;
  }
`

const Container = styled.div`
    width: ${containerSize}px;
    display: flex;
    flex-wrap: wrap;
    justify-content: start;
    gap: 25px;
    align-items: center;
`;

const EmptyPostText = styled.div`
    width: 100%;
    height: 45vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const Home = () => {
    const [posts, setPosts] = useState([]);
    const [selectedTab, setSelectedTab] = useState('latest');
    const user = JSON.parse(localStorage.getItem("user"));
    // console.log("현재 로그인된 유저 정보:", user);
    const userId = user?.id || "";

    const handleTabClick = (tab) => {
        setSelectedTab(tab);
    }

    useEffect(() => {
      let url = `${process.env.REACT_APP_API_URL}/api/posts`;
        
      if (selectedTab === 'latest') {
        url += "?sort=desc";
      } else if (selectedTab === 'mine') {
        if (userId) {
          url += `?user=${userId}`;
        } else {
          setPosts([]);
          return;
        }
      }
  
      axios.get(url)
        .then(res => {
        //   console.log("응답 데이터:", res.data);
          setPosts(res.data);
        })
        .catch(err => {
          console.error("글 불러오기 실패", err);
        });
    }, [selectedTab, userId]);
    return (
        <>
            <Main>
                <PostTab>
                    <TabItem
                        onClick={() => handleTabClick("latest")}
                        active={selectedTab === "latest"}
                        // style={{color: selectedTab === "latest" ? "#111" : "#ddd"}}
                    >
                        <h2><GoDiscussionOutdated /> 최신</h2>
                    </TabItem>
                    {/*  뜻 친구 */}
                    <TabItem><h2><FaUserFriends />여행자 글</h2></TabItem>
                    <TabItem
                        onClick={() => handleTabClick("mine")}
                        active={selectedTab === "mine"}
                        // style={{color: selectedTab === "mine" ? "#111" : "#ddd"}}
                    >
                        <h2><HiOutlineDocumentDuplicate /> 내 글</h2>
                    </TabItem>
                </PostTab>
                <ErrorText>
                  <sup>*</sup> 현재 글 제목의 특수기호 또는 숫자를 넣으면 들어가지지 않는 이슈가 발생했습니다. <sup>*</sup>  
                </ErrorText> 
                <Container>
                    {posts.length === 0 ? (
                    <EmptyPostText>
                        <h2>올라온 포스트가 없습니다.</h2>
                    </EmptyPostText>
                    ) : (
                        posts.map((post) => {
                            return (
                              <PostCard
                                key={post.idx}
                                title={post.title}
                                post_text={post.post_text}
                                id={post.id}
                                dateTime={moment(post.created_at).format('YYYY-MM-DD hh:mm')}
                              />
                              );
                        })
                    )}

                        {/* // postCard onClick -> postShow.jsx : title, content, user, created_at 보이기... */}
                </Container>
            </Main>
        </>
    )
}
export default Home;