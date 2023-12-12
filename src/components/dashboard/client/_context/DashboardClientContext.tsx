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
import { toast } from "react-hot-toast";
import {
  EditorVideo,
  video_softwares,
  video_tag,
} from "../../editor/_context/EditorContext";
import { useStrapiGet } from "@/hooks/useStrapi";
import { VisibilityType } from "../../editor/data/metaValues";

export const ClientContext = createContext({
  showDetailPanel: false,
  setShowDetailPanel: (payload: boolean) => {},
  currentDetailModel: undefined as EditorVideo | undefined,
  setCurrentDetailModel: (payload: EditorVideo | undefined) => {},

  models: [] as EditorVideo[],
  removeFromPicked: (payload:number) => {},

  handleDetailVideo: (payload: number) => {},
  hideDetailsPanel: () => {},

  modelDescription: undefined as string | undefined,
  modelTitle: undefined as string | undefined,
  modelFormat: undefined as string | undefined,
  modelAudio: undefined as string | undefined,
  modelWorkTime: undefined as string | undefined,
  modelSoftware: undefined as video_softwares[] | undefined,
  outLink: undefined as string | undefined,
  tags: [] as video_tag[] | undefined,
  modelVisibility: undefined as VisibilityType | undefined,
  modelSoftwareArrayString: undefined as string[] | undefined,
  tagsArrayString: [] as string[] | undefined,
});

export const ClientContextProvider = ({ children }: PropsWithChildren) => {
  const authContext = useContext(AuthContext);

  const [showDetailPanel, setShowDetailPanel] = useState<boolean>(false);
  const [models, setModels] = useState<EditorVideo[]>([]);
  const [currentDetailModel, setCurrentDetailModel] = useState<
    EditorVideo | undefined
  >(undefined);

  // Used to modify a model
  const [modelDescription, setModelDescription] = useState<string | undefined>(undefined);
  const [modelTitle, setModelTitle] = useState<string | undefined>(undefined);
  const [modelFormat, setModelFormat] = useState<string | undefined>(undefined);  
  const [modelVisibility, setModelVisibility] = useState<VisibilityType | undefined>(undefined);
  const [modelAudio, setModelAudio] = useState<string | undefined>(undefined);
  const [modelWorkTime, setModelWorkTime] = useState<string | undefined>(undefined);
  const [modelSoftware, setModelSoftware] = useState<video_softwares[] | undefined>(undefined);
  const [outLink, setOutLink] = useState<string | undefined>(undefined);
  const [tags, setTags] = useState<video_tag[] | undefined>(undefined);
  const [modelSoftwareArrayString, setModelSoftwareArrayString] = useState<
    string[] | undefined
  >(undefined);
  const [tagsArrayString, setTagsArrayString] = useState<string[] | undefined>(
    undefined
  );


  const handleDetailVideo = (id:number) => {
    setShowDetailPanel(true);

    const currentModel: EditorVideo | undefined = models.find(
      (x: any) => x.id === id
    );

    if (currentModel) setCurrentDetailModel(currentModel);
  }

  const hideDetailsPanel = () => {
    setShowDetailPanel(false);
  };

  const removeFromPicked = (id: number) => {
    //TODO: Integration Remove the current model from the picked model of the user
  }

  useEffect(() => {
    if (currentDetailModel) {
      setModelDescription(currentDetailModel?.description);
      setModelTitle(currentDetailModel?.title);
      setModelFormat(currentDetailModel?.model);
      setModelVisibility(currentDetailModel?.visibility);
      setModelAudio(currentDetailModel?.audio);
      setModelWorkTime(currentDetailModel?.worktime);
      setOutLink(
        currentDetailModel.video.url ? currentDetailModel.video.url : ""
      );
      
      setModelSoftware(currentDetailModel.video_softwares);
      
      let _arrayStringSoftware: string[] = [];
      currentDetailModel.video_softwares?.data.map((x:any) => {        
        _arrayStringSoftware.push(x.attributes.label);
      });

      setModelSoftwareArrayString(_arrayStringSoftware);
      
      setTags(currentDetailModel?.video_tags);
      let _arrayStringTags: string[] = [];
      currentDetailModel.video_tags?.data.map((x:any) => {
        _arrayStringTags.push(x.attributes.name);
      });
      setTagsArrayString(_arrayStringTags);      
    }
  }, [currentDetailModel]);

  const fetchUserSelectedModels = () => {
    // TODO: Integration Get the models of the user
    setModels(authContext.user.details.pickedmodels ?? []);

    useStrapiGet(`user-infos/${authContext.user.details.id}?[populate][picked_models][populate]=*`).then((res) => {      
      setModels(res.data.data.attributes.picked_models.data.map((model:any) => {return {id:model.id, ...model.attributes}}))
    })
  };

  useEffect(() => {
    fetchUserSelectedModels();
  }, []);

  const [firstMessage, setFirstMessage] = useState(false)
  useEffect(() => {
    if (
      !firstMessage
    ) {
      setFirstMessage(true)
      toast(
        `Bienvenue ${authContext.user.details.f_name}, réalisez votre premier devis pour découvrir tous les services de votre espace.`,
        {
          icon: Info,
          duration: 5000,
          className: "bg-blackBerry",
        }
      );
    }
  }, [authContext.user]);

  return (
    <ClientContext.Provider
      value={{
        models,

        showDetailPanel,
        setShowDetailPanel,

        currentDetailModel,
        setCurrentDetailModel,

        handleDetailVideo,
        hideDetailsPanel,

        removeFromPicked,

        modelDescription,
        modelTitle,
        modelFormat,
        modelVisibility,
        modelAudio,
        modelWorkTime,
        modelSoftware,
        modelSoftwareArrayString,
        outLink,
        tags,
        tagsArrayString,
      }}
    >
      {children}
    </ClientContext.Provider>
  );
};

export type ClientContextType = typeof ClientContext extends React.Context<infer U> ? U : never
