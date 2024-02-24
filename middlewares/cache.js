import dotenv from "dotenv";
import { formatData } from "../helpers/formatData.js";
import { client } from "../helpers/redisConfig.js";
dotenv.config();

export const cache = async (req, res, next) => {
  const username = req.params[process.env.USER_NAME];

  const cachedResult = await client.get(username);

  if (cachedResult !== null) {
    console.log(`Data catched for ${username}`);
    res.send(formatData(username, cachedResult));
  } else {
    console.log(`Data not catched ${username} !!`);
    next();
  }
};
