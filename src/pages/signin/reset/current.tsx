import Head from "next/head";
import LayoutSignin from "@/components/layouts/LayoutSignin";
import Input from "@/components/_shared/form/Input";
import Button from "@/components/_shared/form/Button";
import { useRouter } from "next/router";
import routes from "@/routes";
import { useEffect, useState } from "react";
import { inputErrors } from "@/const";
import validator from "validator";
import { getStoredValue } from "@/hooks/useLocalStorage";
import { H3 } from "@/components/_shared/typography/H3";
import { H2 } from "@/components/_shared/typography/H2";
import { SigninUser, initSigninUser } from "@/components/model/signin";

export default function PasswordCurrent() {
  const { push } = useRouter();
  const signinUser = getStoredValue(
    "user_signin",
    initSigninUser
  )() as SigninUser;

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    if (signinUser.email === "") push(routes.SIGNIN_EMAIL);
  }, [signinUser]);

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
    else push(routes.SIGNIN_RESET_PWD_P2);
  };

  return (
    <>
      <Head>
        <title>EditYour.Film</title>
        <meta name="description" content="" />
      </Head>

      <LayoutSignin previousPath={routes.SIGNIN_PASSWORD}>
        <H2 className="opacity-70">Recevoir un lien de connexion par mail.</H2>
        <H3>Saisissez votre mot de passe actuel</H3>
        <p className="pl-6 border-l border-white  text-lg">
          Mot de passe pour cette adresse mail : {signinUser.email}
        </p>
        <Input
          type="password"
          value={password}
          placeholder="Mot de passe"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          error={passwordError}
        />
        <Button
          text="Continuer"
          onClick={() => {
            onSubmit();
          }}
        />
      </LayoutSignin>
    </>
  );
}
