import { useContext, useEffect, useState } from "react"
import { ModelsProps } from "../_shared/video/ModelLarge"
import { Model, ModelSkeleton } from "../_shared/video/Model"
import { Available } from "../_shared/UI/Available"
import { IslandButton } from "../_shared/buttons/IslandButton"
import Plus from "@/icons/plus.svg"
import { QuoteContext } from "../quote/_context/QuoteContext"

interface CatalogModelProps extends ModelsProps {
  onClick: () => void,
  onAdd: () => void,
  isQuote?: boolean,
}

export const CatalogModel = ({
  type,
  video,
  thumbnail,
  className,
  onClick,
  onAdd,
  isQuote,
}:CatalogModelProps) => {

  const quoteContext = isQuote ? useContext(QuoteContext) : undefined
  const [isAvailable, setIsAvailable] = useState(true)
  const [isSelected, setIsSelected] = useState(false)

  const handleAdd = () => {
    (isQuote && quoteContext) && quoteContext.setSelectedModel(video)
    onAdd && onAdd()
  }

  const quoteDependency = isQuote ? [quoteContext?.selectedModel] : []
  
  useEffect(() => {
    isQuote && quoteContext && setIsSelected(video === quoteContext.selectedModel)
  }, quoteDependency)

  return (
    <div className={`catalog-model ${className ?? ''} rounded-[8px] ${isSelected ? 'outline outline-blueBerry': ''}`}>
      <div className="relative">
        <Model
          active
          thumbnail={video.thumbnail.data.attributes.formats.small.url}
          video={video}
          type="default"
          className="rounded-b-none"
        />
        <div className="absolute top-2 left-2 z-20">
          {isAvailable && <Available isAvailable={true} nextAvailable={new Date('December 17, 2025')}/>}
        </div>
      </div>

      <div className="flex flex-col gap-dashboard-button-separation-spacing p-dashboard-button-separation-spacing">
        <div>
          <div className="text-dashboard-text-title-white-high text-base">{video.title}</div>
          <div className="text-dashboard-text-description-base text-base mt-dashboard-mention-padding-top-bottom">{video.user_info.data.attributes.username ?? video.user_info.data.attributes.f_name + ' ' + video.user_info.data.attributes.l_name}</div>
        </div>
        <hr />
        <div className="flex flex-row gap-3">
          <IslandButton
            type="small"
            label="Voir le modèle"
            onClick={() => { onClick && onClick() }}
            className="w-full "
          />
          <IslandButton
            type="small"
            Icon={Plus}
            iconColor="dashboard-text-description-base"
            onClick={() => { handleAdd() }}
            className="shrink-0"
          />
        </div>
      </div>
    </div>
  )
}

// const CatalogContextSkeleton = ({className}) => {
//   <div className={`catalog-model ${className ?? ''}`}>
//         <div className="relative">
//           <Model
//             active
//             thumbnail={video.thumbnail.data.attributes.formats.small.url}
//             video={video}
//             type="default"
//             className="rounded-b-none"
//           />
//           <div className="absolute top-2 left-2 z-20">
//           </div>
//         </div>

//         <div className="flex flex-col gap-dashboard-button-separation-spacing p-dashboard-button-separation-spacing">
//           <div>
//             <div className="text-dashboard-text-title-white-high text-base w-full bg-blackBerry"></div>
//             <div className="text-dashboard-text-description-base text-base mt-dashboard-mention-padding-top-bottom w-full bg-blackBerry"></div>
//           </div>
//           <hr />
//           <div className="flex flex-row gap-3">
//             <IslandButton
//               type="small"
//               label="Voir le modèle"
//               onClick={() => { onClick && onClick() }}
//               className="w-full "
//               disabled
//             />
//             <IslandButton
//               type="small"
//               Icon={Plus}
//               iconColor="dashboard-text-description-base"
//               onClick={() => { onAdd && onAdd() }}
//               className="shrink-0"
//               disabled
//             />
//           </div>
//         </div>
//       </div>
// }