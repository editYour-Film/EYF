import { ChangeEvent, createContext, useContext, useState } from "react";

import { optionInterface } from "@/components/_shared/form/Dropdown";
import { AuthContext } from "@/context/authContext";

export interface spokenLanguageInterface extends optionInterface {}
export interface skillsInterface extends optionInterface {}

export const EditorProfilContext = createContext({
  avatar: "",
  setAvatar: (payload: string) => {},
  username: "",
  setUsername: (payload: string) => {},
  fName: "",
  setFName: (payload: string) => {},
  lName: "",
  setLName: (payload: string) => {},
  desc: "",
  setDesc: (payload: string) => {},
  email: "",
  setEmail: (payload: string) => {},
  phone: "",
  setPhone: (payload: string) => {},
  street: "",
  setStreet: (payload: string) => {},
  zipcode: "",
  setZipcode: (payload: string) => {},
  city: "",
  setCity: (payload: string) => {},

  langOptions: [] as spokenLanguageInterface[],
  spokenLanguages: [] as spokenLanguageInterface[],
  skillsOptions: [] as skillsInterface[],
  skills: [] as skillsInterface[],

  handleModifyPassword: () => {},
  handleModifyEmail: () => {},
  handleModelChange: (payload: any) => {},
  handleAddLang: (payload: spokenLanguageInterface) => {},
  handleRemoveLang: (payload: spokenLanguageInterface) => {},
  handleAddSkill: (payload: skillsInterface) => {},
  handleRemoveSkill: (payload: skillsInterface) => {},
  handleAvatarChange: (payload: any) => {},
  handleUpdateProfil: () => {},
  handleResetContext: () => {},

  saveProfil: () => {},
  abort: () => {},
});

export const EditorProfilContextProvider: React.FC<any> = (props) => {
  const { user } = useContext(AuthContext);

  const [avatar, setAvatar] = useState(
    user.details.picture ? user.details.picture.url : "/img/profile/avatar.png"
  );
  const [username, setUsername] = useState(user.user.username);
  const [fName, setFName] = useState(
    user.details.f_name ? user.details.f_name : ""
  );
  const [lName, setLName] = useState(
    user.details.l_name ? user.details.l_name : ""
  );
  const [email, setEmail] = useState(
    user.details.email_contact ? user.details.email_contact : ""
  );
  const [desc, setDesc] = useState(user.details.bio ? user.details.bio : "");
  const [phone, setPhone] = useState(
    user.details.phone ? user.details.phone : ""
  );
  const [street, setStreet] = useState(
    user.details.address ? user.details.address : ""
  );
  const [zipcode, setZipcode] = useState(
    user.details.post_code ? user.details.post_code : ""
  );
  const [city, setCity] = useState(user.details.city ? user.details.city : "");

  const [langOptions] = useState([
    {
      label: "Français",
      id: "fr",
      icon: "/icons/flags/fr.svg",
    },
    {
      label: "Anglais",
      id: "en",
      icon: "/icons/flags/uk.svg",
    },
    {
      label: "Italien",
      id: "it",
      icon: "/icons/flags/it.svg",
    },
    {
      label: "Allemand",
      id: "de",
      icon: "/icons/flags/de.svg",
    },
    {
      label: "Russe",
      id: "ru",
      icon: "/icons/flags/ru.svg",
    },
  ]);
  const [spokenLanguages, setSpokenLanguages] = useState<
    spokenLanguageInterface[]
  >([]);

  const [skillsOptions] = useState<skillsInterface[]>([
    {
      label: "After Effects",
      id: "afterEffects",
    },
    {
      label: "Davinci Resolve",
      id: "davinciResolve",
    },
    {
      label: "Motion Design",
      id: "motionDesign",
    },
  ]);

  const [skills, setSkills] = useState<skillsInterface[]>([]);

  const handleModifyPassword = () => {
    console.log("modify password");
  };

  const handleModifyEmail = () => {
    console.log("modify email");
  };

  const handleModelChange = () => {
    console.log("model change");
  };

  const handleAddLang = (lang: spokenLanguageInterface) => {
    console.log("add lang");

    if (!spokenLanguages.includes(lang)) {
      setSpokenLanguages([...spokenLanguages, lang]);
    }
  };

  const handleRemoveLang = (lang: spokenLanguageInterface) => {
    console.log("remove lang");

    setSpokenLanguages(spokenLanguages.filter((el, id) => el !== lang));
  };

  const handleAddSkill = (skill: skillsInterface) => {
    if (!skills.includes(skill)) {
      setSkills([...skills, skill]);
    }
  };

  const handleRemoveSkill = (skill: skillsInterface) => {
    setSkills(
      skills.filter((el) => {
        return el !== skill;
      })
    );
  };

  const handleAvatarChange = (e: ChangeEvent) => {
    console.log("change Avatar");
  };

  const handleUpdateProfil = () => {
    // Update database to the new values from the forms
    console.log("update Profil");
  };

  const handleResetContext = () => {
    // Reset all values to the initial ones stocked in the database
    console.log("reset Context");
  };

  const abort = () => {
    // TODO: Integration reset all values to the initial ones
  };

  const saveProfil = () => {
    // TODO: Integration save the modified values to the database
  };

  return (
    <EditorProfilContext.Provider
      value={{
        avatar,
        setAvatar,
        username,
        setUsername,
        fName,
        setFName,
        lName,
        setLName,
        desc,
        setDesc,
        email,
        setEmail,
        phone,
        setPhone,
        street,
        setStreet,
        zipcode,
        setZipcode,
        city,
        setCity,

        langOptions,
        spokenLanguages,

        skillsOptions,
        skills,

        handleModifyPassword,
        handleModifyEmail,
        handleModelChange,
        handleAddLang,
        handleRemoveLang,
        handleAddSkill,
        handleRemoveSkill,
        handleAvatarChange,
        handleUpdateProfil,
        handleResetContext,

        abort,
        saveProfil,
      }}
    >
      {props.children}
    </EditorProfilContext.Provider>
  );
};
