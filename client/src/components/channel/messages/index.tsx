import { useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { IMessage } from "../../../../../shared/types";
import { useScrollToBottom } from "../../../hooks";
import { MESSAGE_FEED } from "../../../queries";
import Message from "../message";

function Messages() {
  const params = useParams();
  const { ref, handleScrollToBottom } = useScrollToBottom();

  const { loading, error, data, fetchMore } = useQuery(MESSAGE_FEED);

  useEffect(() => {
    handleScrollToBottom();
  }, []);

  if (loading) return null;
  if (error) return null;

  return (
    <div className="overflow-hidden overflow-y-scroll h-96">
      {data.messageFeed.messages.map((message: IMessage) => {
        return <Message key={message._id} message={message} />;
      })}
      {data.messageFeed.hasNextPage && (
        <button
          onClick={() =>
            fetchMore({
              variables: {
                cursor: data.messageFeed.cursor,
              },
              updateQuery: (previousResult, { fetchMoreResult }) => {
                return {
                  messageFeed: {
                    cursor: fetchMoreResult.messageFeed.cursor,
                    hasNextPage: fetchMoreResult.messageFeed.hasNextPage,
                    messages: [
                      ...previousResult.messageFeed.messages,
                      ...fetchMoreResult.messageFeed.messages,
                    ],
                    __typename: "messageFeed",
                  },
                };
              },
            })
          }
        >
          Load more
        </button>
      )}
      <div ref={ref}></div>
    </div>
  );
}

export default Messages;
