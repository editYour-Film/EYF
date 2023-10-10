import { ResponsiveImg } from "@/components/_shared/ResponsiveImg";
import Button from "../../_shared/form/Button";
import { DashboardNotif } from "../shared/DashboardNotif";
import { TitleSvgCard } from "../shared/TitleSvgCard";
import { useContext } from "react";
import { AddModelContext } from "./_context/AddModelContext";

type highlightedModelProps = {
  highlightedModel: any;
};

export const DashboardEditorCover = ({
  highlightedModel,
}: highlightedModelProps) => {
  const context = useContext(AddModelContext);
  const newNotif = (type: string) => {
    return {
      type: type,
    };
  };

  const notifs = [
    newNotif("upToDate"),
    newNotif("proposition"),
    newNotif("missionEnded"),
    newNotif("agenda"),
  ];

  return (
    <div
      className={`dashboard-editor-cover w-full relative ${
        highlightedModel ? "" : "p-2 lg:p-5"
      } bg-alphaWhite bg-opacity-10 rounded-3xl`}
    >
      <div
        className={`dashboard-editor-cover__ui w-full left-0 top-0 ${
          highlightedModel ? "absolute p-2 lg:p-5" : "relative"
        } z-10`}
      >
        <div className="flex justify-between w-full">
          <Button
            variant="black"
            text="Voir mon profil public"
            className="w-max"
            onClick={() => {}}
          />

          <DashboardNotif notifs={notifs} />
        </div>
      </div>

      <div
        className={`dashboard-editor-cover__img relative ${
          highlightedModel && "pb-[100%] lg:pb-[55%] xl:pb-[39%]"
        } rounded-3xl overflow-hidden`}
      >
        {highlightedModel ? (
          <ResponsiveImg
            isStatic
            data={
              highlightedModel.thumbnail.data
                ? highlightedModel.thumbnail.data.attributes.url
                : context.defaultImage
            }
            alt="TextAlternatif"
            w={{ xs: 0 }}
            className="object-cover absolute top-0 left-0 w-full h-full"
          />
        ) : (
          <TitleSvgCard
            className=""
            img="/img/dashboard/computer-coffee.svg"
            title="Mettez un modèle en avant."
            text="Lorsque vous ajoutez un modèle, le premier modèle ajouté est mis en avant sur votre profil. Vous pouvez choisir le modèle que vous souhaitez mettre en avant en sélectionnant le modèle choisi puis cliquez sur “Mettre en avant”."
          />
        )}
      </div>
    </div>
  );
};
