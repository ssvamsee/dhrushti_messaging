import React, { useRef, useState } from 'react'
import Input from './Input'
import { SendIcon } from '../../../svg'
import { sendMessage } from '../../../features/chatSlice'
import { useDispatch, useSelector } from 'react-redux'
import { ClipLoader } from 'react-spinners'
import EmojiPickerAPP from './EmojiPicker'
import { Attachments } from './attachments'
import SocketContext from "../../../context/SocketContext";

function ChatActions({socket}) {
    const dispatch = useDispatch()
    const [showPicker, setShowPicker] = useState(false);
    const [showAttachments, setShowAttachments] = useState(false)
    const [loading, setLoading] = useState(false)
    const { activeConversation, status } = useSelector((state) => state.chat);
    const { user } = useSelector((state) => state.user)
    const { token } = user;
    const [message, setMessage] = useState("")
    const textRef = useRef()
    const values = {
        message,
        convo_id: activeConversation._id,
        files: [],
        token
    }
    const sendMessageHandler = async (e) => {
        e.preventDefault()
        if (message.trim().length === 0) {
            return;
        }
        setLoading(true)
        let newMsg = await dispatch(sendMessage(values))
        socket.emit("send_message",newMsg.payload)
        setMessage("")
        setLoading(false)
    }

    return (
        <form
            onSubmit={(e) => sendMessageHandler(e)}
            className='dark:bg-dark_bg_2 h-[60px] w-full flex items-center absolute bottom-0 py-2 px-4 select-none'>
            <div className='w-full flex items-center gap-x-2'>
                <ul className='flex gap-x-2'>
                    <EmojiPickerAPP message={message} setMessage={setMessage} textRef={textRef} showPicker={showPicker} setShowPicker={setShowPicker} setShowAttachments={setShowAttachments} />
                    <Attachments showAttachments={showAttachments} setShowAttchments={setShowAttachments} setShowPicker={setShowPicker} />
                </ul>
                <Input message={message} setMessage={setMessage} textRef={textRef} />
                <button type='submit' className='btn' disabled={message.trim().length === 0 || (status === 'loading' && loading)}>
                    {
                        status === 'loading' && loading ? (
                            <ClipLoader color='#E9EDEF' size={25} />
                        ) : (
                            <SendIcon className="dark:fill-dark_svg_1" />
                        )
                    }
                </button>
            </div>
        </form>
    )
}

const ChatActionsWithSocket = (props)=>(
    <SocketContext.Consumer>
       {(socket)=><ChatActions {...props} socket={socket}/>}
    </SocketContext.Consumer>
)

export default ChatActionsWithSocket;