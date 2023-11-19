import {
  useStrapiDelete,
  useStrapiGet,
  useStrapiPost,
  useStrapiPut,
} from "@/hooks/useStrapi";
import { VideoDuration } from "@/utils/Video";
import { createContext, useContext, useEffect, useState } from "react";
import { DashBoardContext } from "../../_context/DashBoardContext";
import { modelType } from "./EditorContext";
import { VisibilityType, WorkTimeType } from "../data/metaValues";
import toast from "react-hot-toast";
import Error from "@/icons/x-circle.svg";
import { AuthContext } from "@/context/authContext";
import { formatVideoDuration } from "@/utils/utils";
import validator from "validator";
import { inputErrors } from "@/const";
import { AddModel } from "../AddModel";
import { useMediaQuery } from "@uidotdev/usehooks";

export const AddModelContext = createContext({
  currentStep: undefined as number | undefined,
  setCurrentStep: (nb: number | undefined) => {},

  currentEditorVideo: null as number | null,
  setCurrentEditorVideo: (id: number | null) => {},

  resetData: () => {},
  handleInitContext: () => {},
  abort: () => {},

  handleUpdateEditorVideo: (): any => {},
  handleSubmitInfoPan: (): any => {},

  strapiObject: {} as any,
  getCurrentStrapiObject: () => {},

  defaultImage: "/img/defaults/video-thumbnail.svg",

  isModify: false,
  setIsModify: (val: boolean) => {},

  video: undefined as number | undefined,
  setVideo: (payload: number | undefined) => {},
  thumbnail: undefined as File | undefined,
  setThumbnail: (payload: File | undefined) => {},

  title: undefined as string | undefined,
  setTitle: (payload: string | undefined) => {},
  titleError: undefined as string | undefined,
  setTitleError: (payload: string | undefined) => {},

  length: undefined as string | undefined,
  setLength: (payload: string | undefined) => {},
  model: undefined as modelType | undefined,
  setModel: (payload: modelType | undefined) => {},
  description: undefined as string | undefined,
  setDescription: (payload: string | undefined) => {},
  descriptionError: undefined as string | undefined,
  setDescriptionError: (payload: string | undefined) => {},

  tags: undefined as { name: string; slug: string }[] | undefined,
  setTags: (payload: { name: string; slug: string }[] | undefined) => {},
  tagsError: undefined as string | undefined,
  setTagsError: (payload: string | undefined) => {},

  ressources: undefined as any,
  setRessources: (payload: any) => {},
  visibility: undefined as VisibilityType | undefined,
  setVisibility: (payload: VisibilityType | undefined) => {},
  copywrite: undefined as string | undefined,
  setCopywrite: (payload: string | undefined) => {},
  worktime: undefined as WorkTimeType | undefined,
  setWorktime: (payload: WorkTimeType | undefined) => {},
  is_highlighed: undefined as boolean | undefined,
  setIs_highlighed: (payload: boolean | undefined) => {},
  videoDuration: undefined as VideoDuration | undefined,
  setVideoDuration: (dur: VideoDuration | undefined) => {},
});

