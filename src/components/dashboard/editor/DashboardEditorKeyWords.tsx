import { Keyword } from "@/components/_shared/UI/Keyword";
import { IslandButton } from "@/components/_shared/buttons/IslandButton";
import routes from "@/routes";
import { useRouter } from "next/router";
import { useContext } from "react";
import { EditorContext } from "./_context/EditorContext";
import { useMediaQuery } from "@uidotdev/usehooks";
import { InfoMessage } from "@/components/_shared/UI/InfoMessage";

import Eye from "@/icons/eye.svg";

export const DashboardEditorKeyWords = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const router = useRouter();
  const context = useContext(EditorContext);

  return (
    <div className="dashboard-editor-keywords flex flex-col gap-dashboard-spacing-element-medium px-dashboard-mention-padding-right-left md:px-0 w-full">
      <div className="flex justify-between items-center">
        <h2 className="dashboard-title">VISIBILITÉ PAR MOTS-CLÉ</h2>
        {!isMobile && (
          <IslandButton
            type="tertiary"
            label="Catalogue"
            className="w-max"
            onClick={() => {
              router.push(routes.CATALOGUE);
            }}
          />
        )}
      </div>

      {!context.tags || context.tags.length === 0 ? (
        <div>
          <InfoMessage
            message={
              <>
                <p>Vous n'êtes actuellement par visible dans le catalogue.</p>
                <p>
                  Ajoutez un modèle et choisissez des mots-clé pour être affiché
                  dans les filtres du catalogue. Vous pouvez gérer votre
                  visibilité depuis cette section.
                </p>
              </>
            }
            bg="black"
            wFull
            Icon={Eye}
          />
        </div>
      ) : (
        <div className="db-editor__tags flex flex-wrap w-full gap-3">
          {context.tags &&
            context.tags.map((keyword, i) => {
              return <Keyword key={i} text={keyword.name} noHover />;
            })}
        </div>
      )}

      {isMobile && (
        <IslandButton
          type="tertiary"
          label="Catalogue"
          className="w-[50%] self-center mx-auto mt-dashboard-spacing-element-medium"
          onClick={() => {
            router.push(routes.CATALOGUE);
          }}
        />
      )}
    </div>
  );
};
