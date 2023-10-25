import { useUser } from "@/auth/authContext";
import {
  useStrapiDelete,
  useStrapiGet,
  useStrapiPost,
  useStrapiPut,
} from "@/hooks/useStrapi";
import { VideoDuration } from "@/utils/Video";
import { createContext, useEffect, useState } from "react";
import slugify from "slugify";

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
  showAddModelInterface: false,
  showAddModel: () => {},
  hideAddModel: () => {},
  currentStep: 0,
  setStep: (nb: number) => {},
  currentEditorVideo: null as number | null,
  setCurrentEditorVideo: (id: number | null) => {},
  modifiedData: {} as editorVideo,
  initAddModel: () => {},
  initData: () => {},
  setModifiedData: (obj: editorVideo) => {},
  updateEditorVideo: (): any => {},
  deleteEditorVideo: (id: number) => {},
  strapiObject: {} as any,
  getCurrentStrapiObject: () => {},
  currentModels: [],
  getCurrentModels: () => {},
  defaultImage: "/img/defaults/video-thumbnail.svg",
  isModify: false,
  setIsModify: (val: boolean) => {},
  videoDuration: undefined as VideoDuration | undefined,
  setVideoDuration: (dur: VideoDuration | undefined) => {},
});

export const AddModelContextProvider: React.FC<any> = (props) => {
  const user = useUser();
  const [showAddModelInterface, setShowAddModelInterface] = useState(false);
  const [currentStep, setCurrentStep] = useState(3);
  const [currentEditorVideo, setCurrentEditorVideo] = useState<number | null>(
    null
  );

  const initData = {
    video: undefined,
    thumbnail: undefined,
    title: undefined,
    length: undefined,
    model: undefined,
    description: undefined,
    tags: undefined,
    ressources: undefined,
    user_info: undefined,
    visibility: undefined,
    copywrite: undefined,
    worktime: undefined,
    is_highlighed: undefined,
  };
  const [isModify, setIsModify] = useState(false);

  const [modifiedData, setModifiedData] = useState<editorVideo | {}>(initData);

  const [videoDuration, setVideoDuration] = useState<VideoDuration | undefined>(
    undefined
  );

  const setStep = (nb: number) => {
    setCurrentStep(nb);
  };

  const showAddModel = () => {
    setShowAddModelInterface(true);
  };

  const hideAddModel = () => {
    setShowAddModelInterface(false);
  };

  const handleUpdateEditorVideo = async (): Promise<unknown> => {
    if (currentEditorVideo) {
      const formData = new FormData();
      const fieldsData: any = {};

      for (const [key, value] of Object.entries(modifiedData)) {
        if (value) {
          if (["video", "thumbnail"].includes(key)) {
            formData.append(
              `files.${key}`,
              value as File,
              (value as File).name
            );
          }

          // else if (key === 'ressources') {
          //   for (let i = 0; i < value.files.length; i++)
          //     formData.append(
          //       `files.${key}`,
          //       value.files[i],
          //       value.files[i].name
          //   );
          // }
          else if (key === "is_highlighted")
            fieldsData["is_highlighted"] = value;
          else if (key === "tags") {
            const tagArray = value;

            const existingTags = await useStrapiGet("video-tags", true);

            let tagsIds: number[] = [];
            (tagArray as { name: string; slug: string }[]).forEach(
              async (tag: any) => {
                let toCreate = true;
                existingTags.data.data.forEach((existingTag: any) => {
                  const slug = existingTag.attributes.slug;

                  if (slug === tag.slug) {
                    toCreate = false;
                    tagsIds.push(existingTag.id);
                    return;
                  }
                });

                if (toCreate) {
                  // eslint-disable-next-line react-hooks/rules-of-hooks
                  const newTag = await useStrapiPost(
                    "video-tags",
                    {
                      data: {
                        name: tag.name,
                        slug: slugify(tag.slug, { lower: true }),
                      },
                    },
                    // user[1]
                    false
                  );

                  tagsIds.push(newTag.data.data.id);
                }
              }
            );

            fieldsData["video_tags"] = {
              set: tagsIds,
            };
          } else {
            fieldsData[key] = value.toString();
          }
        }
      }

      formData.append("data", JSON.stringify(fieldsData));

      const prom = new Promise(async (resolve, reject) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const res = await useStrapiPut(
          `editor-videos/${currentEditorVideo}?populate=*`,
          formData,
          true
        );

        resolve(res);
      });

      return prom;
    }
  };

  const handleDeleteEditorVideo = async (id: number) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const res = await useStrapiDelete(`editor-videos/${id}`, user[1]);
    getCurrentModels();
  };

  const initAddModel = () => {
    handleInitData();
    showAddModel();
  };

  const handleInitData = () => {
    setStep(0);
    setCurrentEditorVideo(null);
    setModifiedData(initData);
    setIsModify(false);
  };

  const [strapiObject, setStrapiObject] = useState<any>();
  const getCurrentStrapiObject = () => {
    return new Promise(async (res) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const response = await useStrapiGet(
        `editor-videos/${currentEditorVideo}?populate=*`,
        user[1]
      );
      setStrapiObject(response.data.data);
      res(response);
    });
  };

  const [currentModels, setCurrentModels] = useState<any>();
  const getCurrentModels = async () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const models = await useStrapiGet(
      "editor-videos?filters[user_info][id][$eq]=" +
        user[0].details.id +
        "&populate=*",
      // should be updated to true (set to false for test purposes)
      false
    );

    setCurrentModels(models.data.data);
  };

  useEffect(() => {
    handleInitData();
  }, []);

  return (
    <AddModelContext.Provider
      value={{
        showAddModelInterface,
        showAddModel,
        hideAddModel,
        currentStep,
        setStep,
        currentEditorVideo,
        setCurrentEditorVideo,
        currentModels,
        getCurrentModels,
        modifiedData,
        setModifiedData,
        initData: () => {
          handleInitData();
        },
        initAddModel: () => {
          initAddModel();
        },
        strapiObject,
        getCurrentStrapiObject: () => {
          return getCurrentStrapiObject();
        },
        updateEditorVideo: (): Promise<unknown> => {
          return handleUpdateEditorVideo();
        },
        deleteEditorVideo: (id) => {
          handleDeleteEditorVideo(id);
        },
        defaultImage: "/img/defaults/video-thumbnail.svg",
        isModify,
        setIsModify,
        videoDuration,
        setVideoDuration,
      }}
    >
      {props.children}
    </AddModelContext.Provider>
  );
};
