import { mergeTypeDefs } from "graphql-tools";
import { typeDefs as subredditTypeDefs } from "./channels";
import { typeDefs as messageTypeDefs } from "./messages";
import { typeDefs as userTypeDefs } from "./users";

const Query = `
    type Query {
    _empty: String
  }
`;

const typeDefs = mergeTypeDefs([
  Query,
  messageTypeDefs,
  subredditTypeDefs,
  userTypeDefs,
]);

export default typeDefs;
