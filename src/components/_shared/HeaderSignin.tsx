import { ContainerFullWidth } from "@/components/_shared/UI/Container";
import routes from "@/routes";
import Image from "next/image";
import Link from "next/link";
import Button from "./form/Button";
import {useRouter} from 'next/router';
import { useContext } from "react";

type headerProps = {
  previousPath?: string;
  ctx: any
};

const Header = ({ previousPath, ctx }: headerProps) => {
  const context = useContext<any>(ctx)
  const router = useRouter()

  const handleBack = () => {
    if ( context.currentStep !== 0 ) {      
      context.goBack()
    } else {
      router.push(previousPath ? previousPath : routes.HOME)
    }
  }

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <ContainerFullWidth className="md:px-10">
        <div className="flex items-center flex-wrap px-4 py-2 md:py-5 justify-end">
          <Button 
            text={`${context.currentStep !== 0 ? 'Retour' : 'Fermer'}`}
            variant="black"
            className="w-max"
            onClick={() => { handleBack() }}
          />
        </div>
      </ContainerFullWidth>
    </header>
  );
};

export default Header;
