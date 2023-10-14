/* eslint-disable react-hooks/rules-of-hooks */
import Head from "next/head";
import LayoutSignin from "@/components/layouts/LayoutSignin";
import Button from "@/components/_shared/form/Button";
import { useRouter } from "next/router";
import routes from "@/routes";
import { useEffect, useState } from "react";
import { SimpleLink } from "@/components/_shared/SimpleLink";

import validator from "validator";
import { inputErrors } from "../../const";
import useLocalStorage, { getStoredValue } from "@/hooks/useLocalStorage";
import Logo from "@/icons/logo-horizontal-lg.svg";
import { SigninUser, initSigninUser } from "@/components/model/signin";
import { getUrlParam } from "@/utils/UrlParams";
import { useStrapiGet } from "@/hooks/useStrapi";
import {
  SignOut,
  getTokenFromLocalCookie,
  setToken,
  unsetToken,
} from "@/auth/auth";
import { useUser } from "@/auth/authContext";
import { useDispatch } from "react-redux";
import { disableTransition } from "@/store/slices/transitionSlice";

export default function SignInEmail() {
  const { push } = useRouter();
  const dispatch = useDispatch();

  const [, setSigninUser] = useLocalStorage<SigninUser>(
    "user_signin",
    initSigninUser
  );
  const signinUser = getStoredValue(
    "user_signin",
    initSigninUser
  )() as SigninUser;

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [userInfo, isLoggedIn] = useUser();

  useEffect(() => {
    setEmail(signinUser.email);
  }, []);

  const onSubmit = () => {
    setEmailError("");

    if (!validator.isEmail(email)) setEmailError(inputErrors.invalid);
    else {
      setSigninUser((previousState: SigninUser) => ({
        ...previousState,
        email: email,
      }));

      push(routes.SIGNIN_PASSWORD);
    }
  };

  const connectWithApple = () => {};

  useEffect(() => {
    const localToken = getTokenFromLocalCookie();
    if (localToken) push(routes.DASHBOARD_EDITOR);

    const token = getUrlParam("id_token");
    if (token) {
      useStrapiGet("auth/google/callback" + location.search, false, false)
        .then((response) => {
          if (response.status === 200) {
            setToken(response.data);
            alert(
              "sign in / register successfully, should redirect to 'complete info' if user info is not set"
            );
          } else unsetToken();
        })
        .catch(() => {
          console.log("error on sign in");
          unsetToken();
        });
    }
  }, []);

  return (
    <>
      <Head>
        <title>EditYour.Film</title>
        <meta name="description" content="" />
      </Head>

      <LayoutSignin>
        <Logo />

        <hr className="border" />

        <h1 className="text-[24px] max-w-xs">Se connecter à editYour.Film</h1>

        {isLoggedIn ? (
          <div>
            <p>
              signed in as {userInfo?.user?.email} <br />
            </p>
            <Button
              text="Sign out"
              onClick={() => SignOut()}
              borderRadiusSm
              className="h-[52px] border-opacity-0"
              variant="light"
            />
          </div>
        ) : (
          <div>
            <a
              href="#" /*href={process.env.NEXT_PUBLIC_API_STRAPI + "connect/google"}*/
            >
              <Button
                text="Se connecter avec Google"
                borderRadiusSm
                className="h-[52px] border-opacity-0"
                variant="light"
                icon="google"
                iconLeft
              />
            </a>
            <Button
              text="Se connecter avec Apple"
              onClick={() => connectWithApple()}
              borderRadiusSm
              className="h-[52px] mt-3 border-opacity-0"
              variant="light"
              icon="apple"
              iconLeft
            />
          </div>
        )}

        <hr className="border" />

        <Button
          text="Continuer avec un email"
          variant="dark"
          onClick={() => {
            dispatch(disableTransition());
            push(routes.SIGNIN_EMAIL);
          }}
          borderRadiusSm
          className="h-[52px] mt-3"
          iconLeft
          icon="arrow-right"
        />
        <p className="text-white text-opacity-40">
          En continuant j’accepte les{" "}
          <SimpleLink className="text-white" href={routes.ML}>
            mentions légales
          </SimpleLink>{" "}
          et la{" "}
          <SimpleLink className="text-white" href={routes.PC}>
            politique de confidentialité
          </SimpleLink>
        </p>
      </LayoutSignin>
    </>
  );
}
