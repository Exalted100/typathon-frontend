import { useCallback, useEffect, useState } from "react";
import Layout from "../components/Layout";
import ProgressBar from "../components/ProgressBar";
import axios from "axios";
import { useCookies } from "react-cookie";
import Error from "../components/Error";

const Home = () => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const [cookies, setCookie, removeCookie] = useCookies(["accessToken"]);
  const [timeTypingStarted, setTimeTypingStarted] = useState();
  const [timeTypingEnded, setTimeTypingEnded] = useState();
  const [layout, setLayout] = useState("up-and-down");
  const [mode, setMode] = useState("sprint");
  const [typedResponse, setTypedResponse] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const toType =
    mode === "sprint"
      ? "This is a random block of text for the purpose of developing the web application. I hope you enjoy trying this out, cheers."
      : mode === "middleDistance"
      ? "This is another random block of text for the purpose of developing the web application. I hope you enjoy trying it out, cheers. It needs to be longer so I am adding more text. Welcome, ladies and gentlemen, to the middle distance game mode. Get running (or more appropriately in this case, typing)."
      : "This is another random block of text for the purpose of developing the web application. I hope you enjoy trying it out, cheers. It needs to be longer so I am adding more text. Welcome, ladies and gentlemen, to the marathon game mode. Get running (or more appropriately in this case, typing). As you likely know, a marathon is usually long. So the text needs to go on and on and on, you get the drift. Did you know that unnecessary text to make a piece of writing longer is called fluff? The irony about commercial writing is that while fluff is a sign of bad writing, commercial writing compensates it. This is because commercial writers are often paid based on how much they write.";

  const onTextareaChange = (e) => {
    if (
      e.target.value[e.target.value.length - 1] ===
      toType[e.target.value.length - 1] && e.target.value.length - typedResponse.length === 1
    ) {
      setTypedResponse(e.target.value);
    }
  };

  const getSpeedPercentile = (charactersPerSecond) => {
    if (charactersPerSecond >= 10) {
      return "competitive";
    } else if (charactersPerSecond >= 5.8) {
      return "high";
    } else if (charactersPerSecond >= 5) {
      return "productive";
    } else if (charactersPerSecond >= 4.2) {
      return "above average";
    } else if (charactersPerSecond >= 3) {
      return "average";
    } else {
      return "below average";
    }
  };

  const submitScore = async (timeTypingEnded) => {
    try {
      const headers = {
        "Content-Type": "application/json",
        Authentication: `Bearer ${cookies.accessToken}`,
      };
      const body = {
        user: "user",
        mode: mode,
        score: Number(
          ((timeTypingEnded - timeTypingStarted) / 1000).toFixed(2)
        ),
      };

      await axios.post(`${API_URL}/game/score`, body, {
        headers,
      });
    } catch (err) {
      setErrorMessage(err.response.data.error)
    } finally {
    }
  };

  useEffect(() => {
    if (typedResponse.length === 1) {
      setTimeTypingStarted(performance.now());
    }
    if (typedResponse.length === toType.length) {
      setTimeTypingEnded(performance.now());
      if (cookies.accessToken !== "guest") {
        submitScore(performance.now());
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typedResponse, typedResponse.length]);

  const layoutColumns = layout.includes("up-and-down")
    ? "grid-cols-1"
    : "grid-cols-2";
  const layoutOrder = layout.includes("reverse") ? "order-last" : "";

  return (
    <Layout>
      <Error message={errorMessage} setMessage={setErrorMessage} />
      <div>
        <label className="font-semibold">
          Game layout:
          <select onChange={(e) => setLayout(e.target.value)} value={layout} className="font-normal cursor-pointer w-fit border border-typathon-grey px-4 py-2 ml-4 mr-12 border-2">
            <option value="up-and-down">Up and down</option>
            <option value="side-by-side">Side by side</option>
            <option value="up-and-down-reverse">Up and down reverse</option>
            <option value="side-by-side-reverse">Side by side reverse</option>
          </select>
        </label>

        <label className="font-semibold">
          Game mode:
          <select onChange={(e) => setMode(e.target.value)} value={mode} className="font-normal cursor-pointer w-fit border border-typathon-grey px-4 py-2 ml-4 mr-12 border-2">
            <option value="sprint">Sprint</option>
            <option value="middleDistance">Middle Distance</option>
            <option value="marathon">Marathon</option>
          </select>
        </label>

        <button onClick={() => setTypedResponse("")} className="font-semibold cursor-pointer w-fit bg-typathon-green text-white px-4 py-2 ml-20">Restart</button>

        <div className={`grid gap-4 mt-16 ${layoutColumns}`}>
          <p className={`mx-auto w-4/5 text-center ${layoutOrder}`}>{toType}</p>
          <textarea
            onChange={onTextareaChange}
            value={typedResponse}
            className="border border-2 border-typathon-grey rounded outline-typathon-green px-4 py-2"
          />
        </div>

        <ProgressBar
          width={`${Math.floor((typedResponse.length / toType.length) * 100)}%`}
        />

        {typedResponse.length === toType.length && (
          <>
            <p className="mt-10">
              You spent{" "}
              {((timeTypingEnded - timeTypingStarted) / 1000).toFixed(2)}{" "}
              seconds, at{" "}
              {(
                toType.length /
                ((timeTypingEnded - timeTypingStarted) / 1000)
              ).toFixed(2)}{" "}
              characters per second. You typing speed is{" "}
              {getSpeedPercentile(
                toType.length / ((timeTypingEnded - timeTypingStarted) / 1000)
              )}
              .
            </p>
            <p>
              Did you know? — According to Intersteno, an international
              federation that regularly organizes international typing contests,
              the world record for typing speed is held by Czech typist Helena
              Matoušková. In 2003, she achieved a typing speed of 955 characters
              per minute. That’s around 15.9 characters per second, with 99.97%
              precision!
            </p>
          </>
        )}
      </div>
    </Layout>
  );
};

export default Home;
