import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Softwares } from "../data/metaValues";
import slugify from "slugify";
import { useDispatch } from "react-redux";

import Info from "@/icons/info-gradient.svg";
import { AuthContext } from "@/context/authContext";
import { AddModel } from "../AddModel";
import { DashBoardContext } from "../../_context/DashBoardContext";
import { toast } from "react-hot-toast";
import { useStrapiDelete, useStrapiGet, useStrapiPut } from "@/hooks/useStrapi";
import GreenCheck from "@/icons/check-green.svg";

export type modelType =
  | "model 16/9 ème"
  | "model 9/16 ème"
  | "Carré"
  | "Mobile";

export interface EditorVideo {
  id: number;
  video: any;
  thumbnail: any;
  title: string;
  length: string;
  model: modelType;
  resources: any;
  user_info: user_info;
  visibility: "public" | "private" | "unrepertoried";
  copywrite: string;
  worktime: "base" | "medium" | "high";
  is_highlighted: boolean;
  description: string;
  video_tags: any /*video_tag[]*/;
}

export interface video_tag {
  name: string;
  slug: string;
  editor_videos: EditorVideo[];
}

export interface user_info {
  f_name: string;
  l_name: string;
  address: string;
  post_code: string;
  city: string;
  phone: string;
  bio: string;
  languages: any;
  picture: any;
  skills: any;
}

export const EditorContext = createContext({
  noModelMessageId: Date.now() as number,

  highlightedVideo: undefined as EditorVideo | undefined,
  setHighlightedVideo: (video: EditorVideo) => {},

  handleModifyVideo: (payload?: number) => {},
  storeHighlightedVideo: (payload?: number) => {},
  handleDisableVideo: (payload?: number) => {},
  handleEnableVideo: (payload?: number) => {},
  handleDeleteVideo: (payload?: number) => {},

  showModifyPanel: false,
  setShowModifyPanel: (payload: boolean) => {},
  hideModifyPanel: () => {},
  currentModelToModify: undefined as EditorVideo | undefined,
  setCurrentModelToModify: (payload: EditorVideo | undefined) => {},

  models: [] as EditorVideo[],
  updateCurrentModel: () => {},
  currentModelHasBeenModified: false,
  setCurrentModelHasBeenModified: (payload: boolean) => {},

  modelDescription: undefined as string | undefined,
  setModelDescription: (payload: string) => {},
  modelTitle: undefined as string | undefined,
  setModelTitle: (payload: string) => {},
  modelFormat: undefined as string | undefined,
  setModelFormat: (payload: string) => {},
  modelAudio: undefined as string | undefined,
  setModelAudio: (payload: string) => {},
  modelWorkTime: undefined as string | undefined,
  setModelWorkTime: (payload: string) => {},
  modelSoftware: undefined as string[] | undefined,
  setModelSoftware: (payload: string[]) => {},
  outLink: undefined as string | undefined,
  setOutLink: (payload: string) => {},
  tags: [] as { name: string; slug: string }[] | undefined,
  setTags: (payload: { name: string; slug: string }[] | undefined) => {},

  newTag: undefined as string | undefined,
  setNewTag: (payload: string) => {},
  addTag: (payload: string) => {},

  keywords: undefined as { name: string; slug: string }[] | undefined,
  startAddModel: () => {},
});

