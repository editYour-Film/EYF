import { useContext } from "react";
import { Model } from "@/components/_shared/video/Model";
import { EditorContext } from "./_context/EditorContext";

import { Formats as possibleModelFormat } from "./data/metaValues";
import { IslandButton } from "@/components/_shared/buttons/IslandButton";

type DashboardEditorModelsProps = {
  models: any;
};

export const DashboardEditorModels = ({
  models,
}: DashboardEditorModelsProps) => {
  const editorContext = useContext(EditorContext);
  const Grids = possibleModelFormat.map((type, g) => {
    let items = [];
    let key = 0;

    models &&
      models.map((model: any, i: number) => {
        if (model.model === type) {
          items.push(
            <Model
              key={key}
              video={model}
              thumbnail={model.thumbnail ? model.thumbnail.url : undefined}
              active={model.visibility === "public"}
              handleModify={() => {
                editorContext.handleModifyVideo(model.id);
              }}
              handleDisable={() => {
                editorContext.handleDisableVideo(model.id);
              }}
              handleEnable={() => {
                editorContext.handleEnableVideo(model.id);
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

  return (
    <div className="dashboard-editor-models flex flex-col gap-dashboard-spacing-element-medium">
      <div className="dashboard-editor-models__head flex flex-col sm:flex-row flex-wrap sm:justify-between sm:items-center">
        <h2 className="dashboard-title pl-dashboard-mention-padding-right-left md:pl-0 m-0">
          Modeles Importés
        </h2>
      </div>
      <div
        className={`dashboard-editor-models__models flex flex-col gap-dashboard-spacing-element-medium`}
      >
        {models && models.length > 0 ? (
          <div key={1}>
            {Grids}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-dashboard-mention-padding-right-left">
            {[1, 2, 3].map((el, i) => {
              return (
                <div
                  key={i}
                  className="w-full h-0 pb-[100%] bg-dashboard-button-dark rounded-dashboard-button-square-radius"
                ></div>
              );
            })}
          </div>
        )}
      </div>

      <IslandButton
        type="secondary"
        label="Ajouter un modèle"
        onClick={() => {
          editorContext.startAddModel();
        }}
        className="self-center md:self-end"
      />
    </div>
  );
};
