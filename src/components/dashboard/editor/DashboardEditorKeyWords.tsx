import React from "react";
import { Keyword } from "@/components/_shared/UI/Keyword";
import { IslandButton } from "@/components/_shared/buttons/IslandButton";
import routes from "@/routes";
import { useRouter } from "next/router";
import { useContext } from "react";
import { useMediaQuery } from "@uidotdev/usehooks";
import { InfoMessage } from "@/components/_shared/UI/InfoMessage";

import Eye from "@/icons/eye.svg";
import { AuthContext } from "@/context/authContext";
import { video_tag } from "./_context/EditorContext";

export const DashboardEditorKeyWords = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const router = useRouter();
  const authContext = useContext(AuthContext);

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

      {authContext.isLoading ? (
        <p>Chargement...</p>
      ) : (
        <>
          {!authContext.user.models ||
          authContext.user.models.length === 0 ||
          !authContext.user.models.find((x: any) => x.video_tags.length > 0) ? (
            <div>
              <InfoMessage
                message={
                  <>
                    <p>
                      Vous n'êtes actuellement par visible dans le catalogue.
                    </p>
                    <p>
                      Ajoutez un modèle et choisissez des mots-clé pour être
                      affiché dans les filtres du catalogue. Vous pouvez gérer
                      votre visibilité depuis cette section.
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
              {/* display list of keywords associated with the current user */}
              {authContext.user.models &&
                authContext.user.models.map((x: any) => {
                  return x.video_tags.map((keyword: video_tag, i: number) => {
                    return (
                      <React.Fragment
                        key={i}
                      >
                        <Keyword 
                          text={keyword.name} 
                          noHover 
                          isWaiting={!keyword.approved}
                          disabled={!keyword.approved}
                        />
                      </React.Fragment>
                    );
                  });
                })}
            </div>
          )}
        </>
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
