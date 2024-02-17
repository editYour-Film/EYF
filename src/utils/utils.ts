import validator from "validator";
import { map } from "./Math";

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
  document.body.style.width = "100%";
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

export const formatVideoDuration = (duration: number) => {
  var mzminutes = Math.floor(duration / 60) ? Math.floor(duration / 60) : 0;
  var mzseconds = Math.floor(duration - mzminutes * 60);
  
  return (mzminutes < 10 ? "0" + mzminutes : mzminutes) + ":" + (mzseconds < 10 ? "0" + mzseconds : mzseconds);
};


export const formatDuration = (duration: number) => {
  return {
    min:  Math.trunc(duration),
    sec: map(0, 1, 0, 60, duration - Math.floor(duration)),
  }
}

export const displayDuration = (duration: number) => {
  const format = formatDuration(duration)

  const minString = format.min > 1 ? 'minutes' :'minute';
  const secString = format.sec > 1 ? 'secondes' :'seconde';

  const min = format.min > 0 ? format.min + ' ' + minString : '';
  const sec = Math.round(format.sec) > 0 ? Math.round(format.sec) + ' ' + secString : '';

  return min + ' ' + sec;
}

export const secureUrl = (url: string) => url.replace('http://', 'https://');