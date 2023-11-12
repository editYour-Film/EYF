import {
  useStrapiDelete,
  useStrapiGet,
  useStrapiPost,
  useStrapiPut,
} from "@/hooks/useStrapi";
import { VideoDuration } from "@/utils/Video";
import { createContext, useContext, useEffect, useState } from "react";
import { DashBoardContext } from "../../_context/DashBoardContext";
import { modelType, user_info } from "./EditorContext";
import { VisibilityType, WorkTimeType } from "../data/metaValues";
import toast from "react-hot-toast";
import Error from "@/icons/x-circle.svg";
import { AuthContext } from "@/context/authContext";

type editorVideo = {
  video?: File | undefined;
  thumbnail?: File | undefined;
  title?: string | undefined;
  length?: string | undefined;
  model?: string | undefined;
  description?: string | undefined;
  tags?: { name: string; slug: string }[] | undefined;
  ressources?: File[] | undefined;
  user_info?: number | undefined;
  visibility?: string | undefined;
  copywrite?: string | undefined;
  workTime?: string | undefined;
  is_highlighted?: boolean | undefined;
};

export const AddModelContext = createContext({
  currentStep: undefined as number | undefined,
  setCurrentStep: (nb: number | undefined) => {},

  currentEditorVideo: null as number | null,
  setCurrentEditorVideo: (id: number | null) => {},

  resetData: () => {},
  handleInitContext: () => {},
  abort: () => {},

  handleUpdateEditorVideo: (): any => {},

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
  length: undefined as string | undefined,
  setLength: (payload: string | undefined) => {},
  model: undefined as modelType | undefined,
  setModel: (payload: modelType | undefined) => {},
  description: undefined as string | undefined,
  setDescription: (payload: string | undefined) => {},
  tags: undefined as { name: string; slug: string }[] | undefined,
  setTags: (payload: { name: string; slug: string }[] | undefined) => {},
  ressources: undefined as any,
  setRessources: (payload: any) => {},
  user_info: undefined as user_info | undefined,
  setUser_info: (payload: user_info | undefined) => {},
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

  const [currentStep, setCurrentStep] = useState<number | undefined>(undefined);
  const [currentEditorVideo, setCurrentEditorVideo] = useState<number | null>(
    null
  );

  const [video, setVideo] = useState<number | undefined>(undefined);
  const [thumbnail, setThumbnail] = useState<File | undefined>(undefined);
  const [title, setTitle] = useState<string | undefined>(undefined);
  const [length, setLength] = useState<string | undefined>(undefined);
  const [model, setModel] = useState<modelType | undefined>(undefined);
  const [description, setDescription] = useState<string | undefined>(undefined);
  const [tags, setTags] = useState<
    { name: string; slug: string }[] | undefined
  >(undefined);
  const [ressources, setRessources] = useState<any>(undefined);
  const [user_info, setUser_info] = useState<user_info | undefined>(undefined);
  const [visibility, setVisibility] = useState<VisibilityType | undefined>(
    undefined
  );
  const [copywrite, setCopywrite] = useState<string | undefined>(undefined);
  const [worktime, setWorktime] = useState<WorkTimeType | undefined>(undefined);
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
    user_info,
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
      user_info,
      visibility,
      copywrite,
      worktime,
      is_highlighed,
    });
  }, [title]);

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
    setLength(undefined);
    setModel(undefined);
    setDescription(undefined);
    setTags(undefined);
    setRessources(undefined);
    setUser_info(undefined);
    setVisibility(undefined);
    setCopywrite(undefined);
    setWorktime(undefined);
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
  }, [currentEditorVideo]);

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
        defaultImage: "/img/defaults/video-thumbnail.svg",

        isModify,
        setIsModify,

        video,
        setVideo,
        thumbnail,
        setThumbnail,
        title,
        setTitle,
        length,
        setLength,
        model,
        setModel,
        description,
        setDescription,
        tags,
        setTags,
        ressources,
        setRessources,
        user_info,
        setUser_info,
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
