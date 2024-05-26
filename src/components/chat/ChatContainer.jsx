import React, { useEffect } from 'react'
import ChatHeader from './header/ChatHeader'
import { useDispatch, useSelector } from 'react-redux'
import ChatMessages from './messages/ChatMessages'
import { getConversationMessages } from '../../features/chatSlice'
import { ChatActions } from './actions'
import { checkOnlineStatus, getConversationId } from '../../utils/Chat'
import FilesPreview from "./preview/files/FilesPreview"
export default function ChatContainer({ onlineUsers, typing }) {
  const dispatch = useDispatch();
  const { activeConversation, files } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.user);
  const { token } = user;
  const values = {
    token,
    convo_id: activeConversation?._id,
  };
  useEffect(() => {
    if (activeConversation?._id) {
      dispatch(getConversationMessages(values));
    }
  }, [activeConversation]);

  return (
    <div className="relative w-full h-full border-l dark:border-l-dark_border_2 select-none overflow-hidden ">
      <div>
        <ChatHeader online={checkOnlineStatus(onlineUsers, user, activeConversation.users)} />
        {
          files.length > 0 ? (
            <FilesPreview/>
          ) : (
            <>
              <ChatMessages typing={typing} />
              <ChatActions />
            </>
          )
        }
      </div>
    </div>
  )
}
