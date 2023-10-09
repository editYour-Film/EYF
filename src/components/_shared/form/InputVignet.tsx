import { ChangeEvent, useEffect, useRef, useState } from "react"
import { Help } from "./Help"
import Image from "next/image"
import Button from "./Button"

type InputVignetProps = {
  label: string,
  buttonLabel: string,
  desc: string,
  image: string,
  onChange: (file:File) => void
}
export const InputVignet = ({label, buttonLabel, desc, image, onChange}:InputVignetProps) => {  
  const [img, setImg] = useState(image)
  const [error, setError] = useState('')
  const input = useRef<HTMLInputElement>(null)

  const handleClick = () => {
    input.current?.click()
  }

  useEffect(() => {
    setImg(image)
  }, [image])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && ['image/jpg', 'image/jpeg', 'image/png'].includes(e.target.files[0].type)) {
      setImg(URL.createObjectURL(e.target.files[0]));
      onChange(e.target.files[0])
    } else {
      setError("Le format du fichier n'est pas compatible")
    } 
  }

  return (
    <div className="input-vignet flex flex-col gap-3">
      <div className="flex justify-between">
        <label htmlFor="vignet" className="font-bold">{label}</label>
        <Help text="Text" label={label} />
      </div>
      
      <div className="text-base-text text-sm">{desc}</div>

      {error && <div className="text-error text-sm">{error}</div>}

      <div className="rounded-lg relative overflow-hidden border h-0 pb-[45%]">
        <Image 
          src={img}
          alt= 'Image de la vignette'
          width={200}
          height={200}
          className="w-full h-full absolute top-0 left-0 object-cover"
        />
      </div>

      <Button 
        text={buttonLabel}
        size="xs"
        onClick={() => { handleClick() }}
      />

      <input 
        ref={input}
        type="file" 
        name="vignet"
        id="vignet"
        onChange={(e) => { handleChange(e) }}
        className="hidden"
      />
    </div>
  )
}