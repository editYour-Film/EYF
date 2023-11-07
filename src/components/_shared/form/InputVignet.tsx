import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Help } from "./Help";
import Image from "next/image";
import { IslandButton } from "../buttons/IslandButton";

type InputVignetProps = {
  label: string;
  buttonLabel: string;
  title?: string;
  desc: string;
  image: string;
  onChange: (file: File) => void;
};
export const InputVignet = ({
  label,
  buttonLabel,
  title,
  desc,
  image,
  onChange,
}: InputVignetProps) => {
  const [img, setImg] = useState(image);
  const [error, setError] = useState("");
  const input = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    input.current?.click();
  };

  useEffect(() => {
    setImg(image);
  }, [image]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (
      e.target.files &&
      ["image/jpg", "image/jpeg", "image/png", "image/svg+xml"].includes(
        e.target.files[0].type
      )
    ) {
      setImg(URL.createObjectURL(e.target.files[0]));
      onChange(e.target.files[0]);
    } else {
      setError("Le format du fichier n'est pas compatible");
    }
  };

  return (
    <div className="input-vignet flex flex-col gap-3">
      <div className="flex justify-between">
        <label
          htmlFor="vignet"
          className="text-dashboard-text-description-base"
        >
          {label}
        </label>

        {img ? (
          <IslandButton
            type="small"
            label="Modifier"
            onClick={() => {
              handleClick();
            }}
          />
        ) : (
          <Help text="Text" label={label} />
        )}
      </div>

      <div
        className={`relative ${
          !img ? "py-dashboard-spacing-element-medium" : ""
        } flex flex-col justify-center items-center rounded-dashboard-button-separation-spacing bg-dashboard-button-dark border-03 focus-within:border-blueBerry overflow-hidden`}
      >
        {!img && (
          <div className="grow-0 w-10/12 xl:w-6/12 basis-1/2 flex items-center text-center flex-col gap-dashboard-button-separation-spacing">
            {title && <div className="text-medium xl:w-8/12">{title}</div>}

            {desc && (
              <div className="text-small-light text-dashboard-text-description-base">
                {desc}
              </div>
            )}

            {error && <div className="text-applRed text-sm">{error}</div>}

            <IslandButton
              type="small"
              label={buttonLabel}
              onClick={() => {
                handleClick();
              }}
              className="leading-none z-10"
            />
          </div>
        )}

        <input
          ref={input}
          type="file"
          name="vignet"
          id="vignet"
          onChange={(e) => {
            handleChange(e);
          }}
          className="absolute top-0 left-0 opacity-0 w-full h-full z-0"
        />

        {img && (
          <div className="relative top-0 left-0 overflow-hidden border w-full h-0 pb-[46%]">
            <Image
              src={img}
              alt="Image de la vignette"
              fill
              className="object-cover"
            />
          </div>
        )}
      </div>
    </div>
  );
};
