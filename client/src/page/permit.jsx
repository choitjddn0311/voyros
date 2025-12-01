import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import PageAlert from "../components/alert/pageAlert";

const PermitRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const [showAlert, setShowAlert] = useState(false);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) {
      setShowAlert(true);
      const timer = setTimeout(() => {
        setShouldRedirect(true);
      }, 1500); // 3초 후 리다이렉트
      return () => clearTimeout(timer);
    }
  }, [isLoggedIn]);

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  if (!isLoggedIn) {
    if (shouldRedirect) {
      return <Navigate to="/" replace />;
    }

    return (
      <>
        {showAlert && (
          <PageAlert message="로그인된 회원만 접근가능합니다." onClose={handleCloseAlert} />
          
        )}
      </>
    );
  }

  return children;
};

export default PermitRoute;
