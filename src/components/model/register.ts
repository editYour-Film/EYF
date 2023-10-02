type Password = {
  pwd: string;
  confirmed: boolean;
};

export const initRegisterUser = {
  firstname: "",
  lastname: "",
  isAdmin: false,
  isEditor: false,
  email: "",
  password: {
    pwd: "",
    confirmed: false,
  },
  cgu: false,
  address: "",
  zipcode: "",
  city: "",
  phone: "",
};
export type RegisterUser = {
  firstname: string;
  lastname: string;
  isAdmin: boolean;
  isEditor: boolean;
  email: string;
  password: Password;
  cgu: boolean;
  address: string;
  zipcode: string;
  city: string;
  phone: string;
};
