import { Link } from "react-router-dom";

export default function Navigation() {
  return (
    <nav className="border-general sticky top-0 z-40 border-b bg-violet-700 transition-colors">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between h-16 items-center">
          <Link to="/">
            <img
              className="h-10"
              src={
                "https://img.freepik.com/free-vector/communication-logo-design-template_23-2149919615.jpg"
              }
              alt="Learn with Sumit"
            />
          </Link>

          <div className="flex items-center">
            <div className="flex flex-col items-center justify-center">
              <div className="flex flex-wrap gap-x-2 gap-y-2">
                <div className="relative flex-shrink-0">
                  <span className="absolute bottom-0 right-0 w-4 h-4 bg-green-600 border rounded-full text-gray-100 border-gray-900"></span>
                  <img
                    src="https://source.unsplash.com/50x50/?portrait"
                    alt=""
                    className="w-12 h-12 border rounded-full bg-gray-500 border-gray-700"
                  />
                </div>
              </div>
            </div>

            <ul className="p-6">
              <li className="text-white">
                <button className="text-xl font-semibold">Logout</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
