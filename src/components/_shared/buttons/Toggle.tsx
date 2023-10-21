import { ReactNode } from "react";

type ToggleProps = {
  label?: string | ReactNode;
  value?: boolean;
  onChange: (value: boolean) => void,
  className?: string;
}

export const Toggle = ({label, value, onChange, className}:ToggleProps) => {

  const handleToggle = () => {
    onChange(value ? !value : true)
  }

  return (
    <div 
      className={`toggle flex items-center justify-between ${className}`}
      onClick={() => { handleToggle()}}
    >
      {label && <div className={`${value ? 'text-dashboard-text-title-white-high' : 'text-dashboard-text-description-base-low'}`}>{label}</div>}

      <div className={`toggle__bg shrink-0 w-14 h-7 box-content rounded-full border-2 ${value ? 'bg-blueBerry border-blueBerry' : 'bg-dashboard-button-island-disabled border-dashboard-button-island-disabled'}`}>
        <div className={`toggle__button w-7 h-7 bg-soyMilk rounded-full transition-transform duration-300 ${value ? 'translate-x-full' : ''}`}></div>
      </div>
    </div>
  )
}