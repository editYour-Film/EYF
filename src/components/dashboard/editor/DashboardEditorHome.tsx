import { DashboardEditorModels } from "./DashboardEditorModels";
import { DashboardEditorKeyWords } from "./DashboardEditorKeyWords";

import { useContext, useEffect, useState } from "react";
import { useUser } from "@/auth/authContext";
import {
  AddModelContext as _AddModelContext,
} from "./_context/AddModelContext";
import { NewsAndInfos } from "../shared/NewsAndInfos";
import { EditorContext } from "./_context/EditorContext";
import { HightlightedVideo } from "./HighlightedVideo";
import { ModifyVideoPanel } from "./ModifyVideoPanel";
import { TitleSvgCard } from "../shared/TitleSvgCard";
import { IslandButton } from "@/components/_shared/buttons/IslandButton";
import { DashBoardContext } from "../_context/DashBoardContext";

type DashboardEditorHomeProps = {
  className?: string
}

export const DashboardEditorHome = ({className}:DashboardEditorHomeProps) => {
  const AddModelContext = useContext(_AddModelContext);
  const dashboardContext = useContext(DashBoardContext)
  const editorCtx = useContext(EditorContext)

  const user = useUser();
  const [highlightedVideo, setHighLightedVideo] = useState<any>(null);

  useEffect(() => {
    AddModelContext.getCurrentModels();

    setHighLightedVideo(
      user.models && user.models.filter((x: any) => x.is_highlighted).length > 0
        ? user.models.filter((x: any) => x.is_highlighted)[0]
        : false
    );
  }, []);

  return (
    <div className={`dashBoard_editor__home flex flex-col gap-dashboard-spacing-element-medium ${className ?? ''}`}>
      {editorCtx.highlightedVideo 
        ? <HightlightedVideo />
        : <>
            <TitleSvgCard
              className=""
              img="/img/dashboard/computer-coffee.png"
              title="Ajoutez un modèle de montage, et rejoignez notre catalogue."
              text="Ajoutez jusqu'à 6 modèles de montage à afficher dans le catalogue. Vos modèles augmentent votre visibilité auprès des créateur.rice.s en quête d'un monteur.se. Le premier modèle que vous ajoutez sera mis en avant sur votre profil public."
            />
            <IslandButton
              type="secondary"
              label="Ajouter un modèle"
              onClick={() => {
                dashboardContext.setIsAddModelPannelOpen(true)
              }}
            />
          </>
      }
      
      <hr />
      <DashboardEditorModels models={editorCtx.models} />
      <hr />
      <NewsAndInfos />
      <hr />
      <DashboardEditorKeyWords />

      <ModifyVideoPanel />
    </div>
  );
};
