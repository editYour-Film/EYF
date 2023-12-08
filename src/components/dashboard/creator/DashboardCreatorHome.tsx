import { DashboardEditorModels } from "../editor/DashboardEditorModels";

import { useContext, useEffect, useState } from "react";
import { AddModelContext as _AddModelContext } from "../editor/_context/AddModelContext";
import { NewsAndInfos } from "../shared/NewsAndInfos";
import { TitleSvgCard } from "../shared/TitleSvgCard";
import { IslandButton } from "@/components/_shared/buttons/IslandButton";
import { DashBoardContext } from "../_context/DashBoardContext";
import { AuthContext } from "@/context/authContext";
import { DashboardCreatorModels } from "./DashboardCreatorModels";
import { ClientContext } from "../client/_context/DashboardClientContext";
import { Card } from "@/components/_shared/UI/CardLinear";
import { SimpleCard } from "@/components/_shared/UI/CardSimple";
import { ClassicContent } from "@/components/_shared/UI/ClassicContent";
import routes from "@/routes";

type DashboardCreatorHomeProps = {
  className?: string;
};

export const DashboardCreatorHome = ({
  className,
}: DashboardCreatorHomeProps) => {
  const dashboardContext = useContext(DashBoardContext);
  const authContext = useContext(AuthContext);

  const clientContext = useContext(ClientContext);

  return (
    <div
      className={`dashBoard_editor__home flex flex-col gap-dashboard-spacing-element-medium ${
        className ?? ""
      }`}
    >
      {authContext.isLoading ? (
        <p>Chargement...</p>
      ) : (
            <>
              <TitleSvgCard
                title="Des nouveaux modèles de montage toutes les semaines"
                text="Notre catalogue de montage s'est encore enrichi ! Nous avons récemment ajouté des nouveaux modèles de montage, chacun apportant son propre style, sa créativité et son expertise à votre disposition.
                Ces nouveaux monteurs sont prêts à donner vie à vos projets."
                cta="Ouvrir le catalogue"
                ctaHref={routes.CATALOGUE}
                img="/img/dashboard/client/blogging-vlogging-streaming.svg"
              />
            </>
          )}

          <hr />
          <DashboardCreatorModels models={clientContext.models} />

          {(dashboardContext.infoCardActive ||
            (dashboardContext.posts && dashboardContext.posts.length > 0)) && (
            <>
              <hr />
              <NewsAndInfos />
            </>
          )}
    </div>
  );
};
