import { ApolloClient, HttpLink, NormalizedCacheObject } from "@apollo/client";
import { makeVar } from "@apollo/client/core";
import { CachePersistor } from "apollo3-cache-persist";
import { useEffect, useState } from "react";
import authLink from "./auth";
import { cache, newPersistor } from "./cache";

export const currentChannelVar = makeVar("6109d3b97a879c92b7014ea2");
export const userVar = makeVar("6109d3a47a879c92b7014ea0");

const httpLink = new HttpLink({
  uri: "http://localhost:4000/graphql",
});

// const wsLink = new WebSocketLink({
//   uri: "ws://localhost:4000/subscriptions",
//   options: {
//     reconnect: true,
//   },
// });

// const splitLink = split(
//   ({ query }) => {
//     const definition = getMainDefinition(query);
//     return (
//       definition.kind === "OperationDefinition" &&
//       definition.operation === "subscription"
//     );
//   },
//   wsLink,
//   httpLink
// );

function useClient() {
  const [client, setClient] = useState<ApolloClient<NormalizedCacheObject>>();
  const [persistor, setPersistor] =
    useState<CachePersistor<NormalizedCacheObject>>();

  useEffect(() => {
    async function init() {
      await newPersistor.restore();
      setPersistor(newPersistor);
      setClient(
        new ApolloClient({
          link: authLink.concat(httpLink),
          cache,
        })
      );
    }

    init().catch(console.error);
  }, []);

  return { client };
}

export default useClient;
