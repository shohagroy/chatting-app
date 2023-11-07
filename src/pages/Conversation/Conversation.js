import React from "react";
import { useLocation } from "react-router-dom";
import EmptyCard from "../../components/conversation/EmptyCard";
import ConversationCard from "../../components/conversation/ConversationCard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { participantsConversations } from "../../features/conversation/conversationSlice";
import { useGetParticipantsConversationsQuery } from "../../features/conversation/conversationApi";

const Conversation = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const conversationId = queryParams.get("conversation");

  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);

  const query = `${user?.id}-${conversationId}`;

  const { data, isLoading } = useGetParticipantsConversationsQuery(query);

  useEffect(() => {
    if (data?.data?.length) {
      dispatch(participantsConversations(data?.data));
    }
  }, [dispatch, data]);

  return (
    <div>
      {!conversationId ? (
        <EmptyCard message={"Please select a conversation"} />
      ) : (
        <ConversationCard
          isLoading={isLoading}
          conversationId={conversationId}
        />
      )}
    </div>
  );
};

export default Conversation;
