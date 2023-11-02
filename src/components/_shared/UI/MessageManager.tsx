import { useEffect, useRef, useState } from "react"
import { InfoMessage, MessageType } from "./InfoMessage"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/store/store"
import { hideToast, removeToast } from "@/store/slices/toastSlice"

type MessageManager = {
  messages?: MessageType[]
  limit?: number,
  className?: string
}


export const MessageManager = ({limit = 1, className}: MessageManager) => {
  const messages = useSelector((state: RootState) => state.toast.toasts);

  const [data, setData] = useState<any>(messages)

  const dispatch = useDispatch()

  useEffect(() => {
    setData(messages)    
  }, [messages])

  return (
    <>
      <div className={`message-manager ${className ?? ''}`}>
        {messages && messages.map((message) => {        
          return <InfoMessage 
            isAnimated 
            message={message.message} 
            callbacks={{out: () => { dispatch(removeToast(message.id)); }}} 
            key={message.id} 
            toHide={message.toHide}
            delay={message.delay}
            bg={message.bg}
            onClick={ () => { dispatch(hideToast(message.id)) } }
            Icon={message.Icon}
            wFull
          />
        })}
      </div>
    </>

  )
}