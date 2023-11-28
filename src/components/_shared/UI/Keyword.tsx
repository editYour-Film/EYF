import CloseIcon from '@/icons/dashboard/x.svg'
import { forwardRef } from 'react';
import Image from 'next/image'

type keywordProps = {
  text: string,
  icon?: string,
  noCross?: boolean,
  onClick?: (e?:any) => void,
  onClose?: () => void,
  bg?: "primary" | "light",
  hoverColor?: string,
  className?: string,
  active?: boolean,
  wFull?: boolean,
  size?: 'sm',
  height?: boolean,
  selected?: boolean,
  noHover?: boolean,
}
export const Keyword = forwardRef<HTMLButtonElement, keywordProps>(function Tag ({text, icon = '', noCross, onClick = null, onClose = null, selected, noHover, className, active = 'true', size, height, wFull}, ref) {
  let baseStyle = `text-dashboard-text-description-base text-base border`

  let bgColor = `bg-dashboard-button-white-default border-transparent`;

  let selectedClass = 'bg-dashboard-button-dark border-dashboard-button-stroke-default'

  let hoverClass = `${!noHover ? 'hover:bg-dashboard-button-dark hover:border hover:border-dashboard-button-stroke-hover' : ''}`

  let sizeClass = 'p-dashboard-button-separation-spacing rounded-dashboard-button-separation-spacing'
  switch (size) {
    case "sm":
      sizeClass = "p-dashboard-mention-padding-right-left pr-[38px] rounded-lg"
      break;
  }

  return (
    <button
      ref={ref}
      className={`${baseStyle} ${hoverClass} ${wFull ? 'w-full' : 'w-max'} ${height ? `h-[36px] px-[16px] rounded-dashboard-button-square-radius` : sizeClass} group flex gap-3 items-center ${active ? 'block' : 'hidden'} ${selected ? selectedClass : bgColor} ${className ?? ''} focus-visible:outline-blueBerry`}
      onClick={ (e) => {
        switch (selected) {
          case false:
            onClick && onClick(e)
            break;
          case true:
            onClose && onClose()
            break;
        }
      }}
    >
      {(icon || selected && !noCross) && 
        <div className='rounded-full left-dashboard-mention-padding-right-left w-[22px] h-[22px] border border-white hover:border-appleRed overflow-hidden'>
          { (icon === 'cross' || selected) && <CloseIcon
            onClick={(e:MouseEvent) => { 
              e.stopPropagation()
              onClose && onClose() 
            }} 
            className="scale-75 hover:svg-color-appleRed cursor-pointer"
          />
          }
          {
            (icon && icon !== 'cross' && !selected) &&
            <Image 
              src={icon}
              alt={''}
              width={20}
              height={20}
            />
          }
        </div>
      }
      <div className={`w-max font-[400]`}>{text}</div>
    </button>
  )
} )