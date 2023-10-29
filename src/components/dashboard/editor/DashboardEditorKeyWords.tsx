import { Keyword } from "@/components/_shared/UI/Keyword";
import { IslandButton } from "@/components/_shared/buttons/IslandButton";
import Button from "@/components/_shared/form/Button";
import routes from "@/routes";
import { useRouter } from "next/router";
import { useContext } from "react";
import { EditorContext } from "./_context/EditorContext";

export const DashboardEditorKeyWords = () => {
  const router = useRouter();
  const context = useContext(EditorContext);

  return (
    <div className="dashboard-editor-keywords flex flex-col px-dashboard-mention-padding-right-left md:px-0 w-full">
      <h2 className="dashboard-title">VISIBILITÉ PAR MOTS-CLÉ</h2>

      <div className="db-editor__tags flex flex-wrap w-full gap-3 mt-dashboard-spacing-element-medium">
        {context.keywords &&
          context.keywords.map((keyword, i) => {
            return <Keyword key={i} text={keyword.name} noHover />;
          })}
      </div>

      <IslandButton
        type="tertiary"
        label="Catalogue"
        className="w-[50%] self-center mx-auto mt-dashboard-spacing-element-medium"
        onClick={() => {
          router.push(routes.CATALOGUE);
        }}
      />
    </div>
  );
};
