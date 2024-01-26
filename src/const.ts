import { optionInterface } from "./components/_shared/form/Dropdown";

export const inputErrors = {
  general: "Une erreur inattendue s'est produite.",
  required: "Champ obligatoire.",
  invalid: "Champ invalide.",
  invalidEmail: "L’adresse email renseignée n’est pas valide.",
  accountExist: "L’adresse email renseignée est deja utlisée.",
  usernameExist: "Le username renseignée est deja utlisée.",
  weakPassword: "Mot de passe faible.",
  diffPassword: "Mot de passe non identique.",
  agreeToTerms: "Merci d'accepter les conditions d'utilisation.",
};

export const IMG_MIMES = [
  'image/png',
  'image/jpeg',
  'image/jpg',
  'image/tiff',
  //eps
  'application/postscript',
  'image/x-eps',
  //psd
  'image/vnd.adobe.photoshop',
  'application/x-photoshop',
  'application/photoshop',
  'application/psd',
  'image/psd',
]

export const VIDEO_MIMES = [
  'video/mp4',
  'video/quicktime',
  'video/x-msvideo',
  // mts
  'video/mts',
  'video/avchd-stream',
  'application/metastream',
  'video/vnd.dlna.mpeg-tts',
  // mxf
  'application/mxf'
]

export const AUDIO_MIMES = [
  'audio/mpeg3',
  'audio/mpeg',
  'audio/wav',
  'audio/aac',
  'audio/aiff',
  'audio/mp4'
]

export const days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
export const months = [
  "Janvier",
  "Février",
  "Mars",
  "Avril",
  "Mai",
  "Juin",
  "Juillet",
  "Aout",
  "Septembre",
  "Octobre",
  "Novembre",
  "Décembre",
];

export const languages = [
  "Afrikaans",
  "Albanais",
  "Allemand",
  "Amharique",
  "Anglais",
  "Arabe",
  "Arménien",
  "Azerbaijani",
  "Basque",
  "Bengali",
  "Biélorusse",
  "Birman",
  "Bosniaque",
  "Bulgare",
  "Catalan",
  "Cebuano",
  "Chichewa",
  "Chinois (simplifié)",
  "Chinois (traditionnel)",
  "Cinghalais",
  "Coréen",
  "Corse",
  "Créole haïtien",
  "Croate",
  "Danois",
  "Espagnol",
  "Espéranto",
  "Estonien",
  "Finnois",
  "Français",
  "Frison occidental",
  "Galicien",
  "Gallois",
  "Géorgien",
  "Grec",
  "Goudjarati",
  "Haoussa",
  "Hawaïen",
  "Hébreu",
  "Hindi",
  "Hmong",
  "Hongrois",
  "Igbo",
  "Indonésien",
  "Irlandais",
  "Islandais",
  "Italien",
  "Japonais",
  "Javanais",
  "Kannada",
  "Kazakh",
  "Khmer",
  "Kirghize",
  "Kurde",
  "Laotien",
  "Latin",
  "Letton",
  "Lituanien",
  "Luxembourgeois",
  "Macédonien",
  "Malaisien",
  "Malayalam",
  "Malgache",
  "Maltais",
  "Maori",
  "Marathi",
  "Mongol",
  "Néerlandais",
  "Népalais",
  "Norvégien",
  "Ouzbek",
  "Pachtô",
  "Pendjabi",
  "Persan",
  "Polonais",
  "Portugais",
  "Roumain",
  "Russe",
  "Samoan",
  "Serbe",
  "Shona",
  "Sindhi",
  "Slovaque",
  "Slovène",
  "Somali",
  "Soundanais",
  "Suédois",
  "Swahili",
  "Tadjik",
  "Tagalog",
  "Tamoul",
  "Tchèque",
  "Telugu",
  "Thaï",
  "Turc",
  "Ukrainien",
  "Urdu",
  "Vietnamien",
  "Xhosa",
  "Yiddish",
  "Yoruba",
  "Zoulou",
];

export const languageObjects = () => {
  let _langObjectArray: optionInterface[] = [];

  languages.map((x, i) => {
    _langObjectArray.push({
      label: x,
      id: String(i),
    });
  });

  return _langObjectArray;
};

export const CLIENT_ROLE_ID = process.env.NEXT_PUBLIC_ENV === "prod" ? 4 : 3;
export const EDITOR_ROLE_ID = process.env.NEXT_PUBLIC_ENV === "prod" ? 3 : 4;
