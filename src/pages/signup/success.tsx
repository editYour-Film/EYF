import Head from "next/head";
import LayoutSignin from "@/components/layouts/LayoutSignin";
import Button from "@/components/_shared/form/Button";
import Link from "next/link";
import { getStoredValue } from "@/hooks/useLocalStorage";
import { RegisterUser, initRegisterUser } from "@/components/model/register";

export default function SignUpSuccess() {
  const registerUser = getStoredValue(
    "user_register",
    initRegisterUser
  )() as RegisterUser;

  return (
    <>
      <Head>
        <title>EditYour.Film</title>
        <meta name="description" content="" />
      </Head>

      <LayoutSignin>
        <h3 className="text-2xl font-semibold">Félicitations</h3>
        {registerUser.isEditor ? (
          <>
            <p className="opacity-70">
              Ajoutez dès à présent vos modèles de montage et mettez à profit
              vos compétences pour vos futurs clients.
            </p>

            <Link href="#">
              <Button text="Découvrir mon profil" />
            </Link>

            <Link href="#">
              <Button
                variant="secondary"
                text="Ajouter une réalisation au catalogue"
              />
            </Link>

            <Link href="#">
              <Button variant="secondary" text="Compléter mes informations" />
            </Link>
          </>
        ) : (
          <>
            <p className="opacity-70">
              Profitez dès à présent de notre service. Des monteurs
              professionnels reconnus sont disponibles dès maintenant pour
              réaliser vos projets.
            </p>

            <Link href="#">
              <Button text="Réaliser un devis" />
            </Link>

            <Link href="#">
              <Button variant="secondary" text="Accéder au catalogue" />
            </Link>
          </>
        )}
      </LayoutSignin>
    </>
  );
}
