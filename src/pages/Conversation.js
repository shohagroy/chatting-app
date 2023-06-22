import Blank from "../components/inbox/chatbody/Blank";
import Sidebar from "../components/inbox/Sidebar";
import Navigation from "../components/Navigation";

export default function Inbox() {
  return (
    <div>
      <Navigation />

      <div className="max-w-7xl mx-auto -mt-1">
        <div className="w-full  border rounded flex">
          <Sidebar />
          <Blank />
        </div>
      </div>
    </div>
  );
}
