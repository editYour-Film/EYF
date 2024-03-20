import { TextSplit } from "@/utils/TextSplit";
import {
  PropsWithChildren,
  ReactNode,
  RefObject,
  forwardRef,
  useEffect,
  useRef,
} from "react";

import Light from "@/img/svg/buttonLight.svg";
import gsap from "gsap";
import { useWindowSize } from "@uidotdev/usehooks";

import Link from "next/link";

export type IslandButtonProps = {
  type:
    | "main"
    | "primary"
    | "secondary"
    | "tertiary"
    | "danger"
    | "small"
    | "small-secondary"
    | "small-solid";
  label?: string;
  Icon?: any; //() => JSX.Element,
  IconRight?: any; //() => JSX.Element,
  disabled?: boolean;
  className?: string;
  onClick?: (e?: any) => void;
  wmax?: boolean;
  iconColor?: string;
  enableTwist?: boolean;
  href?: string;
  id?: string;
  children?: ReactNode;
  submit?: boolean;
};

export const IslandButton = forwardRef<
  HTMLButtonElement,
  PropsWithChildren<IslandButtonProps>
>(function IslandButton(
  {
    type,
    label,
    Icon,
    IconRight,
    disabled = false,
    className,
    onClick,
    wmax = false,
    iconColor = "soyMilk",
    enableTwist,
    href,
    id,
    children,
    submit,
  },
  ref
) {
  const buttonEl =
    (ref as RefObject<HTMLButtonElement>) ?? useRef<HTMLButtonElement>(null);
  const mainLight = useRef<HTMLDivElement>(null);

  const wSize = typeof window !== "undefined" ? useWindowSize() : undefined;

  const baseStyle = `${
    wmax && "w-max"
  } h-max rounded-full transition-colors duration-200 shadow-1`;

  let size;
  if (type === "small") {
    size =
      "px-dashboard-specific-radius py-dashboard-mention-padding-right-left ";
  } else if (type === "main") {
    size = "px-[30px] py-[15px]";
  } else {
    size = "px-[20px] py-[10px]";
  }

  let typeStyle;
  let disabledStyle;
  let iconClass = "svg-color-" + iconColor;

  let iconSize = "w-[24px] h-[24px]";
  switch (type) {
    case "main":
      typeStyle = `${
        disabled
          ? "bg-dashboard-button-island-disabled"
          : "bg-dashboard-button-island-BlueBerry-default"
      } ${size} border hover:enabled:border-dashboard-button-stroke-hover`;
      disabledStyle = ``;
      break;
    case "primary":
      typeStyle = `${
        disabled
          ? "bg-dashboard-button-island-disabled"
          : "bg-dashboard-button-island-BlueBerry-default"
      } ${size} border hover:enabled:border-dashboard-button-stroke-hover hover:enabled:bg-dashboard-button-island-hover focus:enabled:bg-dashboard-button-island-hover`;
      disabledStyle = ``;
      break;
    case "secondary":
      typeStyle = `bg-dashboard-button-dark ${size} border hover:enabled:border-dashboard-button-stroke-hover`;
      disabledStyle = ``;
      break;
    case "tertiary":
      typeStyle = `bg-dashboard-button-dark ${size} border hover:enabled:border-dashboard-button-stroke-hover`;
      disabledStyle = ``;
      break;
    case "danger":
      typeStyle = `bg-dashboard-button-dark ${size} border text-appleRed hover:enabled:bg-dashboard-button-alert hover:enabled:border-dashboard-button-stroke-hover`;
      iconColor = "svg-color-appleRed";
      disabledStyle = ``;
      break;
    case "small":
      iconSize = "w-[20px] h-[20px]";
      typeStyle = `${
        disabled
          ? "bg-background-dashboard-button-dark border"
          : "bg-dashboard-button-white-default border border-transparent"
      } text-small text-dashboard-text-description-base ${size} hover:enabled:bg-dashboard-button-white-hover hover:enabled:text-dashboard-text-title-white-high focus:bg-dashboard-button-white-hover focus:text-dashboard-text-title-white-high hover:enabled:border-dashboard-button-stroke-hover`;
      break;
    case "small-solid":
      iconSize = "w-[20px] h-[20px]";
      typeStyle = `${
        disabled
          ? "bg-background-dashboard-button-dark border"
          : "bg-dashboard-button-white-default-solid border border-transparent"
      } text-small text-dashboard-text-description-base ${size} hover:enabled:bg-dashboard-button-white-hover hover:enabled:text-dashboard-text-title-white-high focus:bg-dashboard-button-white-hover focus:text-dashboard-text-title-white-high hover:enabled:border-dashboard-button-stroke-hover`;
      break;
    case "small-secondary":
      iconSize = "w-[20px] h-[20px]";
      typeStyle = `bg-dashboard-button-dark border ${
        disabled ? "boder-dashboard-button-stroke-disabled" : " "
      } text-small text-dashboard-text-description-base ${size} hover:enabled:text-dashboard-text-title-white-high focus:text-dashboard-text-title-white-high hover:enabled:border-dashboard-button-stroke-hover`;
      break;
  }

  const startOffsetX = useRef<number | undefined>(0);
  const startOffsetY = useRef<number | undefined>(0);

  const setVars = () => {
    setTimeout(() => {
      const bcr = buttonEl.current && buttonEl.current.getBoundingClientRect();
      startOffsetX.current = bcr?.x;
      startOffsetY.current = bcr?.y;

      mainLight.current &&
        gsap.set(mainLight.current, {
          x: buttonEl.current?.offsetWidth
            ? buttonEl.current?.offsetWidth / 2
            : 0,
          xPercent: -50,
          scaleX: 1,
        });
    }, 100);
  };

  useEffect(() => {
    setVars();
  }, []);

  useEffect(() => {
    setVars();
  }, [wSize]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const moveX = startOffsetX.current ? e.clientX - startOffsetX.current : 0;
    const buttonWidth = buttonEl.current?.offsetWidth ?? 0;

    const borderRatio = Math.abs(moveX - buttonWidth / 2) / (buttonWidth / 2);

    mainLight.current &&
      gsap.to(mainLight.current, {
        x: moveX,
        scaleX: 1 - 0.5 * borderRatio,
      });
  };

  const handleMouseLeave = () => {
    gsap.to(mainLight.current, {
      x: buttonEl.current?.offsetWidth ? buttonEl.current?.offsetWidth / 2 : 0,
      xPercent: -50,
      scaleX: 1,
    });
  };

  if (type === "main") {
    return (
      <ConditionnalLink condition={href} className={className}>
        <div
          className={`relative group ${!href && className ? className : ""}`}
        >
          <button
            ref={buttonEl}
            className={`button relative ${
              enableTwist ? "anim-cta" : ""
            } ${baseStyle} ${typeStyle} ${
              disabled ? "pointer-events-none " + disabledStyle : ""
            } focus-visible:outline-soyMilk text-soyMilk font-medium z-10`}
            onClick={() => {
              buttonEl.current && buttonEl.current.blur();
              onClick && onClick();
            }}
            disabled={disabled}
            onMouseMove={(e: React.MouseEvent) => {
              type === "main" && handleMouseMove(e);
            }}
            onMouseLeave={() => {
              handleMouseLeave();
            }}
            type={submit ? "submit" : "button"}
          >
            <div
              className={`button__inner flex justify-center items-center gap-dashboard-mention-padding-right-left ${
                disabled ? "opacity-30" : ""
              }`}
            >
              {Icon && <Icon className={`${iconSize} ${iconClass}`} />}

              {label && enableTwist ? (
                <TextSplit input={label} type="word" noLH />
              ) : label ? (
                <span>{label}</span>
              ) : (
                <></>
              )}

              {IconRight && (
                <IconRight className={`${iconSize} ${iconClass}`} />
              )}
            </div>
          </button>

          <div
            ref={mainLight}
            aria-hidden
            className="button__main-deco absolute w-[180%] pointer-events-none top-1/2 -translate-y-1/2 z-0 transition-opacity duration-700 opacity-70 group-hover:opacity-100"
          >
            <Light className="w-full h-full overflow-visible" />
          </div>
        </div>
      </ConditionnalLink>
    );
  } else {
    return (
      <ConditionnalLink condition={href} className={className}>
        <button
          ref={buttonEl}
          className={`button ${
            enableTwist ? "anim-cta" : ""
          } ${baseStyle} ${typeStyle} ${
            disabled ? "pointer-events-none " + disabledStyle : ""
          } ${className ?? ""} ${
            type === "primary"
              ? "focus-visible:outline-soyMilk"
              : "focus-visible:outline-blueBerry"
          } z-10`}
          onClick={() => {
            buttonEl.current && buttonEl.current.blur();
            onClick && onClick();
          }}
          disabled={disabled}
        >
          <div
            className={`button__inner flex justify-center items-center gap-dashboard-mention-padding-right-left ${
              disabled ? "opacity-30" : ""
            }`}
          >
            {Icon && <Icon className={`${iconSize} ${iconClass}`} />}

            {label && enableTwist ? (
              <TextSplit input={label} type="word" noLH />
            ) : label ? (
              <span
                className={`${
                  type === "secondary" ? "inline-block text-linear-sunset" : ""
                }`}
              >
                {label}
              </span>
            ) : (
              <></>
            )}

            {IconRight && <IconRight className={`${iconSize} ${iconClass}`} />}
          </div>
        </button>
      </ConditionnalLink>
    );
  }
});

type ConditionnalLinkProps = {
  condition: string | undefined;
  className?: string;
};

const ConditionnalLink = ({
  condition,
  className,
  children,
}: PropsWithChildren<ConditionnalLinkProps>) => {
  if (condition)
    return (
      <Link href={condition} className={className}>
        {" "}
        {children}{" "}
      </Link>
    );
  else return <>{children}</>;
};
