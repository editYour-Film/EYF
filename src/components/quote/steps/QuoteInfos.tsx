import { SimpleCard } from "@/components/_shared/UI/CardSimple"
import Image from "next/image"
import { QuoteContext } from "../_context/QuoteContext"
import { useContext } from "react"
import { displayDuration, formatDuration } from "@/utils/utils"

export const QuoteInfos = () => {
  const quoteContext = useContext(QuoteContext)

  const displaySelectedDuration = displayDuration(quoteContext.selectedDuration)
  const videoRushsTimeDisplay = quoteContext.videoRushsDuration ? displayDuration(quoteContext.videoRushsDuration) : '0'
  const imageRushsTimeDisplay = quoteContext.imagesRushsDuration ? displayDuration(quoteContext.imagesRushsDuration) : '0'
  const audioRushsTimeDisplay = quoteContext.audioRushsDuration ? displayDuration(quoteContext.audioRushsDuration) : '0'
  
  return (
    <div className="quote-infos">
      <SimpleCard 
        className="flex flex-col gap-dashboard-button-separation-spacing"
      >
        <div className="quote-infos__head flex gap-[17px] w-[400px]">
          <div className="quote-infos__thumbnail basis-[42%]">
            <div className="relative h-0 pb-[60%] rounded-dashboard-button-square-radius overflow-hidden">
              {quoteContext.selectedModel ?
                <Image
                  src={quoteContext.selectedModel.thumbnail.data.attributes.formats.small.url}
                  alt={quoteContext.selectedModel.thumbnail.data.attributes.alternativeText}
                  fill
                />
                :
                <div className="bg-dashboard-background-content-area absolute w-full h-full"></div>
              }
            </div>
          </div>
          <div className="basis-[58%] flex flex-col justify-between">
           <div>
            <div className="text-small text-dashboard-text-title-white-high">Numéro de commande</div>
            <div className="text-base text-dashboard-text-title-white-high">{quoteContext.selectedModel ? quoteContext.selectedModel.title : 'Nom du model de montage'}</div>
           </div>
           <div className="text-small text-dashboard-text-description-base">Nom du monteur</div>
          </div>
        </div>

        <ItemGroup 
          title="Film" 
          items={[['Durée sélectionnée', displaySelectedDuration ], ['Livraison prévu', '15 janvier 2024']]} 
        />
        <ItemGroup 
          title="Modèle de montage" 
          items={[['Format du modèle', quoteContext.selectedModel ? quoteContext.selectedModel.model : '']]} 
        />
        <ItemGroup 
          title="Fichiers vidéos" 
          items={[['Importés', quoteContext.videoRushsNumber ? quoteContext.videoRushsNumber.toString() : '0'], ['Durée', videoRushsTimeDisplay]]}
        />
        <ItemGroup 
          title="Fichiers photos" 
          items={[['Importés', quoteContext.imageRushsNumber ? quoteContext.imageRushsNumber.toString() : '0'], ['Durée', imageRushsTimeDisplay]]} 
        />
        <ItemGroup 
          title="Fichiers audios" 
          items={[['Importés', quoteContext.audioRushsNumber ? quoteContext.audioRushsNumber.toString() : '0'], ['Durée', audioRushsTimeDisplay]]} 
        />
        <ItemGroup 
          title="Date de remise" 
          items={[['Rendu du projet', '10 Octobre 2024']]} 
        />
      </SimpleCard>
    </div>
  )
}

type ItemGroupProps = {
  title: string,
  items: [string, string][]
}

const ItemGroup = ({title, items}: ItemGroupProps) => {

  return (
    <div className='p-dashboard-button-separation-spacing bg-dashboard-background-content-area'>
      <div className="dashboard-text-title-white-high text-base mb-1">{title}</div>
      {items && items.map((item, index) => {
        return (
          <div 
            key={index}
            className='flex justify-between text-dashboard-text-description-base text-small'>
            <div>{item[0]}</div>
            <div>{item[1]}</div>
          </div>
        )})
      }
    </div>
  )
}