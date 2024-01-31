type TabWindowProps = {
  label: string,
  disabled?: boolean,
  onClick?: () => void
}

export const TabWindow = ({label, disabled = false, onClick}:TabWindowProps) => {
  return (
    <button
      className={`flex justify-center items-center px-dashboard-button-separation-spacing w-max border-r-03 h-[34px] ${!disabled ? 'bg-dashboard-background-content-area text-dashboard-text-description-base' : 'bg-dashboard-button-dark text-dashboard-text-description-base-low'}  text-small`}
      onClick={() => { onClick && onClick() }}
    >
      {label}
    </button>
  )
}