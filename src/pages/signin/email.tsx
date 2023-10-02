import Head from "next/head";
import LayoutSignin from "@/components/layouts/LayoutSignin";
import Input from "@/components/_shared/form/Input";
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
import { getTokenFromLocalCookie } from "@/auth/auth";
import { useDispatch } from "react-redux";
import { disableTransition } from "@/store/slices/transitionSlice";

export default function SignInEmail() {
  const { push } = useRouter();
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
  const dispatch = useDispatch()

  useEffect(() => {
    const token = getTokenFromLocalCookie();
    if (token) push(routes.DASHBOARD_EDITOR);
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
      
      dispatch(disableTransition())
      push(routes.SIGNIN_PASSWORD);
    }
  };

  const handleOtherConnections = () => {};

  return (
    <>
      <Head>
        <title>EditYour.Film</title>
        <meta name="description" content="" />
      </Head>

      <LayoutSignin>
        <Logo />
        <hr className="border" />
        <h1 className="text-[24px] max-w-xs">Compte monteur</h1>
        <div>
          <Input
            label="Email"
            type="email"
            value={email}
            placeholder="Adresse e-mail"
            onChange={(e) => setEmail(e.target.value)}
            error={emailError}
            bg={"light"}
          />
          <Button
            text="Continuer"
            onClick={() => onSubmit()}
            borderRadiusSm
            className="h-[52px] mt-3"
          />
        </div>

        <hr className="border" />

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
