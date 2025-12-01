import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import Modal from "./modal"; // 모달 컴포넌트
import UserAlert from "./alert/userAlert";
import { useAuth } from "./authContext";

const containerSize = 1400;
const mainColor = '#111';

const MainUtil = styled.div`
  width: 100%;
  height: 50px;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const UtilContainer = styled.div`
  width: ${containerSize}px;
  height: 100%;
  display: flex;
  justify-content: end;
  align-items: center;
`;

const UtilInner = styled.ul`
  width: 200px;
  height: 100%;
  display: flex;
  justify-content: end;
  align-items: center;
  gap: 20px;
`;

const Util = styled.li`
  height: 100%;
  text-align: center;
  align-content: center;
  color: #ddd;
  cursor: pointer;

  &:hover {
    color: #111;
  }
`;

const LoginForm = styled.form`
    width: 100%;
    height: 80%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    & > p {
      color: #999;
    }
`;

const LoginInputContainer = styled.div`
    width: 100%;
    height: 100px;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
`;

const LoginInput = styled.input`
    width: 100%;
    height: 50%;
    border: 1px solid #ddd;
    outline: none;
    padding-left: 10px;
    font-size: 16px;

    &::placeholder {
      font-size: 13px;
    }
`;

const SubmitBtn = styled.input`
    width: 100%;
    height: 50px;
    text-align: center;
    align-content: center;
    border-radius: 5px;
    background: ${mainColor};
    color: #fff;
    border: none;

    &:hover,
    &:active {
        background: #000;
        cursor: pointer;
    }
`;

const SignUpContainer = styled.div`
    width: 100%;
    height: 90px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
`;

const SignUpForm = styled.form`
    width: 100%;
    height: 90%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    & > p {
      color: #999;
    }
`;

const SignUpInputArea = styled.div`
    width: 100%;
    height: 85%;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const SignUpTitle = styled.div`
    width: 100%;
    height: 30px;
    text-align: start;
    align-content: center;
    font-weight: bold;
`;

const SignUpLeft = styled.div`
    width: 50%;
    height: 100%;
    padding: 10px;
    display: flex;
    flex-direction: column;
    gap:  20px;
`;

const SignUpRight = styled.div`
    width: 50%;
    height: 100%;
    padding: 10px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    position: relative;

    & > p {
      position: absolute;
      bottom: 10px;
      right: 10px;
      color: #999;
    }
`

const SignUpIdInputContainer = styled.div`
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    & > input[type=text] {
        width: 70%;
        height: 100%;
        padding-left: 10px;
        border: 1px solid #ddd;
        border-radius: 5px;
        outline: none;
        font-size: 16px;
    }

    & > input[type=button] {
        width: 25%;
        height: 100%;
        background: ${mainColor};
        color: #fff;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        outline: none;
    }

    & > input::placeholder {
      font-size: 13px;
    }
`;

const SignUpInputContainer = styled.div`
    width: 100%;
    height: 50px;

    & > input {
        width: 100%;
        height: 100%;
        padding-left: 10px;
        border: 1px solid #ddd;
        border-radius: 5px;
        outline: none;
        font-size: 16px
    }

    & > input::placeholder {
      font-size: 13px;
    }
`;

const SignUpPwTitle = styled.div`
    width: 100%;
    height: 30px;
    text-align: start;
    align-content: center;
    font-weight: bold;
`

const SignUpPwContainer = styled.div`
    width: 100%;
    height: 140px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const SignUpPwInputContainer = styled.div`
    width: 100%;
    height: 100px;

    & > input {
        width: 100%;
        height: 50%;
        display: flex;
        flex-direction: column;
        justify-content: start;
        align-items: center;
        border: 1px solid #ddd;
        font-size: 16px;
        padding-left: 10px;
        outline: none;
    }

    & > input::placeholder {
      font-size: 13px;
    }
`;

const GenderSelect = styled.select`
    width: 100%;
    height: 100%;
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 5px;
    padding-left: 10px;
    color: #555;
