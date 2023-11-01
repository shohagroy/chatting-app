import React from "react";
import { useLocation } from "react-router-dom";
import EmptyCard from "../../components/conversation/EmptyCard";
import ConversationCard from "../../components/conversation/ConversationCard";

const Conversation = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const conversationId = queryParams.get("conversation");

  return (
    <div>
      {!conversationId ? (
        <EmptyCard message={"Please select a conversation"} />
      ) : (
        <ConversationCard conversationId={conversationId} />
      )}
    </div>
  );
};

export default Conversation;
