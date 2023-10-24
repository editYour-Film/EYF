import {
  skillsInterface,
  spokenLanguageInterface,
} from "@/components/dashboard/editor/_context/EditorProfilContext";
import { codeStateType } from "@/components/signin/_context/signinContext";
import routes from "@/routes";
import { RefObject, createContext, useEffect, useState } from "react";
import { ReactElement } from "react-markdown/lib/react-markdown";
import Link from "next/link";

import InfoIcon from "@/icons/info.svg";
import Check from "@/icons/signin/check.svg";
import X from "@/icons/signin/x.svg";

import { MessageType } from "@/components/_shared/UI/InfoMessage";
import { StepBubbleProps } from "@/components/_shared/buttons/StepBubble";
import { useStrapiGet, useStrapiPost } from "@/hooks/useStrapi";
import { inputErrors } from "@/const";
import validator from "validator";
import { ElementsOut } from "@/Animations/elementsOut";
import { ElementsIn } from "@/Animations/elementsIn";

export type accountType = "editor" | "creator" | "both" | undefined;
export type maxStepType = 5 | 6 | 7 | undefined;

export const SignUpContext = createContext({
  langOptions: [] as spokenLanguageInterface[] | undefined,
  skillsOptions: [] as skillsInterface[] | undefined,

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
  handleGoogleConnection: () => {},
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
  userNameMessage: undefined as MessageType | undefined,

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

  setContainer: (payload: any) => {},
  entrance: (payload: RefObject<HTMLDivElement>) => {},
  goBack: () => {},
  goNext: () => {},
});

export const SignUpContextProvider: React.FC<any> = (props) => {
  const userNameMessages = {
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

  const [langOptions, setLangOptions] = useState<spokenLanguageInterface[]>();

  const [skillsOptions, setSkillsOptions] = useState<skillsInterface[]>();

  useEffect(() => {
    // get languages
    let _langOptions: any = [];
    useStrapiGet("languages").then((res) => {
      if (res.status === 200) {
        res.data.data.map((x: any) => {
          _langOptions.push({
            label: x.attributes.name,
            id: x.id,
            icon: "",
          });
        });
        setLangOptions(_langOptions);
      } else {
      }
    });

    // get skills
    let _skills: any = [];
    useStrapiGet("skills").then((res) => {
      if (res.status === 200) {
        res.data.data.map((x: any) => {
          _skills.push({
            label: x.attributes.name,
            id: x.id,
          });
        });
        setSkillsOptions(_skills);
      } else {
      }
    });
  }, []);

  const [accountType, setAccountType] = useState<accountType>("both");
  const [maxSteps, setMaxSteps] = useState<maxStepType>(undefined);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [dots, setDots] = useState<StepBubbleProps[] | undefined>(undefined);

  const disclaimer = (
    <span>
      En continuant j’accepte les <Link href={routes.ML}>mentions légales</Link>{" "}
      et la <Link href={routes.PC}>Politique de confidentialité</Link> de
      editYour.Film.
    </span>
  );

  const [email, setEmail] = useState<string | undefined>(undefined);
  const [emailErrorMessage, setEmailErrorMessage] = useState<
    ReactElement | undefined | undefined | string
  >(undefined);

  const [code, setCode] = useState<string | undefined>(undefined);
  const [codeState, setCodeState] = useState<codeStateType>("regular");

  const [f_name, setF_name] = useState<string | undefined>(undefined);
  const [f_nameError, setF_nameError] = useState<string | undefined>(undefined);

  const [l_name, setL_name] = useState<string | undefined>(undefined);
  const [l_nameError, setL_nameError] = useState<string | undefined>(undefined);

  const [username, setUsername] = useState<string | undefined>(undefined);
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
    undefined
  );
  const [editorPictureName, setEditorPictureName] = useState<
    string | undefined
  >(undefined);
  const [editorPictureOk, setEditorPictureOk] = useState<boolean | undefined>(
    undefined
  );

  const [editorDescription, setEditorDescription] = useState<
    string | undefined
  >(undefined);
  const [editorDescriptionOk, setEditorDescriptionOk] = useState<
    boolean | undefined
  >(undefined);

  const [creatorPicture, setCreatorPicture] = useState<FileList[0] | undefined>(
    undefined
  );
  const [creatorPictureName, setCreatorPictureName] = useState<
    string | undefined
  >(undefined);
  const [creatorPictureOk, setCreatorPictureOk] = useState<boolean | undefined>(
    undefined
  );

  const [spokenLanguages, setSpokenLanguages] = useState<
    spokenLanguageInterface[] | undefined
  >(langOptions ? [langOptions[0]] : undefined);
  const [skills, setSkills] = useState<skillsInterface[] | undefined>(
    undefined
  );

  const [joinNewsletter, setJoinNewsletter] = useState<boolean | undefined>(
    true
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
      } else if (sendToken.data === true) setCurrentStep(currentStep + 1);
    } else setEmailErrorMessage(inputErrors.general);
  };

  const handleGoogleConnection = () => {};

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
          setCurrentStep(currentStep - 1);
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

  return (
    <SignUpContext.Provider
      value={{
        langOptions,
        skillsOptions,

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
        handleGoogleConnection,
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
        userNameMessage,

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

        setContainer,
        entrance,
        goBack,
        goNext,
      }}
    >
      {props.children}
    </SignUpContext.Provider>
  );
};
