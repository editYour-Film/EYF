import { QuoteInfos } from "@/components/quote/steps/QuoteInfos"
import React from "react"

type StepperProps = {
  steps: StepProps[]
}

export const Stepper = ({steps}:StepperProps) => {
  return (
    <div className="stepper flex items-center">
      {steps.map((step, i) => {
        return (
          <React.Fragment
            key={i}
          >
            <Step 
              hasNumber={step.hasNumber}
              number={step.number}
              text={step.text}
              state={step.state}
              onClick={step.onClick}
              isPrice={step.isPrice}
            />
            {i !== steps.length - 1 && <hr className="hidden md:block w-[45px]"/>}
          </React.Fragment>
        )
      })}
    </div>
  )
}

export type StepProps = {
  hasNumber: boolean,
  number?: number,
  text: string,
  state: 'default' | 'done' | 'disabled' | 'current',
  isPrice?: boolean,
  onClick: () => void,
}

export const Step = ({hasNumber, number, text, state, isPrice, onClick}:StepProps) => {  
  let textClass: string
  let numberClass: string
  const numberActive = 'text-soyMilk bg-blueBerry'
  const numberDefault = 'text-black bg-soyMilk'

  switch (state) {
    case 'current':
      textClass = 'text-dashboard-text-title-white-high'
      numberClass = numberActive
      break;
    case 'done':
      textClass = 'text-dashboard-text-description-base'
      numberClass = numberActive
      break;
    case 'disabled':
      textClass = 'text-dashboard-text-description-base-low'
      numberClass = numberDefault
      break;
    default:
      textClass = 'text-dashboard-text-description-base'
      numberClass = numberDefault
      break;
  }

  return (
    <button 
      className="step group relative flex items-center border rounded-full bg-blackBerry"
      onClick={() => {
        state === 'done' && onClick()
      }}
      disabled={['disabled', 'default'].includes(state)}
    >
      {hasNumber && <div className={`w-[28px] h-[28px] rounded-full flex justify-center align-center ${numberClass}`}>{number}</div>}
      <div className={`${textClass} flex items-center pl-[10px] pr-[15px] min-h-[28px]`}>{text}</div>

      {isPrice && 
        <div className="absolute top-full pt-[10px] opacity-0 invisible group-hover:group-enabled:visible group-hover:group-enabled:opacity-100 h-max text-left cursor-auto transition-opacity duration-400">
          <QuoteInfos isLight/>
        </div>
      }
    </button>
  )
}