import Button from "./form/Button"
import { useRef, useState } from "react"
import Image from 'next/image'
import validator from "validator"
import { inputErrors } from "@/const";
import { useStrapi, useStrapiPost } from "@/hooks/useStrapi";
import { addEmailToNewsletter } from "@/lib/addEmailToNewsletter";

type JoinBetaProps = {
  isVisible: boolean,
  onClose: any
}
export const JoinBeta = ({ isVisible = false, onClose }: JoinBetaProps) => {
  const joinBetaForm = useRef(null)
  const [name, setName] = useState("")
  const [nameErr, setNameErr] = useState("")
  const [email, setEmail] = useState("")
  const [emailErr, setEmailErr] = useState("")
  const [chkbx, setChkbx] = useState(false)
  const [chkbxErr, setChkbxErr] = useState("")
  const handleSubmit = () => {
    setNameErr("");
    setEmailErr("");
    setChkbxErr("");

    if (validator.isEmpty(name)) setNameErr(inputErrors.required);
    if (validator.isEmpty(email)) setEmailErr(inputErrors.required);
    if (!chkbx) setChkbxErr(inputErrors.agreeToTerms);

    else if (!validator.isEmail(email))
      setEmailErr(inputErrors.invalid);
    if (
      !validator.isEmpty(name) &&
      validator.isEmail(email) &&
      chkbx
    ) {
      // @ts-ignore
      process2( 
        "https://api.sarbacane.com/v1/forms/contacts/upsert?listID&#x3D;c3c44292-adee-4f1b-92cd-ef2706721994&amp;formID&#x3D;xRHBHwhpSG2-Mn2YZ7m3Mw&amp;timezone&#x3D;Europe/Paris",
        'https://forms.sbc33.com/', 
        '630b38236b13361baa5dd350',
        'false', 
        'message', 
        '', 
        'https://api.sarbacane.com/v1/transactional/sendmessage/optin', 
        'Merci', 
        'Vos informations ont été ajoutées avec succès. A très vite sur editYour.Film !', 
        'Vous allez recevoir un email', 
        'Vous devrez cliquer sur le lien de confirmation pour valider votre inscription', 
        'Erreur', 
        'Une erreur inattendue s%27est produite.', 
        'Le formulaire est en cours d%27édition, veuillez patienter quelques minutes avant d%27essayer à nouveau.', 
        '', 
        '', 
        '', 
        '', 
        '' 
      );
    }
  }

  const handleClose = () => {
    onClose()
  }

  
  const sendgrid = async () => {
    const sendRes = await useStrapiPost(
      "send-mail",
      {
        email: email,
        subject: "Bienvenue sur EditYourFilm",
        text:
          "Bonjour " +
          name +
          ", merci d'avoir rejoins la béta de EditYourFilm.",
      },
      false
    );
    if (sendRes.status === 200)
      await addEmailToNewsletter(email).then(() => {
        console.log("Vous avez rejoins la béta.");
        // setResponse("Vous avez rejoins la béta.");
      });
  };

  return <div className={`joinBeta fixed top-0 left-0 w-full h-[100vh] min-h-[100vh] bg-black flex flex-col lg:flex-row justify-start lg:justify-around items-center gap-10 lg:gap-12 xl:gap-24 fullHd:gap-10 fullHd:justify-center transition-transform duration-700 ease-in-out z-popup overflow-scroll lg:overflow-hidden ${isVisible ? 'translate-y-0 pointer-events-all' : 'translate-y-[130%] pointer-events-none'}`}>
    <Button text="Fermer" variant="black" onClick={handleClose} className="sticky md:absolute md:right-10 top-10 ml-auto mr-10 px-[20px] py-[10px] border rounded-full z-20 w-max"></Button>
    <div className="joinBeta__text flex flex-col gap-6 mt-16 md:mt-32 px-10 md:px-16 basis-[100%] lg:mt-0 lg:pr-0 lg:pl-28 lg:basis-[568px] lg:shrink-0 fullHd:pl-0">
      <Image
        src="/img/Logo-Long.png"
        alt="logo edit your film"
        width="71"
        height="71"
      />
      <div className="joinBeta__title n27 text-title leading-[110%]">DEMANDER À<br/>REJOINDRE<br/>LA BETA</div>
      <div className="joinBeta__text text-base-text text-xl leading-[145%]">
        Nous sommes ravis de vous proposer de rejoindre l’expérience editYour.Film.<br/>
        Complétez le formulaire afin de rejoindre la liste d’attente de la BETA et de contribuer à l’amélioration de notre service.
        </div>
    </div>
    <div className="joinBeta__form px-10 md:px-16 lg:px-32 py-24 z-10 bg-black rounded-[24px]">
      <form 
        id="sb_form"
        ref={joinBetaForm} 
        className="flex flex-col gap-4 fullHd:max-w-[500px]"
        onSubmit={() => { handleSubmit() }}
      >
        <div className="flex flex-col">
          <label 
            id="label-41943a65-4131-4ca2-b475-301a22476d3e"
            htmlFor="input-41943a65-4131-4ca2-b475-301a22476d3e" 
            className="text-white opacity-70 mb-2">Prénom</label>
          <input
            type="text"
            sb-form-input="true"
            id="input-41943a65-4131-4ca2-b475-301a22476d3e"
            name="41943a65-4131-4ca2-b475-301a22476d3e"
            placeholder="Votre prénom"
            className="input-text border p-4 rounded-lg bg-darkgrey"
            value={name}
            onChange={(e) => { setName(e.target.value) }}
          />
          {nameErr && <p className="text-red-500 mt-1.5 ">{nameErr}</p>}
        </div>
        <div className="flex flex-col">
          <label 
            id="label-email"
            htmlFor="joinBeta__email" className="text-white opacity-70 mb-2">Email</label>
          <input
            type="text"
            sb-form-input="true"
            id="input-email"
            name="email"
            placeholder="Votre adresse e-mail"
            className="input-text border p-4 rounded-lg bg-darkgrey"
            value={email}
            onChange={(e) => { setEmail(e.target.value) }}
          />
          {emailErr && <p className="text-red-500 mt-1.5 ">{emailErr}</p>}
        </div>
        <div className="flex flex-row items-start gap-3">
          <input
            type="checkbox"
            id="joinBeta__checkbox"
            sb-form-input="true"
            name="join-beta-terms"
            className="input-chkbx rounded-[5px] bg-base-text border"
            onChange={(e) => {
              setChkbx(e.target.checked)
            }}
          />
          <label htmlFor="joinBeta__checkbox" className="text-white opacity-40">J’accepte que EditYour.Film et Sarbacane traitent mes informations personnelles à des fins commerciales, telles que définies dans notre Politique de confidentialité et les CGU de EditYour.Film.</label>
        </div>
        {chkbxErr && <p className="text-red-500 mt-1.5 ">{chkbxErr}</p>}

        <Button text="Rejoindre la beta" onClick={() => { sendgrid() }} className="mt-8"></Button>

      </form>
    </div>

    <div className="absolute w-full h-full bottom-0 z-0 overflow-hidden">
      <div className="absolute w-[2000px] h-[500px] -left-96 bottom-0 opacity-[0.9] translate-y-[75%] bg-top-section"></div>
      <div className="absolute w-[1500px] h-[500px] -right-96 bottom-0 translate-y-[50%] bg-top-section-2"></div>
    </div>

  </div>
}