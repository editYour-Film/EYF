import { createContext, useContext, useMemo, useState } from "react";

import { optionInterface } from "@/components/_shared/form/Dropdown";
import { AuthContext } from "@/context/authContext";
import { useStrapiGet, useStrapiPost, useStrapiPut } from "@/hooks/useStrapi";
import { inputErrors, languageObjects, months } from "@/const";
import toast from "react-hot-toast";
import validator from "validator";
import GreenCheck from "@/icons/check-green.svg";
import Error from "@/icons/x-circle.svg";
import { extractDataFromDate } from "@/utils/utils";

export interface spokenLanguageInterface extends optionInterface {}
export interface skillsInterface extends optionInterface {}

export const EditorProfilContext = createContext({
  avatar: "",
  setAvatar: (payload: string) => {},

  username: "",
  setUsername: (payload: string) => {},
  usernameError: "",

  fName: "",
  setFName: (payload: string) => {},

  lName: "",
  setLName: (payload: string) => {},

  desc: "",
  setDesc: (payload: string) => {},
  descError: "",

  email: "",
  setEmail: (payload: string) => {},

  phone: "",
  setPhone: (payload: string) => {},
  phoneError: "",

  street: "",
  setStreet: (payload: string) => {},

  zipcode: "",
  setZipcode: (payload: string) => {},
  zipcodeError: "",

  city: "",
  setCity: (payload: string) => {},
  cityError: "",

  day: undefined as string | undefined,
  setDay: (payload: string) => {},
  month: undefined as string | undefined,
  setMonth: (payload: string) => {},
  year: undefined as string | undefined,
  setYear: (payload: string) => {},

  langOptions: [] as spokenLanguageInterface[] | undefined,
  usageLang: undefined as spokenLanguageInterface | undefined,
  spokenLanguages: [] as spokenLanguageInterface[],
  skillsOptions: [] as skillsInterface[] | undefined,
  skills: [] as skillsInterface[],

  handleAddUsedLang: (payload: spokenLanguageInterface) => {},
  handleAddLang: (payload: spokenLanguageInterface) => {},
  handleRemoveLang: (payload: spokenLanguageInterface) => {},
  handleAddSkill: (payload: skillsInterface) => {},
  handleRemoveSkill: (payload: skillsInterface) => {},
  handleAvatarChange: (payload: any) => {},

  saveProfil: () => {},
  abort: () => {},
});

