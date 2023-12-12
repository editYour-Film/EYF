import { useEffect, useRef, useState } from "react";
import { helperClass } from "./Input";
import Chevron from "@/icons/chevron.svg";
import { optionInterface } from "./DropdownV2";

type SelectProps = {
  search?: boolean;
  placeholder: string;
  label: string;
  helperTop?: string;
  list: optionInterface[] | undefined;
  onAdd?: (val: string) => void;
  onSelectOption: (val: string) => void;
};

export const Select = ({
  search = false,
  placeholder,
  label,
  helperTop,
  list,
  onAdd,
  onSelectOption,
}: SelectProps) => {
  const [value, setValue] = useState<string>("");
  const [visibleItems, setVisibleItems] = useState(list);

  const inputRef = useRef<HTMLInputElement>(null);

  const id = "addAndSearch" + Math.random();

  useEffect(() => {
    setVisibleItems(list);
  }, [list]);

  const handleKeyDown = (e: any) => {
    if (e.code === "Enter") {
      e.preventDefault();
      onAdd && onAdd(value);
    }
  };

  const handleSearch = (q: string) => {
    list &&
      setVisibleItems(
        list.filter((i) =>
          i.label.toLowerCase().includes(q.toLowerCase() as string)
        )
      );
  };

  const handleItemClick = (value: string) => {
    document.activeElement && (document.activeElement as HTMLElement).blur();
    onSelectOption(value);
  };

  useEffect(() => {
    handleSearch(value);
  }, [value]);

  return (
    <div className="group relative focus-within:z-20">
      <label
        htmlFor={id}
        className="block text-dashboard-text-description-base text-small mb-dashboard-button-separation-spacing"
      >
        {label}
      </label>
      {helperTop && (
        <p className={helperClass + " mb-dashboard-button-separation-spacing"}>
          {helperTop}
        </p>
      )}

      <div
        tabIndex={0}
        className={`flex flex-row justify-between items-center input-text w-full px-padding-dashboard-button-separation-spacing border rounded-lg p-dashboard-button-separation-spacing min-h-[52px] text-dashboard-text-description-base hover:text-dashboard-text-title-white-high group-hover:text-dashboard-text-title-white-high focus-within:text-dashboard-text-title-white-high bg-opacity-100 relative bg-transparent focus-within:outline-blueBerry focus-within:outline z-10`}
      >
        {search ? (
          <input
            ref={inputRef}
            id={id}
            type="text"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
            onKeyDown={(e) => {
              handleKeyDown(e);
            }}
            placeholder={placeholder}
            className="bg-transparent w-full h-full"
          />
        ) : (
          <div tabIndex={0}>{value ? value : placeholder}</div>
        )}

        <Chevron className="rotate-90 w-[15px] h-[15px]" />
      </div>

      <div
        lenis-prevent
        className={`absolute top-full w-full bg-dashboard-background-content-area group-focus-within:border rounded-b-dashboard-button-square-radius h-0 overflow-hidden  ${
          visibleItems && visibleItems.length > 0
            ? "group-focus-within:h-auto group-focus-within:p-dashboard-button-separation-spacing max-h-[130px] group-focus-within:overflow-scroll"
            : ""
        } no-scroll-bar`}
      >
        {visibleItems &&
          visibleItems.length > 0 &&
          visibleItems.map((item, i) => {
            return (
              <button
                key={i}
                onClick={() => {
                  handleItemClick(item.id as string);
                }}
                className={`block 
                  w-full text-left hover:bg-dashboard-button-white-hover`}
              >
                {item.label}
              </button>
            );
          })}
      </div>

      <input type="hidden" />
    </div>
  );
};
