import { useParams } from "react-router-dom";
import ChatHead from "./ChatHead";
import Messages from "./Messages";
import Options from "./Options";
import { useSelector } from "react-redux";
import {
  useGetUserConversationsQuery,
  useSendMessagesMutation,
} from "../../../features/conversation/conversationApi";
import NoConversation from "./NoConversation";

export default function ChatBody() {
  const { email } = useParams();
  const { user } = useSelector((state) => state.auth);

  const [sendMessages, { isLoading, isSuccess, isError }] =
    useSendMessagesMutation();

  const query = `user=${user?.email}&partner=${email}`;

  const { data } = useGetUserConversationsQuery(query);
  const { partner, conversations } = data?.data || {};

  return (
    <div className="w-full lg:col-span-2 lg:block">
      <div className="w-full grid conversation-row-grid">
        <ChatHead user={partner} />
        {conversations?.length ? (
          <Messages
            isLoading={isLoading}
            conversations={conversations}
            isSuccess={isSuccess}
            isError={isError}
          />
        ) : (
          <NoConversation />
        )}
        <Options sendMessages={sendMessages} data={partner} />
        {/* <Blank /> */}
      </div>
    </div>
  );
}
