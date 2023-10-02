import Head from "next/head";
import LayoutSignin from "@/components/layouts/LayoutSignin";
import Input from "@/components/_shared/form/Input";
import Button from "@/components/_shared/form/Button";
import { useEffect, useState } from "react";
import routes from "../../routes";
import validator from "validator";
import { inputErrors } from "../../const";
import { useRouter } from "next/router";
import { getStoredValue } from "@/hooks/useLocalStorage";
import Logo from "@/icons/logo-horizontal-lg.svg";
import { useStrapiPost } from "@/hooks/useStrapi";
import { getTokenFromLocalCookie, setToken } from "@/auth/auth";
import { SigninUser, initSigninUser } from "@/components/model/signin";
import { useUser } from "@/auth/authContext";

export default function SignInPassword() {
  const { push } = useRouter();
  const [, isLoggedIn] = useUser();

  const signinUser = getStoredValue(
    "user_signin",
    initSigninUser
  )() as SigninUser;

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    const token = getTokenFromLocalCookie();
    if (token && isLoggedIn) push(routes.DASHBOARD_EDITOR_HOME);
  }, [isLoggedIn]);

  useEffect(() => {
    if (signinUser.email === "") push(routes.SIGNIN_EMAIL);
  }, [signinUser]);

  const onSubmit = async () => {
    setPasswordError("");

    if (validator.isEmpty(password)) setPasswordError(inputErrors.required);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const response = await useStrapiPost("auth/local", {
      identifier: signinUser.email,
      password: password,
    });

    if (response.status !== 200) alert("erreur email / mot de passe");
    else {
      setToken(response.data);
      location.reload();
    }
  };

  const handleVerifCode = () => {};

  return (
    <>
      <Head>
        <title>EditYour.Film</title>
        <meta name="description" content="" />
      </Head>

      <LayoutSignin previousPath={routes.SIGNIN_EMAIL}>
        <Logo />
        <hr className="border" />
        <h1 className="text-[24px] max-w-xs">Compte monteur</h1>
        <div>
          <Input
            label="Mot de passe"
            type="password"
            value={password}
            placeholder="Entrez votre mot de passe"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            error={passwordError}
            bg={"light"}
          />
          <Button
            text="Se connecter"
            onClick={() => onSubmit()}
            borderRadiusSm
            className="h-[52px] mt-3"
          />
        </div>
        <div className="flex flex-row justify-between items-center gap-5">
          <hr className="border basis-1/2" />
          <span className="text-base-text">ou</span>
          <hr className="border basis-1/2" />
        </div>
        <div>
          <Button
            text="Recevoir un code de vérification par email"
            variant="light"
            onClick={() => {
              handleVerifCode();
            }}
            borderRadiusSm
            className="h-[52px] border-opacity-0"
          />

          <Button
            text="Autres méthodes de connexion"
            variant="dark"
            onClick={() => {
              push(routes.SIGNIN_TYPE);
            }}
            borderRadiusSm
            className="h-[52px] mt-3"
            iconLeft
            icon="arrow-left"
          />
        </div>
      </LayoutSignin>
    </>
  );
}
