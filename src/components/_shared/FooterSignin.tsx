import Link from 'next/link';
import routes from "@/routes";
import {useRouter} from 'next/router';
import { SimpleLink } from './SimpleLink';

type FooterSigninProps = {
  height: string
}

export const FooterSignin  = ({height}: FooterSigninProps) => {
  const router = useRouter()

  return (
    <div className={`FooterSignin bottom-0 flex justify-center items-center w-full h-[75px] border-t`}>
      {router.pathname === routes.SIGNIN_PASSWORD ?

      (<>
        <span className="text-base-text"> Mot de passe oublié ?&nbsp;</span>
        <SimpleLink
          href={routes.SIGNIN_RESET_PWD_P1}
          className='text-white'
        >
          Renouveler mon mot de passe
        </SimpleLink>
      </>)
      
      :

      (<>
        <span className="text-base-text"> Nouveau sur editYour.Film ?{" "}</span>
        <Link
          href={routes.SIGNUP_EMAIL}
          className="text-violet ml-2.5 text-lg cursor-pointer"
          scroll={false}
        >
          S’inscrire
        </Link>
      </>)
      }
    </div>
  )
}