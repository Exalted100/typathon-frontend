import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
import Input from "../components/Input";
import Error from "../components/Error";
import FormDisplay from "../components/FormDisplay";

export default function Login() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();
  const [emailIsFocused, setEmailIsFocused] = useState(false);
  const [emailValue, setEmailValue] = useState("");
  const [userNameIsFocused, setUserNameIsFocused] = useState(false);
  const [userNameValue, setUserNameValue] = useState("");
  const [nameIsFocused, setNameIsFocused] = useState(false);
  const [nameValue, setNameValue] = useState("");
  const [passwordIsFocused, setPasswordIsFocused] = useState(false);
  const [passwordValue, setPasswordValue] = useState("");
  const [confirmPasswordIsFocused, setConfirmPasswordIsFocused] =
    useState(false);
  const [confirmPasswordValue, setConfirmPasswordValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const onButtonClick = async (e) => {
    e.preventDefault();

    if (passwordValue !== confirmPasswordValue) {
      setErrorMessage("Your password and confirm password should be the same");
      return;
    }
    if (
      !emailValue ||
      !nameValue ||
      !userNameValue ||
      !passwordValue ||
      !confirmPasswordValue
    ) {
      setErrorMessage("You cannot leave any input blank.");
      return;
    }
    if (userNameValue.length > 15 || userNameValue < 2) {
      setErrorMessage("Your username must be between two and fifteen characters long.")
      return
    }

    try {
      await axios.post(`${API_URL}/signup`, {
        email: emailValue,
        userName: userNameValue,
        name: nameValue,
        password: passwordValue,
      });

      router.push("/");
    } catch (err) {
      setErrorMessage(err.response.data.error);
    } finally {
    }
  };

  return (
    <div className="h-screen w-full flex">
      <Error message={errorMessage} setMessage={setErrorMessage} />
      <div className="w-2/5">{<FormDisplay />}</div>
      <div className="w-3/5 text-center pt-40">
        <h1 className="text-4xl font-semibold pb-16">Sign up</h1>
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

          <Input
          fieldId="username"
            inputIsFocused={userNameIsFocused}
            inputValue={userNameValue}
            setInputIsFocused={setUserNameIsFocused}
            setInputValue={setUserNameValue}
            fieldName="Username"
            inputType="text"
          />

          <Input
          fieldId="name"
            inputIsFocused={nameIsFocused}
            inputValue={nameValue}
            setInputIsFocused={setNameIsFocused}
            setInputValue={setNameValue}
            fieldName="Name"
            inputType="text"
          />

          <Input
          fieldId="password"
            inputIsFocused={passwordIsFocused}
            inputValue={passwordValue}
            setInputIsFocused={setPasswordIsFocused}
            setInputValue={setPasswordValue}
            fieldName="Password"
            inputType="password"
          />

          <Input
          fieldId="confirm-password"
            inputIsFocused={confirmPasswordIsFocused}
            inputValue={confirmPasswordValue}
            setInputIsFocused={setConfirmPasswordIsFocused}
            setInputValue={setConfirmPasswordValue}
            fieldName="Confirm password"
            inputType="password"
          />

          <button
            className={`w-80 mb-5 rounded-3xl cursor-text border p-3 relative z-0 bg-typathon-green text-white font-semibold cursor-pointer mt-10`}
            onClick={onButtonClick}
          >
            Sign up
          </button>
        </form>

        <p className="text-typathon-grey mt-10">
          Already have an account?{" "}
          <Link href="/">
            <a className="text-typathon-green">Login now</a>
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
