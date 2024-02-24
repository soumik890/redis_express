import fetch from "node-fetch";
import { formatData } from "../helpers/formatData.js";
import { client } from "../helpers/redisConfig.js";
import dotenv from "dotenv";

dotenv.config();

export const getRepos = async (req, res) => {
  try {
    const username = req.params[process.env.USER_NAME];
    const response = await fetch(`${process.env.FETCH_BASE_URL}/${username}`);
    const { public_repos } = await response.json();
    await client.set(username, public_repos);
    res.send(formatData(username, public_repos));
  } catch (error) {
    console.log(error);
    res.status(404);
  }
};