`

const HeaderUtil = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState("login");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const {setUser} = useAuth();

  const showCustomAlert = (msg) => {
    setAlertMessage(msg);
    setShowAlert(true);
  }
  // 회원가입 상태 관리
  const [signUpData, setSignUpData] = useState({
    id: "",
    name: "",
    pw: "",
    pw2: "",
    email: "",
    birthday: "",
    // default gender 
    gender: ""
  });

  useEffect(() => {
    // localstorge에서 저장된 정보를 가져오고
  const storageLogin = localStorage.getItem("isLoggedIn");
  const storageId = localStorage.getItem("userId");
  // 맞는경우 상태 저장
  if(storageLogin === "true" && storageId) {
    setIsLoggedIn(true);
    setUserId(storageId);
  }
}, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignUpData({ ...signUpData, [name]: value });
  };

  const openModal = (type) => {
    setModalType(type);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const id = formData.get("id");
    const pw = formData.get("pw");

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, pw }),
      });

      const data = await res.json();
      if (data.success) {
        showCustomAlert(data.message);
        setIsLoggedIn(true);
        setUserId(id);
        setUser({id, name: data.name, role: data.role});

        localStorage.setItem("isLoggedIn" , "true");
        localStorage.setItem("userId" , id);
        localStorage.setItem("user" , JSON.stringify({id, name: data.name, role: data.role}));
        closeModal();
      } else {
        showCustomAlert(data.message);
      }
    } catch (err) {
      showCustomAlert("서버 에러: " + err.message);
    }

    setTimeout(() => {
      window.location.reload();
    },3000);  
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserId('');

    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userId");
    localStorage.removeItem("user");
    showCustomAlert("로그아웃 되었습니다.");
    setTimeout(() => {
      window.location.reload();
    },100)
  };

  const handleCheckDuplicate = async (e) => {
    e.preventDefault();
    if (!signUpData.id) {
      showCustomAlert("아이디를 입력해주세요.");
      return;
    }

    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/check-id`, {
        id: signUpData.id,
      });

      if (res.data.available) {
        showCustomAlert("사용 가능한 아이디입니다.");
      } else {
        showCustomAlert("이미 사용 중인 아이디입니다.");
      }
    } catch (err) {
      console.error(err);
      showCustomAlert("아이디 중복 확인 실패. 관리자에게 문의해주세요.");
    }
  };

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();

    const { id, name, pw, pw2, email, birthday, gender } = signUpData;

    if (!id || !name || !pw || !pw2) {
      showCustomAlert("모든 필드를 입력해주세요.");
      return;
    }

    if (pw !== pw2) {
      showCustomAlert("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/signup`, {
        id,
        name,
        pw,
        email,
        birthday,
        gender
      });

      if (res.data.success) {
        showCustomAlert("회원가입이 완료됐습니다.");
        setIsLoggedIn(false);
        setUserId();
        closeModal();
        setSignUpData({ id: "", name: "", pw: "", pw2: "", email: "", birthday: "", gender: "" });
      } else {
        showCustomAlert("회원가입 실패: " + res.data.message);
      }
    } catch (err) {
      console.error(err);
      showCustomAlert("회원가입 실패. 관리자에게 문의해주세요.");
    }
  };

  return (
    <>
    {showAlert && (
      <UserAlert message={alertMessage} onClose={() => setShowAlert(false)} />
    )}
      <MainUtil>
        <UtilContainer>
          <UtilInner>
            {isLoggedIn ? (
              <>
                <Util><Link to="/mypage"><span style={{fontWeight: 'bold'}}>{userId}</span> 님</Link></Util>
                <Util onClick={handleLogout}>로그아웃</Util>
              </>
            ) : (
              <>
                <Util onClick={() => openModal("login")}>로그인</Util>
                <Util onClick={() => openModal("signup")}>회원가입</Util>
              </>
            )}
          </UtilInner>
        </UtilContainer>
      </MainUtil>

      <Modal isOpen={modalOpen} onClose={closeModal} type={modalType}>
        <h2>{modalType === "login" ? "로그인" : "회원가입"}</h2>

        {modalType === "login" ? (
          <LoginForm onSubmit={handleLoginSubmit}>
            <LoginInputContainer>
              <LoginInput type="text" name="id" placeholder="아이디를 입력해주세요." style={{borderTopLeftRadius: '5px', borderTopRightRadius: '5px'}} />
              <LoginInput type="password" name="pw" placeholder="비밀번호를 입력해주세요." style={{borderBottomLeftRadius: '5px', borderBottomRightRadius: '5px', borderTop: 'none'}} />
            </LoginInputContainer>
            <p>아직 회원이 아니신가요? 
              &nbsp;
              <span
                style={{color: mainColor, cursor: 'pointer',textDecoration: 'underline'}}
                onClick={() => openModal('signup')}
              >
              회원가입
              </span>
            </p>
            <SubmitBtn type="submit" value="로그인" />
          </LoginForm>
        ) : (
          <SignUpForm onSubmit={handleSignUpSubmit}>
            <SignUpInputArea>
              <SignUpLeft>
                <SignUpContainer>
                <SignUpTitle>
                  아이디 <sup style={{ color: "red" }}>*</sup>
                </SignUpTitle>
                <SignUpIdInputContainer>
                  <input
                    type="text"
                    name="id"
                    value={signUpData.id}
                    onChange={handleChange}
                    placeholder="아이디를 입력해주세요."
                  />
                  <input
                    type="button"
                    value="중복확인"
                    onClick={handleCheckDuplicate}
                  />
                </SignUpIdInputContainer>
              </SignUpContainer>

              <SignUpContainer>
                <SignUpTitle>
                  이름 <sup style={{ color: "red" }}>*</sup>
                </SignUpTitle>
                <SignUpInputContainer>
                  <input
                    type="text"
                    name="name"
                    value={signUpData.name}
                    onChange={handleChange}
                    placeholder="이름을 입력해주세요."
                  />
                </SignUpInputContainer>
              </SignUpContainer>

              <SignUpPwContainer>
                <SignUpPwTitle>
                  비밀번호 <sup style={{ color: "red" }}>*</sup>
                </SignUpPwTitle>
                <SignUpPwInputContainer>
                  <input
                    type="password"
                    name="pw"
                    value={signUpData.pw}
                    onChange={handleChange}
                    placeholder="비밀번호를 입력해주세요."
                    style={{borderTopLeftRadius: '5px', borderTopRightRadius: '5px'}}
                  />
                  <input
                    type="password"
                    name="pw2"
                    value={signUpData.pw2}
                    onChange={handleChange}
                    placeholder="다시한번 입력해주세요."
                    style={{borderBottomLeftRadius: '5px', borderBottomRightRadius: '5px', borderTop: 'none'}}
                  />
                </SignUpPwInputContainer>
              </SignUpPwContainer>
              </SignUpLeft>

              <SignUpRight>
                <SignUpContainer>
                <SignUpTitle>
                  이메일 <sup style={{ color: "red" }}>*</sup>
                </SignUpTitle>
                <SignUpInputContainer>
                  <input
                    type="email"
                    name="email"
                    value={signUpData.email}
                    onChange={handleChange}
                    placeholder="이메일을 입력해주세요."
                  />
                </SignUpInputContainer>
              </SignUpContainer>

              <SignUpContainer>
                <SignUpTitle>
                  생년월일
                </SignUpTitle>
                <SignUpInputContainer>
                  <input type="date" name="birthday" value={signUpData.birthday} onChange={handleChange} />
                </SignUpInputContainer>
              </SignUpContainer>

              <SignUpContainer>
                <SignUpTitle>
                  성별
                </SignUpTitle>
                <SignUpInputContainer>
                    <GenderSelect name="gender" id="gender" value={signUpData.gender} onChange={handleChange}>
                      <option value="">밝히고싶지 않음</option>
                      <option value="male">남성</option>
                      <option value="female">여성</option>
                      <option value="other">기타</option>
                    </GenderSelect>
                  </SignUpInputContainer>
              </SignUpContainer>
            <p>이미 회원이신가요?
              &nbsp;
              <span
                style={{color: mainColor, cursor: 'pointer', textDecoration: 'underline'}}
                onClick={() => openModal('login')}
              >
              로그인
              </span>
            </p>
              </SignUpRight>
            </SignUpInputArea>
            <SubmitBtn type="submit" value="회원가입" />
          </SignUpForm>
        )}
      </Modal>
    </>
  );
};

export default HeaderUtil;