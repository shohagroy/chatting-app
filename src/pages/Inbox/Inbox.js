import ChatBody from "../../components/inbox/chatbody/ChatBody";
import Navigation from "../../components/Navigation";
import Sidebar from "../../components/inbox/Sidebar";
import Blank from "../../components/inbox/chatbody/Blank";

export default function Inbox() {
  return (
    <div>
      <Navigation />
      <div className="max-w-7xl mx-auto -mt-1">
        <div className="w-full  border rounded flex">
          <Sidebar />
          {/* <ChatBody /> */}
          <Blank />
        </div>
      </div>
    </div>
  );
}
