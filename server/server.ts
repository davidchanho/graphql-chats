import { BaseRedisCache } from "apollo-server-cache-redis";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import expressJwt from "express-jwt";
import { execute, subscribe } from "graphql";
import { makeExecutableSchema } from "graphql-tools";
import { createServer } from "http";
import Redis from "ioredis";
import logger from "morgan";
import { SubscriptionServer } from "subscriptions-transport-ws";
import client from "./client";
import db from "./models";
import resolvers from "./resolvers";
import typeDefs from "./type-defs";

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

  app.use(logger("dev"));
  const httpServer = createServer(app);

  const server = new ApolloServer({
    schema,
    context: db,
    cache,
  });

  await server.start();
  server.applyMiddleware({ app, cors: true });

  const subscriptionServer = SubscriptionServer.create(
    {
      schema,
      execute,
      subscribe,
      onConnect(connectionParams: any, webSocket: any, context: any) {
        console.log("Connected!");
      },
      onDisconnect(webSocket: any, context: any) {
        console.log("Disconnected!");
      },
    },
    {
      server: httpServer,
      path: server.graphqlPath,
    }
  );

  ["SIGINT", "SIGTERM"].forEach((signal) => {
    process.on(signal, () => subscriptionServer.close());
  });

  const PORT = 4000;
  httpServer.listen(PORT, () =>
    console.log(`Server is now running on http://localhost:${PORT}/graphql`)
  );
})();
