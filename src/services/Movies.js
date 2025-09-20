import axios from "axios";
import { clientSecret } from "./api.js";

const baseUrl = "https://api.rawg.io/api";
const games = "/games";
// const page_size = 40;

export const getGameWithVideo = async (gameId) => {
  const results = await axios.get(
    `${baseUrl}${games}/${gameId}?&key=${clientSecret}`
  );
  return results.data;
};

export const getVideosForGame = async (gameId) => {
  const results = await axios.get(
    `${baseUrl}${games}/${gameId}/movies?&key=${clientSecret}`
  );
  return results.data;
};


