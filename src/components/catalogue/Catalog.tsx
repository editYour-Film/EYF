import { RefObject, forwardRef, useContext, useEffect, useRef, useState } from "react"
import { ReactLenis, useLenis } from "@studio-freight/react-lenis"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useGSAP } from "@gsap/react"

import { useWindowSize } from "@uidotdev/usehooks"
import useMediaQuery from "@/hooks/useMediaQuery"

import { lockDocumentScroll, unLockDocumentScroll } from "@/utils/utils"

import { CatalogContext, CatalogContextType } from "./_context/CatalogContext"

import { SearchBar } from "../_shared/form/SearchBar"
import { DropBox } from "../_shared/form/DropBox"
import { ModelsLine, ModelsLineSkeleton } from "./ModelsLine"
import { SimpleCard } from "../_shared/UI/CardSimple"
import { IslandButton } from "../_shared/buttons/IslandButton"
import { CatalogModel } from "./CatalogModel"
import { ModelSkeleton } from "../_shared/video/Model"

import FiltersIcon from '@/icons/sliders.svg'

type CatalogProps = {
  searchChoices: CatalogContextType['searchValues'],
  models: CatalogContextType['models'],
  isQuote?: boolean
}

export const Catalog = ({searchChoices, models, isQuote}: CatalogProps) => {
  const catalogContext = useContext(CatalogContext)

  const [isFetching, setIsFetching] = useState(false)

  const mainContent = useRef<HTMLDivElement>(null)
  const wrapper = useRef<HTMLDivElement>(null)

  // Trigger the fetch more when we approch the bottom
  useLenis(() => {
    ScrollTrigger.refresh()

    if(
      catalogContext.models.length > 0 && 
      mainContent.current && mainContent.current.getBoundingClientRect().bottom - window.innerHeight < 100 && 
      !catalogContext.isFetching
    )
    {
      setIsFetching(true)
      // console.log('fetch more')
      setIsFetching(false)
    }
  }, [catalogContext.models, catalogContext.isFetching])

  //Blur the background of sideBar on scroll
  const [backdropBlur, setBackdropBlur] = useState(0)
  useGSAP(() => {
    ScrollTrigger.create({
      trigger: mainContent.current,
      start: `top top`,
      end: `top+=${100} top`,
      id: 'blur',
      onUpdate: (self) => {
        setBackdropBlur(self.progress)
      }
    })
  })

  return (
    <div 
      ref={wrapper}
      className="catalog relative w-full">
      <div 
        ref={mainContent}
        className="catalog__main-content relative flex flex-col gap-dashboard-spacing-element-medium w-full"
      >
        <div className="catalog-searchbar sticky top-0 flex flex-col md:flex-row justify-center w-full gap-4 py-3 z-50">
          <SearchBarCatalog 
            searchChoices={searchChoices}
            blurVal={backdropBlur}
          />
        </div>

        <div className="catalog-models w-full flex flex-col items-center justify-center gap-dashboard-spacing-element-medium">
          {models.map((line:CatalogContextType['models'][number], i: number) => {
            return (
              <ModelsLine key={i} keyword={line.keyword} models={line.models} isQuote={isQuote}/>
            )
          })}
          {
           (catalogContext.isFetching || isFetching ) &&
            <>
              <ModelsLineSkeleton />
              <ModelsLineSkeleton />
              <ModelsLineSkeleton />
            </>
          }

          <IslandButton 
            type="tertiary"
            label="Charger plus"
            wmax
            onClick={() => {
              catalogContext.fetchMore()
            }}
          />
        </div>

      </div>
    </div>
  )
}

type SearchBarCatalogProps = {
  searchChoices: CatalogContextType['searchValues'],
  blurVal: number
}

const SearchBarCatalog = ({searchChoices, blurVal}:SearchBarCatalogProps) => {
  const blurryElement = useRef<HTMLDivElement>(null)

  const [filterOpen, setFilterOpen] = useState(false)
  const [filters, setFilters] = useState<string[]>([])

  useGSAP(() => {
    gsap.set(blurryElement.current, {
      backdropFilter: `blur(${blurVal * 4}px)`,
      opacity: blurVal
    })
  }, {dependencies: [blurVal]})  

  return (
    <>
      <div 
        ref={blurryElement}
        className="absolute w-full h-full top-0 left-0 backdrop-blur bg-blackBerry-500"></div>
      <SearchBar
        placeholder="Rechercher"
        onSearch={() => {}}
        onChange={() => {}}
        onFilterClick={() => { setFilterOpen(!filterOpen) }}
        className='md:w-[500px]'
        choices={searchChoices}
      />
      <div className="relative">
        <DropBox
          title="Filtrer"
          Icon={FiltersIcon}
          type="multiple"
          choices={['Disponible dès demain', 'Carré', '16/9', 'Horizontal']}
          currentValue={filters}
          onChange={(val) => { setFilters(val) }}
          toggle={filterOpen}
          className="absolute z-40"
          // bgSolid
        />
      </div>
    </>
  )
}

type MorePanelProps = {
  isQuote?: boolean
}

