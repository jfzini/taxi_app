import express, { type Request, type Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Router
import router from './routes';

dotenv.config({ path: '../.env' });

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('This is the Shopper API');
});

app.use('/', router);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
