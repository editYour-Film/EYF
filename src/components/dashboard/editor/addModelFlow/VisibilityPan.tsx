import { useContext, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Input from "@/components/_shared/form/Input";
import Button from "@/components/_shared/form/Button";
import { useUser } from "@/auth/authContext";
import { useLenis } from "@studio-freight/react-lenis";
import { checkAlphanumeric } from "../../../../utils/utils";
import { StrapiResponse } from "@/hooks/useStrapi";
import { VideoDuration } from "@/utils/Video";
import { AddModelContext } from "../_context/AddModelContext";

export const VisibilityPan = () => {
  const context = useContext(AddModelContext);
  const user = useUser();
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

  const durationOptions = [
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

  const [visibilityValue, setVisibilityValue] = useState<string | undefined>(
    undefined
  );
  const [copyWriteValue, setCopyWriteValue] = useState<string | undefined>(
    undefined
  );
  const [durationValue, setDurationValue] = useState<string | undefined>(
    undefined
  );
  const [videoDuration, setVideoDuration] = useState<VideoDuration>();
  const [error, setError] = useState<boolean>(false);
  const [copywriteError, setCopyWriteError] = useState("");

  const lenis = useLenis();

  const handleSubmit = async () => {
    setTimeout(() => {
      const updateRes = context.updateEditorVideo();
      updateRes.then((res: StrapiResponse) => {
        if (res.status === 200) {
          context.setStep(3);
          lenis.scrollTo(0);
        } else {
          console.log("error occured");
        }
      });
    }, 500);
  };

  useEffect(() => {
    const data = {
      ...context.modifiedData,
      visibility: visibilityValue,
      copywrite: copyWriteValue,
      worktime: durationValue,
    };

    context.setModifiedData(data);
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

  const handleCopyWriteChange = (e: any) => {
    //checkAlphanumeric(e.target.value, setCopyWriteError);
    setCopyWriteValue(e.target.value);
  };

  useEffect(() => {
    if (copywriteError) setError(true);
    else setError(false);
  }, [copywriteError]);

  useEffect(() => {
    setVideoDuration(context.videoDuration);
  }, []);

  return (
    <div className="infos-pan bg-black p-5 flex flex-col gap-8">
      <div className="info-pan__video-w relative h-0 pb-[57.6%] rounded-2xl overflow-hidden border">
        <video controls className="object-cover absolute h-full w-full">
          <source
            src={context.strapiObject?.attributes.video.data.attributes.url}
            type={context.strapiObject?.attributes.video.data.attributes.mime}
          />
        </video>
      </div>
      <div className="info-pan__video-info">
        <div className="flex justify-between items-baseline flex-wrap">
          <div className="display flex items-baseline gap-4 n27">
            <div className="text-lg font-medium uppercase tracking-widest">
              {context.modifiedData?.title}
            </div>
            {videoDuration && (
              <div className="text-sm">
                &#40;
                {videoDuration?.min !== 0 &&
                  videoDuration?.min.toString() + " minutes"}
                {videoDuration?.sec.toString()}
                {videoDuration?.min === 0 && " secondes"}&#41;
              </div>
            )}
          </div>
          <div className="text-base-text font-light text-[17px] uppercase n27">
            {user[0].details.f_name}
          </div>
        </div>
        <div className="mt-3 text-sm">
          Lien de la video{" "}
          <Link
            className="text-primary-high text-opacity-80 hover:text-opacity-100"
            href="https://edityour.film/"
          >
            https://edityour.film/lienDeLaVideo
          </Link>
        </div>
      </div>
      <hr />
      <form ref={form} className="info-pan__format flex flex-col gap-8">
        <Input
          label="Visibilité"
          type="radioColumn"
          labelType="dashboard"
          helper="Helper"
          options={visibilityOptions}
          selectedOption={visibilityValue}
          value={visibilityValue}
          helpIconText="Help"
          onChange={(e) => {
            setVisibilityValue(e);
          }}
        />
      </form>
      <hr />
      <div>
        <Input
          label="Droits d'auteur"
          type="textarea"
          bg="light"
          labelType="dashboard"
          helper="Nos équipes vérifieront, à partir de votre déclaration, les contenus protégés par des droits d'auteur afin de mentionner les ayants droit."
          value={copyWriteValue}
          maxlength={150}
          size="sm"
          helpIconText="Help"
          onChange={(e) => {
            handleCopyWriteChange(e);
          }}
          className="h-[170px]"
        />
        {copywriteError && (
          <div className="text-error text-sm mt-2">{copywriteError}</div>
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
        onChange={(e) => {
          setDurationValue(e);
        }}
      />
      <hr />
      <div className="flex justify-center sm:justify-between items-center flex-wrap gap-8">
        <div>
          {error ? (
            <span className="text-error text-sm ">
              Le formulaire contient des erreurs
            </span>
          ) : (
            <span className="text-base-text text-sm ">
              Vérifications terminées. Aucun problème détecté.
            </span>
          )}
        </div>
        <Button
          variant="black"
          text="Suivant"
          icon="arrow-right"
          iconRight
          className={`w-max ${
            error ? "pointer-events-none opacity-10" : "bg-black opacity-50"
          }`}
          onClick={() => {
            !error && handleSubmit();
          }}
        />
      </div>
    </div>
  );
};
