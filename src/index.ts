import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import { main } from './main';

const app = express();

app.use(compression());
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', async (_, res) => {
  const mres = await main();
  return res.json(mres.data);
});

const port = process.env.PORT || '3000';
app.listen(port, () => console.info(`API running on localhost:${port}`));
