import { useGenerateThumbnailsFromFile } from "@/hooks/useGenerateThumbnailFromFile"
import Image from "next/image"
import { useContext, useEffect, useRef } from "react"
import { QuoteContext } from "../../_context/QuoteContext"
import { IslandButton } from "@/components/_shared/buttons/IslandButton"
import { ReactLenis } from "@studio-freight/react-lenis"
import { SimpleCard } from "@/components/_shared/UI/CardSimple"
import { useAnimation } from "./useAnimations"

export type FilesLibraryProps = {
  isOpen: boolean
  onClose: () => void
}

export const FilesLibrary = ({isOpen, onClose}: FilesLibraryProps) => {
  const quoteContext = useContext(QuoteContext)
  const wrapper = useRef<HTMLDivElement>(null)

  const animationOptions = {
    wrapper,
    onClose
  }
  
  const animations = useAnimation(animationOptions)
  
  useEffect(() => {
    if(isOpen) {
      animations.open()
      quoteContext.setNextButtonDisabled(true)
      quoteContext.setPrevButtonDisabled(true)
    } else {
      quoteContext.defineNavStatus()
    }
  }, [isOpen])

  // Set the empty placeholder to complete a line of uploaded files
  const getPlaceholder = () => {
    const rest = quoteContext.uploadedFiles ? 4 - quoteContext.uploadedFiles.length % 4 : 0
    
    let ph = []
    if(rest > 0 && rest <= 4) {
      for (let i = 0; i < rest; i++) {
        ph.push(1)
      }
    }

    return ph
  }

  const placeholders = getPlaceholder()
  
  return (
    <div 
      data-lenis-prevent
      ref={wrapper}
      className={`quote__library w-full h-full`}>
        <ReactLenis
          className='overflow-scroll no-scroll-bar h-[calc(100vh-100px)]'
        >
          <div className="pt-[100px] pb-[100px]">
            <SimpleCard
              className="flex flex-col gap-dashboard-spacing-element-medium min-h-[70vh]"
            >
            <div
              className="flex flex-row justify-between">
              <div className="text-title-small text-title-white-high">Librairie des médias importés</div>
              <IslandButton 
                type="tertiary"
                label="Fermer"
                onClick={() => { animations.close() }}
              />
            </div>
            <div className="grid grid-cols-4 gap-dashboard-spacing-element-medium">
              {
                quoteContext.uploadedFiles && quoteContext.uploadedFiles.map((file:File, i:number) => { 
                  return (
                    <LibraryElement 
                      key={i}
                      file={file} 
                    />
                  )
                })
              }
              {
                placeholders.map((_placeholder, i) => {
                  return (
                    <LibraryElement key={i} />
                  )
                })
              }
            </div>
            </SimpleCard>
          </div>
        </ReactLenis>
    </div>
  )
}

type LibraryElementProps = {
  file?: File,
}

const LibraryElement = ({file}:LibraryElementProps) => {
  const quoteContext = useContext(QuoteContext)
  const thumbnailUri = file ? useGenerateThumbnailsFromFile(file) : null

  return (
    <div
      className={`library-element relative h-0 pb-[77%] overflow-hidden ${file ? '' : 'bg-dashboard-background-content-area'} rounded-dashboard-button-square-radius`}>
        {file &&
          <div className="absolute top-0 left-0 w-full flex flex-col h-full gap-dashboard-button-separation-spacing">
            <div className="w-full relative basis-[70%]">
              {thumbnailUri && 
                <Image
                  src={thumbnailUri}
                  alt={file.name}
                  fill
                  className="object-cover"
                />
              }
            </div>
            <div className="basis-[30%]">
              <div className="text-small text-dashboard-text-description-base">{file.name}</div>
              <div className="flex flex-col gap-dashboard-button-separation-spacing p-dashboard-button-separation-spacing">
                <hr className="w-full"/>
                <div className="flex flex-row justify-center gap-dashboard-button-separation-spacing">
                  <IslandButton
                    type="small"
                    label='Supprimer'
                    onClick={() => {
                      quoteContext.uploadedFiles && quoteContext.setUploadedFiles(quoteContext.uploadedFiles.filter((f:File) => f !== file))
                    }}
                    className="basis-1/2"
                  />
                  <IslandButton
                    type="small"
                    label='Retirer'
                    onClick={() => {}}
                    className="basis-1/2"
                  />
                </div>
              </div>
            </div>
          </div>
        }
    </div>
  )
}