import Input from "@/components/_shared/form/Input"
import { useContext } from "react"
import { EditorProfilContext } from "../../_context/ProfilContext"

export const DescInput = () => {
  const {desc, setDesc} = useContext(EditorProfilContext)

  return (
    <Input 
      type="textarea"
      bg='light'
      value={desc}
      maxlength={100}
      label="Description"
      labelType="dashboard"
      className="h-40 bg-transparent"
      onChange={(e) => { setDesc(e.target.value) }}
      placeholder="Entrez votre description"
    />
  )
}

export const UserNameInput = () => {
  const {username, setUsername} = useContext(EditorProfilContext)

  return (
    <Input
      type="text"
      bg='light'
      value={username}
      label="Nom d'utilisateur"
      labelType="dashboard"
      className="bg-transparent"
      onChange={(e) => { setUsername(e.target.value)}}
      placeholder="Entrez votre nom d'utilisateur"
    />
  )
}

export const FNameInput = () => {
  const {fName, setFName} = useContext(EditorProfilContext)

  return (
    <Input
      type="text"
      bg='light'
      value={fName}
      label="Prénom"
      labelType="dashboard"
      className="bg-transparent"
      onChange={(e) => { setFName(e.target.value) }}
      disabled
      placeholder="Entrez votre prénom"
    />
  )
}

export const LNameInput = () => {
  const {lName, setLName} = useContext(EditorProfilContext)

  return (
    <Input
      type="text"
      bg='light'
      value={lName}
      label="Nom"
      labelType="dashboard"
      className="bg-transparent"
      onChange={(e) => { setLName(e.target.value) }}
      disabled
      placeholder="Entrez votre nom de famille"
    />
  )
}

export const EmailInput = () => {
  const {email, setEmail} = useContext(EditorProfilContext)

  return (
    <Input
      type="email"
      bg='light'
      value={email}
      label="Mail"
      labelType="dashboard"
      className="bg-transparent"
      onChange={(e) => { setEmail(e.target.value) }}
      disabled
      placeholder="Entrez votre email"
    />
  )
}

export const PhoneInput = () => {
  const {phone, setPhone} = useContext(EditorProfilContext)

  return (
    <Input
      type="text"
      bg='light'
      value={phone}
      label="Téléphone"
      labelType="dashboard"
      className="bg-transparent"
      onChange={(e) => { setPhone(e.target.value)}}
      placeholder="Entrez votre numéro de téléphone"
    />
  )
}

export const StreetInput = () => {
  const {street, setStreet} = useContext(EditorProfilContext)

  return (
    <Input
      type="text"
      bg='light'
      value={street}
      label="Adresse"
      labelType="dashboard"
      className="bg-transparent"
      onChange={(e) => { setStreet(e.target.value)}}
      placeholder="Entrez votre adresse"
    />
  )
}

export const ZipCodeInput = () => {
  const {zipcode, setZipcode} = useContext(EditorProfilContext)

  return (   
    <Input
      type="text"
      bg='light'
      value={zipcode}
      label="Code Postal"
      labelType="dashboard"
      className="bg-transparent"
      onChange={(e) => {setZipcode(e.target.value)}}
      placeholder="Entrez votre code postal"
    />
  )
}

export const CityInput = () => {
  const {city, setCity} = useContext(EditorProfilContext)

  return (   
    <Input
      type="text"
      bg='light'
      value={city}
      label="Ville"
      labelType="dashboard"
      className="bg-transparent"
      onChange={(e) => {setCity(e.target.value)}}
      placeholder="Entrez votre ville"
    />
  )
}