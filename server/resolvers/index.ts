import { mergeResolvers } from "graphql-tools";
import { resolvers as channelResolvers } from "./channels";
import { resolvers as messagesResolvers } from "./messages";
import { resolvers as userResolvers } from "./users";

const resolvers = mergeResolvers([
  messagesResolvers,
  channelResolvers,
  userResolvers,
]);

export default resolvers;
