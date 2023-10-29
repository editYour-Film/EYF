
import gsap from "gsap"

import { useEffect, useRef, useState } from "react"

type DropBoxProps = {
  Icon: any,
  title?: string,
  placeholder?: string,
  type: 'simple' | 'multiple' | 'addNew' | 'link' | 'add',
  choices?: string[],
  currentValue: any,
  toggle?: boolean,
  setToggle?: (payload: boolean) => void,
  onChange: (value: any) => void,
  className?: string
}

export const DropBox = ({
  Icon,
  title,
  placeholder,
  type, 
  choices,
  currentValue,
  toggle, 
  setToggle, 
  onChange,
  className
}:DropBoxProps) => {
  const defaultLinkValue = 'Ajoutez un lien'

  const container = useRef<HTMLDivElement>(null)
  const ctx = useRef<gsap.Context>()
  const inputLink = useRef<HTMLInputElement>(null)

  const [value, setValue] = useState<string | string[] | undefined>(undefined)
  
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isTweening, setIsTweening] = useState<boolean>(false)  

  useEffect(() => {
    ctx.current = gsap.context(() => {
      gsap.set(container.current, {
        height: 0,
      })

      gsap.set(container.current, {
        opacity: 0,
      })
    })

    ctx.current.add('open', () => {
      const tl = gsap.timeline({
        onStart: () => {
          setIsTweening(true)
        },
        onComplete: () => {
          setIsTweening(false)
        }
      })

      tl.fromTo(container.current, {
        opacity: 0
      },{
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out'
      }, 0)

      tl.to(container.current, {
        height: 'auto',
        ease: 'power2.out'
      }, 0)
    })
    
    ctx.current.add('close', () => {
      const tl = gsap.timeline({
        onStart: () => {
          setIsTweening(true)
        },
        onComplete: () => {
          setIsTweening(false)
        }
      })

      tl.to(container.current, {
        height: 0,
        ease: 'power2.out'
      }, 0)

      tl.fromTo(container.current, {
        opacity: 1
      },{
        opacity: 0,
        duration: 0.3,
        ease: 'power2.out'
      }, '-=0.3')
    })

    return () => {
      ctx.current && ctx.current.revert()
    }
  }, [])

  useEffect(() => {
    
    const handleClickOutside = (e:any) => {
      if (isOpen && container.current && (!container.current.contains(e.target))) {  
        if(type === 'link' || type === 'add') e.target !== inputLink.current && setIsOpen(false)
        else setIsOpen(false)
      }
    }

    if (isOpen) {
      setValue(currentValue)
      window.addEventListener('click', handleClickOutside)
    }

    if(isOpen) handleOpen()
    else { handleClose() }

    return () => { window.removeEventListener('click', handleClickOutside)}
  }, [isOpen])

  useEffect(() => { 
    if(!isTweening) {
      if(toggle) setIsOpen(true)
      else setIsOpen(false)
    }
  }, [toggle, ctx.current])

  const handleOpen = () => {
    ctx.current && ctx.current.open() 
  }

  const handleClose = () => {
    console.log('close');
    
    setToggle && setToggle(false)
    ctx.current && ctx.current.close()
    onChange && (currentValue !== value) && onChange(value)
  }

  const handleOptionClick = (val:any) => {
    if(type === 'simple') {
      setValue(val)
    } else if (type === 'multiple') {
      if(value as string[]) {
        if (value && !value.includes(val)) {
          setValue([...value, val])
        }
        else {
          value && setValue((value as string[]).filter((v) => v !== val))
        }
      } 
      else {
        setValue([val])
      }
    }
  }

  return (
    <div 
      ref={container}
      className={`dropbox min-w-[128px] w-full md:w-max py-dashboard-spacing-element-medium md:py-0 px-dashboard-mention-padding-right-left md:px-0 bg-dashboard-background-content-area md:bg-dashboard-button-white-default rounded-dashboard-mention-radius border-03 overflow-hidden backdrop-blur-[6.5px] z-popup ${className} ${toggle ? 'pointer-events-auto' : 'pointer-events-none'}`}>

      <div className="flex flex-row gap-[10px] p-dashboard-mention-padding-right-left border-b-03 text-small">
        <div>{<Icon />}</div>
        {(type === 'simple' || type === 'multiple') && <div className="text-dashboard-text-description-base-low text-small">{title}</div>}
        {(type === 'link' || type === 'add' )&& 
          <input 
            ref={inputLink}
            type="text" 
            placeholder={placeholder && placeholder}
            className="bg-transparent w-[223px] placeholder:text-dashboard-text-description-base-low"
            onChange={(e) => setValue(e.target.value)}
            value={(value && defaultLinkValue !== value) ? value : ''}
            onKeyDown={(e) => { if(e.key === 'Enter') { setIsOpen(false) } }}
          />
        }
      </div>

      { (type === 'simple' || type === 'multiple') &&
          <div className="py-dashboard-mention-padding-right-left md:py-dashboard-mention-padding-top-bottom ">
            {choices && choices.map((item, i) => {              
              return (
                <DropBoxOption 
                  key={i}
                  item={item} 
                  onClick={() => { handleOptionClick(item) }}
                  selected={
                    value === item 
                    || value?.includes(item) 
                    || (!value && currentValue === item )
                    || (!value && currentValue?.includes(item))
                  }
                  />
              )
            })}
          </div>
      }

      { (type === 'link' && currentValue !== defaultLinkValue) &&
        <div className="py-dashboard-mention-padding-right-left md:py-dashboard-mention-padding-top-bottom">
          <DropBoxOption 
            item='Visiter' 
            onClick={() => { 
              let url
              if (!currentValue.match(/^https?:\/\//i)) {
                url = 'http://' + currentValue;
              }
              window.open(url, '_blank');
              setIsOpen(false)
            }}
            noBullet
          />
          <DropBoxOption 
            item='Supprimer' 
            onClick={() => { 
              setValue(defaultLinkValue)
            }}
            noBullet
           />
        </div>
      }

      { (type === 'add') &&
        <div className="py-dashboard-mention-padding-right-left md:py-dashboard-mention-padding-top-bottom">
          <DropBoxOption 
            item='Ajouter'
            onClick={() => {
              setIsOpen(false)
            }}
            noBullet
          />
        </div>
      }
      
    </div>
  )
}

type DropBoxOptionProps = {
  item: any,
  selected?: boolean,
  onClick?: () => void,
  noBullet?: boolean,
}

const DropBoxOption = ({item, selected, onClick, noBullet}:DropBoxOptionProps) => {
  return (
    <button
      className="dropbox-option block group  w-full md:w-max p-dashboard-mention-padding-top-bottom text-dashboard-text-description-base cursor-pointer"
      onClick={ () => { onClick && onClick() }}
    >
    <div className="flex items-center gap-dashboard-button-separation-spacing group-hover:bg-dashboard-button-white-default py-dashboard-mention-padding-top-bottom  px-dashboard-mention-padding-right-left rounded-dashboard-mention-radius">
      {!noBullet && <EditButton selected={selected ?? false} />}
      <div>{item}</div>
    </div>
  </button>
  )
}


const EditButton = ({selected}:{selected:boolean}) => {
  return (
    <div className={`flex justify-center items-center w-[19px] h-[19px] rounded-full border-[2px] group-hover:border-soyMilk`}>
      {selected && 
        <div className="w-[11px] h-[11px] bg-blueBerry rounded-full"></div>
      }
    </div>
  )
}