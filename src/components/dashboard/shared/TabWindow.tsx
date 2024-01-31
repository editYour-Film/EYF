type TabWindowProps = {
  label: string,
  disabled?: boolean,
  locked?: boolean,
  onClick?: () => void
}

export const TabWindow = ({label, disabled = false, locked, onClick}:TabWindowProps) => {
  return (
    <button
      className={`flex justify-center items-center px-dashboard-button-separation-spacing w-max border-r-03 h-[34px] ${!disabled ? 'bg-dashboard-background-content-area text-dashboard-text-description-base' : 'bg-dashboard-button-dark text-dashboard-text-description-base-low'}  text-small`}
      disabled={locked}
      onClick={() => { 
        (onClick && !locked) && onClick()
      }}
    >
      {label}
    </button>
  )
}