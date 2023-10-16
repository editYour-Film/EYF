import Image from "next/image"
import { ChangeEvent, useRef } from "react"
import Pen from "@/icons/pen.svg"

type AvatarInputProps = {
  img: string,
  onChange: Function,
  className?: string,
  showOverlay? : boolean,
}

export const AvatarInput = ({img, className, onChange, showOverlay}:AvatarInputProps) => {
  const input = useRef<HTMLInputElement>(null)

  const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
    onChange(e)
  }

  const handleClick = () => {
    input.current!.click()
  }

  return (
    <div className={`avatar-input group ${className ? className : ''}`}>
      <div className="db-profil__img relative w-28 h-28 rounded-full border border-alphaWhite border-opacity-70 overflow-hidden">
        <Image
          src={img}
          alt='profile image'
          fill
        />

        <div 
          className={`avatar-input__overlay absolute z-10 top-0 left-0 w-full h-full bg-black bg-opacity-70 group-hover:opacity-100 transition-opacity duration-500 ${showOverlay ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => { handleClick() }}
        >
          
          <div className="flex flex-col justify-center items-center w-full h-full">
            <Pen />
            <div>Modifier</div>
          </div>
        </div>

        <label htmlFor="avatar">Modifier votre photo de profil</label>
        <input
          ref={input}
          type="file"
          name="avatar"
          id="avatar"
          onChange={(e) => {
            handleChange(e);
          }}
          className="hidden"
        />

      </div>
    </div>
  )
}