import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import ProgressBar from "../components/ProgressBar";

const Home = () => {
  const [timeTypingStarted, setTimeTypingStarted] = useState();
  const [timeTypingEnded, setTimeTypingEnded] = useState();
  const [layout, setLayout] = useState("up-and-down");
  const [typedResponse, setTypedResponse] = useState("");
  const toType =
    "This is a random block of text for the purpose of developing the web application. I hope you enjoy trying this out, cheers.";

  const onTextareaChange = (e) => {
    if (
      e.target.value[e.target.value.length - 1] ===
        toType[e.target.value.length - 1] &&
      e.target.value.length - typedResponse.length === 1
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

  useEffect(() => {
    if (typedResponse.length === 1) {
      setTimeTypingStarted(performance.now());
    }
    if (typedResponse.length === toType.length) {
      setTimeTypingEnded(performance.now());
    }
  }, [typedResponse, typedResponse.length]);

  const layoutColumns = layout.includes("up-and-down")
    ? "grid-cols-1"
    : "grid-cols-2";
  const layoutOrder = layout.includes("reverse") ? "order-last" : "";

  return (
    <Layout>
      <div>
        <label>
          Layout:
          <select onChange={(e) => setLayout(e.target.value)} value={layout}>
            <option value="up-and-down">Up and down</option>
            <option value="side-by-side">Side by side</option>
            <option value="up-and-down-reverse">Up and down reverse</option>
            <option value="side-by-side-reverse">Side by side reverse</option>
          </select>
        </label>

        <div className={`grid gap-4 ${layoutColumns}`}>
          <p className={layoutOrder}>{toType}</p>
          <textarea
            onChange={onTextareaChange}
            value={typedResponse}
            className="border border-red-400"
          />
        </div>

        <ProgressBar
          width={`${Math.floor((typedResponse.length / toType.length) * 100)}%`}
        />

        {typedResponse.length === toType.length && (
          <>
            <p>
              You spent{" "}
              {((timeTypingEnded - timeTypingStarted) / 1000).toFixed(2)}{" "}
              seconds, at{" "}
              {(
                toType.length /
                ((timeTypingEnded - timeTypingStarted) / 1000)
              ).toFixed(2)}{" "}
              characters per second. You typing speed is{" "}
              {getSpeedPercentile(toType.length / ((timeTypingEnded - timeTypingStarted) / 1000))}
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
