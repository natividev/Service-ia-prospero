import { Request, Response } from 'express';
const { GoogleGenerativeAI,HarmBlockThreshold, HarmCategory } = require("@google/generative-ai");
const dotenv = require("dotenv");
dotenv.config();

export const history: string[] = [];

// GoogleGenerativeAI required config
const configuration = new GoogleGenerativeAI(process.env.API_KEY);
// Model initialization
const modelId = "gemini-pro"

  
const model = configuration.getGenerativeModel({ model: modelId });


/**
 * Generates a response based on the given prompt.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise} - A promise that resolves when the response is sent.
 */
export const generateResponse = async (req: Request, res: Response) => {
    try {
      const { prompt } = req.body;
  
      const result = await model.generateContent(prompt);
      const response = await result.response;
      console.log({response});
      const text = response.text();
  
      history.push(text);
      console.log(history);
  
      res.send({ response: JSON.stringify(text) });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  };