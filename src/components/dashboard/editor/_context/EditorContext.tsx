import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import Info from "@/icons/info-gradient.svg";
import { AuthContext } from "@/context/authContext";
import { AddModel } from "../AddModel";
import { DashBoardContext } from "../../_context/DashBoardContext";
import { toast } from "react-hot-toast";
import {
  useStrapiDelete,
  useStrapiGet,
  useStrapiPost,
  useStrapiPut,
} from "@/hooks/useStrapi";
import GreenCheck from "@/icons/check-green.svg";
import { VisibilityType, WorkTimeType } from "../data/metaValues";
import slugify from "slugify";

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
  audio?: string;
  model: modelType;
  resources: any;
  user_info: user_info;
  visibility: VisibilityType;
  copywrite: string;
  worktime: WorkTimeType;
  is_highlighted: boolean;
  description: string;
  video_tags: video_tag[];
  video_softwares?: video_softwares[];
  approved?: boolean;
}

export interface video_tag {
  id: number;
  name: string;
  approved?: boolean;
  slug?: string;
}

export interface video_softwares {
  label: string;
  id: number;
}

export interface user_info {
  f_name: string;
  l_name: string;
  address: string;
  post_code: string;
  city: string;
  phone: string;
  bio: string;
  picture: any;
  skills: any;
  lang_used: string;
  lang_spoken: string;
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
  setCurrentModelToModify: (payload: EditorVideo | undefined | any) => {},

  updateCurrentModel: () => {},
  currentModelHasBeenModified: false,
  setCurrentModelHasBeenModified: (payload: boolean) => {},

  modelDescription: undefined as string | undefined,
  setModelDescription: (payload: string) => {},
  modelVisibility: undefined as VisibilityType | undefined,
  setModelVisibility: (payload: VisibilityType) => {},
  modelTitle: undefined as string | undefined,
  setModelTitle: (payload: string) => {},
  modelFormat: undefined as string | undefined,
  setModelFormat: (payload: string) => {},
  modelAudio: undefined as string | undefined,
  setModelAudio: (payload: string) => {},
  modelWorkTime: undefined as string | undefined,
  setModelWorkTime: (payload: string) => {},

  modelSoftwareOptions: undefined as video_softwares[] | undefined,
  modelSoftwareOptionsArrayString: undefined as string[] | undefined,
  modelSoftware: undefined as video_softwares[] | undefined,
  setModelSoftware: (payload: video_softwares[]) => {},
  modelSoftwareArrayString: undefined as string[] | undefined,
  setModelSoftwareArrayString: (payload: string[]) => {},

  outLink: undefined as string | undefined,
  setOutLink: (payload: string) => {},

  tagsOptionsArrayString: undefined as string[] | undefined,
  tagsOptions: undefined as video_tag[] | undefined,
  tags: [] as video_tag[] | undefined,
  setTags: (payload: video_tag[] | undefined) => {},
  tagsArrayString: [] as string[] | undefined,
  setTagsArrayString: (payload: string[] | undefined) => {},
  tagsError: undefined as string | undefined,
  setTagsError: (payload: string | undefined) => {},

  newTag: undefined as string | undefined,
  setNewTag: (payload: string) => {},
  addTag: (payload: string) => {},

  startAddModel: () => {},
});

