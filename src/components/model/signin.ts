export const initSigninUser = {
  email: "",
};
export type SigninUser = {
  email: string;
};

export type SignedInUser = {
  user: object;
  details?: object;
  models?: object | undefined;
};
export const initSignedInUser = {
  user: {},
  details: {},
};
