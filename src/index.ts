import { GraphQLServer } from 'graphql-yoga';
import { main } from './main';

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
