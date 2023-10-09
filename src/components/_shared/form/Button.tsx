import Image from "next/image";
import { TextSplit } from "@/utils/TextSplit";
import { useDispatch } from "react-redux";
import { toClick, toRegular } from "@/store/slices/cursorSlice";
import { landings } from "@/routes";
import { useRouter } from 'next/router';

type buttonProps = {
  variant?: "primary" | "secondary" | "black" | "light" | "dark";
  text: string;
  size?: "xs" | "sm" | "lg";
  onClick?: () => void;
  disabled?: boolean;
  icon?: "menu" | "arrow-left" | "arrow-right" | "arrow-down" | "google" | "apple" | "cross";
  iconLeft?: boolean;
  iconRight?: boolean;
  className?: string;
  borderRadiusSm?: boolean;
  id?: string;
};

const Button = ({
  variant = "primary",
  text,
  size = "sm",
  onClick,
  disabled,
  icon,
  iconLeft,
  iconRight,
  className = "",
  id = "",
  borderRadiusSm,
}: buttonProps) => {

  const router = useRouter()
  const enableTwist = landings.includes(router.pathname)
  const dispatch = useDispatch();
  
  let sizeClass = "h-10 md:h-16 md:text-xl md:px-12"
  switch (size) {
    case 'sm':
      sizeClass = 'h-10'
      break;
    case 'xs':
      sizeClass = ''
      break;
  }
  const buttonClass =
    `border ${borderRadiusSm ? 'rounded-lg' : 'rounded-full'} w-full ${sizeClass} text-white  px-5 flex items-center justify-center gap-2.5 transition-all duration-500`

  const Icon = () => {
    switch (icon) {
      case "menu":
        return <Image src="/icons/bars.svg" width="15" height="10" alt="" />;
      case "arrow-left":
        return (
          <Image
            src="/icons/right-arrow-white.svg"
            width="30"
            height="20"
            alt=""
            className="rotate-180"
          />
        );
      case "arrow-right":
        return (
          <Image
            src="/icons/right-arrow-white.svg"
            width="30"
            height="20"
            alt=""
          />
        );
      case "arrow-down":
        return (
          <Image
            src="/icons/arrow-down-circle.svg"
            width="20"
            height="20"
            alt=""
          />
        );
      case "google":
        return (
          <Image
            src="/icons/google.svg"
            width="20"
            height="20"
            alt=""
          />
        );
      case "apple":
        return (
          <Image
            src="/icons/apple.svg"
            width="20"
            height="20"
            alt=""
            className="relative -top-[3px]"
          />
        );
      case "cross":
        return (
          <Image
            src="/icons/dashboard/x.svg"
            width="20"
            height="20"
            alt=""
            className="relative"
          />
        );
      default:
        return <></>;
    }
  };

  switch (variant) {
    case "primary":
      return (
        <button
          type="button"
          className={
            buttonClass +
            (disabled ? " bg-primary-300 " : " bg-violet ") +
            className +
            " anim-cta"
          }
          disabled={disabled}
          onClick={onClick ? onClick : () => {}}
          onMouseEnter={() => {
            dispatch(toClick());
          }}
          onMouseLeave={() => {
            dispatch(toRegular());
          }}
          id={id}
        >
          {iconLeft && <Icon />} {enableTwist ? <TextSplit input={text} type="word" noLH /> : <span>{text}</span>}{" "}
          {iconRight && <Icon />}
        </button>
      );
    case "secondary":
      return (
        <button
          type="button"
          className={
            buttonClass + " bg-transparent hover:border-white " + className
          }
          disabled={disabled}
          onClick={onClick ? onClick : () => {}}
          onMouseEnter={() => {
            dispatch(toClick());
          }}
          onMouseLeave={() => {
            dispatch(toRegular());
          }}
        >
          {iconLeft && <Icon />} {text} {iconRight && <Icon />}
        </button>
      );
    case "black":
      return (
        <button
          type="button"
          className={buttonClass + " bg-black hover:border-white " + className}
          disabled={disabled}
          onClick={onClick ? onClick : () => {}}
          onMouseEnter={() => {
            dispatch(toClick());
          }}
          onMouseLeave={() => {
            dispatch(toRegular());
          }}
        >
          {iconLeft && <Icon />} {text} {iconRight && <Icon />}
        </button>
      );
    case "dark":
      return (
        <button
          type="button"
          className={buttonClass + " bg-darkgrey bg-opacity-50 hover:border-white " + className}
          disabled={disabled}
          onClick={onClick ? onClick : () => {}}
          onMouseEnter={() => {
            dispatch(toClick());
          }}
          onMouseLeave={() => {
            dispatch(toRegular());
          }}
        >
          <span className="relative z-20 flex gap-3">{iconLeft && <Icon />} {text} {iconRight && <Icon />}</span>
        </button>
      );
    case "light":
      return (
        <button
          type="button"
          className={buttonClass + " bg-white border-white bg-opacity-10 hover:bg-opacity-40 " + className}
          disabled={disabled}
          onClick={onClick ? onClick : () => {}}
          onMouseEnter={() => {
            dispatch(toClick());
          }}
          onMouseLeave={() => {
            dispatch(toRegular());
          }}
        >
          <span className="relative z-20 flex gap-3 items-center">{iconLeft && <Icon />} {text} {iconRight && <Icon />}</span>
        </button>
      );
  }
};

export default Button;
