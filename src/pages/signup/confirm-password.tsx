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
import { RegisterUser, initRegisterUser } from "@/components/model/register";

export default function SignUpConfirmPassword() {
  const { push } = useRouter();
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const registerUser = getStoredValue(
    "user_register",
    initRegisterUser
  )() as RegisterUser;

  const [, setRegisterUser] = useLocalStorage<RegisterUser>(
    "user_register",
    initRegisterUser
  );

  useEffect(() => {
    if (registerUser.password.pwd === "") push(routes.SIGNUP_PASSWORD);
  }, []);

  const onSubmit = () => {
    if (!validator.equals(password, registerUser.password.pwd))
      setPasswordError(inputErrors.diffPassword);
    else {
      setRegisterUser((previousState: RegisterUser) => ({
        ...previousState,
        password: {
          pwd: registerUser.password.pwd,
          confirmed: true,
        },
      }));
      push(routes.SIGNUP_CGU);
    }
  };

  return (
    <>
      <Head>
        <title>EditYour.Film</title>
        <meta name="description" content="" />
      </Head>

      <LayoutSignin previousPath={routes.SIGNUP_PASSWORD}>
        <h3 className="text-2xl font-semibold">Confirmer le mot de passe</h3>
        <Input
          type="password"
          value={password}
          placeholder="Mot de passe"
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
