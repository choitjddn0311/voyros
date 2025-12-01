import React, { useEffect } from "react";
import styled from "styled-components";

const AlertDisplay = styled.div`
  position: fixed;
  top: 5%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 250px;
  height: 60px;
  padding: 16px 24px;
  background-color: #fff;
  color: #333;
  box-shadow: 0 0 12px rgba(0,0,0,0.15);
  border-radius: 8px;
  font-size: 16px;
  z-index: 1000;
  align-content: center;
  animation: fadeInOut 3s ease forwards;

  @keyframes fadeInOut {
    0% { opacity: 0; transform: translate(-50%, -60%); }
    10% { opacity: 1; transform: translate(-50%, -50%); }
    90% { opacity: 1; transform: translate(-50%, -50%); }
    100% { opacity: 0; transform: translate(-50%, -40%); }
  }
`;

const UserAlert = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(); // 3초 후 닫기
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return <AlertDisplay>{message}</AlertDisplay>;
};

export default UserAlert;
