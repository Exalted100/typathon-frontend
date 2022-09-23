import { useState, useEffect } from "react";
import Link from "next/link";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";
import axios from "axios";
import Input from "../components/Input";
import FormDisplay from "../components/FormDisplay";
import Error from "../components/Error";

export default function Signup() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();
  const [cookies, setCookie, removeCookie] = useCookies(["accessToken"]);
  const [emailIsFocused, setEmailIsFocused] = useState(false);
  const [emailValue, setEmailValue] = useState("");
  const [passwordIsFocused, setPasswordIsFocused] = useState(false);
  const [passwordValue, setPasswordValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("")

  const onButtonClick = async (e) => {
    e.preventDefault();
    if (!emailValue || !passwordValue) {
      setErrorMessage("You cannot leave any input blank.")
      return
  }

    try {
      const response = await axios.post(`${API_URL}/login`, {
        email: emailValue,
        password: passwordValue,
      });

      setCookie("accessToken", response.data.token);
      console.log(response);
      router.push("/home");
    } catch (err) {
      console.log(err.response.data.error);
      setErrorMessage(err.response.data.error)
    } finally {
    }
  };

  return (
    <div className="h-screen w-screen flex">
      <Error message={errorMessage} setMessage={setErrorMessage} />
      <div className="w-2/5">{<FormDisplay />}</div>
      <div className="w-3/5 text-center pt-40">
        <h1 className="text-4xl font-semibold pb-16">Sign in</h1>
        <form className="w-80 mx-auto">
          <Input
          fieldId="email"
            inputIsFocused={emailIsFocused}
            inputValue={emailValue}
            setInputIsFocused={setEmailIsFocused}
            setInputValue={setEmailValue}
            fieldName="Email"
            inputType="text"
          />

          <span className="ml-48">
            <Link href="/forgot-password">
              <a className="text-typathon-green text-sm font-semibold">
                Forgot password?
              </a>
            </Link>
          </span>

          <Input
          fieldId="password"
            inputIsFocused={passwordIsFocused}
            inputValue={passwordValue}
            setInputIsFocused={setPasswordIsFocused}
            setInputValue={setPasswordValue}
            fieldName="Password"
            inputType="password"
          />

          <button
            className={`w-80 mb-5 rounded-3xl cursor-text border p-3 relative z-0 bg-typathon-green text-white font-semibold cursor-pointer mt-10`}
            onClick={onButtonClick}
          >
            Sign in
          </button>
        </form>

        <p className="text-typathon-grey mt-10">
          Don&apos;t have an account?{" "}
          <Link href="/signup">
            <a className="text-typathon-green">Sign up now</a>
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
