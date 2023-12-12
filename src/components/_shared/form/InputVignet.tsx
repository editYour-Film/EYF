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
  maxSize: number;
  allowedMimeType: {mime:string, name:string}[];
};
export const InputVignet = ({
  label,
  buttonLabel,
  title,
  desc,
  image,
  onChange,
  maxSize,
  allowedMimeType,
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
      e.target.files
    ) {
      if( !allowedMimeType.map((el) => el.mime).includes(e.target.files[0].type) ) setError("Le format du fichier n'est pas compatible");
      else if (e.target.files[0].size > maxSize) setError("Le fichier est trop volumineux");
      else {
        setImg(URL.createObjectURL(e.target.files[0]));
        onChange(e.target.files[0]);
      }
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

            <div className="flex flex-col">
              {allowedMimeType && <span className='text-dashboard-text-disabled'>Formats acceptés : {allowedMimeType.map((el) => el.name).join(', ')}</span>}
              {maxSize && <span className='text-dashboard-text-disabled'>Le fichier ne peut être supérieur à {maxSize / (1000 * 1000)}Mo</span>}
            </div>

            {error && <div className="text-appleRed text-sm">{error}</div>}

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
          accept={allowedMimeType.join(',')}
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
