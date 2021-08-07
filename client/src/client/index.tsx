import { ApolloClient, HttpLink, NormalizedCacheObject } from "@apollo/client";
import { InMemoryCache, makeVar, split } from "@apollo/client/core";
import { WebSocketLink } from "@apollo/client/link/ws";
import {
  getMainDefinition,
  offsetLimitPagination,
} from "@apollo/client/utilities";
import { CachePersistor, LocalForageWrapper } from "apollo3-cache-persist";
import dayjs from "dayjs";
import localforage from "localforage";
import _ from "lodash";
import { useEffect, useState } from "react";
export const currentChannelVar = makeVar("6109d3b97a879c92b7014ea2");
export const userVar = makeVar("6109d3a47a879c92b7014ea0");

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        messages: offsetLimitPagination(),
      },
    },
    Channel: {
      fields: {
        currentChannel: {
          read() {
            return currentChannelVar;
          },
        },
      },
    },
    Message: {
      fields: {
        date: {
          read(date: string) {
            return dayjs(date).format("h:MM A");
          },
        },
      },
    },
    User: {
      fields: {
        name: {
          read(name, options) {
            return _.capitalize(name);
          },
        },
      },
    },
  },
});

const storage: any = new LocalForageWrapper(localforage);

let newPersistor = new CachePersistor({
  cache,
  storage,
  debug: true,
  trigger: "write",
});

const httpLink = new HttpLink({
  uri: "http://localhost:4000/graphql",
});

const wsLink = new WebSocketLink({
  uri: "ws://localhost:4000/subscriptions",
  options: {
    reconnect: true,
  },
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

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
          link: splitLink,
          cache,
        })
      );
    }

    init().catch(console.error);
  }, []);

  return { client };
}

export default useClient;
