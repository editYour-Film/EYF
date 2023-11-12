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

export const lockDocumentScroll = (offset: number) => {
  document.body.style.position = "fixed";
  document.body.style.top = `-${offset}px`;
};

export const unLockDocumentScroll = (offset: number) => {
  document.body.style.position = "";
  document.body.style.top = "";
  window.scrollTo(0, offset);
};

export const extractDataFromDate = (
  string: string,
  data: "day" | "month" | "year"
) => {
  if (string && string.length === 10) {
    switch (data) {
      case "day":
        return string.substring(8, 10);
      case "month":
        return string.substring(5, 7);
      case "year":
        return string.substring(0, 4);
    }
  }
};
