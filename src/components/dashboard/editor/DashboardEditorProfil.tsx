import { Tag } from "@/components/_shared/UI/Tag"
import Button from "@/components/_shared/form/Button"
import Input from "@/components/_shared/form/Input"
import Image from "next/image"
import { InputVignet } from "@/components/_shared/form/InputVignet"
import { useState } from "react"

export const DashboardEditorProfil = () => {
  const [username, setUsername] = useState("SEBASTIENSRN")
  const [fName, setFName] = useState("Sébastien")
  const [lName, setLName] = useState("Soriano")
  const [email, setEmail] = useState("sebastien@edityour.film")
  const [desc, setDesc] = useState("C’est une réelle envie d’aider les entreprises à communiquer grâce à la vidéo qui m’a permis de devenir freelance et de créer ma propre société à 23 ans. Ayant déjà collaboré avec des dizaines d’entreprises, j’ai eu l’immense privilège de raconter leurs histoires, leurs parcours et de partager mon enthousiasme avec eux. À travers des centaines de tournages, j’ai rencontré des femmes et des hommes exceptionnels venant d’horizons différents.")
  const [phone, setPhone] = useState("0772307239")
  const [street, setStreet] = useState("89 rue Mirabeau")
  const [zipcode, setZipcode] = useState("94200")
  const [city, setCity] = useState("Ivry-sur-Seine")
  const [spokenLanguages, setSpokenLanguages] = useState([
    {
      label: 'Français',
      id: 'fr'
    }, {
      label: 'Anglais',
      id: 'en'
    }
  ])

  const [skills, setSkills] = useState([
    {
      label: 'After Effects',
    }, {
      label: 'Da Vinci',
    }
  ])

  const handleModifyPassword = () => {

  }

  const handleModifyEmail = () => {

  }

  const handleModelChange = () => {
    
  }

  const handleAddLang = () => {

  }

  const handleRemoveLang = (i:number) => {
    
  }

  const handleAddSkill = () => {

  }

  const handleRemoveSkill = (i:number) => {
    
  }

  return (
    <div className="db-profil flex flex-col gap-12">
      <div className="db-profil__head">
        <div className="db-profil__infos flex flex-col sm:flex-row justify-center sm:justify-start text-center sm:text-left items-center gap-12">
          <div className="db-profil__img relative w-28 h-28 rounded-full border border-alphaWhite border-opacity-70 overflow-hidden">
            <Image 
              src='/img/img.png'
              alt='profile image'
              fill
            />
          </div>
          <div className="db-profil__infos-text flex flex-col gap-2">
            <div className="n27 font-medium text-lg uppercase">{fName} {lName}</div>
            <div className="text-base-text flex flex-col sm:flex-row items-center gap-2">
              <span className="uppercase">{username}</span> <div className="w-[5px] h-[5px] rounded-full bg-base-text hidden sm:block"></div> Inscrit depuis Septembre 2023
            </div>
            <div className="text-base-text">{email}</div>
          </div>
        </div>
        <div className="db-profil__buttons flex justify-center sm:justify-start gap-4 sm:gap-12 mt-12 flex-wrap">
          <Button 
            className="w-max"
            variant="primary"
            text="Modifier mon mot de passe"
            onClick={() => { handleModifyPassword()}}
          />
          <Button 
            className="w-max"
            variant="black"
            text="Modifier mon adresse mail"
            onClick={() => { handleModifyEmail()}}
          />
        </div>
      </div>

      <hr />

      <div className="db-profil__description">
        <Input 
          type="textarea"
          bg="light"
          value={desc}
          maxlength={100}
          label="Description"
          labelType="dashboard"
          className="h-40"
          onChange={(e) => { setDesc(e.target.value) }}
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-8">
        <div className="flex flex-col gap-8 sm:basis-1/2">
          <Input
            type="text"
            bg="light"
            value={username}
            label="Nom d'utilisateur"
            labelType="dashboard"
            size="sm"
            onChange={(e) => { setUsername(e.target.value)}}
          />

          <Input
            type="text"
            bg="light"
            value={fName}
            label="Prénom"
            labelType="dashboard"
            size="sm"
            onChange={(e) => { setFName(e.target.value) }}
          />

          <Input
            type="text"
            bg="light"
            value={lName}
            label="Nom"
            labelType="dashboard"
            size="sm"
            onChange={(e) => { setLName(e.target.value) }}
          />
        </div>
        <div className="flex flex-col gap-3 sm:basis-1/2">
          <InputVignet 
            label="Modèle en avant"
            buttonLabel="Modifier le modèle"
            desc="Importez une image qui donne un aperçu du contenu de votre vidéo. Une bonne image se remarque et attire l'attention des spectateurs."
            image="/img/img3.png"
            onChange={() => { handleModelChange()}}
          />
        </div>
      </div>

      <hr />

      <div className="flex flex-col sm:flex-row gap-8">
        <div className="sm:basis-1/2">
          <Input
            type="email"
            bg="light"
            value={email}
            label="Mail"
            labelType="dashboard"
            size="sm"
            onChange={(e) => { setEmail(e.target.value) }}
          />
        </div>

        <div className="sm:basis-1/2">
          <Input
            type="text"
            bg="light"
            value={phone}
            label="Téléphone"
            labelType="dashboard"
            size="sm"
            onChange={(e) => { setPhone(e.target.value)}}
          />
        </div>
      </div>

      <hr />

      <div className="n27 font-medium text-[28px]">Adresse</div>

      <div className="grid lg:grid-rows-2 lg:grid-cols-2 gap-8">
          <Input
            type="text"
            bg="light"
            value={street}
            label="Rue"
            labelType="dashboard"
            size="sm"
            onChange={(e) => { setStreet(e.target.value)}}
          />
          <Input
            type="text"
            bg="light"
            value={zipcode}
            label="Code Postal"
            labelType="dashboard"
            size="sm"
            onChange={(e) => {setZipcode(e.target.value)}}
          />
          <Input
            type="text"
            bg="light"
            value={city}
            label="Ville"
            labelType="dashboard"
            size="sm"
            onChange={(e) => {setCity(e.target.value)}}
          />

          <Input
            type="text"
            bg="light"
            value="Complément d'adresse"
            label="Ville"
            labelType="dashboard"
            size="sm"
            onChange={() => {}}
          />
      </div>

      <hr />

      <div className="flex flex-col sm-flex-row gap-4 justify-between">
        <div className="n27 font-medium text-[28px]">Langue parlée</div>
        <Button 
          variant="black"
          icon="arrow-down"
          iconRight
          text="Ajouter une langue"
          onClick={() => { handleAddLang() }}
          className="w-max"
        />
      </div>

      <div className="flex gap-2">
        {spokenLanguages.map((lang, i) => {
          return (
            <Tag 
              bg="light"
              key={i}
              text={lang.label}
              onClick={() => { handleRemoveLang(i)}}
              icon={true}
            />
          )
        })}
      </div>

      <hr />

      <div className="flex flex-col sm-flex-row gap-4 justify-between">
        <div className="n27 font-medium text-[28px]">Compétences</div>
        <Button 
          variant="black"
          icon="arrow-down"
          iconRight
          text="Ajouter une compétence"
          onClick={() => { handleAddLang() }}
          className="w-max"
        />
      </div>
      

      <div className="flex gap-2">
        {skills.map((lang, i) => {
          return (
            <Tag 
              bg="light"
              key={i}
              text={lang.label}
              onClick={() => { handleRemoveSkill(i)}}
              icon={true}
            />
          )
        })}
      </div>
    </div>
  )
}