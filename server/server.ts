import { BaseRedisCache } from "apollo-server-cache-redis";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import expressJwt from "express-jwt";
import { makeExecutableSchema } from "graphql-tools";
import Redis from "ioredis";
import client from "./client";
import resolvers from "./resolvers";
import typeDefs from "./type-defs";

// const subscriptionServer = SubscriptionServer.create(
//   {
//     schema,
//     execute,
//     subscribe,
//     onConnect(connectionParams: any, webSocket: any, context: any) {
//       console.log("Connected!");
//     },
//     onDisconnect(webSocket: any, context: any) {
//       console.log("Disconnected!");
//     },
//   },
//   {
//     server: httpServer,
//     path: server.graphqlPath,
//   }
// );

// ["SIGINT", "SIGTERM"].forEach((signal) => {
//   process.on(signal, () => subscriptionServer.close());
// });

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

client();

const cache = new BaseRedisCache({
  client: new Redis({
    port: 6379,
    host: "127.0.0.1",
  }),
});

(async function startApolloServer() {
  const app = express();

  app.use(
    expressJwt({
      secret: "secret",
      algorithms: ["HS256"],
      credentialsRequired: false,
    })
  );

  const server = new ApolloServer({
    schema,
    context: ({ req }) => {
      const token = req.headers.authorization;

      return {
        token,
      };
    },
    cache,
  });

  await server.start();
  server.applyMiddleware({ app, cors: true });

  const PORT = 4000;
  await new Promise((resolve: any) => app.listen({ port: 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
  return { server, app };
})();
