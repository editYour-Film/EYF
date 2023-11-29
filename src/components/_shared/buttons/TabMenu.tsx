
type TabMenuProps = {
  label: string,
  Icon?: any,
  IconRight?: any,
  onClick: () => void,
  disabled?: boolean,
  isMenu?: boolean,
  isSidebar?: boolean,
  isActive?: boolean,
  regularCase?: boolean,
  className?: string
}
export const TabMenu = ({label, Icon, IconRight, onClick, disabled, isMenu = false, isSidebar = false, isActive, regularCase, className}: TabMenuProps) => {
  let baseStyle = 'text-dashboard-text-description-base'

  let bgHover
  let activeState
  switch (isMenu) {
    case true:
      bgHover = 'hover:bg-dashboard-background-content-area hover:text-dashboard-text-title-white-high'
      activeState = 'bg-dashboard-background-content-area text-dashboard-text-title-white-high'
      break;
    case false:
      bgHover = 'hover:bg-dashboard-button-white-default'
      activeState = 'bg-dashboard-button-white-default'
      break;
    default:
      break;
  }

  console.log(isSidebar);
  

  let size = isSidebar ? 'p-[5px] text-title-M text-[18px] leading-none' : 'px-dashboard-button-separation-spacing py-[8px] text-title-M'

  const svgColor = isActive ? 'svg-color-soyMilk' : 'svg-color-dashboard-icon-color-default'
  return (
    <button
      className={`group w-full gap-5 flex items-center justify-between ${size} ${isActive ? activeState : baseStyle} ${regularCase ? '' : 'uppercase'} ${bgHover} rounded-dashboard-mention-radius transition-colors duration-600 ${disabled ? 'pointer-events-none bg-dashboard-background-content-area text-dashboard-text-disabled' : ''} ${className ?? ''}`}
      onClick={() => {
        onClick && onClick()
      }}
    >
      {Icon && 
        <div className="w-[18px] h-[18px] flex justify-center items-center">
          <Icon 
            className={`w-full h-full ${disabled ? 'svg-color-dashboard-text-disabled' : svgColor} ${isMenu ? 'group-hover:svg-color-soyMilk' : 'group-hover:svg-color-dashboard-icon-color-default'}`}
          />
        </div>
      }
      <div className="w-max">{label}</div>
      {IconRight && 
          <div className="w-[18px] h-[18px] flex justify-center items-center">
            <IconRight 
              className={`w-full h-full ${disabled ? 'svg-color-dashboard-text-disabled' : svgColor} ${isMenu ? 'group-hover:svg-color-soyMilk' : 'group-hover:svg-color-dashboard-icon-color-default'}`}
            />
          </div>
      }
    </button>
  )
}