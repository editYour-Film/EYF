import { useContext } from "react";
import { Model } from "@/components/_shared/video/Model";
import { EditorContext } from "./_context/EditorContext";

import { Formats as possibleModelFormat} from "./data/metaValues";

type DashboardEditorModelsProps = {
  models: any;
};

export const DashboardEditorModels = ({
  models,
}: DashboardEditorModelsProps) => {
  const editorContext = useContext(EditorContext);

  const Grids = possibleModelFormat.map((type) => {
    
    let items = []

    models && models.map((model: any, i: number) => {
      if(model.model === type) {
        items.push(
          <Model
            key={i}
            video={model}
            thumbnail={ model.thumbnail }
            active= { model.visibility === 'public' }
            handleModify={() => {
              editorContext.handleModifyVideo(model.id);
            }}
            handleDisable={() => {
              editorContext.handleDisableVideo(model.id);
            }}
          />
        )
      }
    })

    if(items.length > 0 && items.length < 3) {
      for (let i = 0; i <= 3 - items.length; i++) {
        items.push(<div className="w-full h-full bg-dashboard-button-dark rounded-dashboard-button-square-radius"></div>)
      }
    }

    if(items.length > 0) {
      return (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-dashboard-mention-padding-right-left">
          {items}
        </div>
      )
    }
  })

  return (
    <div className="dashboard-editor-models">
      <div className="dashboard-editor-models__head flex flex-col sm:flex-row flex-wrap sm:justify-between sm:items-center">
        <h2 className="dashboard-title pl-dashboard-mention-padding-right-left md:pl-0 mt-0 mb-4">Modeles Importés</h2>
      </div>
      <div className={`dashboard-editor-models__models mt-12 flex flex-col gap-dashboard-spacing-element-medium`} >
        
        {Grids}

      </div>
    </div>
  );
};
