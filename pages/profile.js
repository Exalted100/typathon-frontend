import { useState, useEffect, useCallback } from "react";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";
import axios from "axios";
import Input from "../components/Input";
import Error from "../components/Error";
import Layout from "../components/Layout";
import Spinner from "../components/Spinner";

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
  const [loading, setLoading] = useState(false)

  const memoizedProfile = useCallback(async () => {
    setLoading(true)
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
      setLoading(false)
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
      setErrorMessage(err.response.data.error);
    } finally {
    }
  };

  useEffect(() => {
    memoizedProfile();
  }, [memoizedProfile]);

  const loginLoading = (
    <div className="w-full h-full py-2">
        <Spinner />
    </div>
);

  return (
    <Layout>
      <Error message={errorMessage} setMessage={setErrorMessage} />
      <div className="text-center w-fit mx-auto">
      <h1 className="font-bold text-center text-3xl my-8">PROFILE</h1>
      <ol className="mb-12">
        <li>Name - {name}</li>
        <li>Username - {userName}</li>
        <li>Email - {email}</li>
      </ol>

      <h2 className="font-bold text-center text-xl my-8">Change Your Password</h2>

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
          className={`w-40 md:w-80 mb-5 rounded-3xl cursor-text border h-12 relative z-0 bg-typathon-green text-white font-semibold cursor-pointer mt-10`}
          onClick={onButtonClick}
        >
          {loading ? loginLoading : "Change Password"}
        </button>
      </form>
      </div>
    </Layout>
  );
}
