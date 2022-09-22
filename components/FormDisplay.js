import { useEffect, useState } from "react";

const FormDisplay = () => {
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

  useEffect(() => {
    setTimeout(() => {
      return setTextToDisplay(finalCopy);
    }, loginCopy.length * 100);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return textToDisplay;
};

export default FormDisplay