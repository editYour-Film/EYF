import { ReactNode, useRef } from "react";

type IslandButtonProps = {
  type: "primary" | "secondary" | "tertiary" | "danger" | "small" | "small-secondary";
  label?: string;
  Icon?: any; //() => JSX.Element,
  IconRight?: any; //() => JSX.Element,
  disabled?: boolean;
  className?: string;
  onClick: (e?:any) => void;
  wmax?: boolean;
  iconColor?: string;
  id?: string;
  children?: ReactNode;
};

export const IslandButton: React.FC<IslandButtonProps> = ({
  type,
  label,
  Icon,
  IconRight,
  disabled = false,
  className,
  onClick,
  wmax = false,
  iconColor = 'soyMilk',
  id,
  children,
}) => {
  const buttonEl = useRef<HTMLButtonElement>(null)
  const baseStyle = `${
    wmax && "w-max"
  } h-max font-medium rounded-full transition-colors duration-200`;

  const focusedStyle = `focus:border-2 focus:border-dashboard-button-focus-stroke focus:-translate-x-[0.5px] focus:-translate-y-[0.5px]`;

  const size = `${
    type === "small" ? "px-dashboard-specific-radius py-dashboard-mention-padding-right-left " : "px-[20px] py-[10px]"
  }`;

  let typeStyle;
  let disabledStyle;
  let iconClass = "svg-color-" + iconColor;

  let iconSize = 'w-[24px] h-[24px]';
  switch (type) {
    case "primary":
      typeStyle = `${
        disabled
          ? "bg-dashboard-button-island-disabled"
          : "bg-dashboard-button-island-BlueBerry-default"
      } ${size} border hover:border-dashboard-button-stroke-hover hover:bg-dashboard-button-island-hover focus:bg-dashboard-button-island-hover`;
      disabledStyle = ``;
      break;
    case "secondary":
      typeStyle = `bg-dashboard-button-dark ${size} border hover:border-dashboard-button-stroke-hover`;
      disabledStyle = ``;
      break;
    case "tertiary":
      typeStyle = `bg-dashboard-button-dark ${size} border hover:border-dashboard-button-stroke-hover`;
      disabledStyle = ``;
      break;
    case "danger":
      typeStyle = `bg-dashboard-button-dark ${size} border text-appleRed hover:bg-dashboard-button-alert hover:border-dashboard-button-stroke-hover`;
      iconColor = "svg-color-appleRed";
      disabledStyle = ``;
      break;
    case "small":
      iconSize = 'w-[20px] h-[20px]';
      typeStyle = `${
        disabled
          ? "bg-background-dashboard-button-dark border"
          : "bg-dashboard-button-white-default "
      } text-small text-dashboard-text-description-base ${size} hover:bg-dashboard-button-white-hover hover:text-dashboard-text-title-white-high focus:bg-dashboard-button-white-hover focus:text-dashboard-text-title-white-high hover:border-dashboard-button-stroke-hover`;
      break;
    case "small-secondary":
      iconSize = 'w-[20px] h-[20px]';
      typeStyle = `bg-dashboard-button-dark border ${
        disabled
          ? "boder-dashboard-button-stroke-disabled"
          : " "
      } text-small text-dashboard-text-description-base ${size} hover:text-dashboard-text-title-white-high focus:text-dashboard-text-title-white-high hover:border-dashboard-button-stroke-hover`;
      break;
  }

  return (
    <button
      ref={buttonEl}
      className={`button ${baseStyle} ${typeStyle} ${focusedStyle} ${
        disabled ? "pointer-events-none " + disabledStyle : ""
      } ${className ?? ""}`}
      onClick={() => {
        buttonEl.current && buttonEl.current.blur()
        onClick();
      }}
      disabled={disabled}
    >
      <div
        className={`button__inner flex justify-center items-center gap-dashboard-mention-padding-right-left ${
          disabled ? "opacity-30" : ""
        }`}
      >
        {Icon && <Icon className={`${iconSize} ${iconClass}`} />}

        {label && 
          <span className={`${type === "secondary" ? "text-linear-sunset" : ""}`}>
            {label}
          </span>
        }

        {IconRight && <IconRight className={`${iconSize} ${iconClass}`} />}
      </div>
    </button>
  );
};
