import Head from "next/head";
import LayoutSignin from "@/components/layouts/LayoutSignin";
import Input from "@/components/_shared/form/Input";
import Button from "@/components/_shared/form/Button";
import { useRouter } from "next/router";
import routes from "../../routes";
import { useEffect, useState } from "react";
import useLocalStorage, { getStoredValue } from "@/hooks/useLocalStorage";
import { RegisterUser, initRegisterUser } from "@/components/model/register";

export default function SignUpCGU() {
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
      label: "J’accepte les Conditions générales",
      value: true,
    },
  ];
  const [selectedOption, setSelectedOption] = useState(false);

  useEffect(() => {
    if (!registerUser.password.confirmed) push(routes.SIGNUP_PASSWORD);
    setSelectedOption(registerUser.cgu);
  }, []);

  const onSubmit = () => {
    setRegisterUser((previousState: RegisterUser) => ({
      ...previousState,
      cgu: true,
    }));
    push(routes.SIGNUP_INFO);
  };
  return (
    <>
      <Head>
        <title>EditYour.Film</title>
        <meta name="description" content="" />
      </Head>

      <LayoutSignin previousPath={routes.SIGNUP_CONFIRM_PASSWORD}>
        <h3 className="text-2xl font-semibold">
          Conditions Générales d’utilisation
        </h3>
        <Input
          type="radio"
          options={options}
          onChange={setSelectedOption}
          selectedOption={selectedOption}
        />
        <Button
          text="Continuer"
          onClick={() => onSubmit()}
          disabled={!selectedOption}
        />
      </LayoutSignin>
    </>
  );
}
