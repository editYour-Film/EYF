import Head from "next/head";
import LayoutSignin from "@/components/layouts/LayoutSignin";
import Button from "@/components/_shared/form/Button";
import routes from "../../../routes";
import { getStoredValue } from "@/hooks/useLocalStorage";
import { SigninUser, initSigninUser } from "@/components/model/signin";

export default function PasswordLink() {
  const signinUser = getStoredValue(
    "user_signin",
    initSigninUser
  )() as SigninUser;

  const onSubmit = () => {
    alert("email sent");
  };
  return (
    <>
      <Head>
        <title>EditYour.Film</title>
        <meta name="description" content="" />
      </Head>

      <LayoutSignin previousPath={routes.SIGNIN_RESET_PWD_P2}>
        <h3 className="text-2xl font-semibold">Mot de passe oublié.</h3>
        <p className="pl-6 border-l border-white  text-lg">
          Mot de passe pour cette adresse mail : {signinUser.email}
        </p>
        <Button
          text="Recevoir un lien de connexion par mail"
          onClick={() => onSubmit()}
        />
      </LayoutSignin>
    </>
  );
}
