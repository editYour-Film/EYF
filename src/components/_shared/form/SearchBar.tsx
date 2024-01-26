
import Sliders from '@/icons/sliders.svg'
import Search from '@/icons/search-white.svg'
import { useEffect, useRef, useState } from 'react'
import { QuoteContextType } from '@/components/quote/_context/QuoteContext'
import gsap from 'gsap'
import { CatalogContextType } from '@/components/catalogue/_context/CatalogContext'

type SearchBarProps = {
  placeholder?: string,
  choices?: CatalogContextType['searchValues'],
  onChange: (value: any) => void,
  onSearch: (value: any) => void,
  onFilterClick: () => void,
  className?: string,
}

export const SearchBar = ({placeholder, choices, onChange, onSearch, onFilterClick, className}: SearchBarProps) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [value, setValue] = useState('')
  const [toShowChoices, setToShowChoices] = useState(choices)
  const [openChoicesPanel, setOpenChoicesPanel] = useState(false)
  
  const choicesPanel = useRef<HTMLDivElement>(null)
  const ctx = useRef<gsap.Context>()
  const [isTweening, setIsTweening] = useState(false)

  useEffect(() => {
    const handleClickOutside = (e: any) => {
      if (openChoicesPanel) {
        setOpenChoicesPanel(false)
      }
    };

    window.addEventListener("click", handleClickOutside);

    if(openChoicesPanel) ctx.current && ctx.current.openPanel()
    else ctx.current && ctx.current.closePanel()

    return () => {
      window.removeEventListener("click", handleClickOutside);
    }
  }, [openChoicesPanel])

  useEffect(() => {
    ctx.current = gsap.context((self) => {
      const tl = gsap.timeline({
        onStart: () => { setIsTweening(true) },
        onComplete: () => { setIsTweening(false) }
      })

      gsap.set(choicesPanel.current, {
        opacity: 0,
      })

      self.add('openPanel', () => {
        if (isTweening) return
        tl.clear()
        tl.fromTo(choicesPanel.current, {
          y: -10,
          opacity: 0,
        }, {
          y: 0,
          opacity: 1,
          ease: 'power3',
          duration: 0.2
        })
      })

      self.add('closePanel', () => {
        if (isTweening) return
        tl.clear()
        tl.fromTo(choicesPanel.current, {
          opacity: 1,
        }, {
          y: 0,
          opacity: 0,
          ease: 'power3',
          duration: 0.2
        })
      })
    })
    
    return () => {
      ctx.current && ctx.current.revert()
    }
  }, [])

  useEffect(() => {
    setToShowChoices(choices?.filter((x) => x.label.toLowerCase().startsWith(value.toLowerCase())))
  }, [value])

  useEffect(() => {
    setToShowChoices(choices)
  }, [choices])

  const handleChoiceClick = (e: React.MouseEvent, choice: CatalogContextType['searchValues'][number]) => {
    e.stopPropagation()   
    setOpenChoicesPanel(false)
    setValue(choice.label)
    onSearch && onSearch(choice.id) 
  }

  return (
    <div 
      className={`searchBar relative flex py-[10px] px-dashboard-specific-radius rounded-dashboard-button-square-radius bg-dashboard-background-content-area border-05 cursor-text ${className ?? ''}`}
      onClick={(e: React.MouseEvent) => {
        e.stopPropagation()
        setOpenChoicesPanel(true)   
        inputRef.current && inputRef.current.focus() 
      }}
    >
      <div className='w-full flex flex-row gap-dashboard-mention-padding-right-left'>
        <Search />

        <label htmlFor='searchBar-input' className='visually-hidden pointer-events-none'>Rechercher</label>
        <input
          ref={inputRef}
          type='text'
          id='searchBar-input'
          placeholder={placeholder}
          className='bg-transparent text-dashboard-text-description-base-low w-full h-full'
          value={value}
          onChange={(e) => {setValue(e.target.value)}}
        />
      </div>
      <div
        onClick={(e: React.MouseEvent) => {
          e.stopPropagation(); 
          onFilterClick && onFilterClick() 
        }}
        className='bg-transparent'
      >
        <Sliders 
          className='w-[24px] h-[24px] svg-color-soyMilk cursor-pointer' 
        />
      </div>

      <div 
        ref={choicesPanel}
        className='searchBar-propositions absolute flex flex-col gap-dashboard-mention-padding-top-bottom w-full left-0 top-[calc(100%+16px)] py-[10px] px-dashboard-specific-radius rounded-dashboard-button-square-radius bg-dashboard-background-content-area border-05 overflow-hidden'>
        {toShowChoices?.map((choice, i) => {
          return (
            <button
              type='button' 
              key={i}
              className='searchBar-prop text-left block p-1 text-base-light text-dashboard-text-description-base rounded-dashboard-button-separation-spacing hover:bg-dashboard-button-dark hover:text-dashboard-text-title-white-high transition-colors duration-500'
              onClick={(e: React.MouseEvent) => { handleChoiceClick(e, choice)}}
            >
              {choice.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}