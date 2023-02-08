import express from "express";
import * as dotenv from "dotenv";
import { Configuration, OpenAIApi } from "openai";

import Post from "../mongodb/models/post.js";

dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const router = express.Router();

router.get("/", (req, res) => {
  res.send("dall-e routes page");
});

router.post("/", async (req, res) => {
  try {
    const { prompt } = req.body;
    const aiResponse = await openai.createImage({
      prompt,
      n: 1,
      size: "1024x1024",
    });

    const image = aiResponse.data.data[0]['url'];
    res.status(200).send(image);
  } catch (error) {
    console.log(error);
    res.status(500).send(error?.response.data.error.message);
  }
});

export default router;
