import { RefObject, Suspense, forwardRef, useContext, useEffect, useRef, useState } from "react"
import { QuoteContext, QuoteContextType } from "../quote/_context/QuoteContext"
import { SearchBar } from "../_shared/form/SearchBar"
import { DropBox } from "../_shared/form/DropBox"
import { ModelsLine, ModelsLineSkeleton } from "./ModelsLine"
import FiltersIcon from '@/icons/sliders.svg'
import gsap from "gsap"
import { CatalogContext, CatalogContextType } from "./_context/CatalogContext"
import { SimpleCard } from "../_shared/UI/CardSimple"
import { IslandButton } from "../_shared/buttons/IslandButton"

import ArrowLeft from '@/icons/arrow-left.svg'
import { CatalogModel } from "./CatalogModel"
import { ReactLenis, useLenis } from "@studio-freight/react-lenis"
import { lockDocumentScroll, unLockDocumentScroll } from "@/utils/utils"
import Container from "../_shared/UI/Container"
import { ModelSkeleton } from "../_shared/video/Model"
import useMediaQuery from "@/hooks/useMediaQuery"
import { useWindowSize } from "@uidotdev/usehooks"

type CatalogProps = {
  searchChoices: CatalogContextType['searchValues'],
  models: CatalogContextType['models'],
  isQuote?: boolean
}

export const Catalog = ({searchChoices, models, isQuote}: CatalogProps) => {

  const catalogContext = useContext(CatalogContext)

  const [filterOpen, setFilterOpen] = useState(false)
  const [filters, setFilters] = useState<string[]>([])

  const [isFetching, setIsFetching] = useState(false)

  const mainContent = useRef<HTMLDivElement>(null)
  const morePanel = useRef<HTMLDivElement>(null)
  const wrapper = useRef<HTMLDivElement>(null)

  // Trigger the fetch more when we approch the bottom
  const lenis = useLenis(() => {
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

  const [isTweening, setIsTweening] = useState(false)
  const ctx = useRef<gsap.Context>()
  const ww = typeof window !== 'undefined' ? useWindowSize() : undefined
  
  // Animation when more panel is oppen
  useEffect(() => {
    ctx.current = gsap.context((self) => {
      const tl = gsap.timeline({
        onStart: () => { setIsTweening(true) },
        onComplete: () => { setIsTweening(false) },
      })

      self.add('showPanel', () => {
        if (isTweening) return
        tl.clear();
        tl.to(wrapper.current, {
          x: -window.innerWidth,
          ease: 'expo',
          duration: 1.5,
        })
      })

      self.add('hidePanel', () => {
        if (isTweening) return
        tl.clear()
        tl.to(wrapper.current, {
          x: 0,
          ease: 'expo',
          duration: 1.5,
        })
      })
    })

    return () => {
      ctx.current && ctx.current.revert()
    }
  }, [lenis, ww])

  useEffect(() => {    
    if(catalogContext.showMorePanel) ctx.current && ctx.current.showPanel()
    else ctx.current && ctx.current.hidePanel()
  }, [catalogContext.showMorePanel])

  return (
    <div 
      ref={wrapper}
      className="catalog relative">
      <div 
        ref={mainContent}
        className="catalog__main-content relative flex flex-col gap-dashboard-spacing-element-medium w-screen"
      >
        <div className="catalog-searchbar sticky top-0 flex flex-col md:flex-row justify-center w-full gap-4 py-2 z-50 bg-blackBerry-500 backdrop-blur-sm">
          <SearchBar
            placeholder="Rechercher"
            onSearch={() => {console.log('search')}}
            onChange={() => {console.log('Change')}}
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
              className="z-40"
              bgSolid
            />
          </div>
        </div>

        <div className="catalog-models w-full flex flex-col items-center justify-center gap-dashboard-spacing-element-medium">
          {models.map((line:CatalogContextType['models'][number], i: number) => {
            return (
              <ModelsLine key={i * 10 + 20} keyword={line.keyword} models={line.models} isQuote={isQuote}/>
            )
          })}
          {
           (catalogContext.isFetching || isFetching )&&
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

type MorePanelProps = {
  isQuote?: boolean
}

export const MorePanel = forwardRef<HTMLDivElement, MorePanelProps>(function MorePanel({isQuote}, ref) {
  const catalogContext = useContext(CatalogContext)

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
        <Content isQuote={isQuote}/>
      </ReactLenis>
    </div>
  )
})

type ContentProps = {
  isQuote?: boolean
}

const Content = ({isQuote}:ContentProps) => {
  const catalogContext = useContext(CatalogContext)
  const quoteContext = useContext(QuoteContext)

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
  const lenis = useLenis(() => {
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

  return (
    <>
      <Container
        className="sticky max-w-[1048px] top-[80px] z-20"
      >
        <IslandButton
          type="tertiary"
          label="Retour"
          Icon={ArrowLeft} 
          onClick={() => { catalogContext.setShowMorePanel(false)}}
          className="w-max align-self-start z-20"
        />
      </Container>


      <Container>
        <div className="bg-blackBerry bg-opacity-80 absolute top-0 left-0 w-full h-full z-0"></div>
        <div 
          ref={contentRef}
          className="relative z-10 mx-auto py-[80px] ">

          <SimpleCard
            className="justify-self-center flex flex-col gap-dashboard-spacing-element-medium mt-dashboard-spacing-element-medium mx-auto"
          >
            <div className="text-title-small text-dashboard-text-title-white-high w-full text-center">Youtube</div>
            <div className="flex flex-col gap-dashboard-spacing-element-medium">
              { linesMore && linesMore.length > 1 && linesMore.map((modelsFormat, i) => {
                return (
                  <div 
                    key={i}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-dashboard-spacing-element-medium">
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
                          onAdd={() => {
                            console.log('added');
                            
                          }}
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-dashboard-spacing-element-medium mt-dashboard-spacing-element-medium">
                <ModelSkeleton />
                <ModelSkeleton />
                {!isMd && <ModelSkeleton />}
              </div>
              <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-dashboard-spacing-element-medium mt-dashboard-spacing-element-medium">
                <ModelSkeleton />
                <ModelSkeleton />
                {!isMd && <ModelSkeleton />}
              </div>
              <div className="hidden lg:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-dashboard-spacing-element-medium mt-dashboard-spacing-element-medium">
                <ModelSkeleton />
                <ModelSkeleton />
                {!isMd && <ModelSkeleton />}
              </div>
            </>
            }
          </SimpleCard>

        </div>
      </Container>
    </>
  )
}