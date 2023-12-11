import { appearBottomTitle } from "@/Animations/appearBottom"
import { TextSplit } from "@/utils/TextSplit"
import { PropsWithChildren, RefObject, forwardRef, useEffect, useRef, useState } from "react"

type TitleAnimProps = {
  text: string,
  type: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'none',
  className?: string,
  split?: boolean,
  isAnim?: boolean,
  isSunset?: boolean,
  onSplitted?: () => void
}

export const Title = forwardRef<any, TitleAnimProps>(function Title({text, type, className, isAnim, isSunset, split, onSplitted}, ref) {
  const ctx = useRef<gsap.Context>()
  const title = (ref as RefObject<any>) ?? useRef<any>(null)

  const [isSplitted, setIsSplitted] = useState(false)

  useEffect(() => {
    if(isAnim && title.current && isSplitted) {      
      ctx.current = appearBottomTitle({title: title.current})
    }

    return () => {
      ctx.current && ctx.current?.revert()
    }
  }, [isSplitted])

  return (
      <RenderSwitch 
        condition={type}
        className={className ?? ''}
      >
        {split
        ?
          <TextSplit 
            ref={title}
            input={text}
            isSunset={isSunset}
            onSplitted={() => { 
              onSplitted && onSplitted()
              setIsSplitted(true) 
            }}
          />
        :
          <span>{text}</span>
        }

      </RenderSwitch>
  )
})

type RenderSwitchProps = {
  condition: TitleAnimProps['type'],
  className?: string
}

const RenderSwitch = forwardRef<HTMLHeadingElement | HTMLParagraphElement | HTMLSpanElement, PropsWithChildren<RenderSwitchProps>>(function RenderSwitch({condition, children, className}, ref) {
  switch (condition) {
    case 'h1': return <h1 ref={ref as RefObject<HTMLHeadingElement>} className={`${className ?? ''}`}>{children}</h1>
    case 'h2': return <h2 ref={ref as RefObject<HTMLHeadingElement>} className={`${className ?? ''}`}>{children}</h2>
    case 'h3': return <h3 ref={ref as RefObject<HTMLHeadingElement>} className={`${className ?? ''}`}>{children}</h3>
    case 'h4': return <h4 ref={ref as RefObject<HTMLHeadingElement>} className={`${className ?? ''}`}>{children}</h4>
    case 'h5': return <h5 ref={ref as RefObject<HTMLHeadingElement>} className={`${className ?? ''}`}>{children}</h5>
    case 'h6': return <h6 ref={ref as RefObject<HTMLHeadingElement>} className={`${className ?? ''}`}>{children}</h6>
    case 'p': return <p ref={ref as RefObject<HTMLParagraphElement>}  className={`${className ?? ''}`}>{children}</p>
    case 'none': return <span ref={ref} className={`${className ?? ''}`}>{children}</span>
  }
})