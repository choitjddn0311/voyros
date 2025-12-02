import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
// import PageAlert from "../components/alert/pageAlert";
import UserAlert from "../components/alert/userAlert";

const PermitRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  if (!isLoggedIn) {

    return (
      <>
        <UserAlert message="로그인된 회원만 접근 가능합니다." onClose={() => {}}/>
      </>
    );
  }

  return children;
};

export default PermitRoute;
