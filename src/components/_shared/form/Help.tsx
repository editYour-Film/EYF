import Image from "next/image"
import HelpIcon from '@/icons/question-mark-square.svg'
import { MentionInteraction } from "../buttons/MentionInteraction"
import { useState } from "react"

export const Help = ({text, label}: {text: string, label:string|undefined}) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div 
      className="relative group w-max h-max z-50"
      onClick={() => {
        setIsOpen(!isOpen)
      }}
    >
      <MentionInteraction 
        className="w-max h-max"
        block
      >
        <HelpIcon className={`w-[20px] h-[20px] svg-color-dashboard-text-description-base-low group-hover:svg-color-dashboard-text-title-white-high ${isOpen && 'svg-color-blueBerry'}`}/>
      </MentionInteraction>
      
      <div 
        className={`absolute bottom-0 right-0 w-max max-w-[300px] p-[2px] rounded-dashboard-mention-radius bg-neutral-02 transition-[transform,_opacity] duration-500 pointer-events-none text-small ${isOpen ? 'opacity-100 translate-y-full' : 'opacity-0 translate-y-[calc(100%-20px)]'}`}
      >
        {text}
      </div>
    </div>
  )
}