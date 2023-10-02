import Head from "next/head";
import LayoutSignin from "@/components/layouts/LayoutSignin";
import Input from "@/components/_shared/form/Input";
import Button from "@/components/_shared/form/Button";
import { useRouter } from "next/router";
import routes from "../../../routes";
import { useState } from "react";
import validator from "validator";
import { inputErrors } from "@/const";
import { H3 } from "@/components/_shared/typography/H3";
import { getStoredValue } from "@/hooks/useLocalStorage";
import { SigninUser, initSigninUser } from "@/components/model/signin";

export default function PasswordUpdate() {
  const signinUser = getStoredValue(
    "user_signin",
    initSigninUser
  )() as SigninUser;

  const { push } = useRouter();
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const onSubmit = () => {
    setPasswordError("");
    setConfirmPasswordError("");

    let isValid = true;
    if (
      !validator.isStrongPassword(password, {
        minLength: 6,
        minNumbers: 1,
        minSymbols: 1,
        minLowercase: 0,
        minUppercase: 0,
        returnScore: false,
      })
    ) {
      setPasswordError(inputErrors.weakPassword);
      isValid = false;
    }
    if (!validator.equals(password, confirmPassword)) {
      setConfirmPasswordError(inputErrors.diffPassword);
      isValid = false;
    }

    if (isValid) push(routes.SIGNIN_RESET_PWD_P3);
  };
  return (
    <>
      <Head>
        <title>EditYour.Film</title>
        <meta name="description" content="" />
      </Head>

      <LayoutSignin previousPath={routes.SIGNIN_RESET_PWD_P1}>
        <H3>Modifier mon mot de passe</H3>
        <Input
          type="password"
          value={password}
          placeholder="Mot de passe"
          helper="Utilisez au moins 6 caractères (sensible à la casse), 
            dont un chiffre ou caractère spécial."
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          error={passwordError}
        />
        <Input
          type="password"
          value={confirmPassword}
          placeholder="Confirmer mon mot de passe"
          onChange={(e) => {
            setConfirmPassword(e.target.value);
          }}
          error={confirmPasswordError}
        />
        <p className="pl-6 border-l border-white  text-lg">
          Mot de passe pour cette adresse mail : {signinUser.email}
        </p>
        <Button text="Continuer" onClick={() => onSubmit()} />
      </LayoutSignin>
    </>
  );
}
