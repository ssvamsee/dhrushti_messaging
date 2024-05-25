import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import Home from "./pages/Home"
import Login from "./pages/Login";
import Register from "./pages/Register";
import { io } from "socket.io-client";
import SocketContext from "./context/SocketContext";

const socket = io(process.env.REACT_APP_API_ENDPOINT)

function App() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { files } = useSelector((state) => state.user);

  const { token } = user;
  return (
    <div className="dark">
      <SocketContext.Provider value={socket}>
        <Router>
          <Routes>
            <Route exact path="/" element={token ? <Home socket={socket} /> : <Navigate to="/login" />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
          </Routes>
        </Router>
      </SocketContext.Provider>
    </div>
  );
}

export default App;
