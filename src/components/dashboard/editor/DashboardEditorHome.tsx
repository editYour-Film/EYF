import { DashboardEditorModels } from "./DashboardEditorModels";
import { DashboardEditorKeyWords } from "./DashboardEditorKeyWords";

import { useContext, useEffect, useState } from "react";
import { AddModelContext as _AddModelContext } from "./_context/AddModelContext";
import { NewsAndInfos } from "../shared/NewsAndInfos";
import { EditorContext } from "./_context/EditorContext";
import { HightlightedVideo } from "./HighlightedVideo";
import { ModifyVideoPanel } from "./ModifyVideoPanel";
import { TitleSvgCard } from "../shared/TitleSvgCard";
import { IslandButton } from "@/components/_shared/buttons/IslandButton";
import { DashBoardContext } from "../_context/DashBoardContext";
import { AuthContext } from "@/context/authContext";

type DashboardEditorHomeProps = {
  className?: string;
};

export const DashboardEditorHome = ({
  className,
}: DashboardEditorHomeProps) => {
  const dashboardContext = useContext(DashBoardContext);
  const authContext = useContext(AuthContext);

  const editorContext = useContext(EditorContext);

  const [highlightedVideo, setHighLightedVideo] = useState<any>(null);

  useEffect(() => {
    setHighLightedVideo(
      authContext.user.models &&
        authContext.user.models.filter((x: any) => x.is_highlighted).length > 0
        ? authContext.user.models.filter((x: any) => x.is_highlighted)[0]
        : false
    );
  }, []);

  return (
    <div
      className={`dashBoard_editor__home flex flex-col gap-dashboard-spacing-element-medium ${
        className ?? ""
      }`}
    >
      {authContext.isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          {editorContext.highlightedVideo ? (
            <HightlightedVideo />
          ) : (
            <>
              <TitleSvgCard
                className=""
                type="imgBottomRight"
                img="/img/dashboard/computer-coffee.svg"
                title="Ajoutez un modèle de montage, et rejoignez notre catalogue."
                text="Ajoutez jusqu'à 6 modèles de montage à afficher dans le catalogue. Vos modèles augmentent votre visibilité auprès des créateur.rice.s en quête d'un monteur.se. Le premier modèle que vous ajoutez sera mis en avant sur votre profil public."
              />
              <IslandButton
                type="secondary"
                label="Ajouter un modèle"
                onClick={() => {
                  dashboardContext.setIsAddModelPannelOpen(true);
                }}
                className="md:hidden"
              />
            </>
          )}

          <hr />
          <DashboardEditorModels models={authContext.user.models} />
          {(dashboardContext.infoCardActive ||
            (dashboardContext.posts && dashboardContext.posts.length > 0)) && (
            <>
              <hr />
              <NewsAndInfos />
            </>
          )}
        </>
      )}
      <hr />
      <DashboardEditorKeyWords />

      <ModifyVideoPanel />
    </div>
  );
};
