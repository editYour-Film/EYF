import { useContext, useEffect, useRef, useState } from "react";
import Input from "@/components/_shared/form/Input";
import { useLenis } from "@studio-freight/react-lenis";
import { StrapiResponse } from "@/hooks/useStrapi";
import { VideoDuration } from "@/utils/Video";
import { AddModelContext } from "../_context/AddModelContext";
import { Video } from "@/components/_shared/video/Video";
import { Button } from "@/components/_shared/buttons/Button";
import { IslandButton } from "@/components/_shared/buttons/IslandButton";
import { DashBoardContext } from "../../_context/DashBoardContext";
import GreenCheck from "@/icons/check-green.svg";
import {
  VisibilityType,
  WorkTimeLabelType,
  WorkTimeType,
} from "../data/metaValues";
import useMediaQuery from "@/hooks/useMediaQuery";
import { toast } from "react-hot-toast";

import Close from "@/icons/dashboard/x.svg";
import { InfoMessage } from "@/components/_shared/UI/InfoMessage";
import { MentionInteraction } from "@/components/_shared/buttons/MentionInteraction";
import { inputErrors } from "@/const";
import Error from "@/icons/x-circle.svg";
import Play from "@/icons/player-play.svg";
import Image from "next/image";
import validator from "validator";

export const VisibilityPan = () => {
  const context = useContext(AddModelContext);
  const dashboardContext = useContext(DashBoardContext);

  const form = useRef<HTMLFormElement>(null);

  const isMobile = useMediaQuery("(max-width: 768px)");

  const visibilityOptions = [
    {
      value: "public",
      label: "Publique",
      helper:
        "Tout le monde peut voir votre vidéo affichée dans le catalogue lorsque vous avez renseigné vos disponibilités depuis votre agenda.",
    },
    {
      value: "unrepertoried",
      label: "Non répertoriée",
      helper:
        "Tous les utilisateurs disposant du lien peuvent regarder votre vidéo",
    },
    {
      value: "private",
      label: "Privée",
      helper:
        "Seul vous pouvez regarder votre vidéo depuis votre espace monteur.",
    },
  ];

  const durationOptions: {
    value: WorkTimeType;
    label: WorkTimeLabelType;
    helper: string;
  }[] = [
    {
      value: "base",
      label: "Basique",
      helper:
        "Recherche minimale et peu de temps nécessaire, montage simple et rapide.",
    },
    {
      value: "medium",
      label: "Moyen",
      helper:
        "Recherche modérée, temps raisonnable, montage nécessitant une certaine compétence.",
    },
    {
      value: "high",
      label: "Très compliqué",
      helper:
        "Recherche intensive, temps substantiel, montage complexe nécessitant des compétences avancées.",
    },
  ];

  const [visibilityValue, setVisibilityValue] = useState<
    VisibilityType | undefined
  >(undefined);
  const [copyWriteValue, setCopyWriteValue] = useState<string | undefined>(
    undefined
  );
  const [durationValue, setDurationValue] = useState<WorkTimeType | undefined>(
    undefined
  );
  const [error, setError] = useState<boolean>(false);
  const [copywriteError, setCopyWriteError] = useState("");

  const [imgUrl, setImgUrl] = useState<string | undefined>(undefined);
  const [hideCover, setHideCover] = useState<boolean>(false);

  const lenis = useLenis();

  const handleSubmit = async () => {
    setCopyWriteError("");

    let err = false;
    if (
      context.copywrite === undefined ||
      validator.isEmpty(context.copywrite)
    ) {
      err = true;
      setCopyWriteError(inputErrors.required);
    }
    if (context.copywrite && context.copywrite?.split(" ").length > 200) {
      setCopyWriteError("Le text doit contenir 200 mots maximum");
      err = true;
    }

    if (!err) {
      setTimeout(() => {
        const updateRes = context.handleUpdateEditorVideo();
        updateRes.then((res: StrapiResponse) => {
          if (res.status === 200) {
            context.resetData();
            dashboardContext.setIsAddModelPannelOpen(false);
            dashboardContext.closePanels();
            lenis.scrollTo(0);

            toast.custom(
              <InfoMessage
                message="Votre modèle a été ajouté avec succès."
                Icon={GreenCheck}
              />
            );
          } else
            toast(inputErrors.general, {
              icon: Error,
              duration: 5000,
              className: "bg-blackBerry",
            });
        });
      }, 500);
    }
  };

  useEffect(() => {
    context.setVisibility(visibilityValue);
    context.setCopywrite(copyWriteValue);
    context.setWorktime(durationValue);
  }, [visibilityValue, copyWriteValue, durationValue]);

  useEffect(() => {
    if (context.strapiObject) {
      setVisibilityValue(
        context.strapiObject.attributes.visibility ?? visibilityOptions[0].value
      );
      setCopyWriteValue(context.strapiObject.attributes.copywrite ?? "");
      setDurationValue(
        context.strapiObject.attributes.duration ?? durationOptions[0].value
      );
    }
  }, [context.strapiObject]);

  useEffect(() => {
    if (copywriteError) setError(true);
    else setError(false);
  }, [copywriteError]);

  useEffect(() => {
    dashboardContext.setButtons(
      <Button
        type="primary"
        label="Confirmer"
        onClick={() => {
          handleSubmit();
        }}
        className="w-full"
      />
    );

    lenis.scrollTo(0);

    return () => {
      dashboardContext.setButtons(undefined);
    };
  }, []);

  useEffect(() => {
    context.thumbnail &&
      setImgUrl(URL.createObjectURL(context.thumbnail as File));
  }, [context.thumbnail]);

  const [playVideo, setPlayVideo] = useState(false);

  return (
    <div className="visibility-pan bg-dashboard-background-content-area flex flex-col gap-dashboard-spacing-element-medium pt-[50px] md:pt-0 pb-[150px] md:pb-0">
      {isMobile && (
        <IslandButton
          type="secondary"
          Icon={Close}
          iconColor="appleRed"
          onClick={() => {
            dashboardContext.setIsAddModelPannelOpen(false);
            context.setCurrentStep(undefined);
            context.abort();
          }}
          className="w-max self-end mr-dashboard-button-separation-spacing"
        />
      )}

      <div className="visibility-pan__video-w relative h-0 pb-[57.6%] rounded-t-2xl overflow-hidden border">
        <div className="absolute w-full h-full">
          {imgUrl && (
            <div
              className={`absolute group top-0 left-0 w-full h-full flex justify-center items-center z-10 transition-opacity ${
                playVideo ? "opacity-0 pointer-events-none" : "opacity-100"
              }`}
              onClick={() => {
                setPlayVideo(true);
              }}
            >
              <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center z-10 bg-blackBerry bg-opacity-20 transition-opacity opacity-0 group-hover:opacity-100 cursor-pointer">
                <Play className="w-[50px] h-[50px] " />
              </div>
              {imgUrl && (
                <Image
                  src={imgUrl}
                  alt="cover de la vidéo"
                  fill
                  className={`object-cover`}
                />
              )}
            </div>
          )}
          <Video
            playerFullWidth
            video={context.strapiObject?.attributes.video.data.attributes}
            className="h-full z-0"
            onPlay={() => {
              setHideCover(true);
            }}
            onPause={() => {
              setHideCover(false);
              setPlayVideo(false);
            }}
            trigger={playVideo}
          />
        </div>
      </div>

      <div className="visibility-pan__video-info">
        <div className="flex justify-between items-baseline flex-wrap">
          <div className="display flex items-baseline gap-4 n27">
            <div className="text-dashboard-text-title-white-high text-title-medium font-medium uppercase tracking-widest">
              {context.title}
            </div>
          </div>
        </div>
      </div>

      <form
        ref={form}
        className="visibility-pan__format flex flex-col gap-8 px-padding-medium md:px-0"
      >
        <Input
          label="Visibilité"
          type="radioColumn"
          labelType="dashboard"
          helper="Choisissez de rendre votre vidéo publique, non répertoriée ou privée."
          options={visibilityOptions}
          selectedOption={context.visibility}
          value={context.visibility}
          helpIconText="Help"
          onChange={(e) => {
            context.setVisibility(e);
          }}
          className="text-dashboard-text-description-base"
        />
        <hr />
        <div>
          <Input
            label="Droits d'auteur"
            type="textarea"
            bg="light"
            labelType="dashboard"
            value={context.copywrite}
            maxlength={200}
            size="sm"
            helpIconText="Maximum 200 mots"
            onChange={(e) => {
              context.setCopywrite(e.target.value);
            }}
            className="h-[170px]"
          />
          {copywriteError && (
            <div className="text-appleRed text-sm mt-2">{copywriteError}</div>
          )}
        </div>

        <hr />
        <Input
          label="Temps de travail"
          type="radioColumn"
          labelType="dashboard"
          helper="Évaluez le niveau de recherche et de temps de travail nécessaire à ce type de montage."
          options={durationOptions}
          selectedOption={context.worktime}
          value={context.worktime}
          helpIconText="Help"
          onChange={(e) => {
            context.setWorktime(e);
          }}
        />
      </form>
      <div className="flex justify-center w-full sm:justify-end items-center flex-wrap gap-8">
        <div className="flex items-center gap-dashboard-button-separation-spacing">
          <MentionInteraction onClick={() => context.abort()} className="h-max">
            Annuler
          </MentionInteraction>

          <IslandButton
            type="primary"
            label="Suivant"
            className={`w-max`}
            onClick={() => {
              handleSubmit();
            }}
          />
        </div>
      </div>
    </div>
  );
};
