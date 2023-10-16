import Input from "@/components/_shared/form/Input"
import { useContext } from "react"
import { EditorProfilContext } from "../_context/EditorProfilContext"

export const DescInput = () => {
  const {desc, setDesc} = useContext(EditorProfilContext)

  return (
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
  )
}

export const UserNameInput = () => {
  const {username, setUsername} = useContext(EditorProfilContext)

  return (
    <Input
      type="text"
      bg="light"
      value={username}
      label="Nom d'utilisateur"
      labelType="dashboard"
      size="sm"
      onChange={(e) => { setUsername(e.target.value)}}
    />
  )
}

export const FNameInput = () => {
  const {fName, setFName} = useContext(EditorProfilContext)

  return (
    <Input
      type="text"
      bg="light"
      value={fName}
      label="Prénom"
      labelType="dashboard"
      size="sm"
      onChange={(e) => { setFName(e.target.value) }}
      disabled
    />
  )
}

export const LNameInput = () => {
  const {lName, setLName} = useContext(EditorProfilContext)

  return (
    <Input
      type="text"
      bg="light"
      value={lName}
      label="Nom"
      labelType="dashboard"
      size="sm"
      onChange={(e) => { setLName(e.target.value) }}
      disabled
    />
  )
}

export const EmailInput = () => {
  const {email, setEmail} = useContext(EditorProfilContext)

  return (
    <Input
      type="email"
      bg="light"
      value={email}
      label="Mail"
      labelType="dashboard"
      size="sm"
      onChange={(e) => { setEmail(e.target.value) }}
      disabled
    />
  )
}

export const PhoneInput = () => {
  const {phone, setPhone} = useContext(EditorProfilContext)

  return (
    <Input
      type="text"
      bg="light"
      value={phone}
      label="Téléphone"
      labelType="dashboard"
      size="sm"
      onChange={(e) => { setPhone(e.target.value)}}
    />
  )
}

export const StreetInput = () => {
  const {street, setStreet} = useContext(EditorProfilContext)

  return (
    <Input
      type="text"
      bg="light"
      value={street}
      label="Rue"
      labelType="dashboard"
      size="sm"
      onChange={(e) => { setStreet(e.target.value)}}
    />
  )
}

export const ZipCodeInput = () => {
  const {zipcode, setZipcode} = useContext(EditorProfilContext)

  return (   
    <Input
      type="text"
      bg="light"
      value={zipcode}
      label="Code Postal"
      labelType="dashboard"
      size="sm"
      onChange={(e) => {setZipcode(e.target.value)}}
    />
  )
}

export const CityInput = () => {
  const {city, setCity} = useContext(EditorProfilContext)

  return (   
    <Input
      type="text"
      bg="light"
      value={city}
      label="Ville"
      labelType="dashboard"
      size="sm"
      onChange={(e) => {setCity(e.target.value)}}
    />
  )
}

export const AddressMore = () => {
  const {addressMore, setAddressMore} = useContext(EditorProfilContext)

  return (   
    <Input
      type="text"
      bg="light"
      value={addressMore}
      label="Ville"
      labelType="dashboard"
      size="sm"
      onChange={(e) => {setAddressMore(e)}}
    />
  )
}