export const EditorContextProvider = ({ children }: PropsWithChildren) => {
  const dispatch = useDispatch();
  const authContext = useContext(AuthContext);
  const dashboardContext = useContext(DashBoardContext);

  const [noModelMessageId] = useState(Date.now());

  const [highlightedVideo, setHighlightedVideo] = useState<
    EditorVideo | undefined
  >(undefined);
  const [showModifyPanel, setShowModifyPanel] = useState<boolean>(false);
  const [models, setModels] = useState<EditorVideo[]>([]);
  const [currentModelToModify, setCurrentModelToModify] = useState<
    EditorVideo | undefined
  >(undefined);

  // Used to modify a model
  const [modelDescription, setModelDescription] = useState<string | undefined>(
    undefined
  );
  const [modelTitle, setModelTitle] = useState<string | undefined>(undefined);
  const [modelFormat, setModelFormat] = useState<string | undefined>(undefined);
  const [modelAudio, setModelAudio] = useState<string | undefined>(undefined);
  const [modelWorkTime, setModelWorkTime] = useState<string | undefined>(
    undefined
  );
  const [modelSoftware, setModelSoftware] = useState<string[] | undefined>(
    undefined
  );
  const [outLink, setOutLink] = useState<string | undefined>(undefined);
  const [tags, setTags] = useState<
    { name: string; slug: string }[] | undefined
  >(undefined);

  const [newTag, setNewTag] = useState<string | undefined>(undefined);

  const [currentModelHasBeenModified, setCurrentModelHasBeenModified] =
    useState(false);

  // Keywords
  const [keywords, setKeywords] = useState<
    { name: string; slug: string }[] | undefined
  >(undefined);

  const handleModifyVideo = async (videoId?: number) => {
    setShowModifyPanel(true);

    setCurrentModelToModify({
      user_info: authContext.user.details,
      ...authContext.user.models.find((x: any) => x.id === videoId),
    });
  };

  const hideModifyPanel = () => {
    // close the modify panel and set the current video as null
    setShowModifyPanel(false);
  };

  useEffect(() => {
    if (currentModelToModify) {
      setModelDescription(currentModelToModify?.description);
      setModelTitle(currentModelToModify?.title);
      setModelFormat(currentModelToModify?.model);
      setModelAudio("Anglais");
      setModelWorkTime(currentModelToModify?.worktime);
      setModelSoftware([Softwares[0], Softwares[1]]);
      setOutLink(
        currentModelToModify.video.data
          ? currentModelToModify.video.data.attributes.url
          : ""
      );
      setTags(currentModelToModify?.video_tags.data);
    } else {
      setCurrentModelHasBeenModified(false);
      setModelDescription(undefined);
      setModelTitle(undefined);
      setModelFormat(undefined);
      setModelAudio(undefined);
      setModelWorkTime(undefined);
      setModelSoftware(undefined);
      setOutLink(undefined);
      setTags(undefined);
    }
  }, [currentModelToModify]);

  const updateCurrentModel = () => {
    // TODO: Integration Update the video with new values (modelDescription, modelTitle, modelFormat, modelAudio, modelWorkTime, modelSoftware, outLink, tags)
    const id = currentModelToModify?.id;

    hideModifyPanel();
  };

  const storeHighlightedVideo = async (videoId?: number) => {
    const res = await useStrapiPut(
      `editor-videos/${videoId}`,
      {
        data: {
          is_highlighted: true,
        },
      },
      false
    );

    if (res.status === 200) {
      authContext.RefreshUserData();
      toast("Modèle mis en avant", {
        icon: GreenCheck,
        duration: 5000,
        className: "bg-blackBerry",
      });
    }
  };

  const handleDisableVideo = async (videoId?: number) => {
    const res = await useStrapiPut(
      `editor-videos/${videoId}`,
      {
        data: {
          visibility: "private",
        },
      },
      false
    );

    if (res.status === 200) {
      authContext.RefreshUserData();
      toast("Modèle retiré avec succés.", {
        icon: GreenCheck,
        duration: 5000,
        className: "bg-blackBerry",
      });
    }
  };

  const handleEnableVideo = async (videoId?: number) => {
    const res = await useStrapiPut(
      `editor-videos/${videoId}`,
      {
        data: {
          visibility: "public",
        },
      },
      false
    );

    if (res.status === 200) {
      authContext.RefreshUserData();
      toast("Modèle publié avec succés.", {
        icon: GreenCheck,
        duration: 5000,
        className: "bg-blackBerry",
      });
    }
  };

  const handleDeleteVideo = async (videoId?: number) => {
    const deleteVideo = await useStrapiDelete(
      `editor-videos/${videoId}`,
      false /*true*/
    );
    if (deleteVideo.status === 200) {
      toast("Modèle supprimé avec succés.", {
        icon: GreenCheck,
        duration: 5000,
        className: "bg-blackBerry",
      });
      authContext.RefreshUserData();
    }
  };

  const fetchCurrentModels = () => {
    setModels(authContext.user.models ? authContext.user.models : []);
  };

  const addTag = (tagName: string) => {
    if (tagName) {
      const t: { name: string; slug: string } = {
        name: tagName,
        slug: slugify(tagName),
      };

      tags ? setTags([...tags, t]) : setTags([t]);
    }
  };

  const startAddModel = () => {
    if (
      !dashboardContext.isAddModelPannelOpen &&
      !dashboardContext.panels?.find((p) => p.panel === <AddModel />)
    ) {
      dashboardContext.addPannel({
        title: "Ajouter un modèle",
        panel: <AddModel />,
      });

      dashboardContext.setIsAddModelPannelOpen(true);
    } else {
      dashboardContext.setIsAddModelPannelOpen(true);
      dashboardContext.panels &&
        dashboardContext.setActivePanel(dashboardContext.panels?.length - 1);
    }
  };

  useEffect(() => {
    if (models === undefined || models.length === 0) {
      toast(
        `Bienvenue ${authContext.user.details.f_name}, devenez visible. Ajoutez votre premier modèle de montage.`,
        {
          icon: Info,
          duration: 5000,
          className: "bg-blackBerry",
        }
      );
    }

    // TODO: Integration Get the highlighted video from the database
    setHighlightedVideo(undefined);

    // TODO: Integration get all the keywords related to an account
    // keyword : { name: string; slug: string }
    setKeywords([]);
  }, [authContext.user.models]);

  useEffect(() => {
    fetchCurrentModels();
  }, [authContext.user.models]);

  return (
    <EditorContext.Provider
      value={{
        noModelMessageId,

        highlightedVideo,
        setHighlightedVideo,

        handleModifyVideo,
        handleDisableVideo,
        handleEnableVideo,
        storeHighlightedVideo,
        handleDeleteVideo,

        showModifyPanel,
        setShowModifyPanel,
        hideModifyPanel,
        currentModelToModify,
        setCurrentModelToModify,

        models,
        updateCurrentModel,
        currentModelHasBeenModified,
        setCurrentModelHasBeenModified,

        modelDescription,
        setModelDescription,
        modelTitle,
        setModelTitle,
        modelFormat,
        setModelFormat,
        modelAudio,
        setModelAudio,
        modelWorkTime,
        setModelWorkTime,
        modelSoftware,
        setModelSoftware,
        outLink,
        setOutLink,
        tags,
        setTags,

        newTag,
        setNewTag,
        addTag,

        keywords,

        startAddModel,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
};
