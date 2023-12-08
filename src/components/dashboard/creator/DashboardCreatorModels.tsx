import { ModelsGrid } from "../shared/ModelsGrid";

type DashboardCreatorModelsProps = {
  models: any;
};

export const DashboardCreatorModels = ({
  models,
}: DashboardCreatorModelsProps) => {  
  return (
    <div className="dashboard-editor-models flex flex-col gap-dashboard-spacing-element-medium">
      <div className="dashboard-editor-models__head flex flex-col sm:flex-row flex-wrap sm:justify-between sm:items-center">
        <h2 className="dashboard-title pl-dashboard-mention-padding-right-left md:pl-0 m-0">
          Modeles Enregistrés
        </h2>
      </div>
      <div
        className={`dashboard-editor-models__models flex flex-col gap-dashboard-spacing-element-medium`}
      >
        {models && models.length > 0 ? (
          <ModelsGrid key={1} models={models} accountType="creator" />
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
    </div>
  )
}