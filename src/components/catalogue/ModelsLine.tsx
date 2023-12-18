import { useContext } from "react"
import { SimpleCard } from "../_shared/UI/CardSimple"
import { IslandButton } from "../_shared/buttons/IslandButton"
import { CatalogModel } from "./CatalogModel"
import { CatalogContext } from "./_context/CatalogContext"
import { Formats } from "../dashboard/editor/data/metaValues"
import Skeleton from "react-loading-skeleton"
import { ModelSkeleton } from "../_shared/video/Model"

type ModelsLineProps = {
  keyword: string,
  models: any[],
  skeleton?: boolean,
  isQuote?: boolean,
}


export const ModelsLine = ({keyword, models, skeleton, isQuote}:ModelsLineProps) => {  
  const catalogContext = useContext(CatalogContext)
  
  const lines = [{
    type: 'regular',
    models: models.filter((model) => ['model 16/9 ème', 'Carré'].includes(model.model))
  },{
    type: 'mobile',
    models: models.filter((model) => ['Mobile', 'model 9/16 ème'].includes(model.model))
  }]
    
  return (
    <SimpleCard className="catalog-model-line w-full max-w-[960px] flex flex-col gap-dashboard-spacing-element-medium p-dashboard-spacing-element-medium">
      <div className="flex flex-row justify-between items-center">
        <div>{keyword}</div>
        <IslandButton
          type="tertiary"
          label="Voir plus"
          onClick={() => { 
            catalogContext.setShowMorePanel(true)
            catalogContext.fetchMoreModels(keyword, false)
          }}
        />
      </div>

      {lines.map((line) => {
        let emptyItems = []

        if(line.models.length > 0 && line.models.length < 3) {
          for (let i = 0; i < 3 - line.models.length; i++) {
            emptyItems.push(
              <div
                className="w-1/3 basis-1/3 align-self-stretch bg-dashboard-background-content-area rounded-dashboard-button-square-radius"
              ></div>
            );
          }
        }        

        return  (
          line.models.length > 0 ?
            <div className="flex flex-col lg:flex-row gap-dashboard-spacing-element-medium">
              {line.models.map((model, i) => {
                return  (
                  <CatalogModel
                    key={i}
                    thumbnail={model.thumbnail.data.attributes.formats.small.url}
                    video={model}
                    type="default"
                    className='lg:basis-1/3'
                    onClick={() => {
                      catalogContext.setDetailModel(model);
                      catalogContext.setOpenDetailPanel(true)
                    }}
                    onAdd={() => {}}
                    isQuote={isQuote}
                  />
                )
              })}
              {
                emptyItems.length > 0 && emptyItems.map((item) => {
                  return item
                }) 
              }
            </div>
          : <></>
        )
      })}
    </SimpleCard>
  )
}

export const ModelsLineSkeleton = () => {
  return (
    <SimpleCard className="catalog-model-line w-full max-w-[960px] flex flex-col gap-dashboard-spacing-element-medium p-dashboard-spacing-element-medium">
      <div className="flex flex-row justify-between items-center">
        <Skeleton containerClassName="w-1/2"/>
        <Skeleton containerClassName="w-[100px]" borderRadius={'100vh'}/>
      </div>

      <div className="flex flex-col lg:flex-row gap-dashboard-spacing-element-medium">
        <div className="lg:w-1/3">
          <ModelSkeleton />
        </div>
        <div className="lg:w-1/3">
          <ModelSkeleton />
        </div>        
        <div className="lg:w-1/3">
         <ModelSkeleton />
        </div>
      </div>
    </SimpleCard>
  )
}