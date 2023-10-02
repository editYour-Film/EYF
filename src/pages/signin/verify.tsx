import Head from "next/head";
import LayoutSignin from "@/components/layouts/LayoutSignin";
import Input from "@/components/_shared/form/Input";
import Button from "@/components/_shared/form/Button";
import { useRouter } from "next/router";
import routes from "@/routes";
import { useState } from "react";
import { SimpleLink } from "@/components/_shared/SimpleLink";

import Logo from '@/icons/logo-horizontal-lg.svg'
import { ErrorMsg } from "@/components/_shared/form/ErrorMsg";

export default function SignInEmail() {
  const { push } = useRouter();

  const [verifCode, setVerifCode] = useState<string>();

  const onSubmit = () => {

  };

  const errors = false;

  return (    
    <>
      <Head>
        <title>EditYour.Film</title>
        <meta name="description" content="" />
      </Head>

      <LayoutSignin>
        <Logo />

        <hr className="border"/>

        <h1 className="text-[24px] max-w-xs">Vérification de votre compte</h1>

        <div>
          {errors && <ErrorMsg className='mb-3' >Oups, quelque chose n’a pas fonctionné. Réessayez plus tard avec un nouveau code de vérification ou contactez notre équipe de support par chat.</ErrorMsg>}
          <p className="text-sm text-base-text mb-3" >Pour continuer, veuillez entrer le code de vérification à 6 chiffres qui vient de vous être envoyé à l’adresse <br />{'{'} monadresse@gmail.com {'}'} </p>
          <Input
            label=""
            type="text"
            value={verifCode}
            placeholder="Entrez le code de vérification"
            onChange={(e) => setVerifCode(e.target.value)}
            // error={verifCodeError}
            bg={'light'}
            className="mt-3"
          />
          <Button 
            text="Continuer" 
            onClick={() => onSubmit()} 
            borderRadiusSm
            className="h-[52px] mt-3"
          />
        </div>

        <hr className="border"/>

        <Button 
            text="Autres méthodes de connexion" 
            variant="dark"
            onClick={() => { push(routes.SIGNIN_TYPE) }} 
            borderRadiusSm
            className="h-[52px] mt-3"
            iconLeft
            icon="arrow-left"
        />
        <p className="text-white text-opacity-40">
        En continuant j’accepte les <SimpleLink className='text-white' href={routes.ML}>mentions légales</SimpleLink> et la <SimpleLink className='text-white' href={routes.PC}>politique de confidentialité</SimpleLink>
        </p>
      </LayoutSignin>
    </>
  );
}
