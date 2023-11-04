import { createRef, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Tag } from "../UI/Tag";

export type optionInterface = {
  label: string;
  id?: string;
  icon?: string;
};

type DropdownProps = {
  label: string;
  title: string;
  onChange: (option: optionInterface[]) => void;
  className?: string;
  options: optionInterface[] | undefined;
  selected?: optionInterface[];
  mandatory?: optionInterface[];
  open?: boolean;
};

export const Dropdown = ({
  label,
  title,
  onChange,
  options,
  selected = [],
  mandatory,
  open,
  className = "",
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(open ?? false);
  const [isTweening, setIsTweening] = useState(false);

  const [enableSearch, setEnableSearch] = useState(false);

  const [currentOptions, setCurrentOptions] = useState(options);
  const [selectedOption, setSelectedOption] = useState<number | undefined>(
    undefined
  );

  const dropdown = useRef<HTMLDivElement>(null);
  const dropdownOptions = useRef<HTMLDivElement>(null);
  const dropdownOptionsInner = useRef<HTMLDivElement>(null);
  const optionslist = useRef<HTMLDivElement>(null);
  const optionsRef = useRef<any>(null);
  const button = useRef<HTMLDivElement>(null);

  optionsRef.current = options?.map(() => createRef());

  const handleToogleDropdown = () => {
    if (!isTweening && !open) {
      setIsOpen(!isOpen);
    }
  };

  useEffect(() => {
    if (open) {
      handleOpenDropdown(true, true);
    } else {
      const handleClickOutside = (e: any) => {
        if (dropdown.current && !dropdown.current.contains(e.target)) {
          setIsOpen(false);
        }
      };

      window.addEventListener("click", handleClickOutside, true);
      return () => {
        window.removeEventListener("click", handleClickOutside, true);
      };
    }
  }, []);

  const handleOpenDropdown = (isOpen: boolean, immediate = false) => {
    const ctx = gsap.context(() => {
      if (!isOpen) {
        searchInput.current!.value = "";
        setSelectedOption(undefined);
      }

      const tl = gsap.timeline({
        paused: true,
        onStart: () => {
          setIsTweening(true);
          if (isOpen) {
            setEnableSearch(true);
          }
        },
        onComplete: () => {
          setIsTweening(false);
          if (!isOpen) {
            handleSearch("");
            setEnableSearch(false);
          }
        },
      });

      tl.fromTo(
        dropdownOptions.current,
        {
          yPercent: isOpen ? -100 : 0,
        },
        {
          yPercent: isOpen ? 0 : -100,
          duration: !immediate ? 0.5 : 0,
          ease: "power3.inOut",
        },
        0
      );

      tl.fromTo(
        dropdownOptionsInner.current,
        {
          yPercent: isOpen ? 100 : 0,
        },
        {
          yPercent: isOpen ? 0 : 100,
          duration: !immediate ? 0.5 : 0,
          ease: "power3.inOut",
        },
        0
      );

      tl.restart();
    });
  };

  useEffect(() => {
    !open && handleOpenDropdown(isOpen);
  }, [isOpen]);

  useEffect(() => {
    enableSearch && searchInput.current?.focus();
  }, [enableSearch]);

  const handleSearch = (q: string) => {
    const find = options?.filter((option, i) => {
      return option?.label.toLowerCase().startsWith(q.toLowerCase());
    });

    if (find?.length) {
      setCurrentOptions(find);
    } else {
      setCurrentOptions(options);
    }
  };

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (isOpen)
        selectedOption &&
          handleAddOption(options ? options[selectedOption] : undefined);
      else setIsOpen(true);
    } else if (e.key === "ArrowDown") {
      const currentIndex = selectedOption ?? -1;
      if (options && currentIndex < options.length - 1) {
        setSelectedOption(currentIndex + 1);
        optionslist.current?.scrollTo({
          top: optionsRef.current[currentIndex + 1].current.offsetTop - 40,
        });
      }
    } else if (e.key === "ArrowUp") {
      const currentIndex = selectedOption ?? -1;
      if (currentIndex > 0) {
        setSelectedOption(currentIndex - 1);
        optionslist.current?.scrollTo({
          top: optionsRef.current[currentIndex - 1].current.offsetTop - 40,
        });
      }
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  const searchInput = useRef<HTMLInputElement>(null);

  const handleRemoveOption = (option: optionInterface) => {
    const newOptions = selected?.filter((op, i) => {
      return op !== option;
    });

    newOptions && onChange(newOptions);
  };

  const handleAddOption = (option: optionInterface | undefined) => {
    if (option) !selected?.includes(option) && onChange([...selected, option]);
  };

  return (
    <div
      ref={dropdown}
      data-lenis-prevent={true}
      className={`dropdown relative ${
        isOpen ? "z-50" : ""
      } ${className} w-full`}
      onKeyDown={(e) => {
        handleKeyDown(e);
      }}
    >
      <div
        ref={button}
        onClick={(e) => {
          button.current && handleToogleDropdown();
        }}
        className={`relative bg-dashboard-button-dark w-full h-full z-10 px-[20px] py-dashboard-specific-radius shadow-large border border-dashboard-button-stroke-default rounded-dashboard-button-square-radius`}
      >
        {/* <label 
          htmlFor="langSearch"
          className="absolute w-0 h-0 opacity-0"
        >
          {label}
        </label> */}

        {/* <ArrowDropdown 
          className={`relative z-50 transition-transform ${isOpen ? '-rotate-180' : 'rotate-0'}`}
        /> */}

        {/* <input 
          id="langSearch"
          name="search lang"
          ref={searchInput}
          type="search"
          className={`bg-black absolute z-30 left-4 w-[calc(100%-50px)] hide-search-input-reset ${enableSearch ? 'block' : 'hidden'}`}
          onChange={(e) => {
            handleSearch(e.target.value)
          }}
        /> */}

        <div className="text-medium mb-dashboard-button-separation-spacing">
          {title}
        </div>

        {mandatory && (
          <div
            data-lenis-prevent={true}
            className="flex flex-col gap-dashboard-mention-padding-right-left min-h-[0px] max-h-[70px] overflow-y-scroll"
          >
            {mandatory.map((option, i) => {
              return (
                <Tag
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  key={i}
                  text={option?.label}
                  bg="light"
                  className={`dropdown_tag hover:bg-alphaWhite-300 w-full`}
                  wFull
                  size="sm"
                />
              );
            })}
          </div>
        )}
        <div
          ref={dropdownOptions}
          className={`dropdown__options-w w-[calc(100%+2px)] overflow-hidden top-5 z-10 box-border ${
            !isOpen && "pointer-events-none"
          } mt-dashboard-button-separation-spacing`}
        >
          <div
            ref={dropdownOptionsInner}
            className={`dropdown__options-inner w-full bg-black rounded-b-xl ${
              enableSearch && "border-white"
            }`}
          >
            <hr className="mb-dashboard-button-separation-spacing" />

            <div
              ref={optionslist}
              className="dropdown__list flex flex-col max-h-[200px] overflow-y-scroll bg-black bg-opacity-70 w-full pb-2 pr-4 gap-2"
            >
              {currentOptions?.map((option, i: number) => {
                return (
                  <Tag
                    key={i}
                    ref={optionsRef.current[i]}
                    onClick={(e) => {
                      e.stopPropagation();

                      handleAddOption(option);
                    }}
                    onClose={() => {
                      handleRemoveOption(option);
                    }}
                    selected={selected.includes(option)}
                    icon={option.icon}
                    text={option?.label}
                    className={`dropdown_tag hover:bg-alphaWhite-300 ${
                      selectedOption === i ? "bg-alphaWhite-300" : ""
                    } w-full ${
                      isOpen ? "pointer-events-auto" : "pointer-events-none"
                    }`}
                    wFull
                    size="sm"
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
