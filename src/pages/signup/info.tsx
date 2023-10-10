/* eslint-disable react-hooks/rules-of-hooks */
import Head from "next/head";
import LayoutSignin from "@/components/layouts/LayoutSignin";
import Input from "@/components/_shared/form/Input";
import Button from "@/components/_shared/form/Button";
import { useRouter } from "next/router";
import routes from "../../routes";
import { useEffect, useState } from "react";
import validator from "validator";
import { inputErrors } from "@/const";
import useLocalStorage, { getStoredValue } from "@/hooks/useLocalStorage";
import { useStrapiPost, useStrapiPut } from "@/hooks/useStrapi";
import { setToken, unsetToken } from "@/auth/auth";
import { RegisterUser, initRegisterUser } from "@/components/model/register";
import { useUser } from "@/auth/authContext";

export default function SignUpInfo() {
  const { push } = useRouter();
  const registerUser = getStoredValue(
    "user_register",
    initRegisterUser
  )() as RegisterUser;
  const [, setRegisterUser] = useLocalStorage<RegisterUser>(
    "user_register",
    initRegisterUser
  );

  const [, , , setUserInfo] = useUser();

  const [info, setInfo] = useState({
    fname: "",
    lname: "",
    address: "",
    zipcode: "",
    city: "",
    phone: "",
  });

  const [fnameError, setFnameError] = useState("");
  const [lnameError, setLnameError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [zipCodeError, setZipCodeError] = useState("");
  const [cityError, setCityError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  useEffect(() => {
    if (!registerUser.cgu) push(routes.SIGNUP_CGU);

    unsetToken();
    setInfo({
      fname: registerUser.firstname,
      lname: registerUser.lastname,
      address: registerUser.address,
      zipcode: registerUser.zipcode,
      city: registerUser.city,
      phone: registerUser.phone,
    });
  }, []);

  const onSubmit = async () => {
    setFnameError("");
    setLnameError("");
    setAddressError("");
    setZipCodeError("");
    setCityError("");
    setPhoneError("");

    let isValid = true;
    if (!validator.isAlpha(info.fname, "fr-FR")) {
      setFnameError(inputErrors.invalid);
      isValid = false;
    }
    if (!validator.isAlpha(info.lname, "fr-FR")) {
      setLnameError(inputErrors.invalid);
      isValid = false;
    }
    if (validator.isEmpty(info.address)) {
      setAddressError(inputErrors.required);
      isValid = false;
    }
    if (!validator.isPostalCode(info.zipcode, "FR")) {
      setZipCodeError(inputErrors.invalid);
      isValid = false;
    }
    if (!validator.isAlpha(info.city, "fr-FR")) {
      setCityError(inputErrors.invalid);
      isValid = false;
    }
    /*if (!validator.isMobilePhone(info.phone, "fr-FR", { strictMode: false })) {
      setPhoneError(inputErrors.invalid);
      isValid = false;
    }*/

    if (isValid) {
      setRegisterUser((previousState: RegisterUser) => ({
        ...previousState,
        firstname: info.fname,
        lastname: info.lname,
        address: info.address,
        zipcode: info.zipcode,
        city: info.city,
        phone: info.phone,
      }));

      const signupResponse = await useStrapiPost("auth/local/register", {
        username: registerUser.email,
        password: registerUser.password.pwd,
        email: registerUser.email,
      });
      if (signupResponse.status === 200) {
        setToken(signupResponse.data);
        const updateRoleResponse = await useStrapiPut(
          "users/" + signupResponse.data.user.id,
          {
            role: registerUser.isEditor
              ? /* Editor role ID */ 4
              : /* Client role ID */ 3,
          }
        );

        if (updateRoleResponse.status === 200) {
          const createAccountResponse = await useStrapiPost(
            "user-infos",
            {
              data: {
                f_name: info.fname,
                l_name: info.lname,
                address: info.address,
                post_code: info.zipcode,
                city: info.city,
                phone: info.phone,
                user_account: signupResponse.data.user.id,
              },
            },
            true
          );
          if (createAccountResponse.status === 200) {
            console.log("createAccountResponse", createAccountResponse);
            setUserInfo({
              user: signupResponse.data.user,
              details: {
                id: createAccountResponse.data.data.id,
                ...createAccountResponse.data.data.attributes,
              },
            });
            push(routes.SIGNUP_SUCCESS);
          } else alert("erreur lors de création du compte");
        } else alert("erreur lors de configuration du role");
      } else if (signupResponse.data.message.inludes("already taken"))
        alert("Compte existant.");
      else alert("erreur lors de sign up");
    }
  };
  return (
    <>
      <Head>
        <title>EditYour.Film</title>
        <meta name="description" content="" />
      </Head>

      <LayoutSignin previousPath={routes.SIGNUP_CGU}>
        <h3 className="text-2xl font-semibold">Ajoutez vos informations</h3>
        <Input
          type="text"
          value={info.fname}
          label="Prénom"
          onChange={(e) => {
            setInfo((previousState) => ({
              ...previousState,
              fname: e.target.value,
            }));
          }}
          error={fnameError}
        />
        <Input
          type="text"
          value={info.lname}
          label="Nom"
          onChange={(e) => {
            setInfo((previousState) => ({
              ...previousState,
              lname: e.target.value,
            }));
          }}
          error={lnameError}
        />
        <Input
          type="text"
          value={info.address}
          label="Adresse"
          onChange={(e) => {
            setInfo((previousState) => ({
              ...previousState,
              address: e.target.value,
            }));
          }}
          error={addressError}
        />
        <Input
          type="text"
          value={info.zipcode}
          label="Code postal / ZIP"
          onChange={(e) => {
            setInfo((previousState) => ({
              ...previousState,
              zipcode: e.target.value,
            }));
          }}
          error={zipCodeError}
        />
        <Input
          type="text"
          value={info.city}
          label="Ville"
          onChange={(e) => {
            setInfo((previousState) => ({
              ...previousState,
              city: e.target.value,
            }));
          }}
          error={cityError}
        />
        <Input
          type="text"
          value={info.phone}
          label="Numéro de téléphone portable"
          onChange={(e) => {
            setInfo((previousState) => ({
              ...previousState,
              phone: e.target.value,
            }));
          }}
          error={phoneError}
        />

        <Button text="Continuer" onClick={() => onSubmit()} />
      </LayoutSignin>
    </>
  );
}
