import { InMemoryCache } from "@apollo/client";
import { offsetLimitPagination } from "@apollo/client/utilities";
import { LocalForageWrapper, CachePersistor } from "apollo3-cache-persist";
import dayjs from "dayjs";
import localforage from "localforage";
import { currentChannelVar } from ".";
import _ from "lodash";

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

export let newPersistor = new CachePersistor({
  cache,
  storage,
  debug: true,
  trigger: "write",
});
