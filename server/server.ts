import { ApolloServer } from "apollo-server-express";
import express from "express";
import expressJwt from "express-jwt";
import { makeExecutableSchema } from "graphql-tools";
import { JwtPayload } from "jsonwebtoken";
import { getUser } from "./auth/";
import client from "./client";
import { cache } from "./client/cache";
import models from "./models";
import resolvers from "./resolvers";
import typeDefs from "./type-defs";

require("dotenv").config();

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

client();

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

      if (token) {
        const user = getUser(token);
        console.log(user);
        return { models, user };
      }

      return { models };
    },
    cache,
  });

  await server.start();
  server.applyMiddleware({ app, cors: true });

  await new Promise((resolve: any) => app.listen({ port: 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
  return { server, app };
})();
