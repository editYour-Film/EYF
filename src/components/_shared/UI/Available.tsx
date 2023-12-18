import dayjs from "dayjs"

type AvailableProps = {
  isAvailable: boolean,
  nextAvailable: Date
}

export const Available = ({isAvailable, nextAvailable}:AvailableProps) => {
  return (
    <div className="available px-[15px] py-[7.5px] flex flex-row items-center gap-[15px] w-max bg-dashboard-button-dark rounded-dashboard-button-separation-spacing">
      <div className={`w-[18px] h-[18px] rounded-full ${isAvailable ? 'bg-dashboard-success' : 'bg-dashboard-warning'}`}></div>
      <div className="text-small">
        {
          isAvailable 
          ? 'Disponible dès demain'
          : 'Disponible à partir du ' + dayjs(nextAvailable).locale("fr").format('DD MMM')
        }
      </div>
    </div>
  )
}