import gsap from "gsap"
import { ReactElement, forwardRef, useEffect, useRef } from "react"

interface ComponentWithClassName  {
  className?: string
}

export interface MessageType {
  Icon?: React.FC<ComponentWithClassName>,
  type?: 'regular' | 'danger',
  isAnimated?: boolean,
  toHide?: boolean,
  message?: string,
  id?: number,
}

interface InfoMessageProps extends MessageType {
  Icon?: React.FC<ComponentWithClassName>,
  type?: 'regular' | 'danger',
  message?: string,
  wFull?: boolean,
  small?: boolean,
  isAnimated?: boolean,
  toHide?: boolean,
  onClick?: () => void,
  callbacks?: {
    in?: Function,
    out?: Function
  },
}

export const InfoMessage = ({Icon, type, message, wFull, small, isAnimated, toHide, onClick, callbacks}:InfoMessageProps) => {
  const messageEl = useRef(null)

  isAnimated && useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline()

      tl.fromTo(messageEl.current, {
        y: 30,
        opacity: 0
      }, {
        y: 0,
        opacity: 1
      })
    })

    return () => {
      ctx.revert()
    }
  }, [])

  useEffect(() => {
    if(toHide === true) {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          onComplete: () => {
            callbacks?.out && callbacks?.out()
          }
        })
  
        tl.fromTo(messageEl.current, {
          y: 0,
          opacity: 1
        }, {
          y: -0,
          opacity: 0
        })
      })
  
      return () => {
        ctx.revert()
      }
    }

  }, [toHide])

  const sizeClass = small ? 'py-dashboard-mention-padding-top-bottom px-dashboard-button-separation-spacing' : 'py-dashboard-mention-padding-right-left px-dashboard-button-separation-spacing'
  return (
    <div 
      ref={messageEl}
      onClick={() => {
        onClick && onClick()
      }}
      className={`flex no-wrap gap-[10px] ${wFull ? 'w-full' : 'w-max'} max-w-[calc(100vw-32px)] bg-soyMilk-100 rounded-dashboard-button-square-radius ${sizeClass}`}>
      <div className="w-[24px] h-[24px]">{Icon && <Icon className={`w-[24px] h-[24px] ${type === 'danger' ? 'svg-color-appleRed' : ''}`} />}</div>
      <div>{message}</div>
    </div>
  );
};
