import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Home() {
  const [loginCopy, setLoginCopy] = useState("Type a ton with Typathon");
  const finalCopy = (
    <p className="final-copy text-semibold h-screen bg-typathon-black text-typathon-grey text-5xl pt-2 px-10 leading-normal font-bold">
      Type a ton with <span className="text-typathon-green">Typathon</span>
    </p>
  );

  const animatedText = (
    <p
      className="login-copy text-semibold h-screen bg-typathon-black text-typathon-grey text-5xl pt-20 px-10 leading-normal font-bold"
      aria-label={loginCopy}
    >
      {loginCopy.split("").map(function (char, index) {
        const style = { animationDelay: 1 + index / loginCopy.length + "s" };
        return (
          <span aria-hidden="true" key={index} style={style}>
            {char}
          </span>
        );
      })}
    </p>
  );

  const [textToDisplay, setTextToDisplay] = useState(animatedText);
  const [emailIsFocused, setEmailIsFocused] = useState(false);
  const [emailValue, setEmailValue] = useState("");
  const [passwordIsFocused, setPasswordIsFocused] = useState(false);
  const [passwordValue, setPasswordValue] = useState("");

  useEffect(() => {
    setTimeout(() => {
      return setTextToDisplay(finalCopy);
    }, loginCopy.length * 100);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="h-screen w-screen flex">
      <div className="w-2/5">{textToDisplay}</div>
      <div className="w-3/5 text-center pt-40">
        <h1 className="text-4xl font-semibold pb-16">Sign in</h1>
        <form className="w-80 mx-auto">
          <div
            className={`w-80 mb-5 rounded-3xl cursor-text border py-3 px-6 relative z-0 ${
              emailIsFocused || emailValue !== ""
                ? "border-black box-shadow-bottom-solid"
                : "border-gray-400"
            }`}
          >
            <label
              className={`text-md cursor-text z-10 absolute top-2 left-4 px-3 py-1 transition duration-200 bg-white 
                    ${emailIsFocused ? "-translate-y-6" : "translate-y-0"}`}
            >
              Email
            </label>
            <input
              type="text"
              className={`z-30 border-transparent bg-transparent outline-none w-full`}
              onChange={(e) => {
                setEmailValue(e.target.value);
              }}
              onBlur={() => {
                setEmailIsFocused(false);
              }}
              onFocus={() => {
                setEmailIsFocused(true);
              }}
              value={emailValue}
            />
          </div>

          <span className="ml-48">
            <Link href="">
              <a className="text-typathon-green text-sm font-semibold">Forgot password?</a>
            </Link>
          </span>

          <div
            className={`w-80 mb-5 rounded-3xl cursor-text border py-3 px-6 relative z-0 ${
              passwordIsFocused || passwordValue !== ""
                ? "border-black box-shadow-bottom-solid"
                : "border-gray-400"
            }`}
          >
            <label
              className={`text-md cursor-text z-10 absolute top-2 left-4 px-3 py-1 transition duration-200 bg-white 
                    ${passwordIsFocused ? "-translate-y-6" : "translate-y-0"}`}
            >
              Password
            </label>
            <input
              type="password"
              className={`z-30 border-transparent bg-transparent outline-none w-full`}
              onChange={(e) => {
                setPasswordValue(e.target.value);
              }}
              onBlur={() => {
                setPasswordIsFocused(false);
              }}
              onFocus={() => {
                setPasswordIsFocused(true);
              }}
              value={passwordValue}
            />
          </div>

          <button
            className={`w-80 mb-5 rounded-3xl cursor-text border p-3 relative z-0 bg-typathon-green text-white font-semibold cursor-pointer mt-10`}
          >
            Sign in
          </button>
        </form>

        <p className="text-typathon-grey mt-10">
          Don&apos;t have an account? <Link href=""><a className="text-typathon-green">Sign up now</a></Link>.
        </p>
      </div>
    </div>
  );
  // return (
  //   <div className={styles.container}>
  //     <Head>
  //       <title>Typathon Login</title>
  //       <meta name="description" content="Log into your Typathon account." />
  //     </Head>
  //     <div>
  //       <p className='login-copy'><span>T</span><span>y</span><span>p</span><span>e</span><span> </span><span>a</span><span> </span><span>t</span><span>o</span><span>n</span><span> </span><span>w</span><span>i</span><span>t</span><span>h</span><span> </span><span>T</span><span>y</span><span>p</span><span>a</span><span>t</span><span>h</span><span>o</span><span>n</span></p>
  //     </div>
  //   </div>
  // )
}
