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
};
