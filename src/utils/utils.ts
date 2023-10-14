import validator from "validator";

export const checkAlphanumeric = (string: string, cb: Function) => {
  const errorTxt = "Le champ ne doit comporter que des chiffre et des lettres";

  if (
    !validator.isEmpty(string) &&
    !validator.isAlphanumeric(string, "fr-FR", { ignore: " " })
  )
    cb(errorTxt);
  else cb("");
};
