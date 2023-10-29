
type TabMenuProps = {
  label: string,
  Icon: any,
  onClick: () => void,
  disabled?: boolean,
  isMenu?: boolean,
}
export const TabMenu = ({label, Icon, onClick, disabled, isMenu = false}: TabMenuProps) => {
  let bgHover
  switch (isMenu) {
    case true:
      bgHover = 'hover:bg-dashboard-background-content-area hover:text-dashboard-text-title-white-high'
      break;
    case false:
      bgHover = 'hover:bg-dashboard-button-white-default'
      break;
    default:
      break;
  }
  return (
    <button
      className={`group w-full flex items-center justify-between text-dashboard-text-description-base uppercase ${bgHover} gap-5 px-5 py-[10px] w-full rounded-dashboard-mention-radius  transition-colors duration-600 ${disabled ? 'pointer-events-none bg-dashboard-background-content-area text-dashboard-text-disabled' : ''}`}
      onClick={() => {
        onClick && onClick()
      }}
    >
      <div className="w-6 h-6 flex justify-center items-center">
        {<Icon className={`${disabled ? 'svg-color-dashboard-text-disabled' : 'svg-color-dashboard-icon-color-default'} ${isMenu ? 'group-hover:svg-color-soyMilk' : 'group-hover:svg-color-dashboard-icon-color-default'}`}/>}
      </div>
      <div className="w-max">{label}</div>
    </button>
  )
}