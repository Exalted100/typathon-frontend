import { useEffect, useState } from "react";
import CloseIcon from "./CloseIcon";

const Error = ({ message, setMessage }) => {
  const [display, setDisplay] = useState("hidden");

  const closeError = () => {
    setMessage("");
  };

  useEffect(() => {
    if (message) {
      setDisplay("block");
    }
    if (!message) {
      setDisplay("hidden");
    }
    // setTimeout(() => setMessage(""), 10000)
  }, [message, setMessage]);

  return (
    <div
      className={`slide-out absolute top-4 right-4 bg-red-200 px-6 py-2 font-semibold ${display}`}
    >
      <span className="mr-4">{message}</span>
      <span onClick={closeError} className="cursor-pointer">
        <CloseIcon />
      </span>
    </div>
  );
};

export default Error;
