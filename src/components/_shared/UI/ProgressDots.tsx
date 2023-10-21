import { StepBubble, StepBubbleProps } from "../buttons/StepBubble"

type ProgressDotsProps = {
dots: StepBubbleProps[]
}

export const ProgressDots = ({dots}: ProgressDotsProps) => {
  return (
    <div className="progress-dots flex gap-[4.5px]">
      {dots.map((dot, i) => {
        return <StepBubble key={i} onClick={dot.onClick} selected={dot.selected} />
      })} 
    </div>
  )
 }