import { useSelector } from "react-redux";
import { useGetLastUserConversationsQuery } from "../../features/conversation/conversationApi";
import ChatItem from "./ChatItem";

export default function ChatItems() {
  const { user: me } = useSelector((state) => state.auth);

  const { data } = useGetLastUserConversationsQuery(me?.email);

  return (
    <ul>
      <li>
        {data?.data?.map((lastMessage) => {
          const { _id } = lastMessage || {};
          return <ChatItem lastMessage={lastMessage} key={_id} />;
        })}
      </li>
    </ul>
  );
}
