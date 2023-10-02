import CloseIcon from '@/icons/dashboard/x.svg'

type tagProps = {
  text: string,
  icon: boolean,
  onClick: () => void,
}
export const Tag = ({text, icon, onClick}:tagProps) => {
  return (
    <div 
      className="w-max py-2 px-3 sm:py-3 sm:px-4 md:p-4 flex gap-3 items-center bg-primary-middle bg-opacity-40 rounded-2xl"
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