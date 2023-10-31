import { useEffect, useRef, useState } from "react"
import { InfoMessage, MessageType } from "./InfoMessage"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/store/store"
import { addToast, hideToast, removeToast } from "@/store/slices/toastSlice"

type MessageManager = {
  messages?: MessageType[]
  limit?: number
}


export const MessageManager = ({limit = 1}: MessageManager) => {
  const messages = useSelector((state: RootState) => state.toast.toasts);

  const [data, setData] = useState<any>(messages)

  const dispatch = useDispatch()

  useEffect(() => {
    setData(messages)    
  }, [messages])

  return (
    <>
      <div className="message-manager">
        {messages && messages.map((message) => {        
          return <InfoMessage 
            isAnimated 
            message={message.message + ' id-'+ message.id} 
            callbacks={{out: () => { dispatch(removeToast(message.id)); }}} 
            key={message.id} 
            toHide={message.toHide}
            onClick={ () => { dispatch(hideToast(message.id)) } }
          />
        })}
      </div>

      <div
        onClick={() => {
          dispatch(addToast({
            message: 'fresh Message',
            id: Date.now(),
          }));
        }}
      >Click</div>
    </>

  )
}