export const AddModelContextProvider: React.FC<any> = (props) => {
  const dashboardContext = useContext(DashBoardContext);
  const authContext = useContext(AuthContext);
  const isMobile = useMediaQuery("(max-width: 768px)");

  const [currentStep, setCurrentStep] = useState<number | undefined>(undefined);
  const [currentEditorVideo, setCurrentEditorVideo] = useState<number | null>(
    null
  );

  const [video, setVideo] = useState<number | undefined>(undefined);
  const [thumbnail, setThumbnail] = useState<File | undefined>(undefined);

  const [title, setTitle] = useState<string | undefined>(undefined);
  const [titleError, setTitleError] = useState<string | undefined>(undefined);

  const [length, setLength] = useState<string | undefined>(undefined);
  const [model, setModel] = useState<modelType | undefined>("model 16/9 ème");

  const [description, setDescription] = useState<string | undefined>(undefined);
  const [descriptionError, setDescriptionError] = useState<string | undefined>(
    undefined
  );

  const [tags, setTags] = useState<
    { name: string; slug: string }[] | undefined
  >(undefined);
  const [tagsError, setTagsError] = useState<string | undefined>(undefined);

  const [ressources, setRessources] = useState<any>(undefined);
  const [visibility, setVisibility] = useState<VisibilityType | undefined>(
    undefined
  );
  const [copywrite, setCopywrite] = useState<string | undefined>(undefined);
  const [worktime, setWorktime] = useState<WorkTimeType | undefined>("base");
  const [is_highlighed, setIs_highlighed] = useState<boolean | undefined>(
    undefined
  );

  const [modifiedData, setModifiedData] = useState<any>({
    video,
    thumbnail,
    title,
    length,
    model,
    description,
    tags,
    ressources,
    visibility,
    copywrite,
    worktime,
    is_highlighed,
  });

  const [isModify, setIsModify] = useState(false);
  const [videoDuration, setVideoDuration] = useState<VideoDuration | undefined>(
    undefined
  );

  useEffect(() => {
    setModifiedData({
      video,
      thumbnail,
      title,
      length,
      model,
      description,
      tags,
      ressources,
      visibility,
      copywrite,
      worktime,
      is_highlighed,
    });
  }, [title]);

  const handleSubmitInfoPan = () => {
    setDescriptionError("");
    setTagsError("");
    setTitleError("");

    let err = false;

    if (title === undefined || validator.isEmpty(title)) {
      err = true;
      setTitleError(inputErrors.required);
    }

    if (description === undefined || validator.isEmpty(description)) {
      err = true;
      setDescriptionError(inputErrors.required);
    }

    if (description && description?.split(" ").length < 50) {
      err = true;
      setDescriptionError("Veuillez entrer un texte de 50 mots minimum");
    }

    if (!err) {
      if (isMobile) setCurrentStep(2);
      else {
        dashboardContext.addPannel({
          title: "Details",
          panel: <AddModel step={2} />,
        });
      }
    }
  };

  const handleUpdateEditorVideo = async (): Promise<unknown> => {
    if (currentEditorVideo) {
      if (thumbnail) {
        const formData = new FormData();
        const fileSize = (thumbnail.size / 1024 / 1024).toFixed(2);
        if (
          parseInt(fileSize) >
          parseInt(process.env.NEXT_PUBLIC_MAX_FILE_SIZE_PROFILE as string)
        )
          toast(
            "La miniature a une photo très volumineuse, elle ne doit pas dépasser les " +
              process.env.NEXT_PUBLIC_MAX_FILE_SIZE +
              " mb.",
            {
              icon: Error,
              duration: 5000,
              className: "bg-blackBerry",
            }
          );
        else {
          formData.append("files", thumbnail, thumbnail?.name);
          formData.append("ref", "api::editor-video.editor-video");
          formData.append("refId", String(currentEditorVideo));
          formData.append("field", "thumbnail");

          const uploadRes = await useStrapiPost(
            "upload",
            formData,
            false,
            true
          );

          if (uploadRes.status !== 200)
            toast(
              "Une erreur est survenue lors de l'upload de votre miniature.",
              {
                icon: Error,
                duration: 5000,
                className: "bg-blackBerry",
              }
            );
        }
      }

      const prom = new Promise(async (resolve, reject) => {
        var video = document.querySelector("video") as HTMLVideoElement;

        const res = await useStrapiPut(
          `editor-videos/${currentEditorVideo}`,
          {
            data: {
              title: title,
              copywrite: copywrite,
              description: description,
              is_highlighed: is_highlighed === true,
              model: model,
              visibility: visibility,
              worktime: worktime,
              length: formatVideoDuration(video.duration),
            },
          },
          false
        );

        if (res.status === 200) authContext.RefreshUserData();

        resolve(res);
      });

      return prom;
    }
  };

  const resetData = () => {
    setVideo(undefined);
    setThumbnail(undefined);
    setTitle(undefined);
    setTitleError(undefined);
    setLength(undefined);
    setModel("model 16/9 ème");
    setDescription(undefined);
    setTags(undefined);
    setRessources(undefined);
    setVisibility(undefined);
    setCopywrite(undefined);
    setWorktime("base");
    setIs_highlighed(undefined);
  };

  const handleInitContext = () => {
    setCurrentStep(0);
    setCurrentEditorVideo(null);
    setIsModify(false);
    resetData();
  };

  const abort = () => {
    resetData();
    if (currentEditorVideo)
      useStrapiDelete(`editor-videos/${currentEditorVideo}`, false /*true*/);
  };

  const [strapiObject, setStrapiObject] = useState<any>();
  const getCurrentStrapiObject = () => {
    return new Promise(async (res) => {
      if (currentEditorVideo) {
        const response = await useStrapiGet(
          `editor-videos/${currentEditorVideo}?populate=*`,
          false /*true*/
        );
        setStrapiObject(response.data.data);

        res(response);
      }
    });
  };

  useEffect(() => {
    getCurrentStrapiObject();
  }, []);

  useEffect(() => {
    dashboardContext.isAddModelPannelOpen === true && handleInitContext();
  }, [dashboardContext.isAddModelPannelOpen]);

  return (
    <AddModelContext.Provider
      value={{
        currentStep,
        setCurrentStep,
        currentEditorVideo,
        setCurrentEditorVideo,

        resetData,
        handleInitContext,
        abort,

        strapiObject,
        getCurrentStrapiObject,

        handleUpdateEditorVideo,
        handleSubmitInfoPan,
        defaultImage: "/img/defaults/video-thumbnail.svg",

        isModify,
        setIsModify,

        video,
        setVideo,
        thumbnail,
        setThumbnail,

        title,
        setTitle,
        titleError,
        setTitleError,

        length,
        setLength,
        model,
        setModel,

        description,
        setDescription,
        descriptionError,
        setDescriptionError,

        tags,
        setTags,
        tagsError,
        setTagsError,

        ressources,
        setRessources,
        visibility,
        setVisibility,
        copywrite,
        setCopywrite,
        worktime,
        setWorktime,
        is_highlighed,
        setIs_highlighed,
        videoDuration,
        setVideoDuration,
      }}
    >
      {props.children}
    </AddModelContext.Provider>
  );
};
