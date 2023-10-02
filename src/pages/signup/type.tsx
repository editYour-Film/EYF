import Head from "next/head";
import LayoutSignin from "@/components/layouts/LayoutSignin";
import Input from "@/components/_shared/form/Input";
import Button from "@/components/_shared/form/Button";
import { useRouter } from "next/router";
import routes from "../../routes";
import { useEffect, useState } from "react";
import useLocalStorage, { getStoredValue } from "@/hooks/useLocalStorage";
import { RegisterUser, initRegisterUser } from "@/components/model/register";

export default function SignUpAccountType() {
  const { push } = useRouter();

  const registerUser = getStoredValue(
    "user_register",
    initRegisterUser
  )() as RegisterUser;

  const [, setRegisterUser] = useLocalStorage<RegisterUser>(
    "user_register",
    initRegisterUser
  );

  const options = [
    {
      label: "Client",
      value: "isClient",
    },
    {
      label: "Monteur - Réalisatieur",
      value: "isEditor",
    },
  ];
  const [selectedOption, setSelectedOption] = useState("isClient");

  useEffect(() => {
    if (registerUser.email === "") push(routes.SIGNUP_EMAIL);
    setSelectedOption(registerUser.isEditor ? "isEditor" : "isClient");
  }, []);

  const onSubmit = () => {
    setRegisterUser((previousState: RegisterUser) => ({
      ...previousState,
      isEditor: selectedOption === "isEditor",
    }));
    push(routes.SIGNUP_PASSWORD);
  };

  return (
    <>
      <Head>
        <title>EditYour.Film</title>
        <meta name="description" content="" />
      </Head>

      <LayoutSignin previousPath={routes.SIGNUP_EMAIL}>
        <h3 className="text-2xl font-semibold">Choisir mon type de compte</h3>
        <div className="flex gap-5 md:gap-10">
          <Input
            type="radio"
            onChange={setSelectedOption}
            options={options}
            selectedOption={selectedOption}
          />
        </div>
        <p className="opacity-70">
          Grâce au compte client faites monter dès aujourd’hui votre prochain
          film !
        </p>
        <Button text="Continuer" onClick={() => onSubmit()} />
      </LayoutSignin>
    </>
  );
}
