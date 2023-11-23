import {
  skillsInterface,
  spokenLanguageInterface,
} from "@/components/dashboard/_context/ProfilContext";
import { codeStateType } from "@/components/signin/_context/signinContext";
import routes from "@/routes";
import {
  RefObject,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { ReactElement } from "react-markdown/lib/react-markdown";

import InfoIcon from "@/icons/info.svg";
import Check from "@/icons/signin/check.svg";
import X from "@/icons/signin/x.svg";

import { MessageType } from "@/components/_shared/UI/InfoMessage";
import { StepBubbleProps } from "@/components/_shared/buttons/StepBubble";
import { ElementsIn } from "@/Animations/elementsIn";
import { ElementsOut } from "@/Animations/elementsOut";
import { useStrapiGet, useStrapiPost } from "@/hooks/useStrapi";
import { inputErrors, languageObjects } from "@/const";
import validator from "validator";
import { getGoogleAuthEmailCookie } from "@/auth/auth";
import useLocalStorage from "@/hooks/useLocalStorage";
import { RegisterUser } from "@/components/model/signin";
import { MentionInteraction } from "@/components/_shared/buttons/MentionInteraction";
import { useRouter } from "next/router";
import { AuthContext } from "@/context/authContext";

export type accountType = "editor" | "creator" | "both" | undefined;
export type maxStepType = 5 | 6 | 7 | undefined;

export const userNameMessages = {
  default: {
    message: "Votre nom d'utilisateur est unique.",
    Icon: InfoIcon,
    type: "regular",
  } as MessageType,
  error: {
    message: "Ce nom d'utilisateur existe déjà",
    Icon: X,
    type: "danger",
  } as MessageType,
  success: {
    message: "Nom d'utilisateur disponible.",
    Icon: Check,
    type: "regular",
  } as MessageType,
  generalError: {
    message: inputErrors.general,
    Icon: X,
    type: "danger",
  } as MessageType,
};

export const SignUpContext = createContext({
  langOptions: [] as spokenLanguageInterface[] | undefined,
  skillsOptions: [] as skillsInterface[] | undefined,
  isLoadingLangSkills: true,

  accountType: undefined as accountType,
  setAccountType: (accountType: accountType) => {},
  maxSteps: undefined as maxStepType,
  currentStep: 0,
  setCurrentStep: (payload: number) => {},
  dots: undefined as StepBubbleProps[] | undefined,
  handleStart: () => {},

  disclaimer: undefined as ReactElement | undefined,

  email: undefined as string | undefined,
  setEmail: (payload: string) => {},
  emailErrorMessage: undefined as ReactElement | undefined | undefined | string,
  setEmailErrorMessage: (payload: string) => {},
  handleSendAgain: () => {},
  handleGoToCode: () => {},

  code: "" as string | undefined,
  setCode: (payload: string) => {},
  codeState: "regular" as codeStateType,
  resetCodeState: () => {},
  handleCodeVerification: (payload: string) => {},

  f_name: undefined as string | undefined,
  setF_name: (payload: string) => {},
  f_nameError: undefined as string | undefined,

  l_name: undefined as string | undefined,
  setL_name: (payload: string) => {},
  l_nameError: undefined as string | undefined,

  username: undefined as string | undefined,
  setUsername: (payload: string) => {},
  handleUserNameVerification: () => {},
  userNameAvailable: undefined as boolean | undefined,
  setUserNameAvailable: (payload: boolean) => {},
  userNameMessage: undefined as MessageType | undefined,
  setUserNameMessage: (payload: MessageType) => {},

  initials: undefined as string | undefined,

  editorPicture: undefined as any,
  setEditorPicture: (payload: any) => {},
  editorPictureName: undefined as string | undefined,
  setEditorPictureName: (payload: any) => {},
  editorPictureOk: undefined as boolean | undefined,

  editorDescription: undefined as string | undefined,
  setEditorDescription: (payload: string) => {},
  editorDescriptionOk: undefined as boolean | undefined,

  creatorPicture: undefined as any,
  setCreatorPicture: (payload: any) => {},
  creatorPictureName: undefined as string | undefined,
  setCreatorPictureName: (payload: any) => {},
  creatorPictureOk: undefined as boolean | undefined,

  spokenLanguages: undefined as spokenLanguageInterface[] | undefined,
  setSpokenLanguages: (payload: spokenLanguageInterface[]) => {},

  skills: undefined as skillsInterface[] | undefined,
  setSkills: (payload: skillsInterface[]) => {},

  joinNewsletter: undefined as boolean | undefined,
  setJoinNewsletter: (payload: boolean) => {
    false;
  },
  lastStepError: undefined as string | undefined,
  handleGoToDashboard: () => {},

  setContainer: (payload: any) => {},
  entrance: (payload: RefObject<HTMLDivElement>) => {},
  goBack: () => {},
  goNext: () => {},
  goNextNoAnimation: () => {},
});

const initRegisterUser = {
  currentStep: 0,
  accountType: "editor" as any,
  email: undefined as string | undefined,
  fname: undefined,
  lname: undefined,
  username: undefined,
  editorPicture: undefined,
  editorPictureName: undefined,
  editorDescription: undefined,
  creatorPicture: undefined,
  creatorPictureName: undefined,
  languages: undefined,
  skills: undefined,
  joinNewsletter: true,
  lang_spoken: undefined,
};

export const SignUpContextProvider: React.FC<any> = (props) => {
  const router = useRouter();

  const authContext = useContext(AuthContext);

  const [registerUser, setRegisterUser] = useLocalStorage<RegisterUser>(
    "register_user",
    initRegisterUser
  );

  const [skillsOptions, setSkillsOptions] = useState<skillsInterface[]>();

  const [isLoadingLangSkills, setIsLoadingLangSkills] = useState(true);

  const [email, setEmail] = useState<string | undefined>(
    registerUser.email && registerUser.email?.length > 0
      ? registerUser.email
      : getGoogleAuthEmailCookie()
  );
  const [emailErrorMessage, setEmailErrorMessage] = useState<
    ReactElement | undefined | undefined | string
  >(undefined);

  const [accountType, setAccountType] = useState<accountType>(
    registerUser.accountType
  );
  const [maxSteps, setMaxSteps] = useState<maxStepType>(undefined);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [dots, setDots] = useState<StepBubbleProps[] | undefined>(undefined);

  const [code, setCode] = useState<string | undefined>(undefined);
  const [codeState, setCodeState] = useState<codeStateType>("regular");

  const [f_name, setF_name] = useState<string | undefined>(registerUser.fname);
  const [f_nameError, setF_nameError] = useState<string | undefined>(undefined);

  const [l_name, setL_name] = useState<string | undefined>(registerUser.lname);
  const [l_nameError, setL_nameError] = useState<string | undefined>(undefined);

  const [username, setUsername] = useState<string | undefined>(
    registerUser.username
  );
  const [userNameAvailable, setUserNameAvailable] = useState<
    boolean | undefined
  >(undefined);
  const [userNameMessage, setUserNameMessage] = useState<MessageType>(
    userNameMessages.default
  );

  const [initials, setInitials] = useState<string | undefined>(
    f_name && l_name ? f_name[0] + l_name[0] : undefined
  );

  const [editorPicture, setEditorPicture] = useState<FileList[0] | undefined>(
    undefined // registerUser.editorPicture
  );
  const [editorPictureName, setEditorPictureName] = useState<
    string | undefined
  >(undefined /*registerUser.editorPictureName*/);
  const [editorPictureOk, setEditorPictureOk] = useState<boolean | undefined>(
    undefined
  );

  const [editorDescription, setEditorDescription] = useState<
    string | undefined
  >(registerUser.editorDescription);
  const [editorDescriptionOk, setEditorDescriptionOk] = useState<
    boolean | undefined
  >(undefined);

  const [creatorPicture, setCreatorPicture] = useState<FileList[0] | undefined>(
    undefined //registerUser.creatorPicture
  );
  const [creatorPictureName, setCreatorPictureName] = useState<
    string | undefined
  >(undefined /*registerUser.creatorPictureName*/);
  const [creatorPictureOk, setCreatorPictureOk] = useState<boolean | undefined>(
    undefined
  );

  const [spokenLanguages, setSpokenLanguages] = useState<
    spokenLanguageInterface[] | undefined
  >(
    registerUser.languages
      ? registerUser.languages
      : languageObjects()
      ? [languageObjects().find((x) => x.label === "Français")]
      : undefined
  );

  const [skills, setSkills] = useState<skillsInterface[] | undefined>(
    registerUser.skills
  );

  const [joinNewsletter, setJoinNewsletter] = useState<boolean | undefined>(
    registerUser.joinNewsletter
  );

  const [lastStepError, setLastStepError] = useState<string | undefined>();

  useMemo(async () => {
    // get skills
    let _skills: any = [];
    await useStrapiGet("video-softwares").then((res) => {
      if (res.status === 200) {
        res.data.data.map((x: any) => {
          _skills.push({
            label: x.attributes.label,
            id: x.id,
          });
        });
        setSkillsOptions(_skills);
      }
    });
  }, []);

  useEffect(() => {
    if (registerUser.currentStep > 0) setCurrentStep(registerUser.currentStep);
  }, []);

  const disclaimer = (
    <span className="text-dashboard-text-description-base-low">
      En continuant j’accepte les{" "}
      <MentionInteraction
        onClick={() => {
          router.push(routes.ML);
        }}
      >
        mentions légales
      </MentionInteraction>{" "}
      et la{" "}
      <MentionInteraction
        onClick={() => {
          router.push(routes.PC);
        }}
      >
        Politique de confidentialité
      </MentionInteraction>{" "}
      de editYour.Film.
    </span>
  );

  const defineMaxSteps = () => {
    switch (accountType) {
      case "editor":
        setMaxSteps(6);
        break;
      case "creator":
        setMaxSteps(5);
        break;
      case "both":
        setMaxSteps(7);
        break;
    }
  };

  useEffect(() => {
    if (maxSteps) {
      let _dots = [];
      for (let i = 0; i < maxSteps; i++) {
        _dots.push({
          selected: i === currentStep - 1,
        });
      }
      setDots(_dots);
    }

    const langUniqueIds: any = [];
    const skillsUniqueIds: any = [];
    setRegisterUser({
      currentStep: currentStep,
      accountType: accountType,
      email: email,
      fname: f_name,
      lname: l_name,
      username: username,
      //editorPicture: editorPicture ? JSON.stringify(editorPicture) : undefined,
      //editorPictureName: editorPictureName,
      editorDescription: editorDescription,
      /*creatorPicture: creatorPicture
        ? JSON.stringify(creatorPicture)
        : undefined,*/
      //creatorPictureName: creatorPictureName,
      languages: spokenLanguages
        ? spokenLanguages.filter((element: any) => {
            const isDuplicate = langUniqueIds.includes(element.id);
            if (!isDuplicate) {
              langUniqueIds.push(element.id);
              return true;
            }
            return false;
          })
        : undefined,
      skills: skills
        ? skills.filter((element: any) => {
            const isDuplicate = skillsUniqueIds.includes(element.id);
            if (!isDuplicate) {
              skillsUniqueIds.push(element.id);
              return true;
            }
            return false;
          })
        : undefined,
      joinNewsletter: joinNewsletter,
    });
  }, [currentStep]);

  const handleStart = () => {
    defineMaxSteps();
  };

  const handleGoToCode = async () => {
    setEmailErrorMessage(undefined);
    if (!email) {
      setEmailErrorMessage(inputErrors.required);
      return;
    } else if (!validator.isEmpty(email) && !validator.isEmail(email)) {
      setEmailErrorMessage(inputErrors.invalidEmail);
      return;
    }

    const sendToken = await useStrapiPost(
      "generate-token-signup",
      {
        email: email,
        role: accountType === "editor" ? 4 : 3,
      },
      false
    );
    if (sendToken.status && sendToken.status === 200) {
      if (typeof sendToken.data === "string") {
        if (sendToken.data.includes("exist"))
          setEmailErrorMessage(inputErrors.accountExist);
      } else if (sendToken.data === true) goNext();
    } else setEmailErrorMessage(inputErrors.general);
  };

  const handleCodeVerification = async (value: string) => {
    // check the code and set the code state accordingly
    setCodeState("loading");

    const verifyToken = await useStrapiPost(
      "custom-signup",
      {
        email: email,
        token: value,
      },
      false
    );

    if (verifyToken.status && verifyToken.status === 200) {
      if (typeof verifyToken.data === "string") {
        if (
          verifyToken.data.includes("error") ||
          verifyToken.data.includes("not sent")
        )
          setCodeState("error");
        if (verifyToken.data.includes("not valid"))
          setCodeState("errorInvalid");
        if (verifyToken.data.includes("expired")) setCodeState("errorExpired");
      } else if (verifyToken.data === true) setCodeState("success");
    } else setCodeState("error");
  };

  const handleSendAgain = async () => {
    const regenerateToken = await useStrapiPost(
      "generate-token-signup",
      {
        email: email,
      },
      false
    );

    if (regenerateToken.status && regenerateToken.status === 200) {
      if (typeof regenerateToken.data === "string") {
        if (
          regenerateToken.data.includes("error") ||
          regenerateToken.data.includes("not sent")
        )
          setCodeState("error");
      } else if (regenerateToken.data === true) setCodeState("successResend");
    } else setCodeState("error");
  };

  const resetCodeState = () => {
    setCodeState("regular");
  };

  useEffect(() => {
    setInitials(f_name && l_name ? f_name[0] + l_name[0] : undefined);
  }, [l_name, f_name]);

  const handleUserNameVerification = async () => {
    // check availability of username and change the username message accordingly
    if (username && username?.length > 0) {
      //if Availiable

      const checkUsername = await useStrapiPost(
        "check-username",
        {
          username: username,
        },
        false
      );

      if (checkUsername.status && checkUsername.status === 200) {
        if (checkUsername.data === true) {
          setUserNameAvailable(true);
          setUserNameMessage(userNameMessages.success);
        } else {
          setUserNameAvailable(false);
          setUserNameMessage(userNameMessages.error);
        }
      } else {
        setUserNameAvailable(false);
        setUserNameMessage(userNameMessages.generalError);
      }
    }
    //if Undefined
    else {
      setUserNameAvailable(undefined);
      setUserNameMessage(userNameMessages.default);
    }
  };

  const handleEditorPicturVerification = () => {
    if (editorPicture) {
      const fileSize = (editorPicture?.size / 1024 / 1024).toFixed(2);
      // Verify if the file size < 20 mb
      setEditorPictureOk(
        parseInt(fileSize) <=
          parseInt(process.env.NEXT_PUBLIC_MAX_FILE_SIZE_PROFILE as string)
      );
    } else setEditorPictureOk(true);
  };

  useEffect(() => {
    handleEditorPicturVerification();
  }, [editorPicture]);

  const handleEditorDescriptionVerification = () => {
    // Verify if the description is ok
    if (editorDescription) setEditorDescriptionOk(true);
  };

  useEffect(() => {
    handleEditorDescriptionVerification();
  }, [editorDescription]);

  const handleCreatorPicturVerification = () => {
    if (creatorPicture) {
      const fileSize = (creatorPicture?.size / 1024 / 1024).toFixed(2);
      // Verify if the file size < 20 mb
      setCreatorPictureOk(
        parseInt(fileSize) <=
          parseInt(process.env.NEXT_PUBLIC_MAX_FILE_SIZE_PROFILE as string)
      );
    } else setCreatorPictureOk(true);
  };

  useEffect(() => {
    handleCreatorPicturVerification();
  }, [creatorPicture]);

  const handleSpokenLanguagesVerification = () => {
    // Verify and format spoken languages
  };

  useEffect(() => {
    handleSpokenLanguagesVerification();
  }, [spokenLanguages]);

  const handleSkillsVerification = () => {
    // Verify and format spoken skills
  };

  useEffect(() => {
    handleSkillsVerification();
  }, [skills]);

  const handleJoinNewsletterVerification = () => {
    // Subscribe or unsubscribe to the newsletter
  };

  useEffect(() => {
    handleJoinNewsletterVerification();
  }, [joinNewsletter]);

  const handleGoToDashboard = async () => {
    if (container) {
      setLastStepError(undefined);

      let _spokenLanguages: any[] = [];
      spokenLanguages?.map((x) => {
        _spokenLanguages.push(x.id);
      });

      let _skills: any[] = [];
      skills?.map((x) => {
        _skills.push(x.id);
      });

      let imageId: number | undefined = undefined;

      const register = await useStrapiPost(
        "custom-register",
        {
          email: email,
          username: username,
          f_name: f_name,
          l_name: l_name,
          description: editorDescription,
          languages: _spokenLanguages,
          skills: _skills,
          picture: imageId,
          role: accountType === "editor" ? 4 : 3,
        },
        false,
        true
      );
      if (register.status && register.status === 200) {
        if (typeof register.data === "string") {
          if (register.data.includes("error"))
            setLastStepError(inputErrors.general);
        } else if (typeof register.data === "object") {
          if (editorPicture) {
            const formData = new FormData();

            formData.append("files", editorPicture, editorPicture?.name);
            formData.append("ref", "api::user-info.user-info");
            formData.append("refId", register.data.details.id);
            formData.append("field", "picture");

            const uploadRes = await useStrapiPost(
              "upload",
              formData,
              false,
              true
            );
            if (uploadRes.status !== 200)
              setLastStepError(
                "Votre compte est créé avec succés mais il y a eu une erreur lors de l'upload de votre photo de profil."
              );
          }
          if (creatorPicture) {
            const formData = new FormData();

            formData.append("files", creatorPicture, creatorPicture?.name);
            formData.append("ref", "api::user-info.user-info");
            formData.append("refId", register.data.details.id);
            formData.append("field", "picture");

            const uploadRes = await useStrapiPost(
              "upload",
              formData,
              false,
              true
            );
            if (uploadRes.status !== 200)
              setLastStepError(
                "Votre compte est créé avec succés mais il y a eu une erreur lors de l'upload de votre photo de profil."
              );
          }
          authContext.setUserCode(register.data.user.code);
        }
      } else setLastStepError(inputErrors.general);
    }
  };

  const [container, setContainer] = useState<RefObject<HTMLDivElement> | null>(
    null
  );

  const entrance = (_container: RefObject<HTMLDivElement>) => {
    if (_container) {
      setContainer(_container);
      const elements = Array.from(_container.current!.children);

      ElementsIn(elements);
    }
  };

  const goBack = () => {
    if (container) {
      const elements = Array.from(container.current!.children);

      ElementsOut(elements, {
        onComplete: () => {
          if (getGoogleAuthEmailCookie() && currentStep === 3)
            setCurrentStep(0);
          else setCurrentStep(currentStep - 1);
        },
      });
    }
  };

  const goNext = () => {
    if (container) {
      const elements = Array.from(container.current!.children);

      ElementsOut(elements, {
        onComplete: () => {
          setCurrentStep(currentStep + 1);
        },
      });
    }
  };

  const goNextNoAnimation = () => {
    setCurrentStep(currentStep + 1);
  };

  return (
    <SignUpContext.Provider
      value={{
        langOptions: languageObjects(),
        skillsOptions,
        isLoadingLangSkills,

        accountType,
        setAccountType,
        handleStart,

        maxSteps,
        currentStep,
        setCurrentStep,
        dots,

        disclaimer,

        email,
        setEmail,
        emailErrorMessage,
        setEmailErrorMessage,
        handleSendAgain,
        handleGoToCode,

        code,
        setCode,
        codeState,
        resetCodeState,
        handleCodeVerification,

        f_name,
        setF_name,
        f_nameError,

        l_name,
        setL_name,
        l_nameError,

        username,
        setUsername,
        handleUserNameVerification,
        userNameAvailable,
        setUserNameAvailable,
        userNameMessage,
        setUserNameMessage,

        initials,

        editorPicture,
        setEditorPicture,
        editorPictureName,
        setEditorPictureName,
        editorPictureOk,

        editorDescription,
        setEditorDescription,
        editorDescriptionOk,

        creatorPicture,
        setCreatorPicture,
        creatorPictureName,
        setCreatorPictureName,
        creatorPictureOk,

        spokenLanguages,
        setSpokenLanguages,

        skills,
        setSkills,

        joinNewsletter,
        setJoinNewsletter,
        lastStepError,
        handleGoToDashboard,

        setContainer,
        entrance,
        goBack,
        goNext,
        goNextNoAnimation,
      }}
    >
      {props.children}
    </SignUpContext.Provider>
  );
};
