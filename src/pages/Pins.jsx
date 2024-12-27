import React, { useState,useEffect } from "react";
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
  pin: yup
    .string()
    .matches(/^\d{6}$/, "PIN must be exactly 6 digits")
    .required("PIN is required"),
});

const Pins = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const [pin, setPin] = useState(new Array(6).fill(""));
  const [email, setEmail] = useState("");

  useEffect(() => {
    const storedEmail = localStorage.getItem("userEmail");
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  const handleChange = (element, index) => {
    const value = element.value;
    if (!/^\d$/.test(value)) return;

    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);

    if (index < 5 && value !== "") {
      document.getElementById(`pin-${index + 1}`).focus();
    }

    setValue("pin", newPin.join(""));
  };

  const submitForm = (data) => {
    axios.post(`${BASE_URL}/pin`, data);
    console.log(data);
    navigate("/otp");
  };

  return (
    <div className="pin-container">
      <h2>Login with Pin</h2>
      <p className="email">{email}</p>
      <form onSubmit={handleSubmit(submitForm)}>
        <div className="pin-inputs">
          {pin.map((data, index) => (
            <input
              key={index}
              id={`pin-${index}`}
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
        <FormErrMsg errors={errors} inputName="pin" />
        <div className="verify-button">
          <button type="submit">Verify</button>
        </div>
      </form>
    </div>
  );
};

export default Pins;
