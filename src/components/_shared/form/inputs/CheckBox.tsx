import React, { ReactNode } from "react"

interface checkboxType extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string | ReactNode,
  className: string
}

export const Checkbox = ({label, className, ...rest}:checkboxType) => {

  return (
    <div className={`checkbox ${className ?? ''}`}>
      <label className={`group relative flex flex-row gap-[10px] items-baseline cursor-pointer`}>
        <input
          type="checkbox"
          className="absolute visually-hidden peer"
        />
        <span 
          className="shrink-0 w-[20px] h-[20px] rounded-[6px] bg-dashboard-button-white-hover peer-checked:bg-blueBerry group-hover:bg-neutral-02 translate-y-1/4 overflow-hidden after:opacity-0 after:block after:w-[20px] after:h-[20px] after:z-20 after:bg-checkmark after:bg-cover peer-checked:after:opacity-100 after:transition-opacity after:duration-200">
        </span>
        {label}
      </label>
    </div>
  )
}