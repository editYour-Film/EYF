import { InfoMessage } from "@/components/_shared/UI/InfoMessage"
import Info from '@/icons/info.svg'
import { useContext } from "react"
import { Catalog } from "@/components/catalogue/Catalog"
import { CatalogContext } from "@/components/catalogue/_context/CatalogContext"

export const CatalogStep = () => {

  const catalogContext = useContext(CatalogContext)
  
  return (
    <div className="catalog-step flex flex-col items-center justify-center gap-dashboard-spacing-element-medium min-h-screen py-[100px]">
      <div className="flex flex-col items-center gap-dashboard-button-separation-spacing max-w-[600px]">
        <div className="text-large shadow-text text-center text-dashboard-text-title-white-high">Choisissez votre modèle de montage</div>
        <InfoMessage 
          Icon={Info}
          message='Découvrez les vidéos de nos monteurs-réalisateur disponibles rapidement et choisissez le modèle qui correspond le mieux à vos attentes.'
          wFull
        />
      </div>

      <hr className="w-[360px]"/>

      <Catalog
        searchChoices={catalogContext.searchValues}
        models={catalogContext.models}
        isQuote
      />
    </div>
  )
}

