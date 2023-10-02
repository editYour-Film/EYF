import Head from "next/head";
import LayoutSignin from "@/components/layouts/LayoutSignin";
import Input from "@/components/_shared/form/Input";
import Button from "@/components/_shared/form/Button";
import { useRouter } from "next/router";
import routes from "../../routes";
import { useEffect, useState } from "react";
import validator from "validator";
import { inputErrors } from "../../const";
import useLocalStorage, { getStoredValue } from "@/hooks/useLocalStorage";
import { RegisterUser, initRegisterUser } from "@/components/model/register";

export default function SignUpPassword() {
  const { push } = useRouter();
  const registerUser = getStoredValue(
    "user_register",
    initRegisterUser
  )() as RegisterUser;
  const [, setRegisterUser] = useLocalStorage<RegisterUser>(
    "user_register",
    initRegisterUser
  );

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    if (registerUser.email === "") push(routes.SIGNUP_EMAIL);
  }, []);

  const onSubmit = () => {
    setPasswordError("");

    if (
      !validator.isStrongPassword(password, {
        minLength: 6,
        minNumbers: 1,
        minSymbols: 1,
        minLowercase: 0,
        minUppercase: 0,
        returnScore: false,
      })
    )
      setPasswordError(inputErrors.weakPassword);
    else {
      setRegisterUser((previousState: RegisterUser) => ({
        ...previousState,
        password: {
          pwd: password,
          confirmed: false,
        },
      }));
      push(routes.SIGNUP_CONFIRM_PASSWORD);
    }
  };
  return (
    <>
      <Head>
        <title>EditYour.Film</title>
        <meta name="description" content="" />
      </Head>

      <LayoutSignin previousPath={routes.SIGNUP_ACCOUNT_TYPE}>
        <h3 className="text-2xl font-semibold">Créer un mot de passe</h3>
        <Input
          type="password"
          value={password}
          placeholder="Mot de passe"
          helper="Utilisez au moins 6 caractères (sensible à la casse), 
            dont un chiffre et caractère spécial."
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          error={passwordError}
        />
        <p className="pl-6 border-l border-white font-bold text-lg">
          Mot de passe pour cette adresse mail : {registerUser.email}
        </p>
        <Button text="Continuer" onClick={() => onSubmit()} />
      </LayoutSignin>
    </>
  );
}
