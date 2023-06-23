import io from "socket.io-client";

// process.env.REACT_APP_NODE_ENV === "development"
//         ? "http://localhost:5000"
//         : `${process.env.REACT_APP_API_URL}`

const socket = io(
  process.env.REACT_APP_NODE_ENV === "development"
    ? "http://localhost:5000"
    : `${process.env.REACT_APP_API_URL}`,
  {
    reconnectionDelay: 1000,
    reconnection: true,
    reconnectionAttemps: 10,
    transports: ["websocket"],
    agent: false,
    upgrade: false,
    rejectUnauthorized: false,
  }
);

export default socket;