export const EditorContextProvider = ({ children }: PropsWithChildren) => {
  const authContext = useContext(AuthContext);
  const dashboardContext = useContext(DashBoardContext);

  const [noModelMessageId] = useState(Date.now());

  const [highlightedVideo, setHighlightedVideo] = useState<
    EditorVideo | undefined
  >(undefined);
  const [showModifyPanel, setShowModifyPanel] = useState<boolean>(false);
  const [currentModelToModify, setCurrentModelToModify] = useState<
    EditorVideo | undefined
  >(undefined);

  // Used to modify a model
  const [modelDescription, setModelDescription] = useState<string | undefined>(
    undefined
  );
  const [modelTitle, setModelTitle] = useState<string | undefined>(undefined);
  const [modelFormat, setModelFormat] = useState<string | undefined>(undefined);
  const [modelVisibility, setModelVisibility] = useState<
    VisibilityType | undefined
  >(undefined);
  const [modelAudio, setModelAudio] = useState<string | undefined>(undefined);
  const [modelWorkTime, setModelWorkTime] = useState<string | undefined>(
    undefined
  );

  const [modelSoftwareOptions, setModelSoftwareOptions] = useState<
    video_softwares[] | undefined
  >(undefined);
  const [modelSoftwareOptionsArrayString, setModelSoftwareOptionsArrayString] =
    useState<string[] | undefined>(undefined);
  const [modelSoftware, setModelSoftware] = useState<
    video_softwares[] | undefined
  >(undefined);
  const [modelSoftwareArrayString, setModelSoftwareArrayString] = useState<
    string[] | undefined
  >(undefined);

  const [outLink, setOutLink] = useState<string | undefined>(undefined);
  const [tagsOptions, setTagsOptions] = useState<video_tag[] | undefined>(
    undefined
  );
  const [tagsOptionsArrayString, setTagsOptionsArrayString] = useState<
    string[] | undefined
  >(undefined);
  const [tags, setTags] = useState<video_tag[] | undefined>(undefined);
  const [tagsArrayString, setTagsArrayString] = useState<string[] | undefined>(
    undefined
  );
  const [tagsError, setTagsError] = useState<string | undefined>(undefined);

  const [newTag, setNewTag] = useState<string | undefined>(undefined);

  const [currentModelHasBeenModified, setCurrentModelHasBeenModified] =
    useState(false);

  const handleModifyVideo = async (videoId?: number) => {
    setShowModifyPanel(true);

    const currentModel: EditorVideo = authContext.user.models.find(
      (x: any) => x.id === videoId
    );

    if (currentModel) setCurrentModelToModify(currentModel);
  };

  const hideModifyPanel = () => {
    setShowModifyPanel(false);
    setCurrentModelHasBeenModified(false);
  };

  useEffect(() => {
    if (currentModelToModify) {
      setModelDescription(currentModelToModify?.description);
      setModelTitle(currentModelToModify?.title);
      setModelFormat(currentModelToModify?.model);
      setModelVisibility(currentModelToModify?.visibility);
      setModelAudio(currentModelToModify?.audio);
      setModelWorkTime(currentModelToModify?.worktime);
      setOutLink(
        currentModelToModify.video.url ? currentModelToModify.video.url : ""
      );

      setModelSoftware(currentModelToModify.video_softwares);
      let _arrayStringSoftware: string[] = [];
      currentModelToModify.video_softwares?.map((x) => {
        _arrayStringSoftware.push(x.label);
      });
      setModelSoftwareArrayString(_arrayStringSoftware);

      setTags(currentModelToModify?.video_tags);
      let _arrayStringTags: string[] = [];
      currentModelToModify.video_tags?.map((x) => {
        _arrayStringTags.push(x.name);
      });
      setTagsArrayString(_arrayStringTags);
    }
  }, [currentModelToModify]);

  useEffect(() => {
    setCurrentModelHasBeenModified(true);
  }, [
    modelDescription,
    modelTitle,
    modelFormat,
    modelVisibility,
    modelAudio,
    modelWorkTime,
    modelSoftware,
    outLink,
    tags,
  ]);

  const updateCurrentModel = async () => {
    const id = currentModelToModify?.id;

    const res = await useStrapiPut(
      `editor-videos/${id}`,
      {
        data: {
          title: currentModelToModify?.title,
          description: currentModelToModify?.description,
          visibility: currentModelToModify?.visibility,
          model: currentModelToModify?.model,
          audio: currentModelToModify?.audio,
          worktime:
            (currentModelToModify?.worktime as string) === "Basique"
              ? "base"
              : (currentModelToModify?.worktime as string) === "Moyen"
              ? "medium"
              : (currentModelToModify?.worktime as string) === "Très compliqué"
              ? "high"
              : currentModelToModify?.worktime,
          video_softwares: currentModelToModify?.video_softwares,
          video_tags: currentModelToModify?.video_tags,
        },
      },
      false
    );
    if (res.status === 200) {
      hideModifyPanel();
      authContext.RefreshUserData();
      toast("Modèle modifié avec succés", {
        icon: GreenCheck,
        duration: 5000,
        className: "bg-blackBerry",
      });
    }
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

  const addTag = async (tagName: string) => {
    if (tagName.includes(" ")) {
      setTagsError("Les mots clés ne doivent pas contenir d'espaces.");
      return;
    }

    const foundTag = tagsOptions?.find(
      (x) => x.name.toLowerCase() === tagName.toLowerCase()
    );

    if (tags === undefined || tags.length < 6) {
      let _currentTags = currentModelToModify?.video_tags
        ? [...currentModelToModify?.video_tags]
        : [];

      // if found in tags options
      if (foundTag) {
        // if doesn't exist in current tag list then add it
        if (
          !_currentTags.find(
            (x) => x.name.toLowerCase() === tagName.toLowerCase()
          )
        ) {
          _currentTags.push(foundTag);
          setCurrentModelToModify((previousState: any) => ({
            ...previousState,
            video_tags: _currentTags,
          }));
        }
      } else {
        // add it to DB
        await useStrapiPost("video-tags", {
          data: {
            name: tagName,
            slug: slugify(tagName, { lower: true }),
            approved: false,
          },
        }).then((res) => {
          if (res.status === 200) {
            // add to current list
            _currentTags.push({
              id: res.data.data.id,
              name: res.data.data.attributes.name,
              slug: res.data.data.attributes.slug,
              approved: res.data.data.attributes.approved,
            });
            setCurrentModelToModify((previousState: any) => ({
              ...previousState,
              video_tags: _currentTags,
            }));
          }
        });
      }
    } else setTagsError("6 tags maximum");

    /*if (tagName) {
      const t: { name: string; slug: string } = {
        name: tagName,
        slug: slugify(tagName),
      };

      tags ? setTags([...tags, t]) : setTags([t]);
    }*/
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

  useMemo(async () => {
    // get softwares
    let _softwaresArrayString: string[] = [];
    let _softwares: video_softwares[] = [];
    await useStrapiGet("video-softwares").then((res) => {
      if (res.status === 200) {
        res.data.data.map((x: any) => {
          _softwaresArrayString.push(x.attributes.label);
          _softwares.push({
            id: x.id,
            label: x.attributes.label,
          });
        });
        setModelSoftwareOptionsArrayString(_softwaresArrayString);
        setModelSoftwareOptions(_softwares);
      }
    });

    // get tags
    let _tagsArraysString: any = [];
    let _tags: video_tag[] = [];
    await useStrapiGet("video-tags").then((res) => {
      if (res.status === 200) {
        res.data.data.map((x: any) => {
          _tagsArraysString.push(x.attributes.name);
          _tags.push({
            name: x.attributes.name,
            id: x.id,
            slug: x.attributes.slug,
            approved: x.attributes.approved,
          });
        });
        setTagsOptionsArrayString(_tagsArraysString);
        setTagsOptions(_tags);
      }
    });
  }, []);

  const [firstMessage, setFirstMessage] = useState(false)
  useEffect(() => {
    if (
      authContext.user.models === undefined ||
      authContext.user.models.length === 0 && 
      !firstMessage
    ) {
      setFirstMessage(true)
      toast(
        `Bienvenue ${authContext.user.details.f_name}, devenez visible. Ajoutez votre premier modèle de montage.`,
        {
          icon: Info,
          duration: 5000,
          className: "bg-blackBerry",
        }
      );
    } else {
      if (authContext.user.models.length === 1) {
        !authContext.user.models[0].is_highlighted &&
          storeHighlightedVideo(authContext.user.models[0].id);
      }
    }

    setHighlightedVideo(
      authContext.user.models.find((e: any) => e.is_highlighted === true)
    );
  }, [authContext.user]);

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

        updateCurrentModel,
        currentModelHasBeenModified,
        setCurrentModelHasBeenModified,

        modelDescription,
        setModelDescription,

        modelTitle,
        setModelTitle,

        modelVisibility,
        setModelVisibility,

        modelFormat,
        setModelFormat,

        modelAudio,
        setModelAudio,

        modelWorkTime,
        setModelWorkTime,

        modelSoftwareOptionsArrayString,
        modelSoftwareOptions,
        modelSoftware,
        setModelSoftware,
        modelSoftwareArrayString,
        setModelSoftwareArrayString,

        outLink,
        setOutLink,

        tagsOptionsArrayString,
        tagsOptions,
        tags,
        setTags,
        tagsArrayString,
        setTagsArrayString,
        tagsError,
        setTagsError,

        newTag,
        setNewTag,
        addTag,

        startAddModel,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
};
