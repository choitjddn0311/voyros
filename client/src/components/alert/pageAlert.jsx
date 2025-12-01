import React, { useEffect } from "react";
import styled from "styled-components";

const AlertDisplay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  min-width: 100%;
  height: 100vh;
  background: #fff;
  color: #111;
  z-index: 1001;
  font-size: 80px;
  font-weight: bold;
  text-align: center;
  align-content: center;
`;

const PageAlert = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(); // 3초 후 닫기
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return <AlertDisplay>{message}</AlertDisplay>;
};

export default PageAlert;
