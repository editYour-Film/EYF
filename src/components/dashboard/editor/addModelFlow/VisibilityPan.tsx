import { useContext, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Input from "@/components/_shared/form/Input";
import { useUser } from "@/auth/authContext";
import { useLenis } from "@studio-freight/react-lenis";
import { StrapiResponse } from "@/hooks/useStrapi";
import { VideoDuration } from "@/utils/Video";
import { AddModelContext } from "../_context/AddModelContext";
import { Video } from "@/components/_shared/video/Video";
import { Button } from "@/components/_shared/buttons/Button";
import { IslandButton } from "@/components/_shared/buttons/IslandButton";
import { DashBoardContext } from "../../_context/DashBoardContext";
import { addToast, removeToast } from "@/store/slices/toastSlice";
import { useDispatch } from "react-redux";
import GreenCheck from '@/icons/check-green.svg'
import { EditorContext } from "../_context/EditorContext";
import { VisibilityType, WorkTimeLabelType, WorkTimeType } from "../data/metaValues";


export const VisibilityPan = () => {
  const context = useContext(AddModelContext);
  const editorContext = useContext(EditorContext);

  const dashBoardContext = useContext(DashBoardContext);

  const form = useRef<HTMLFormElement>(null);

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

  const durationOptions:{
    value: WorkTimeType,
    label: WorkTimeLabelType,
    helper: string
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

  const [visibilityValue, setVisibilityValue] = useState<VisibilityType | undefined>(undefined);
  const [copyWriteValue, setCopyWriteValue] = useState<string | undefined>(undefined);
  const [durationValue, setDurationValue] = useState<WorkTimeType | undefined>(undefined);
  const [videoDuration, setVideoDuration] = useState<VideoDuration>();
  const [error, setError] = useState<boolean>(false);
  const [copywriteError, setCopyWriteError] = useState("");

  const lenis = useLenis();
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    setTimeout(() => {
      const updateRes = context.handleUpdateEditorVideo();
      updateRes.then((res: StrapiResponse) => {
        if (res.status === 200) {
          context.resetData();
          dashBoardContext.setIsAddModelPannelOpen(false);
          dashBoardContext.closePanels();
          lenis.scrollTo(0);

          dispatch(removeToast(editorContext.noModelMessageId))

          dispatch(addToast({
            id: Date.now(),
            message: 'Votre modèle a été ajouté avec succès.',
            Icon: GreenCheck,
            delay: 3000,
          }))
        } else {
          console.log("error occured");
        }
      });
    }, 500);
  };

  useEffect(() => {
    context.setVisibility(visibilityValue)
    context.setCopywrite(copyWriteValue)
    context.setWorktime(durationValue)

  }, [visibilityValue, copyWriteValue, durationValue]);

  // useEffect(() => {
  //   if (context.strapiObject) {
  //     setVisibilityValue(
  //       context.strapiObject.attributes.visibility ?? visibilityOptions[0].value
  //     );
  //     setCopyWriteValue(context.strapiObject.attributes.copywrite ?? "");
  //     setDurationValue(
  //       context.strapiObject.attributes.duration ?? durationOptions[0].value
  //     );
  //   }
  // }, [context.strapiObject]);

  useEffect(() => {
    if (copywriteError) setError(true);
    else setError(false);
  }, [copywriteError]);

  useEffect(() => {
    setVideoDuration(context.videoDuration);

    dashBoardContext.setButtons(
      <Button
        type="primary"
        label="Confirmer"
        onClick={() => {
          !error && handleSubmit();
        }}
        className="w-full"
      />
    )

    lenis.scrollTo(0)

    return () => {
      dashBoardContext.setButtons(undefined)
    }
  }, []);

  return (
    <div className="infos-pan bg-dashboard-background-content-area flex flex-col gap-dashboard-spacing-element-medium">
      <div className="info-pan__video-w relative h-0 pb-[57.6%] rounded-2xl overflow-hidden border">
        <div className="absolute w-full h-full">
          <Video
            video={context.strapiObject?.attributes.video.data.attributes}
          />
        </div>
      </div>

      <div className="info-pan__video-info">
        <div className="flex justify-between items-baseline flex-wrap">
          <div className="display flex items-baseline gap-4 n27">
            <div className="text-dashboard-text-title-white-high text-title-medium font-medium uppercase tracking-widest">
              {context.title}
            </div>
          </div>
        </div>
      </div>

      <form ref={form} className="info-pan__format flex flex-col gap-8">
        <Input
          label="Visibilité"
          type="radioColumn"
          labelType="dashboard"
          helper="Choisissez de rendre votre vidéo publique, non répertoriée ou privée."
          options={visibilityOptions}
          selectedOption={visibilityValue}
          value={visibilityValue}
          helpIconText="Help"
          onChange={(e) => {
            setVisibilityValue(e);
          }}
          className="text-dashboard-text-description-base"
        />
      </form>
      <hr />
      <div>
        <Input
          label="Droits d'auteur"
          type="textarea"
          bg="light"
          labelType="dashboard"
          value={copyWriteValue}
          maxlength={150}
          size="sm"
          helpIconText="Help"
          onChange={(e) => { setCopyWriteValue(e.target.value); }}
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
        selectedOption={durationValue}
        value={durationValue}
        helpIconText="Help"
        onChange={(e) => { setDurationValue(e); }}
      />
      <hr />
      <div className="flex justify-center sm:justify-between items-center flex-wrap gap-8">
        <div>
          {error ? (
            <span className="text-appleRed text-sm ">
              Le formulaire contient des erreurs
            </span>
          ) : (
            <span className="text-base-text text-sm ">
              Vérifications terminées. Aucun problème détecté.
            </span>
          )}
        </div>
        <IslandButton
          type="primary"
          label="Suivant"
          disabled={error}
          className={`w-max`}
          onClick={() => {
            !error && handleSubmit();
          }}
        />
      </div>
    </div>
  );
};
