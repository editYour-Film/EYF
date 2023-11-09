import { PropsWithChildren } from "react"

type DayProps = {
  dayNb: number,
  type?: 'booked' | 'proposed' | 'ramaining' | 'inactive',
  precBooked?: boolean,
  nextBooked?: boolean,
  disabled?: boolean
}

export const Day = ({dayNb, type = 'ramaining', children, precBooked, nextBooked, disabled}:PropsWithChildren<DayProps>) => {

  const dayRadius = 'w-[51px] h-[51px]'

  let colors
  switch (type) {
    case 'proposed':
      colors = 'bg-dashboard-success-dark'
      break;
    case 'booked':
      colors = 'bg-dashboard-button-white-hover'
      break;
    case 'ramaining':
      colors = 'bg-soyMilk-40'
      break;
    case 'inactive':
      colors = 'bg-soyMilk-10 opacity-50'
  }

  return (
    <div className="relative px-[3px] flex items-center justify-center">
      {(precBooked && type === 'booked') && <div className="left-bg absolute left-0 top-0 w-1/2 h-full bg-dashboard-button-island-hover z-0"></div>}
      <div
        className={`relative shrink-0 grow-0 rounded-full ${dayRadius} z-10 overflow-hidden border`}
      >
        <div className={`relative flex items-center justify-center z-10 w-full h-full ${colors}`}>{dayNb}</div>
        {(type === 'booked' || type === 'proposed') && <div className="absolute top-0 left-0 w-full h-full bg-dashboard-button-island-hover z-0"></div>}
      </div>
      {(nextBooked && type === 'booked') && <div className="left-bg absolute right-0 top-0 w-1/2 h-full bg-dashboard-button-island-hover z-0"></div>}
    </div>
  )
}