import { inputErrors } from "@/const";
import { useState } from "react";
import validator from "validator";
import Image from "next/image";

type WaitingListFormProps = {
  userType: "client" | "monteur";
};
const WaitingListForm = ({ userType = "client" }: WaitingListFormProps) => {
  const inputClass =
    "rounded-2xl h-10 w-full px-4  border border-2 bg-white text-alpha-black-600";
  const labelClass = " flex flex-wrap items-center gap-3 mb-2";
  const buttonClass =
    "border rounded-full w-full text-white  px-5 flex items-center justify-center gap-2.5 transition-all duration-1000 h-10 bg-violet";

  const [fname, setfname] = useState("");
  const [fnameError, setfnameError] = useState("");
  const [lname, setlname] = useState("");
  const [lnameError, setlnameError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  return (
    <form id="sb_form" className="flex flex-col gap-4">
      <Image
        width={175}
        height={40}
        src="/icons/logo-horizontal-lg.svg"
        alt=""
        className="h-10 w-44"
      />
      <p className="text-">
        Nous sommes ravis de vous accueillir sur notre site en construction !
        Laissez vos nom, prénom et adresse mail, vous serez les premiers
        informés du lancement officiel d’editYour.Film. Dès maintenant,
        consultez le blog ou rejoignez-nous sur les réseaux sociaux ! A très
        vite !
      </p>

      <div>
        <label id="form-header-title" className="hidden">
          Nom du formulaire
        </label>

        <label
          id="label-41943a65-4131-4ca2-b475-301a22476d3e"
          className={labelClass}
        >
          Prénom *
        </label>
        <input
          id="input-41943a65-4131-4ca2-b475-301a22476d3e"
          type="text"
          name="41943a65-4131-4ca2-b475-301a22476d3e"
          required={true}
          sb-form-input="true"
          className={inputClass}
          value={fname}
          onChange={(e) => setfname(e.target.value)}
        />
        {fnameError && <p className="text-red-500 mt-1.5 ">{fnameError}</p>}
      </div>

      <div>
        <label
          id="label-49211977-781c-4406-b115-23ebe7572cd0"
          className={labelClass}
        >
          Nom *
        </label>
        <input
          id="input-49211977-781c-4406-b115-23ebe7572cd0"
          type="text"
          name="49211977-781c-4406-b115-23ebe7572cd0"
          required={true}
          sb-form-input="true"
          className={inputClass}
          value={lname}
          onChange={(e) => setlname(e.target.value)}
        />
        {lnameError && <p className="text-red-500 mt-1.5 ">{lnameError}</p>}
      </div>

      <div>
        <label id="label-email" className={labelClass}>
          Email *
        </label>
        <input
          id="input-email"
          type="email"
          name="email"
          required={true}
          sb-form-input="true"
          className={inputClass}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {emailError && <p className="text-red-500 mt-1.5 ">{emailError}</p>}
      </div>

      <div className="hidden">
        <label
          id="label-b79f10a1-7121-4d56-8dfd-5c0e77d8e477"
          className={labelClass}
        >
          Type *
        </label>
        <input
          id="input-b79f10a1-7121-4d56-8dfd-5c0e77d8e477"
          type="text"
          name="b79f10a1-7121-4d56-8dfd-5c0e77d8e477"
          required={true}
          sb-form-input="true"
          className={inputClass}
          value={userType}
        />
      </div>

      <div id="div-submitInput" className="pt-2">
        <button
          id="submitInput"
          type="button"
          value="VALIDER"
          className={buttonClass}
          onClick={() => {
            setfnameError("");
            setlnameError("");
            setEmailError("");

            if (validator.isEmpty(fname)) setfnameError(inputErrors.required);
            if (validator.isEmpty(lname)) setlnameError(inputErrors.required);
            if (validator.isEmpty(email)) setEmailError(inputErrors.required);
            else if (!validator.isEmail(email))
              setEmailError(inputErrors.invalid);

            if (
              !validator.isEmpty(fname) &&
              !validator.isEmpty(lname) &&
              validator.isEmail(email)
            )
              // @ts-ignore
              process2(
                "https://api.sarbacane.com/v1/forms/contacts/upsert?listID&#x3D;c3c44292-adee-4f1b-92cd-ef2706721994&amp;formID&#x3D;xRHBHwhpSG2-Mn2YZ7m3Mw&amp;timezone&#x3D;Europe/Paris",
                "https://forms.sbc28.com/form.js",
                "630b38236b13361baa5dd350",
                "false",
                "message",
                "",
                "https://services.sarbacane.com/core/v1/transactional/sendmessage/optin",
                "Merci",
                "Vos informations ont été ajoutées avec succès.",
                "Vous allez recevoir un email",
                "Vous devrez cliquer sur le lien de confirmation pour valider votre inscription",
                "Erreur",
                "Une erreur inattendue s%27est produite.",
                "Le formulaire est en cours d%27édition, veuillez patienter quelques minutes avant d%27essayer à nouveau.",
                "",
                "",
                ""
              );
          }}
        >
          <span>VALIDER</span>
        </button>
        <div className="loader"></div>
      </div>
      <label id="form-footer-mandatory" className="mt-2">
        * Champs obligatoires
      </label>
    </form>
  );
};

export default WaitingListForm;
