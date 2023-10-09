import CloseIcon from '@/icons/dashboard/x.svg'

type tagProps = {
  text: string,
  icon: boolean,
  onClick: () => void,
  bg?: "primary" | "light"
}
export const Tag = ({text, icon, onClick, bg = "primary"}:tagProps) => {
  let bgColor = "bg-primary-middle";
  switch (bg) {
    case "primary":
      bgColor = "bg-primary-middle bg-opacity-40"
      break;
    case "light":
      bgColor = "bg-alphaWhite bg-opacity-10"
      break;
  }

  return (
    <div 
      className={`w-max py-2 px-3 sm:py-3 sm:px-4 md:p-4 flex gap-3 items-center ${bgColor} rounded-2xl`}
    >
      {icon && 
        <div className='rounded-full w-[22px] h-[22px] border border-white'>
          <CloseIcon
            onClick={() => { onClick() }} 
            className="scale-75"
          />
        </div>

      }
      <span>{text}</span>
    </div>
  )
} 