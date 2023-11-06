import { ReactNode, useRef, useState } from "react";
import Image from "next/image";
import { Help } from "./Help";
import { EditButton } from "../UI/EditButton";
import { ReactElement } from "react-markdown/lib/react-markdown";

type inputProps = {
  type:
    | "text"
    | "textarea"
    | "email"
    | "password"
    | "search"
    | "checkbox"
    | "radio"
    | "radioColumn"
    | "date"
    | "select"
    | "radio-btn"
    | "switch";
  value?: string | boolean;
  name?: string;
  onChange?: (e: any) => void;
  onKeyDown?: (e: any) => void;
  onBlur?: (e: any) => void;
  label?: string;
  noMargin?: boolean;
  noLabel?: boolean;
  labelType?: undefined | "dashboard";
  placeholder?: string;
  className?: string;
  size?: "sm" | undefined;
  helper?: string;
  helpIconText?: string;
  error?: string | ReactNode;
  bg?: "white" | "black" | "light" | "card" | "underlined" | 'none';
  noBg?: boolean,
  textSunset?: boolean;
  roundedFull?: boolean;
  iconRight?: boolean;
  disabled?: boolean;

  /** text / text-area */
  maxlength?: number | undefined;
  minlength?: number | undefined;

  /** radio / radio-btn / checkbox */
  options?: any;
  selectedOption?: any;

  /** date */
  date?: any;
  setDate?: (e: any) => void;

  /** search */
  datalist?: string;
  searchIcon?: boolean;
};
const Input = ({
  type,
  value = "",
  name = "",
  onChange = () => {},
  onKeyDown = () => {},
  onBlur = () => {},
  label,
  noLabel,
  noMargin,
  labelType,
  placeholder = "",
  className = "",
  size,
  helper,
  helpIconText,
  error,
  bg = "white",
  noBg = false,
  textSunset = false,
  roundedFull = false,
  iconRight,
  disabled,
  /** text */
  maxlength,
  minlength,
  /** radio / checkbox */
  options,
  selectedOption,
  /** date */
  date,
  setDate = () => {},
  /** search */
  datalist,
  searchIcon
}: inputProps) => {
  const [isPassword, setIsPassword] = useState(true);

  const dayRef = useRef<HTMLInputElement>(null);
  const monthRef = useRef<HTMLInputElement>(null);
  const yearRef = useRef<HTMLInputElement>(null);

  let bgOpacity = (bg === 'none' || noBg) ? 'bg-opacity-0 ' : 'bg-opacity-100 '

  const textClass = 'text-dashboard-text-description-base hover:text-dashboard-text-title-white-high group-hover:text-dashboard-text-title-white-high focus-within:text-dashboard-text-title-white-high '

  const inputClass =
    "input-text w-full " +
    (bg !== "underlined"
      ? "px-padding-dashboard-button-separation-spacing "
      : "") +
    (type === "password"
      ? "pr-12 "
      : type === "email"
      ? " "
      : type === "search" && iconRight
      ? "pr-4 "
      : type === "search" && !iconRight
      ? "pl-4 "
      : "") +
    (error ? "border-appleRed " : "") +
    (bg === "white" ? "border bg-white text-alpha-black-600 " : "") +
    (bg === "light" ? "border bg-soyMilk-40 " : "") +
    (bg === "black"
      ? "bg-darkgrey bg-opacity-50 text-white border border-0.5 "
      : "") +
    (bg === "card"
      ? "bg-background-card text-white text-opacity-50 border border-0.5 "
      : "") +
    (bg === "underlined"
      ? "bg-transparent text-dashboard-text-title-white-high placeholder-text-dashboard-text-description-base border-b border-1 hover:border-stroke-dashboard-button-stroke-hover "
      : "") +
    (bg !== "underlined" && (roundedFull ? "rounded-full " : "rounded-lg ")) +
    (size === "sm"
      ? " py-2 min-h-[40px] "
      : " p-dashboard-button-separation-spacing min-h-[52px] ") +
    (disabled === true ? "opacity-50 " : "") +
    textClass +
    bgOpacity +
    className;

  let labelClass;
  if (noLabel) {
    labelClass = "block opacity-0 w-0 h-0 pointer-events-none";
  } else {
    labelClass =
      labelType === "dashboard"
        ? "flex items-center justify-between text-small text-dashboard-text-description-base"
        : " flex flex-wrap justify-between items-center gap-3 text-sm text-dashboard-text-description-base";
  }

  const helperClass = "text-sm text-dashboard-text-description-base-low mt-3 mb-8";

  switch (type) {
    case "text":
      return (
        <div className="flex flex-col gap-dashboard-button-separation-spacing">
          {label && (
            <label className={labelClass}>
              {label}
 
              {helpIconText && <Help text={helpIconText} label={label} />}
            </label>
          )}
          <div className={`relative flex flex-col items-end ${inputClass} focus-within:outline-blueBerry focus-within:outline`}>
            <input
              type="text"
              onChange={onChange}
              onBlur={onBlur}
              className={`bg-transparent w-full h-full ${
                textSunset ? "text-linear-sunset" : ""
              }`}
              value={value as string}
              name={name}
              placeholder={placeholder}
              maxLength={maxlength}
              disabled={disabled}
            />
          </div>

          {maxlength && (
            <div className="input__maxlength ml-auto mr-0 text-xs text-dashboard-text-description-base">{`${
              (value as string).length
            } / ${maxlength}`}</div>
          )}
          {minlength && (
            <div className="input__minlength ml-auto mr-0 text-xs text-dashboard-text-description-base">{`${
              (value as string).length
            } / ${minlength}`}</div>
          )}
          {helper && <p className={helperClass}>{helper}</p>}
          {error && <p className="text-appleRed mt-1.5 ">{error}</p>}
        </div>
      );
    case "textarea":
      return (
        <div className="flex flex-col justify-stretch h-full gap-dashboard-button-separation-spacing">
          {label && (
            <label className={labelClass}>
              {label}

              {helpIconText && <Help text={helpIconText} label={label} />}
            </label>
          )}
          {helper && <p className={helperClass}>{helper}</p>}
          <div
            className={`relative flex flex-col grow items-end ${inputClass} focus-within:outline-blueBerry focus-within:outline`}
          >
            <textarea
              onChange={onChange}
              onBlur={onBlur}
              className="bg-transparent w-full h-full resize-none px-[8px]"
              value={value as string}
              name={name}
              placeholder={placeholder}
              maxLength={maxlength}
              disabled={disabled}
            ></textarea>
          </div>

          {maxlength && (
            <div className="input__maxlength ml-auto mr-0 text-xs text-dashboard-text-description-base">{`${
              (value as string).length
            } / ${maxlength}`}</div>
          )}
          {minlength && (
            <div className="input__minlength ml-auto mr-0 text-xs text-dashboard-text-description-base">{`Minimum ${minlength} caractères ${
              (value as string).length
            } / ${minlength}`}</div>
          )}
          {error && <p className="text-appleRed mt-1.5 ">{error}</p>}
        </div>
      );
    case "email":
      return (
        <div className="flex flex-col justify-stretch h-full gap-dashboard-button-separation-spacing">
          {label && (
            <label className={labelClass}>
              {label}

              {helpIconText && <Help text={helpIconText} label={label} />}
            </label>
          )}
          <div className="relative focus-within:outline-blueBerry focus-within:outline">
            <input
              type="text"
              onChange={onChange}
              onBlur={onBlur}
              className={inputClass}
              value={value as string}
              name={name}
              placeholder={placeholder}
              disabled={disabled}
            />
          </div>
          {helper && <p className={helperClass}>{helper}</p>}
          {error && <p className="text-appleRed mt-1.5 ">{error}</p>}
        </div>
      );
    case "password":
      return (
        <div className="flex flex-col justify-stretch h-full gap-dashboard-button-separation-spacing">
          {label && (
            <label className={labelClass}>
              {label}

              {helpIconText && <Help text={helpIconText} label={label} />}
            </label>
          )}
          <div className="relative">
            <input
              type={isPassword ? "password" : "text"}
              onChange={onChange}
              onBlur={onBlur}
              className={inputClass}
              value={value as string}
              name={name}
              placeholder={placeholder}
              disabled={disabled}
            />
            {isPassword ? (
              <Image
                width={21}
                height={12}
                src="/icons/show-field.svg"
                alt=""
                className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer opacity-70"
                onClick={() => setIsPassword(!isPassword)}
              />
            ) : (
              <Image
                width={21}
                height={12}
                src="/icons/hide-field.svg"
                alt=""
                className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer opacity-70"
                onClick={() => setIsPassword(!isPassword)}
              />
            )}
          </div>
          {helper && <p className={helperClass}>{helper}</p>}
          {error && <p className="text-appleRed mt-1.5 ">{error}</p>}
        </div>
      );
    case "select":
      return (
        <div className="flex flex-col justify-stretch h-full gap-dashboard-button-separation-spacing">
          {label && (
            <label className={labelClass}>
              {label}
  
              {helpIconText && <Help text={helpIconText} label={label} />}
            </label>
          )}
          <div className={`relative flex flex-col items-end`}>
            <select
              title={label}
              onChange={onChange}
              onBlur={onBlur}
              className={`bg-transparent w-full h-full ${inputClass} focus-within:outline-blueBerry focus-within:outline pr-3 ${
                textSunset ? "text-linear-sunset" : ""
              }`}
              value={value as string}
              name={name}
              disabled={disabled}
            >
              <option value="" disabled selected>{placeholder}</option>
              {options.map((opt: ReactElement) => {
                return opt
              })}
            </select>
          </div>

          {maxlength && (
            <div className="input__maxlength ml-auto mr-0 text-xs text-dashboard-text-description-base">{`${
              (value as string).length
            } / ${maxlength}`}</div>
          )}
          {minlength && (
            <div className="input__minlength ml-auto mr-0 text-xs text-dashboard-text-description-base">{`${
              (value as string).length
            } / ${minlength}`}</div>
          )}
          {helper && <p className={helperClass}>{helper}</p>}
          {error && <p className="text-appleRed mt-1.5 ">{error}</p>}
        </div>
      );
    case "search":
      return (
        <div className="flex flex-col justify-stretch h-full gap-dashboard-button-separation-spacing">
          {label && (
            <label className={labelClass}>
              {label}

              {helpIconText && <Help text={helpIconText} label={label} />}
            </label>
          )}
          <div
            className={`relative flex justify-end items-center ${inputClass}`}
          >
            {(!iconRight && searchIcon) && (
              <Image
                width={17}
                height={18}
                src={
                  bg === "white"
                    ? "/icons/search-black.svg"
                    : "/icons/search-white.svg"
                }
                alt=""
                className=""
              />
            )}
            <input
              type="text"
              onChange={onChange}
              onKeyDown={onKeyDown}
              onBlur={onBlur}
              value={value as string}
              name={name}
              placeholder={placeholder}
              className="bg-transparent top-0 left-0 w-full h-full px-dashboard-button-separation-spacing no-widget"
              list={datalist}
              disabled={disabled}
            />
            {(iconRight && searchIcon) && (
              <div className="flex h-full flex-row gap-4">
                <div className="relative align-self-stretch justify-sefl-stretch border-l"></div>
                <Image
                  width={17}
                  height={18}
                  src={
                    bg === "white"
                      ? "/icons/search-black.svg"
                      : "/icons/search-white.svg"
                  }
                  alt=""
                  className=""
                />
              </div>
            )}
          </div>
          {helper && <p className={helperClass}>{helper}</p>}
          {error && <p className="text-appleRed mt-1.5 ">{error}</p>}
        </div>
      );
    case "radio":
      return (
        <div className="flex flex-col justify-stretch h-full gap-dashboard-button-separation-spacing">
          {label && (
            <label className={labelClass}>
              {label}

              {helpIconText && <Help text={helpIconText} label={label} />}
            </label>
          )}
          <div className="flex flex-wrap gap-5 md:gap-10">
            {options?.map((x: any, i: number) => {
              return (
                <div
                  key={i}
                  className="flex group justify-start items-center gap-2.5 "
                >
                  <label 
                    className="flex items-center gap-2 cursor-pointer"
                    tabIndex={1}
                  >
                    <div className="relative">
                      <input
                        type="radio"
                        name={name}
                        className="opacity-0 absolute w-full h-full z-20 cursor-pointer "
                        onClick={() => {
                          onChange(x.value);
                        }}
                        disabled={disabled}
                      />
                      <EditButton
                        selected={selectedOption === x.value}
                      />
                    </div>
                    {x.label}
                  </label>
                </div>
              );
            })}
          </div>
          {helper && <p className={helperClass}>{helper}</p>}
        </div>
      );
    case "radioColumn":
      return (
        <div className="flex flex-col justify-stretch h-full gap-dashboard-button-separation-spacing">
          {label && (
            <label className={labelClass}>
              {label}

              {helpIconText && <Help text={helpIconText} label={label} />}
            </label>
          )}
          {helper && <p className={helperClass}>{helper}</p>}
          <div className="flex flex-col flex-wrap gap-5 md:gap-10">
            {options?.map((x: any, i: number) => {
              return (
                <div
                  key={i}
                  className="flex group justify-start items-center gap-2.5 cursor-pointer"
                >
                  <label className="flex items-start gap-4 cursor-pointer">
                    <div className="relative">
                      <input
                        type="radio"
                        name={name}
                        className="opacity-0 absolute w-full h-full z-20 cursor-pointer "
                        onClick={() => {
                          onChange(x.value);
                        }}
                        disabled={disabled}
                      />
                      <EditButton
                        selected={selectedOption === x.value}
                      />
                    </div>
                    <div className="flex flex-col text-dashboard-text-description-base">
                      {x.label}
                      {x.helper && (
                        <span className="text-sm text-dashboard-text-description-base-low mt-2">
                          {x.helper}
                        </span>
                      )}
                    </div>
                  </label>
                </div>
              );
            })}
          </div>
        </div>
      );
    case "radio-btn":
      return (
        <div className="group flex flex-col justify-stretch h-full gap-dashboard-button-separation-spacing">
          {label && (
            <label className="block opacity-70 font-bold text-lg mb-3">
              {label}
            </label>
          )}
          <div className="flex flex-wrap justify-start items-center gap-5">
            {options?.map((x: any, i: number) => {
              return (
                <button
                  key={i}
                  className={
                    " px-5 py-1 rounded-lg  transition-all duration-200 " +
                    (selectedOption === x.value ? "bg-violet" : "bg-gray-light")
                  }
                  onClick={() => onChange(x.value)}
                  disabled={disabled}
                >
                  {x.label}
                </button>
              );
            })}

            {helpIconText && <Help text={helpIconText} label={label} />}
          </div>
          {helper && <p className={helperClass}>{helper}</p>}
        </div>
      );
    case "date":
      return (
        <div className="flex flex-col justify-stretch h-full gap-dashboard-button-separation-spacing">
          <div className="flex gap-0.5">
            <input
              type="number"
              className="bg-transparent border-0 w-5 text-center"
              value={date.day}
              onChange={(e) => {
                setDate((previousState: any) => ({
                  ...previousState,
                  day: e.target.value,
                }));
                if (e.target.value.length == 2) monthRef.current?.focus();
              }}
              maxLength={2}
              placeholder="__"
              max={31}
              ref={dayRef}
              disabled={disabled}
            />
            /
            <input
              type="number"
              className="bg-transparent border-0 w-5 text-center"
              value={date.month}
              onChange={(e) => {
                setDate((previousState: any) => ({
                  ...previousState,
                  month: e.target.value,
                }));
                if (e.target.value.length == 2) yearRef.current?.focus();
              }}
              maxLength={2}
              placeholder="__"
              max={12}
              ref={monthRef}
              disabled={disabled}
            />
            /
            <input
              type="number"
              className="bg-transparent border-0 w-10 text-center"
              value={date.year}
              onChange={(e) => {
                if (e.target.value.length <= 4)
                  setDate((previousState: any) => ({
                    ...previousState,
                    year: e.target.value,
                  }));
              }}
              maxLength={4}
              placeholder="____"
              ref={yearRef}
              disabled={disabled}
            />
          </div>
          {error && <p className="text-appleRed mt-1.5 ">{error}</p>}
        </div>
      );
    case "switch":
      return (
        <div className="flex flex-col justify-stretch h-full gap-dashboard-button-separation-spacing">
          {label && (
            <label className={labelClass}>
              {label}

              {helpIconText && <Help text={helpIconText} label={label} />}
            </label>
          )}
          <div className="flex rounded-full bg-primary w-min">
            {options?.map((x: any, i: number) => {
              return (
                <button
                  key={i}
                  className={
                    "px-4 py-2 rounded-full font-medium cursor-pointer " +
                    (selectedOption === x.value
                      ? "bg-white text-neutral-900"
                      : "")
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    onChange(x.value);
                  }}
                  disabled={disabled}
                >
                  {x.label}
                </button>
              );
            })}
          </div>
        </div>
      );
    default:
      return <></>;
  }
};

export default Input;
