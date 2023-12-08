import { Model } from "@/components/_shared/video/Model";
import { Formats as possibleModelFormat } from "../editor/data/metaValues";
import { EditorContext, EditorContextType } from "../editor/_context/EditorContext";
import { ClientContext, ClientContextType } from "../client/_context/DashboardClientContext";
import { useContext } from "react";

type ModelsGridProps = {
  models: any,
  accountType: 'editor' | 'creator'
}

export const ModelsGrid = ({models, accountType}:ModelsGridProps) => {
  const context = accountType === 'editor' ?  useContext(EditorContext) : useContext(ClientContext)
  
  const Grids = possibleModelFormat.map((type, g) => {
    let items = [];
    let key = 0;
        
    models &&
      models.map((model: any, i: number) => {
        if (model.model === type) {
          items.push(
            <Model
              type={accountType}
              key={key}
              video={model}
              thumbnail={model.thumbnail ? model.thumbnail.url : undefined}
              active={model.visibility === "public"}
              handleModify={() => {                
                accountType === 'editor' && (context as EditorContextType).handleModifyVideo(model.id);
              }}
              handleDisable={() => {
                accountType === 'editor' && (context as EditorContextType).handleDisableVideo(model.id);
              }}
              handleEnable={() => {
                accountType === 'editor' && (context as EditorContextType).handleEnableVideo(model.id);
              }}
              handleOpenDetail={() => {
                accountType === 'creator' && (context as ClientContextType).handleDetailVideo(model.id);
              }}
            />
          );

          key++
        }
      });

    if (items.length >= 0 && items.length < 3) {
      for (let i = 0; i <= 3 - items.length; i++) {
        items.push(
          <div
            key={key}
            className="w-full h-full bg-dashboard-button-dark rounded-dashboard-button-square-radius"
          ></div>
        );

        key++
      }
    }

    if (items.length > 0) {
      return (
        <div key={Math.random()} className="grid md:grid-cols-2 xl:grid-cols-3 gap-dashboard-mention-padding-right-left">
          {items}
        </div>
      );
    }
  });

  if (Grids) return <>{Grids}</>
  else return <></>
}