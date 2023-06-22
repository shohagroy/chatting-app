// import Blank from "./Blank";
import { useParams } from "react-router-dom";
import { useGetUserMessagesQuery } from "../../../features/user/userApi";
import ChatHead from "./ChatHead";
import Messages from "./Messages";
import Options from "./Options";

export default function ChatBody() {
  const { id } = useParams();

  const { data } = useGetUserMessagesQuery(id);

  console.log(data);

  const { avatar, email, firstName, lastName } = data?.data;

  return (
    <div className="w-full lg:col-span-2 lg:block">
      <div className="w-full grid conversation-row-grid">
        <ChatHead avatar={avatar} name={`${firstName} ${lastName}`} />
        <Messages />
        <Options />
        {/* <Blank /> */}
      </div>
    </div>
  );
}
