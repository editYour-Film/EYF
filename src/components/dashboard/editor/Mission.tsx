
type MissionProps = {
  data: any;
};

export const Mission = ({ data }: MissionProps) => {
  return (
    <div className="db-editor-mission bg-black rounded-3xl sm:p-5 flex flex-col lg:flex-row justify-between items-start">
      <div className="db-editor-mission__img relative h-1/2 w-full basis-1/2 shrink-0 rounded-3xl border overflow-hidden">
        <div className="w-full h-0 pb-[56%]">

        </div>
      </div>
      <div className="db-editor-mission__infos flex flex-col gap-2 basis-1/2 shrink-0 p-5 pr-0">
        <div className="db-editor-mission-head w-full flex flex-col sm:flex-row gap-2 sm:gap-4 justify-start sm:items-end">
          <div className="db-editor-mission__title">{data.title}</div>
          <div className="db-editor-mission__duration">
            {"(" + data.duration + ")"}
          </div>
        </div>
        <div className="db-editor-mision-line2 flex flex-row items-center text-[14px] text-primary-light">
          <div className="db-editor-mision-ressources">
            {data.ressourceNb} Ressources
          </div>
          <div className="dot w-1 h-1 rounded-full bg-primary-light mx-2"></div>
          <div className="db-editor-mision-model">{data.modelName}</div>
        </div>
        <div className="db-editor-mision-date flex flex-row capitalize text-[14px] text-primary-light">
          {data.date.toLocaleDateString("fr-fr", {
            month: "long",
            year: "numeric",
          })}
        </div>

        <div className="db-editor-mission-infos-bottom flex flex-wrap flex-row gap-2 text-[12px] text-primary-light">
          <div className="db-editor-mission-client p-2 flex justify-center items-center bg-background-card rounded-lg">
            {data.client}
          </div>
          <div className="db-editor-mission-ressources2 p-2 flex justify-center items-center bg-background-card rounded-lg">
            {data.ressourceNb} Ressources
          </div>
          <div className="db-editor-mission-remaining-days p-2 flex justify-center items-center bg-background-card rounded-lg">
            {Math.floor((data.deadline - Date.now()) / (1000 * 60 * 60 * 24))}j
            restants
          </div>
        </div>
      </div>
    </div>
  );
};
