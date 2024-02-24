import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import morgan from "morgan";
import cors from "cors";
import { getRepos } from "./controllers/userController.js";
import { cache } from "./middlewares/cache.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

const PORT = process.env.PORT || 8000;

app.get("/", (req, res) => {
  res.send("Hello From Server");
});

app.listen(PORT, () => {
  console.log(`Server is live", ${PORT}`.bgMagenta.white);
});

app.get(`/repos/:${process.env.USER_NAME}`, cache, getRepos);
