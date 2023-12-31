import express from "express";
import * as dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const router = express.Router();

router.route("/").get((req, res) => {
  res.status(200).json({ message: "Hello from DALL.E ROUTES" });
});

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.route('/').post(async (req, res) => {
  try {
    const { prompt } = req.body;

    const response = await openai.images.generate({
      prompt,
      n: 1,
      size: "256x256",
      response_format: "b64_json",
    });

    const image = response.data.data[0].b64_json;
    router.route("/").get((req, res) => {
      res.status(200).json({ photo: image });
    });

  } catch (error) {
    router.route("/").get((req, res) => {
      res.status(500).json({ message: `Something went wrong: ${error}` });
    });
    res.status(500).json({ message: `Something went wrong: ${error}` });
  }
});

export default router;
