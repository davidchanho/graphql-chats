import { InMemoryCache } from "@apollo/client";
import { offsetLimitPagination } from "@apollo/client/utilities";
import { CachePersistor, LocalForageWrapper } from "apollo3-cache-persist";
import dayjs from "dayjs";
import localforage from "localforage";
import _ from "lodash";
import { currentChannelVar } from ".";

export const cache = new InMemoryCache({
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
        createdAt: {
          read(createdAt: string) {
            return dayjs(createdAt).format("h:MM A");
          },
        },
      },
    },
    Message: {
      fields: {
        createdAt: {
          read(createdAt: string) {
            return dayjs(createdAt).format("h:MM A");
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
        createdAt: {
          read(createdAt: string) {
            return dayjs(createdAt).format("h:MM A");
          },
        },
      },
    },
  },
});

const storage: any = new LocalForageWrapper(localforage);

export let newPersistor = new CachePersistor({
  cache,
  storage,
  debug: true,
  trigger: "write",
});
