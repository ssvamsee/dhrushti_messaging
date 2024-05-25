import React, { useState } from 'react'
import SocketContext from '../../../context/SocketContext';
import { useSelector } from 'react-redux';

function Input({ message, setMessage, textRef, socket }) {
  const { activeConversation } = useSelector((state) => state.chat)
  const [typing, setTyping] = useState(false)
  const onChangeHandler = (e) => {
    setMessage(e.target.value);
    if (!typing) {
      setTyping(true);
      socket.emit('typing', activeConversation._id)
    }
  }

  let lastTypingTime = new Date().getTime();
  let typingInterval = 1000;
  setTimeout(() => {
    let timeNow = new Date().getTime()
    let timeDiff = timeNow - lastTypingTime
    if (timeDiff >= typingInterval && typing) {
      socket.emit("stop typing", activeConversation._id)
      setTyping(false)
    }
  }, 2000)

  return (
    <div className='w-full'>
      <input
        type='text'
        className='dark:bg-dark_hover_1 dark:text-dark_text_1 outline-none h-[45px] w-full flex-1 rounded-lg pl-5'
        placeholder='Type a Message'
        value={message}
        onChange={onChangeHandler}
        ref={textRef}
      />
    </div>
  )
}

const InputWithSocket = (props) => (
  <SocketContext.Consumer>
    {(socket) => <Input {...props} socket={socket} />}
  </SocketContext.Consumer>
);
export default InputWithSocket;
