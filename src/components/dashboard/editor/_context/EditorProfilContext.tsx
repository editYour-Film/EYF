import { ChangeEvent, createContext, useState } from "react";

import { optionInterface } from "@/components/_shared/form/Dropdown";

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
  addressMore: "",
  setAddressMore:(payload: string) => {},

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
  handleResetContext: () => {}
})

export const EditorProfilContextProvider: React.FC<any> = (props) => {
  const [avatar, setAvatar] = useState("/img/img.png")
  const [username, setUsername] = useState("SEBASTIENSRN")
  const [fName, setFName] = useState("Sébastien")
  const [lName, setLName] = useState("Soriano")
  const [email, setEmail] = useState("sebastien@edityour.film")
  const [desc, setDesc] = useState("C’est une réelle envie d’aider les entreprises à communiquer grâce à la vidéo qui m’a permis de devenir freelance et de créer ma propre société à 23 ans. Ayant déjà collaboré avec des dizaines d’entreprises, j’ai eu l’immense privilège de raconter leurs histoires, leurs parcours et de partager mon enthousiasme avec eux. À travers des centaines de tournages, j’ai rencontré des femmes et des hommes exceptionnels venant d’horizons différents.")
  const [phone, setPhone] = useState("0772307239")
  const [street, setStreet] = useState("89 rue Mirabeau")
  const [zipcode, setZipcode] = useState("94200")
  const [city, setCity] = useState("Ivry-sur-Seine")
  const [addressMore, setAddressMore] = useState("")


  const [langOptions] = useState([
    {
      label: 'Français',
      id: 'fr',
      icon: '/icons/flags/fr.svg'
    },{
      label: 'Anglais',
      id: 'en',
      icon: '/icons/flags/uk.svg'
    },
    {
      label: 'Italien',
      id: 'it',
      icon: '/icons/flags/it.svg'
    },
    {
      label: 'Allemand',
      id: 'de',
      icon: '/icons/flags/de.svg'
    },
    {
      label: 'Russe',
      id: 'ru',
      icon: '/icons/flags/ru.svg'
    }
  ])
  const [spokenLanguages, setSpokenLanguages] = useState<spokenLanguageInterface[]>([])
  
  const [skillsOptions] = useState<skillsInterface[]>([{
    label: 'After Effects',
  }, {
    label: 'Davinci Resolve'
  },{
    label: 'Motion Design'
  }])

  const [skills, setSkills] = useState<skillsInterface[]>([])

  const handleModifyPassword = () => {
    console.log('modify password')
  }

  const handleModifyEmail = () => {
    console.log('modify email')
  }

  const handleModelChange = () => {
    console.log('model change')
  }

  const handleAddLang = (lang:spokenLanguageInterface) => {
    console.log('add lang')

    if(!spokenLanguages.includes(lang)) {
      setSpokenLanguages([...spokenLanguages, lang])
    }
  }

  const handleRemoveLang = (lang:spokenLanguageInterface) => {
    console.log('remove lang')

    setSpokenLanguages(spokenLanguages.filter((el, id) => el !== lang))
  }

  const handleAddSkill = (skill:skillsInterface) => {
    'add skill')

    if(!skills.includes(skill)) {
      setSkills([...skills, skill])
    }
  }

  const handleRemoveSkill = (skill:skillsInterface) => {
    console.log('remove skill')

    console.log(skill);
    

    setSkills(skills.filter((el) => {
      console.log(el);
      
      return el !== skill
    }))
  }

  const handleAvatarChange = (e:ChangeEvent) => {
    console.log('change Avatar')
    console.log(e)
  }

  const handleUpdateProfil = () => {
    // Update database to the new values from the forms
    console.log('update Profil');
  }

  const handleResetContext = () => {
    // Reset all values to the initial ones stocked in the database
    console.log('reset Context');
  }

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
        addressMore,
        setAddressMore,

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
        handleResetContext
      }}
    >
      {props.children}
    </EditorProfilContext.Provider>
  )
}