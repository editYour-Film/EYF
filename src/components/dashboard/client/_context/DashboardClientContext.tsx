import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
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

export const ClientContext = createContext({
  noQuoteMessageId: Date.now() as number,

  showDetailPanel: false,
  setShowDetailPanel: (payload: boolean) => {},
  currentDetailModel: undefined as EditorVideo | undefined,
  setCurrentDetailModel: (payload: EditorVideo | undefined) => {},

  models: [] as EditorVideo[],

  modelDescription: undefined as string | undefined,
  modelTitle: undefined as string | undefined,
  modelFormat: undefined as string | undefined,
  modelAudio: undefined as string | undefined,
  modelWorkTime: undefined as string | undefined,
  modelSoftware: undefined as video_softwares[] | undefined,
  outLink: undefined as string | undefined,
  tags: [] as video_tag[] | undefined,
});

export const ClientContextProvider = ({ children }: PropsWithChildren) => {
  const authContext = useContext(AuthContext);

  const [noQuoteMessageId] = useState(Date.now());

  const [showDetailPanel, setShowDetailPanel] = useState<boolean>(false);
  const [models, setModels] = useState<EditorVideo[]>([]);
  const [currentDetailModel, setCurrentDetailModel] = useState<
    EditorVideo | undefined
  >(undefined);

  // Used to modify a model
  const [modelDescription] = useState<string | undefined>(undefined);
  const [modelTitle] = useState<string | undefined>(undefined);
  const [modelFormat] = useState<string | undefined>(undefined);
  const [modelAudio] = useState<string | undefined>(undefined);
  const [modelWorkTime] = useState<string | undefined>(undefined);
  const [modelSoftware] = useState<video_softwares[] | undefined>(undefined);
  const [outLink] = useState<string | undefined>(undefined);
  const [tags] = useState<video_tag[] | undefined>(undefined);

  const fetchCurrentModels = () => {
    // TODO: Integration Get the models of the user
    setModels(authContext.user.user.models ? authContext.user.user.models : []);
  };

  useEffect(() => {
    fetchCurrentModels();
  }, []);

  useEffect(() => {
    if (models === undefined || models.length === 0) {
      toast(
        `Bienvenue ${authContext.user.details.f_name}, réalisez votre premier devis pour découvrir tous les services de votre espace.`,
        {
          icon: Info,
          duration: 5000,
          className: "bg-blackBerry",
        }
      );
    }
  }, [models]);

  return (
    <ClientContext.Provider
      value={{
        noQuoteMessageId,

        models,

        showDetailPanel,
        setShowDetailPanel,

        currentDetailModel,
        setCurrentDetailModel,

        modelDescription,
        modelTitle,
        modelFormat,
        modelAudio,
        modelWorkTime,
        modelSoftware,
        outLink,
        tags,
      }}
    >
      {children}
    </ClientContext.Provider>
  );
};
