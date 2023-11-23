import { optionInterface } from "../_shared/form/DropdownV2";
import { accountType } from "../signup/_context/signupContext";

export const initSigninUser = {
  email: "",
};
export type SigninUser = {
  email: string;
};

export type SignedInUser = {
  user: any;
  details?: any;
  models?: any | undefined;
};
export const initSignedInUser = {
  user: {},
  details: {},
  model: [],
};

export type RegisterUser = {
  currentStep: number;
  accountType: accountType;
  email: string | undefined;
  fname: string | undefined;
  lname: string | undefined;
  username: string | undefined;
  editorPicture?: any;
  editorPictureName?: string | undefined;
  editorDescription?: string;
  creatorPicture?: any;
  creatorPictureName?: string | undefined;
  skills: optionInterface[] | undefined;
  joinNewsletter?: boolean;
  lang_spoken?: string;
};
