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
import { ElementsIn } from "@/Animations/elementsIn";
import { ElementsOut } from "@/Animations/elementsOut";
import { MentionInteraction } from "@/components/_shared/buttons/MentionInteraction";
import { useRouter } from "next/router";

export type accountType = "editor" | "creator" | "both" | undefined;
export type maxStepType = 5 | 6 | 7 | undefined;

export const SignUpContext = createContext({
  langOptions: [] as spokenLanguageInterface[],
  skillsOptions: [] as skillsInterface[],

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
  emailValid: false as boolean,
  emailErrorMessage: undefined as ReactElement | undefined | undefined | string,
  handleConfirmEmail: () => {},
  handleGoogleConnection: () => {},

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
  userNameAvailable: undefined as boolean | undefined,
  userNameMessage: undefined as MessageType | undefined,

  initials: undefined as string | undefined,

  editorPicture: undefined as any,
  setEditorPicture: (payload: any) => {},
  editorPictureOk: undefined as boolean | undefined,

  editorDescription: undefined as string | undefined,
  setEditorDescription: (payload: string) => {},
  editorDescriptionOk: undefined as boolean | undefined,

  creatorPicture: undefined as any,
  setCreatorPicture: (payload: any) => {},
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
  entrance: (payload:RefObject<HTMLDivElement>) => {},
  goBack: () => {},
  goNext: () => {}
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
  };

  const langOptions: spokenLanguageInterface[] = [
    {
      label: "Français",
      id: "fr",
      icon: "",
    },
    {
      label: "Anglais",
      id: "en",
      icon: "",
    },
    {
      label: "Italien",
      id: "it",
      icon: "",
    },
    {
      label: "Allemand",
      id: "it",
      icon: "",
    },
    {
      label: "Espagnol",
      id: "it",
      icon: "",
    },
  ];

  const skillsOptions: skillsInterface[] = [
    {
      label: "After Effects",
      id: "after-effects",
    },
    {
      label: "Maya",
      id: "maya",
    },
    {
      label: "Première pro",
      id: "premiere-pro",
    },
  ];

  const [accountType, setAccountType] = useState<accountType>("both");
  const [maxSteps, setMaxSteps] = useState<maxStepType>(undefined);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [dots, setDots] = useState<StepBubbleProps[] | undefined>(undefined);

  const router = useRouter()

  const disclaimer = (
    <span>
      En continuant j’accepte les <MentionInteraction onClick={() => { router.push(routes.ML)}}>mentions légales</MentionInteraction>{" "}
      et la <MentionInteraction onClick={() => { router.push(routes.PC)}}>Politique de confidentialité</MentionInteraction> de
      editYour.Film.
    </span>
  );

  const [email, setEmail] = useState<string | undefined>(undefined);
  const [emailValid, setEmailValid] = useState<boolean>(false);
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

  const [editorPicture, setEditorPicture] = useState<string | undefined>(
    undefined
  );
  const [editorPictureOk, setEditorPictureOk] = useState<boolean | undefined>(
    undefined
  );

  const [editorDescription, setEditorDescription] = useState<
    string | undefined
  >(undefined);
  const [editorDescriptionOk, setEditorDescriptionOk] = useState<
    boolean | undefined
  >(undefined);

  const [creatorPicture, setCreatorPicture] = useState<string | undefined>(
    undefined
  );
  const [creatorPictureOk, setCreatorPictureOk] = useState<boolean | undefined>(
    undefined
  );

  const [spokenLanguages, setSpokenLanguages] = useState<
    spokenLanguageInterface[] | undefined
  >([langOptions[0]]);
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

  const handleConfirmEmail = () => {
    // Check if the email is valid

    if (email) setEmailValid(true);
    else setEmailValid(false);
  };

  const handleGoogleConnection = () => {};

  const handleCodeVerification = (value: string) => {
    // check the code and set the code state accordingly
    setCodeState("loading");

    // Remove Timeout and set the verification
    // on success redirect to dashboard ?
    setTimeout(() => {
      setCodeState("success");
    }, 3000);
  };

  const resetCodeState = () => {
    setCodeState("regular");
  };

  useEffect(() => {
    setInitials(f_name && l_name ? f_name[0] + l_name[0] : undefined);
  }, [l_name, f_name]);

  const handleUserNameVerification = () => {
    // check availability of username and change the username message accordingly
    if (username) {
      //if Availiable
      if (username?.length) {
        setUserNameAvailable(true);
        setUserNameMessage(userNameMessages.success);
      }
      //if Not
      else {
        setUserNameAvailable(false);
        setUserNameMessage(userNameMessages.error);
      }
    }
    //if Undefined
    else {
      setUserNameAvailable(undefined);
      setUserNameMessage(userNameMessages.default);
    }
  };

  useEffect(() => {
    handleUserNameVerification();
  }, [username]);

  const handleEditorPicturVerification = () => {
    // Verify if the file is ok
    if (editorPicture) setEditorPictureOk(true);
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
    // Verify if the file is ok
    if (creatorPicture) setCreatorPictureOk(true);
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

  const handleJoinNewsletterVrification = () => {
    // Subscribe or unsubscribe to the newsletter
  };

  useEffect(() => {
    handleJoinNewsletterVrification();
  }, [joinNewsletter]);

  const [container, setContainer] = useState<RefObject<HTMLDivElement> | null>(null)

  const entrance = (_container:RefObject<HTMLDivElement>) => {
    if (_container) {
      setContainer(_container);
      const elements = Array.from(_container.current!.children);

      ElementsIn(elements);
    }
  }

  const goBack = () => {    
    if (container) {
      const elements = Array.from(container.current!.children);

      ElementsOut(elements, {onComplete: () => { setCurrentStep(currentStep - 1) }});
    }
  }

  const goNext = () => {
    if (container) {
      const elements = Array.from(container.current!.children);

      ElementsOut(elements, {onComplete: () => { setCurrentStep(currentStep + 1) }});
    }
  }

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
        emailValid,
        emailErrorMessage,
        handleConfirmEmail,
        handleGoogleConnection,

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
        userNameAvailable,
        userNameMessage,

        initials,

        editorPicture,
        setEditorPicture,
        editorPictureOk,

        editorDescription,
        setEditorDescription,
        editorDescriptionOk,

        creatorPicture,
        setCreatorPicture,
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
