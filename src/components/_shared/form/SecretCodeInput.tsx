import { useEffect, useState } from "react"

import DeleteIcon from "@/icons/delete.svg"
import EnterIcon from "@/icons/corner-down-left.svg"
import LoadingIcon from "@/icons/signin/loading.svg"

import { SimpleCard } from "../UI/CardSimple"
import { codeStateType } from "@/components/signin/_context/signinContext"

type SecretCodeInputProps = {
  enterCb: (val:string) => void,
  backSpaceCb: () => void,
  state: codeStateType,
}

export const SecretCodeInput = ({enterCb, backSpaceCb, state = 'regular'}:SecretCodeInputProps) => {
  const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'E', 'D', 'Y']

  const [value, setValue] = useState<string>('')

  const handleNumberClick = (val: string) => {
    value.length <= 5 && setValue(value + val)
  }

  const handleBackSpace = () => {
    if(value.length > 0) {
      setValue(value.slice(0, -1))
      backSpaceCb()
    }
  }

  const handleEnter = () => {
    enterCb(value)
  }

  const onKeyDown = (e: KeyboardEvent) => {
    if([...numbers, 'e', 'd', 'y'].includes(e.key)) {
      handleNumberClick(e.key.toUpperCase())
    } else if (e.key === 'Backspace') {
      e.preventDefault()
      handleBackSpace()
    } else if (e.key === 'Enter') {
      handleEnter()
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('paste', onPaste)

    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('paste', onPaste)
    }
  })

  const handleInputChange = (val:string) => {    
    // if (val.split('').every((letter) => {
    //   return numbers.includes(letter)
    // })) {
    // }

    if (value.length <= 6) {
      if (val && val.length <= 6) {
        setValue(val)
      } else {
        setValue(val.slice(0, 6))
      }
    }
    
  }

  const onPaste = (e:any) => {
    const clipboardData = e.clipboardData || window.Clipboard;
    const pastedData = clipboardData.getData('Text');

    handleInputChange(pastedData)
  }

  return (
    <div className="sercret-code_input w-full">
      <SimpleCard className="flex flex-col items-center">
        <Screen state={state} value={value} inputChange={(val) => { handleInputChange(val) }}/>

        <div 
          className={`secret-code__keyboard flex flex-row items-stretch gap-dashboard-button-separation-spacing mt-dashboard-spacing-element-medium ${state === 'success' ? 'pointer-events-none opacity-50' : ''}`}>
          <div className="grid grid-rows-3 grid-cols-4 gap-dashboard-button-separation-spacing">
            { numbers.map((el, i) => {              
              return <ValueButton key={i} value={el} onClick={(value:string) => { handleNumberClick(value) }}/>
            })}
          </div>
          <div className="flex flex-col justify-center gap-dashboard-button-separation-spacing">
              <BackSpace onClick={() => { handleBackSpace() }}/>
              <Enter 
                disabled={false}
                onClick={() => { handleEnter() }}
              />
          </div>
        </div>

      </SimpleCard>
    </div>
  )
}

type ValueButtonProps = {
  value: number | string,
  onClick: (value:string) => void
}

const ValueButton = ({value, onClick}:ValueButtonProps) => {
  return (
    <div
      onClick={() => { onClick(value.toString()) }}
      className="w-11 h-11 flex justify-center items-center border rounded-full text-dashboard-text-description-base bg-soyMilk-40 hover:bg-dashboard-button-white-hover hover:text-dashboard-text-title-white-high active:bg-dashboard-button-island-disabled active:text-dashboard-text-description-base"
    >
      {value}
    </div>
  )
}

type BackSpaceProps = {
  onClick: () => void,
}

const BackSpace = ({onClick}:BackSpaceProps) => {
  return (
    <div 
      className="w-14 h-10 flex justify-center items-center p-dashboard-button-separation-spacing bg-soyMilk-40 hover:bg-dashboard-button-alert border rounded-dashboard-button-square-radius"
      onClick={() => { onClick() }}
    >
      <DeleteIcon className="svg-color-appleRed"/>
    </div>
  )
}

type EnterProps = {
  disabled?: boolean,
  onClick: () => void,
}

const Enter = ({disabled, onClick}: EnterProps) => {
  return (
    <div 
      className={`basis-2/3 flex justify-center items-center p-dashboard-button-separation-spacing border rounded-dashboard-button-square-radius ${disabled ? 'pointer-events-none bg-dashboard-button-island-disabled border-dashboard-button-stroke-disabled' : 'bg-soyMilk-40'} hover:bg-dashboard-button-white-hover hover:border-dashboard-button-stroke-default`}
      onClick={() => { !disabled && onClick() }}
    >
      <EnterIcon className={`${disabled ? 'svg-color-dashboard-text-disabled' : 'svg-color-soyMilk'}`}/>
    </div>
  )
}

type ScreenProps = {
  value: string,
  state: codeStateType,
  inputChange: (value:string) => void,
}

const Screen = ({value, inputChange, state}:ScreenProps) => {

  let textcolor = 'text-dashboard-text-description-base'
  switch(state) {
    case 'error':
      textcolor = 'text-appleRed'
      break;
    case 'success':
      textcolor = 'text-linear-sunset'
      break
  }

  return (
    <div 
      className={`secret-code__screen focus-within:border-white relative w-full bg-soyMilk-40 rounded-dashboard-button-square-radius p-dashboard-button-separation-spacing border ${state === 'error' ? 'border-appleRed' : ''}  ${textcolor} text-center n27 text-[30px]`}>
      <div className="absolute top-0 left-0 h-full w-20 flex justify-center items-center">{state === 'loading' && <LoadingIcon />}</div>
      <div>{value[0] ?? '0'} {value[1] ?? '0'} - {value[2] ?? '0'} {value[3] ?? '0'} - {value[4] ?? '0'} {value[5] ?? '0'}</div>
      
      <label 
        htmlFor="secretCode" 
        className="absolute w-0 h-0 top-0 left-0 pointer-events-none opacity-0">Ouvrez votre boite mail et ajoutez votre code à 6 chiffres.</label>
      <input 
        id="secretCode"
        name="secretCode"
        type="text"
        className="absolute w-full h-full top-0 left-0 opacity-0"
        value={value}
        onKeyDown={(e) => { 
          if (!['Enter', 'Backspace'].includes(e.key)) {
            e.stopPropagation() 
          }
        }}
        onChange={(val) => {
          inputChange(val.target.value)
        }}
      />
    </div>
  )
}