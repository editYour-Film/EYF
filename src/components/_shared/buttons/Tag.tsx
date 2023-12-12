import CloseIcon from '@/icons/dashboard/x.svg'
import { forwardRef } from 'react';
import Image from 'next/image'

type TagProps = {
  text: string,
  onClick?: (e?:any) => void,
  bg?: "primary" | "light",
  hoverColor?: string,
  className?: string,
  active?: boolean,
  wFull?: boolean,
  selected?: boolean,
  noHover?: boolean,
}
export const Tag = forwardRef<HTMLButtonElement, TagProps>(function Tag ({text, onClick = null, selected, noHover, className, active = 'true', wFull}, ref) {
  let baseStyle = `text-dashboard-text-description-base text-base outline-offset-0 transition-colors duration-400`

  let bgColor = `bg-dashboard-background-content-area border border-transparent `;

  let selectedClass = 'bg-dashboard-button-dark border-dashboard-button-stroke-default border '

  let hoverClass = `${!noHover ? 'hover:bg-dashboard-button-dark hover:border hover:border-dashboard-button-stroke-hover' : ''}`

  let sizeClass = 'px-dashboard-specific-radius py-[5px] rounded-dashboard-button-square-radius'

  return (
    <button
      ref={ref}
      className={`${baseStyle} ${hoverClass} ${wFull ? 'w-full' : 'w-max'} ${sizeClass} group flex gap-3 items-center ${active ? 'block' : 'hidden'} ${selected ? selectedClass : bgColor} ${className ?? ''} focus-visible:outline-blueBerry`}
      onClick={ (e) => {
        onClick && onClick(e)
      }}
    >
      <div className={`w-max font-[400]`}>{text}</div>
    </button>
  )
} )