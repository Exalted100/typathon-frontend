import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import { useCookies } from "react-cookie";

const Scores = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["accessToken"]);
  const API_URL = process.env.NEXT_PUBLIC_API_URL
  const [playerScores, setPlayerScores] = useState({})
  const [globalScores, setGlobalScores] = useState({})

  const memoizedFetchScores = useCallback(async () => {

    try {
      const headers = {
        "Content-Type": "application/json",
        Authentication: `Bearer ${cookies.accessToken}`,
      };
      const playerScores = await axios.get(`${API_URL}/player/scores`, {
        headers,
      });
      const globalScores = await axios.get(`${API_URL}/global/scores`, {
        headers,
      });
      setPlayerScores(playerScores.data.scores)
      setGlobalScores(globalScores.data.scores)
    } catch (err) {
      console.log(err);
    } finally {
    }
  }, [API_URL, cookies.accessToken]);

  useEffect(() => {
    memoizedFetchScores()
  }, [memoizedFetchScores])

  return (
    <Layout>
      <h1 className="font-bold text-center text-3xl my-8">HIGH SCORES</h1>
      <h2 className="font-bold text-center text-2xl my-4">Your Scores</h2>
      <div className="grid grid-cols-3 gap-8 pb-8 text-center">
        <div>
          <h3 className="font-bold text-xl">Sprint</h3>
          <ol className="list-decimal">
            {playerScores.sprint?.map((score, index) => (<li key={index}>{index + 1}. {score.score}</li>))}
          </ol>
        </div>

        <div>
          <h3 className="font-bold text-xl">Middle Distance</h3>
          <ol>
          {playerScores.middleDistance?.map((score, index) => (<li key={index}>{index + 1}. {score.score}</li>))}
          </ol>
        </div>

        <div>
          <h3 className="font-bold text-xl">Marathon</h3>
          <ol>
          {playerScores.marathon?.map((score, index) => (<li key={index}>{index + 1}. {score.score}</li>))}
          </ol>
        </div>
      </div>
      <h2 className="font-bold text-center text-2xl my-4">Global Scores</h2>
      <div className="grid grid-cols-3 gap-8 pb-8 text-center">
        <div>
          <h3 className="font-bold text-xl">Sprint</h3>
          <ol>
          {globalScores.sprint?.map((score, index) => (<li key={index}>{index + 1}. {score.score} - {score.user}</li>))}
          </ol>
        </div>

        <div>
          <h3 className="font-bold text-xl">Middle Distance</h3>
          <ol>
          {globalScores.middleDistance?.map((score, index) => (<li key={index}>{index + 1}. {score.score} - {score.user}</li>))}
          </ol>
        </div>

        <div>
          <h3 className="font-bold text-xl">Marathon</h3>
          <ol>
          {globalScores.marathon?.map((score, index) => (<li key={index}>{index + 1}. {score.score} - {score.user}</li>))}
          </ol>
        </div>
      </div>
    </Layout>
  );
};

export default Scores;
