import { Toaster } from "react-hot-toast"
import { InfoMessage } from "./InfoMessage"
import DefaultIcon from '@/icons/bell.svg'

export const CustomToaster = () => {
  return (
    <Toaster
      containerClassName="toaster"
      containerStyle={{
        position: 'relative',
        inset: 0,
        height: '100%',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
      }}
    >  
      {(t) => (
        <>
          <InfoMessage
            message={t.message as string}
            Icon={t.icon ? t.icon : DefaultIcon}
            className={`transition-opacity ${t.visible ? 'animate-[toast-in_0.4s_ease-out]' : 'animate-[toast-out_0.4s_ease-in_forwards]'}`}
          />
        </>
      )}
    </Toaster>
  )
}