import { GraphQLDateTime } from "graphql-iso-date";
import { mergeResolvers } from "graphql-tools";
import { resolvers as channelResolvers } from "./channels";
import { resolvers as messagesResolvers } from "./messages";
import { resolvers as userResolvers } from "./users";

const Resolver = {
  DateTime: GraphQLDateTime,
};

const resolvers = mergeResolvers([
  Resolver,
  messagesResolvers,
  channelResolvers,
  userResolvers,
]);

export default resolvers;
