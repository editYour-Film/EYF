import { ChangeEvent, createRef, useEffect, useRef, useState } from "react";
import Button from "./Button";
import gsap from "gsap";
import Input from "./Input";
import { Tag } from "../UI/Tag";
import { spokenLanguageInterface } from "@/components/dashboard/editor/_context/EditorProfilContext";
import ArrowDropdown from "@/icons/arrow-down-circle.svg";

export type optionInterface = {
  label: string;
  id?: string;
  icon?: string;
};

type DropdownProps = {
  label: string;
  onChange: (option: optionInterface) => void;
  className?: string;
  options: optionInterface[];
  selected: optionInterface[];
};

export const Dropdown = ({
  label,
  onChange,
  options,
  selected,
  className = "",
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
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
  const button = useRef<HTMLButtonElement>(null);

  optionsRef.current = options.map(() => createRef());

  const handleToogleDropdown = () => {
    if (!isTweening) {
      setIsOpen(!isOpen);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: any) => {
      if (dropdown.current && !dropdown.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    window.addEventListener("click", handleClickOutside, true);
    return () => {
      window.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  useEffect(() => {
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
          duration: 0.5,
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
          duration: 0.5,
          ease: "power3.inOut",
        },
        0
      );

      tl.restart();
    });
  }, [isOpen]);

  useEffect(() => {
    enableSearch && searchInput.current?.focus();
  }, [enableSearch]);

  const handleSearch = (q: string) => {
    const find = options.filter((option, i) => {
      return option?.label.toLowerCase().startsWith(q.toLowerCase());
    });

    if (find.length) {
      setCurrentOptions(find);
    } else {
      setCurrentOptions(options);
    }
  };

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (isOpen) selectedOption && onChange(options[selectedOption]);
      else setIsOpen(true);
    } else if (e.key === "ArrowDown") {
      const currentIndex = selectedOption ?? -1;
      if (currentIndex < options.length - 1) {
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

  return (
    <div
      ref={dropdown}
      data-lenis-prevent={true}
      className={`dropdown relative ${isOpen ? "z-50" : ""} ${className} w-max`}
      onKeyDown={(e) => {
        handleKeyDown(e);
      }}
    >
      <Button
        ref={button}
        variant="black"
        text={label}
        onClick={(e) => {
          button.current && handleToogleDropdown();
        }}
        className={`relative w-max z-10 ${isOpen && "border-white"}`}
      >
        <label htmlFor="langSearch" className="absolute w-0 h-0 opacity-0">
          {label}
        </label>

        <ArrowDropdown
          className={`relative z-50 transition-transform ${
            isOpen ? "-rotate-180" : "rotate-0"
          }`}
        />

        <input
          id="langSearch"
          name="search lang"
          ref={searchInput}
          type="search"
          className={`bg-black absolute z-30 left-4 w-[calc(100%-50px)] hide-search-input-reset ${
            enableSearch ? "block" : "hidden"
          }`}
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
        />

        <div
          ref={dropdownOptions}
          className={`absolute dropdown__options-w w-[calc(100%+2px)] overflow-hidden top-5 z-10 box-border ${
            !isOpen && "pointer-events-none"
          }`}
        >
          <div
            ref={dropdownOptionsInner}
            className={`dropdown__options-inner w-full bg-black p-4 rounded-b-xl border-x border-b ${
              enableSearch && "border-white"
            } pt-6`}
          >
            <hr className="mb-4" />

            <div
              ref={optionslist}
              className="dropdown__list flex flex-col max-h-[200px] overflow-y-scroll bg-black bg-opacity-70 w-full pb-2 pr-4 gap-2"
            >
              {currentOptions.map((option, i: number) => {
                return (
                  <Tag
                    key={i}
                    ref={optionsRef.current[i]}
                    onClick={(e) => {
                      e.stopPropagation();
                      onChange(option);
                    }}
                    icon={option.icon}
                    text={option?.label}
                    bg="light"
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
      </Button>
    </div>
  );
};