export const MorePanel = forwardRef<HTMLDivElement, MorePanelProps>(function MorePanel({isQuote}, ref) {
  const catalogContext = useContext(CatalogContext)
  const searchChoices = catalogContext.searchValues

  const wrapperRef = ref ? (ref as RefObject<HTMLDivElement>) : useRef<HTMLDivElement>(null)
  const tempScroll = useRef(0)

  const ww = typeof window !== 'undefined' ? useWindowSize() : undefined
  const lenis = useLenis()

  // Animation of the more panel
  useEffect(() => {
    if(catalogContext.showMorePanel) {
      tempScroll.current = lenis ? lenis.scroll : 0

      lockDocumentScroll(tempScroll.current)

      wrapperRef.current && gsap.to(wrapperRef.current, {
        x: 0,
        ease: 'expo',
        duration: 1,
      })
    } else {
      unLockDocumentScroll(tempScroll.current)
      wrapperRef.current && gsap.to(wrapperRef.current, {
        x: window.innerWidth,
        ease: 'expo',
        duration: 1
      })
    }
  } , [catalogContext.showMorePanel, lenis, ww])

  return (
    <div
      ref={wrapperRef}
      className="catalog__more-panel fixed flex flex-col items-center top-0 mx-auto w-full z-popup"
      >
      <ReactLenis
        className="w-full h-screen overflow-scroll no-scroll-bar "
      >
        <Content isQuote={isQuote} searchChoices={searchChoices}/>
      </ReactLenis>
    </div>
  )
})

type ContentProps = {
  isQuote?: boolean
  searchChoices: CatalogContextType['searchValues']
}

const Content = ({isQuote, searchChoices}:ContentProps) => {
  const mainContent = useRef<HTMLDivElement>(null)
  const catalogContext = useContext(CatalogContext)

  const contentRef = useRef<HTMLDivElement>(null)

  const isMd = useMediaQuery('(min-width:768px) and (max-width:1024px)')
  
  const linesMore = [{
    type: 'regular',
    models: catalogContext.moreModels.filter((model) => ['model 16/9 ème', 'Carré'].includes(model.model))
  },{
    type: 'mobile',
    models: catalogContext.moreModels.filter((model) => ['Mobile', 'model 9/16 ème'].includes(model.model))
  }]
  
  // Trigger the fetch more when we approch the bottom
  useLenis(() => {
    ScrollTrigger.refresh()

    if(
      catalogContext.showMorePanel &&
      catalogContext.moreModels.length > 0 && 
      contentRef.current && contentRef.current.getBoundingClientRect().bottom - window.innerHeight < 100 && 
      !catalogContext.isFetching
    )
    {
      // console.log('fetch more Of the panel')
      catalogContext.fetchMoreModels('keyword', true)
    }
  }, [catalogContext.showMorePanel, catalogContext.moreModels, catalogContext.isFetching])

  //Blur the background of sideBar on scroll
  const [backdropBlur, setBackdropBlur] = useState(0)
  useGSAP(() => {
    const trigger = ScrollTrigger.create({
      trigger: mainContent.current,
      start: `top top`,
      end: `top+=${100} top`,
      id: 'blur',
      onUpdate: (self) => {
        setBackdropBlur(self.progress)
      }
    })
  })

  return (
    <div className="px-[80px]">
      <div className="catalog-searchbar sticky top-[57px] mt-[50px] flex flex-col md:flex-row justify-center w-full gap-4 py-3 z-20">
        <SearchBarCatalog 
          searchChoices={searchChoices}
          blurVal={backdropBlur}
        />
      </div>

      <div
        ref={mainContent}
      >
        <div className="bg-blackBerry bg-opacity-80 absolute top-0 left-0 w-full h-full z-0"></div>
        <div 
          ref={contentRef}
          className="relative z-10 mx-auto ">

          <SimpleCard
            className="justify-self-center flex flex-col gap-dashboard-spacing-element-medium mt-dashboard-spacing-element-medium mx-auto"
          >
            <div
              className="flex flex-row justify-between"
            >
              <div className="text-title-small text-dashboard-text-title-white-high w-full text-center">Youtube</div>
              <IslandButton
                type="tertiary"
                label="Fermer"
                onClick={() => { catalogContext.setShowMorePanel(false)}}
                className="relative w-max align-self-start z-30"
              />
            </div>
            <div className="flex flex-col gap-dashboard-spacing-element-medium">
              { linesMore && linesMore.length > 1 && linesMore.map((modelsFormat, i) => {
                return (
                  <div 
                    key={i}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-dashboard-spacing-element-medium">
                    {modelsFormat.models.map((model, j) => {
                      return (
                        <CatalogModel 
                          key={j} 
                          thumbnail={model.thumbnail.data.attributes.formats.small.url}
                          video={model}
                          type="default"
                          onClick={() => {
                            catalogContext.setDetailModel(model);
                            catalogContext.setOpenDetailPanel(true)
                          }}
                          onAdd={() => {}}
                          isQuote={isQuote}
                        />
                        )
                      })
                    }
                  </div>
                )
              })}
            </div>

            {catalogContext.isFetching &&
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  gap-dashboard-spacing-element-medium mt-dashboard-spacing-element-medium">
                <ModelSkeleton />
                <ModelSkeleton />
                {!isMd && <ModelSkeleton />}
                {!isMd && <ModelSkeleton />}
              </div>
              <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  gap-dashboard-spacing-element-medium mt-dashboard-spacing-element-medium">
                <ModelSkeleton />
                <ModelSkeleton />
                {!isMd && <ModelSkeleton />}
                {!isMd && <ModelSkeleton />}
              </div>
              <div className="hidden lg:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-dashboard-spacing-element-medium mt-dashboard-spacing-element-medium">
                <ModelSkeleton />
                <ModelSkeleton />
                {!isMd && <ModelSkeleton />}
                {!isMd && <ModelSkeleton />}
              </div>
            </>
            }
          </SimpleCard>
        </div>
      </div>
    </div>
  )
}