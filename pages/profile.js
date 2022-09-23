import { useState, useEffect, useCallback } from "react";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";
import axios from "axios";
import Input from "../components/Input";
import Error from "../components/Error";
import Layout from "../components/Layout";

export default function Profile() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();
  const [cookies, setCookie, removeCookie] = useCookies(["accessToken"]);
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [passwordIsFocused, setPasswordIsFocused] = useState(false);
  const [passwordValue, setPasswordValue] = useState("");
  const [confirmPasswordIsFocused, setConfirmPasswordIsFocused] =
    useState(false);
  const [confirmPasswordValue, setConfirmPasswordValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const memoizedProfile = useCallback(async () => {
    try {
      const headers = {
        "Content-Type": "application/json",
        Authentication: `Bearer ${cookies.accessToken}`,
      };
      const response = await axios.get(`${API_URL}/profile`, {
        headers,
      });
      setName(response.data.name);
      setEmail(response.data.email);
      setUserName(response.data.userName);
      console.log(response);
    } catch (err) {
      console.log(err);
    } finally {
    }
  }, [API_URL, cookies.accessToken]);

  const onButtonClick = async (e) => {
    e.preventDefault();
    if (passwordValue !== confirmPasswordValue) {
      setErrorMessage("Both password fields must be the same.");
      return;
    }
    if (!passwordValue || !confirmPasswordValue) {
        setErrorMessage("All input fields must be filled.")
        return;
      }
    const headers = {
      "Content-Type": "application/json",
      Authentication: `Bearer ${cookies.accessToken}`,
    };

    const body = { password: passwordValue };

    try {
      await axios.put(`${API_URL}/password/change`, body, {
        headers,
      });
      removeCookie("accessToken", []);
      router.push("/");
    } catch (err) {
      console.log(err.response.data.error);
      setErrorMessage(err.response.data.error);
    } finally {
    }
  };

  useEffect(() => {
    memoizedProfile();
  }, [memoizedProfile]);

  return (
    <Layout>
      <Error message={errorMessage} setMessage={setErrorMessage} />
      <h1>PROFILE</h1>
      <ol>
        <li>Name - {name}</li>
        <li>Username - {userName}</li>
        <li>Email - {email}</li>
      </ol>
      <form>
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
          Change password
        </button>
      </form>
    </Layout>
  );
}
