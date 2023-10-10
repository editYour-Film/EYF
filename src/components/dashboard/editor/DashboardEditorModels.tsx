import { VideoModel } from "./VideoModel";
import Button from "@/components/_shared/form/Button";
import { VideoCard } from "@/components/_shared/video/VideoCard";
import { Video } from "@/components/model/videos";
import { useContext } from "react";
import { AddModelContext } from "./_context/AddModelContext";

type DashboardEditorModelsProps = {
  models: any;
};

export const DashboardEditorModels = ({
  models,
}: DashboardEditorModelsProps) => {
  const context = useContext(AddModelContext);
  const testVideo: Video = {
    id: "id",
    title: "title",
    madeBy: "nobody",
    path: "/video/top_video_5bc1b8a04f.webm",
    thumbnail: "",
    type: "type",
    isMobile: false,
    profilePath: "",
  };

  const handleModify = (id: number) => {
    context.setCurrentEditorVideo(id);
    context.setStep(1);
    context.showAddModel();
    context.setIsModify(true);
  };

  const handleDelete = (id: number) => {
    context.deleteEditorVideo(id);
  };

  return (
    <div className="dashboard-editor-models">
      <div className="dashboard-editor-models__head flex flex-col sm:flex-row flex-wrap sm:justify-between sm:items-center">
        <h2 className="dashboard-title mt-0 mb-4">Modeles Importés</h2>
        <Button
          variant="primary"
          text={
            models && models.length
              ? "Ajouter un modèle"
              : "Pourquoi ajouter un modèle ?"
          }
          onClick={() => {
            if (models && models.length) {
              context.initAddModel();
            } else {
              // Push some route
            }
          }}
          className="w-max"
        />
      </div>
      <div
        className={`dashboard-editor-models__models ${
          models &&
          models.length &&
          "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-3 gap-y-4 lg:gap-y-12"
        } mt-12`}
      >
        {models && models.length ? (
          models.map((model: any, i: number) => {
            return (
              <VideoModel
                key={i}
                data={model.attributes.video.data}
                thumbnail={
                  model.attributes.thumbnail.data
                    ? model.attributes.thumbnail.data.attributes.url
                    : context.defaultImage
                }
                onModify={() => {
                  handleModify(model.id);
                }}
                onDelete={() => {
                  handleDelete(model.id);
                }}
              />
            );
          })
        ) : (
          <div
            className={`dashboard-editor-models__placeholder relative flex flex-col-reverse md:flex-row lg:flex-col-reverse xl:flex-row md:items-center lg:items-stretch gap-8 gradient-pastel w-full rounded-3xl p-4 lg:p-8 xl:p-14`}
          >
            <div className="bg-pattern opacity-10 absolute w-full h-full top-0 left-0"></div>

            <div className="dashboard-editor-models__content text-black basis-5/12 flex flex-col gap-4">
              <div className="n27 text-2xl font-medium ">
                Devenez visible, ajoutez un modèle
              </div>
              <div>
                Korem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                vulputate libero et velit interdum, ac aliquet odio mattis.
              </div>
              <Button
                variant="black"
                text="Ajouter un modèle"
                onClick={() => {
                  context.initAddModel();
                }}
                className="w-max z-10"
              />
            </div>

            <div className="dashboard-editor-models__video basis-1/2 flex-grow">
              <div className="relative h-0 w-full pb-[56%] rounded-2xl overflow-hidden">
                <VideoCard video={testVideo} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
