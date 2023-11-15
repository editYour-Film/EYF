import { PropsWithChildren, useState } from "react"

type DayProps = {
  dayNb: number,
  type?: 'booked' | 'proposed' | 'remaining' | 'inactive',
  precBooked?: boolean,
  nextBooked?: boolean,
  disabled?: boolean,
  onClick?: () => void
}

export const Day = ({dayNb, type = 'remaining', precBooked, nextBooked, disabled, onClick}:PropsWithChildren<DayProps>) => {
  const dayRadius = 'w-[40px] h-[40px] sm:w-[51px] sm:h-[51px]'
  const [_type, set_Type] = useState(type)

  let colors
  switch (_type) {
    case 'proposed':
      colors = `bg-dashboard-success-dark text-dashboard-text-description-base ${!disabled ? 'hover:bg-dashboard-success' : ''}`
      break;
    case 'booked':
      colors = 'bg-dashboard-button-white-hover'
      break;
    case 'remaining':
      colors = `bg-soyMilk-40 text-dashboard-text-description-base ${!disabled ? 'hover:bg-dashboard-button-white-hover' : ''}`
      break;
    case 'inactive':
      colors = 'bg-soyMilk-10 opacity-50'
  }

  return (
    <button 
      className="relative px-[3px] flex items-center justify-center n27 text-[20px] sm:text-[25px] font-[300] tracking-[2px]"
      disabled={disabled || type === 'booked'}
      onClick={() => { 
        onClick && onClick() 
        set_Type(_type === 'proposed' ? 'remaining' : 'proposed')
      }}
    >
      {(precBooked && type === 'booked') && <div className="left-bg absolute left-0 top-0 w-1/2 h-full bg-dashboard-button-island-hover z-0"></div>}
      <div
        className={`relative shrink-0 grow-0 rounded-full ${dayRadius} z-10 overflow-hidden border ${type === 'inactive' ? 'opacity-30' : ''}`}
      >
        <div className={`relative flex items-center justify-center z-10 w-full h-full ${colors}`}>{dayNb}</div>
        {(type === 'booked' || _type === 'proposed') && <div className="absolute top-0 left-0 w-full h-full bg-dashboard-button-island-hover z-0"></div>}
      </div>
      {(nextBooked && type === 'booked') && <div className="left-bg absolute right-0 top-0 w-1/2 h-full bg-dashboard-button-island-hover z-0"></div>}
    </button>
  )
}