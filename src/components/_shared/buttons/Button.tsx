type ButtonProps = {
  type: "primary" | "secondary";
  label: string;
  Icon?: any; //() => JSX.Element,
  disabled?: boolean;
  className?: string;
  onClick: () => void;
};

export const Button: React.FC<ButtonProps> = ({
  type,
  label,
  Icon,
  disabled = false,
  className,
  onClick,
}: ButtonProps) => {
  const baseStyle = `h-[52px] flex justify-center items-center gap-dashboard-specific-radius px-dashboard-specific-radius border text-dashboard-text-button-white-contrast-low rounded-dashboard-button-square-radius transition-colors duration-200`;
  let disabledStyle = `pointer-events-none text-dashboard-text-disabled`;

  let typeStyle;
  switch (type) {
    case "primary":
      typeStyle = `bg-dashboard-button-dark border-dashboard-button-stroke-default hover:border-dashboard-button-stroke-hover`;
      break;
    case "secondary":
      typeStyle = `bg-dashboard-button-white-default border-dashboard-button-dark-border hover:bg-dashboard-button-white-hover focus:bg-dashboard-button-white-hover`;
      break;
  }

  return (
    <button
      className={`button ${baseStyle} ${typeStyle} ${
        disabled ? disabledStyle : ""
      } ${className ?? ""}`}
      onClick={() => {
        onClick();
      }}
      disabled={disabled}
    >
      {Icon && (
        <Icon
          className={`${disabled ? "svg-color-dashboard-text-disabled" : ""}`}
        />
      )}

      {label}
    </button>
  );
};