export const EditorProfilContextProvider: React.FC<any> = (props) => {
  const authContext = useContext(AuthContext);

  const user = authContext.user;

  const [avatar, setAvatar] = useState(
    user.details.picture ? user.details.picture.url : undefined
  );
  const [username, setUsername] = useState(user.user.username);
  const [usernameError, setUsernameError] = useState<string>("");

  const [fName, setFName] = useState(
    user.details.f_name ? user.details.f_name : ""
  );

  const [lName, setLName] = useState(
    user.details.l_name ? user.details.l_name : ""
  );

  const [email, setEmail] = useState(user.user.email ? user.user.email : "");

  const [desc, setDesc] = useState(user.details.bio ? user.details.bio : "");
  const [descError, setDescError] = useState<string>("");

  const [phone, setPhone] = useState(
    user.details.phone ? user.details.phone : ""
  );
  const [phoneError, setPhoneError] = useState<string>("");

  const [street, setStreet] = useState(
    user.details.address ? user.details.address : ""
  );

  const [zipcode, setZipcode] = useState(
    user.details.post_code ? user.details.post_code : ""
  );
  const [zipcodeError, setZipcodeError] = useState<string>("");

  const [city, setCity] = useState(user.details.city ? user.details.city : "");
  const [cityError, setCityError] = useState<string>("");

  const [day, setDay] = useState<string | undefined>(
    user.details.birthday
      ? extractDataFromDate(user.details.birthday, "day")
      : undefined
  );

  const [month, setMonth] = useState<string | undefined>(
    user.details.birthday
      ? months[
          parseInt(
            extractDataFromDate(user.details.birthday, "month") as string
          ) - 1
        ]
      : undefined
  );
  const [year, setYear] = useState<string | undefined>(
    user.details.birthday
      ? extractDataFromDate(user.details.birthday, "year")
      : undefined
  );

  const [usageLang, setUsageLang] = useState<spokenLanguageInterface>();
  const [spokenLanguages, setSpokenLanguages] = useState<
    spokenLanguageInterface[]
  >(user.details.languages ? user.details.languages : []);

  const [skillsOptions, setSkillsOptions] = useState<skillsInterface[]>();

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

  const [skills, setSkills] = useState<skillsInterface[]>(
    user.details.skills ? user.details.skills : []
  );

  const handleAddUsedLang = (lang: spokenLanguageInterface) => {
    if (usageLang !== lang) setUsageLang(lang);
  };

  const handleAddLang = (lang: spokenLanguageInterface) => {
    if (!spokenLanguages.find((x) => x.id === lang.id))
      setSpokenLanguages([...spokenLanguages, lang]);
  };

  const handleRemoveLang = (lang: spokenLanguageInterface) => {
    setSpokenLanguages(spokenLanguages.filter((el) => el !== lang));
  };

  const handleAddSkill = (skill: skillsInterface) => {
    if (!skills.find((x) => x.id === skill.id)) setSkills([...skills, skill]);
  };

  const handleRemoveSkill = (skill: skillsInterface) => {
    setSkills(
      skills.filter((el) => {
        return el !== skill;
      })
    );
  };

  const handleAvatarChange = async (e: any) => {
    if (e.target.files) {
      const fileSize = (e.target.files[0]?.size / 1024 / 1024).toFixed(2);
      // Verify if the file size < 20 mb
      if (
        parseInt(fileSize) >
        parseInt(process.env.NEXT_PUBLIC_MAX_FILE_SIZE_PROFILE as string)
      )
        toast(
          "Photo très large, la photo ne dois pas dépasser " +
            process.env.NEXT_PUBLIC_MAX_FILE_SIZE_PROFILE +
            "mb.",
          {
            icon: Error,
            duration: 5000,
            className: "bg-blackBerry",
          }
        );
      else {
        const formData = new FormData();
        formData.append("files", e.target.files[0], e.target.value);
        formData.append("ref", "api::user-info.user-info");
        formData.append("refId", user.details.id);
        formData.append("field", "picture");

        const uploadRes = await useStrapiPost("upload", formData, false, true);
        //upload success
        if (uploadRes.status === 200) {
          const imageId = uploadRes.data[0].id;

          //update account details
          const updateDetails = await useStrapiPut(
            "user-infos/" + user.details.id + "?populate=*",
            {
              data: {
                picture: imageId,
              },
            }
          );
          if (
            updateDetails.status === 200 &&
            typeof updateDetails.data === "object"
          ) {
            toast("Votre photo de profil est modifiée avec succés.", {
              icon: GreenCheck,
              duration: 5000,
              className: "bg-blackBerry",
            });
            setAvatar(
              updateDetails.data.data.attributes.picture.data.attributes.url
            );
            authContext.RefreshUserData();
          } else
            toast(inputErrors.general, {
              icon: Error,
              duration: 5000,
              className: "bg-blackBerry",
            });
        } else
          toast(inputErrors.general, {
            icon: Error,
            duration: 5000,
            className: "bg-blackBerry",
          });
      }
    }
  };

  const abort = () => {
    // reset fields
    setUsername(user.user.username);
    setFName(user.details.f_name ? user.details.f_name : "");
    setLName(user.details.l_name ? user.details.l_name : "");
    setDesc(user.details.bio ? user.details.bio : "");
    setPhone(user.details.phone ? user.details.phone : "");
    setStreet(user.details.address ? user.details.address : "");
    setZipcode(user.details.post_code ? user.details.post_code : "");
    setCity(user.details.city ? user.details.city : "");
    setSpokenLanguages(user.details.languages ? user.details.languages : []);
    setSkills(user.details.skills ? user.details.skills : []);

    // reset errors
    resetErrors();
  };

  const resetErrors = () => {
    setUsernameError("");
    setPhoneError("");
    setZipcodeError("");
    setCityError("");
  };

  const validateProfileForm = (): boolean => {
    let isValid = true;
    resetErrors();
    if (!validator.isAlphanumeric(username, "fr-FR", { ignore: "_.@" })) {
      setUsernameError(inputErrors.invalid);
      isValid = false;
    }
    if (desc.split(" ").length < 50) {
      setDescError("La description doit faire 50 mots au minimum");
      isValid = false;
    }
    if (!validator.isPostalCode(zipcode, "FR")) {
      setZipcodeError(inputErrors.invalid);
      isValid = false;
    }
    if (!validator.isAlpha(city)) {
      setCityError(inputErrors.invalid);
      isValid = false;
    }
    if (!validator.isMobilePhone(phone /*, "fr-FR"*/)) {
      setPhoneError(inputErrors.invalid);
      isValid = false;
    }
    return isValid;
  };

  const saveProfil = async () => {
    if (validateProfileForm()) {
      const updateAccount = await useStrapiPut("users/" + user.user.id, {
        username: validator.trim(username),
      });
      if (
        updateAccount.status === 200 &&
        typeof updateAccount.data === "object"
      ) {
        const updateDetails = await useStrapiPut(
          "user-infos/" + user.details.id,
          {
            data: {
              address: validator.trim(street),
              post_code: validator.trim(zipcode),
              city: validator.trim(city),
              phone: validator.trim(phone),
              bio: validator.trim(desc),
              languages: spokenLanguages,
              skills: skills,
              birthday:
                day && month && year
                  ? year +
                    "-" +
                    (String(months.indexOf(month) + 1).length === 1
                      ? "0" + String(months.indexOf(month) + 1)
                      : String(months.indexOf(month) + 1)) +
                    "-" +
                    (day.length === 1 ? "0" + day : day)
                  : undefined,
            },
          }
        );
        if (
          updateDetails.status === 200 &&
          typeof updateDetails.data === "object"
        ) {
          toast("Vos information sont modifiées avec succés.", {
            icon: GreenCheck,
            duration: 5000,
            className: "bg-blackBerry",
          });
          authContext.RefreshUserData();
        } else
          toast(inputErrors.general, {
            icon: Error,
            duration: 5000,
            className: "bg-blackBerry",
          });
      } else {
        if (updateAccount.data.message.includes("already taken"))
          setUsernameError(inputErrors.usernameExist);
        else
          toast(inputErrors.general, {
            icon: Error,
            duration: 5000,
            className: "bg-blackBerry",
          });
      }
    }
  };

  return (
    <EditorProfilContext.Provider
      value={{
        avatar,
        setAvatar,
        username,
        setUsername,
        usernameError,

        fName,
        setFName,

        lName,
        setLName,

        desc,
        setDesc,
        descError,

        email,
        setEmail,

        phone,
        setPhone,
        phoneError,

        street,
        setStreet,

        zipcode,
        setZipcode,
        zipcodeError,

        city,
        setCity,
        cityError,

        day,
        setDay,
        month,
        setMonth,
        year,
        setYear,

        langOptions: languageObjects(),
        spokenLanguages,
        usageLang,
        handleAddUsedLang,

        skillsOptions,
        skills,

        handleAddLang,
        handleRemoveLang,
        handleAddSkill,
        handleRemoveSkill,
        handleAvatarChange,

        abort,
        saveProfil,
      }}
    >
      {props.children}
    </EditorProfilContext.Provider>
  );
};
