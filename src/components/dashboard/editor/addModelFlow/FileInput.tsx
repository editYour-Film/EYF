import { useRef, useContext, useState, FormEvent, ChangeEvent } from "react";
import Link from "next/link";
import { useUser } from "@/auth/authContext";
import { useStrapiPost } from "@/hooks/useStrapi";
import Button from "@/components/_shared/form/Button";

import Upload from "@/icons/dashboard/upload.svg";
import Warning from "@/icons/dashboard/alert-octagon.svg";
import { TitleSvgCard } from "../../shared/TitleSvgCard";
import { getDuration } from "@/utils/Video";
import { AddModelContext } from "../_context/AddModelContext";

type FileInputProps = {};

export const FileInput = ({}: FileInputProps) => {
  const context = useContext(AddModelContext);
  const input = useRef<HTMLInputElement>(null);
  const form = useRef<HTMLFormElement>(null);

  const [selectedFile, setSelectedFile] = useState<null | File>(null);
  const [selectedName, setSelectedName] = useState<null | string>(null);

  const [isValid, setIsValid] = useState<null | boolean>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [loading, setLoading] = useState(false);

  const formatError = (
    <span>
      Format de fichier incorrect. <Link href="/">En savoir plus</Link>
    </span>
  );
  const unknowError = (
    <span>Quelque chose s&#39;est mal passé, veuillez réessayer</span>
  );
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState<JSX.Element>(formatError);

  const user = useUser();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    const elementData: any = {};

    elementData["user_info"] = user[0].details.id;
    Array.from(form.current!.elements).map((input: any) => {
      if (!["file"].includes(input.type)) elementData[input.name] = input.value;
      else if (input.type === "file")
        for (let i = 0; i < input.files.length; i++) {
          formData.append(
            `files.${input.name}`,
            input.files[i],
            input.files[i].name
          );
        }
    });

    formData.append("data", JSON.stringify(elementData));

    setLoading(true);
    const resEditorVideo = await useStrapiPost(
      "editor-videos",
      formData,
      true,
      true
    );
    setLoading(false);

    if (resEditorVideo.status === 200) {
      context.setStep(1);
      context.setCurrentEditorVideo(resEditorVideo.data.data.id);
    } else {
      setError(true);
      setErrorMsg(unknowError);
    }
    resEditorVideo;
  };

  const handleDragOver = () => {
    setIsDragging(true);
  };

  const handleDrop = () => {
    setIsDragging(false);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!["video/mp4"].includes(e.target.files![0].type)) {
      setError(true);
      setErrorMsg(formatError);
    } else {
      setSelectedFile(e.target.files![0]);
      form.current?.requestSubmit();
    }
  };

  return (
    <>
      <div className="file-input flex flex-col gap-5 items-end">
        <Button
          variant="black"
          icon="cross"
          iconLeft
          className="w-max h-8"
          onClick={() => {
            context.hideAddModel();
          }}
          text=""
        />

        <div>{selectedName}</div>

        <div
          className={`w-full relative bg-black rounded-3xl flex justify-center items-center border border-white border-opacity-0 ${
            isDragging && "border-opacity-30"
          }`}
          onDragOver={() => {
            handleDragOver();
          }}
          onDragEnter={() => {
            handleDragOver();
          }}
          onDrop={() => {
            handleDrop();
          }}
          onDragLeave={() => {
            handleDrop();
          }}
        >
          <div className="flex flex-col gap-8 px-14 py-16 items-center">
            <Upload />
            <div className="text-center flex flex-col items-center gap-4">
              <div className="n27 text-2xl">
                Glissez-déposez le fichier que vous souhaitez mettre en ligne
              </div>
              <div className="text-base-text w-7/12">
                Vos vidéos resteront privées jusqu’à leur publication. Chaque
                modèle est vérifié avant d’être publié dans le catalogue.
              </div>

              {error && (
                <div className="flex flex-row gap-2 items-center">
                  <Warning />
                  {errorMsg}
                </div>
              )}
              {loading && <span>Loading ...</span>}
            </div>

            <form
              ref={form}
              className="absolute top-0 left-0 w-full h-full z-0"
              action=""
              onSubmit={(e) => {
                handleSubmit(e);
              }}
            >
              <label htmlFor="video" className="opacity-0 ">
                {" "}
                Sélectionnez une video{" "}
              </label>
              <input
                ref={input}
                type="file"
                name="video"
                id="video"
                className="opacity-0 w-full h-full"
                accept="video/mp4,video/x-m4v,video/*"
                onChange={(e) => handleChange(e)}
              />
            </form>

            <Button
              variant="primary"
              text="Sélectionnez des fichiers"
              className={`w-max z-10 ${loading && "opacity-50"}`}
              onClick={() => {
                input.current?.click();
              }}
            />
          </div>
        </div>
      </div>
      {(user[0].models?.length < 3 || !user[0].models) && (
        <TitleSvgCard
          className="mt-5"
          img="/img/dashboard/charts.svg"
          title="Augmentez votre visibilité"
          text="En ajoutant des modèles vous augmentez vos chances d’être vu par les créateurs à la recherche d’un monteur pour leur prochain projet. Nous vous conseillons d’ajouter 3 modèles pour apparaître le plus largement possible."
        />
      )}
    </>
  );
};
