const express = require('express');
const dotenv = require('dotenv');
import { Request, Response } from 'express';
import { generateResponse, history } from './controllers';


dotenv.config();

const app = express();
app.use(express.json());

const port = process.env.PORT;

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.post('/generate', async (req: Request, res: Response) => {
    await generateResponse(req, res);
  });
  


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});