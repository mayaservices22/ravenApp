import React from "react";
import "../styles/query.css";
import { Link } from "react-router-dom";
const Query = () => {
  return (
    <div className="auth-container">
      <div className="auth">
        <div className="auth-card">
          <h2>Do you have Google Authenticator enabled in your app?</h2>
          <div className="auth-buttons">
            <Link to={"/"} className="btn no-btn">
              NO
            </Link>
            <Link to={"/2fa"} className="btn yes-btn">
              YES
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Query;
