import { useState, useEffect } from "react";
import Link from "next/link";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";
import axios from "axios";
import Input from "../components/Input";
import FormDisplay from "../components/FormDisplay";
import Error from "../components/Error";
import Spinner from "../components/Spinner";

export default function ForgotPassword() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();
  const [emailIsFocused, setEmailIsFocused] = useState(false);
  const [emailValue, setEmailValue] = useState("");
  const [passwordSent, setPasswordSent] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false)

  const onButtonClick = async (e) => {
    e.preventDefault();
    if (!emailValue) {
      setErrorMessage("Enter your email address.");
      return;
    }

    const body = {
      email: emailValue,
      resetUrl: window.location.host + "/change-password",
    };
    setLoading(true)

    try {
      await axios.put(`${API_URL}/password/reset`, body);

      setPasswordSent("Check your email for the link to reset your password.");
    } catch (err) {
        setErrorMessage(err.response.data.error)
    } finally {
      setLoading(false)
    }
  };

  const loginLoading = (
    <div className="w-full h-full py-2">
        <Spinner />
    </div>
);

  return (
    <div className="h-screen w-full flex">
      <Error message={errorMessage} setMessage={setErrorMessage} />
      <div className="w-2/5">{<FormDisplay />}</div>
      <div className="w-3/5 text-center pt-40">
        <h1 className="text-4xl font-semibold pb-16">Reset your password</h1>
        <form className="w-40 md:w-80 mx-auto">
          <Input
          fieldId="email"
            inputIsFocused={emailIsFocused}
            inputValue={emailValue}
            setInputIsFocused={setEmailIsFocused}
            setInputValue={setEmailValue}
            fieldName="Email"
            inputType="text"
          />

          <button
            className={`w-40 md:w-80 mb-5 rounded-3xl cursor-text border h-12 relative z-0 bg-typathon-green text-white font-semibold cursor-pointer mt-10`}
            onClick={onButtonClick}
          >
            {loading ? loginLoading : "Reset password"}
          </button>
        </form>

        <p className="text-typathon-grey mt-10">{passwordSent}</p>
        <p className="text-typathon-grey mt-10">
          Remember your password?{" "}
          <Link href="/">
            <a className="text-typathon-green">Login now</a>
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
