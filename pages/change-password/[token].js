import { useState, useEffect } from "react";
import Link from "next/link";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";
import axios from "axios";
import Input from "../../components/Input";
import FormDisplay from "../../components/FormDisplay";
import Error from "../../components/Error";
import Spinner from "../../components/Spinner";

export default function Signup() {
  const router = useRouter();
  const token = router.query.token;
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const [confirmPasswordIsFocused, setConfirmPasswordIsFocused] =
    useState(false);
  const [confirmPasswordValue, setConfirmPasswordValue] = useState("");
  const [passwordIsFocused, setPasswordIsFocused] = useState(false);
  const [passwordValue, setPasswordValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false)

  const onButtonClick = async (e) => {
    e.preventDefault();
    if (passwordValue !== confirmPasswordValue) {
      setErrorMessage("Both password fields must be the same.");
      return;
    }

    if (!passwordValue || !confirmPasswordValue) {
      setErrorMessage("All input fields must be filled.");
      return;
    }
    const headers = {
      "Content-Type": "application/json",
      Authentication: `Bearer ${token}`,
    };

    const body = { password: passwordValue };
    setLoading(true)

    try {
      await axios.put(`${API_URL}/password/change`, body, {
        headers,
      });
      router.push("/");
    } catch (err) {
      console.log(err.response.data.error);
      setErrorMessage(err.response.data.error);
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
        <h1 className="text-4xl font-semibold pb-16">Change Password</h1>
        <form className="w-40 md:w-80 mx-auto">
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
            className={`w-40 md:w-80 mb-5 rounded-3xl cursor-text border h-12 relative z-0 bg-typathon-green text-white font-semibold cursor-pointer mt-10`}
            onClick={onButtonClick}
          >
            {loading ? loginLoading : "Change password"}
          </button>
        </form>
      </div>
    </div>
  );
}
