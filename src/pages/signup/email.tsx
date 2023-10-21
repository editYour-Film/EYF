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

export default function SignUpEmail() {
  const { push } = useRouter();
  const registerUser = getStoredValue(
    "user_register",
    initRegisterUser
  )() as RegisterUser;
  const [, setRegisterUser] = useLocalStorage<RegisterUser>(
    "user_register",
    initRegisterUser
  );
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  useEffect(() => {
    setEmail(registerUser.email);
  }, []);

  const onSubmit = () => {
    setEmailError("");
    if (!validator.isEmail(email)) setEmailError(inputErrors.invalid);
    else {
      setRegisterUser((previousState: RegisterUser) => ({
        ...previousState,
        email: email,
      }));
      push(routes.SIGNUP_ACCOUNT_TYPE);
    }
  };

  return (
    <>
      <Head>
        <title>EditYour.Film</title>
        <meta name="description" content="" />
      </Head>

      <LayoutSignin previousPath={routes.SIGNIN}>
        <h3 className="text-2xl font-semibold">Entrez votre adresse e-mail</h3>
        <Input
          type="email"
          value={email}
          placeholder="Adresse e-mail"
          onChange={(e) => setEmail(e.target.value)}
          error={emailError}
        />
        <Button text="Continuer" onClick={() => onSubmit()} />
      </LayoutSignin>
    </>
  );
}
