import React, { useEffect, useState } from 'react'
import { Sidebar } from '../components/sidebar'
import { useDispatch, useSelector } from 'react-redux'
import { getConversations, updateMessagesAndConversations } from '../features/chatSlice';
import { ChatContainer, DhrushtiHome } from '../components/chat';
import SocketContext from '../context/SocketContext';

function Home({ socket }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { activeConversation } = useSelector((state) => state.chat);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [typing, setTyping] = useState(false)

  useEffect(() => {
    socket.emit("join", user._id)
    socket.on("get-online-users", (users) => {
      setOnlineUsers(users)
    })
  }, [user])

  useEffect(() => {
    if (user?.token) {
      dispatch(getConversations(user.token))
    }
  }, [user]);

  useEffect(() => {
    socket.on("receive message", (message) => {
      dispatch(updateMessagesAndConversations(message));
    });
    socket.on("typing", (conversation) => setTyping(conversation))
    socket.on("stop typing", () => setTyping(false))
  }, []);

  return (
    <div className='h-screen dark:bg-dark_bg_1 flex items-center justify-center overflow-hidden'>
      <div className='container h-screen flex py-[19px]'>
        <Sidebar onlineUsers={onlineUsers} typing={typing}/>
        {
          activeConversation._id ? (
            <ChatContainer onlineUsers={onlineUsers} typing={typing} />
          ) : (
            <DhrushtiHome />)
        }
      </div>
    </div>
  )
}

const HomeWithSocket = (props) => (
  <SocketContext.Consumer>
    {(socket) => <Home {...props} socket={socket} />}
  </SocketContext.Consumer>
);
export default HomeWithSocket;
