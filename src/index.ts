import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import express from 'express';
import { GraphQLServer } from 'graphql-yoga';
import helmet from 'helmet';
import { main } from './main';

const app = express();

app.use(compression());
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const resolvers = {
  Query: {
    get: () => main().then(v => v),
    info: () => `This is the API of a Hackernews Clone`,
  },
};

const server = new GraphQLServer({
  resolvers,
  typeDefs: './dist/schema.graphql',
});

const port = process.env.PORT || '3000';
server.start({ port }, () => console.info(`API running on localhost:${port}`));
