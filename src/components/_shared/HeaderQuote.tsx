import { ContainerFullWidth } from "@/components/_shared/UI/Container";
import routes from "@/routes";
import Image from "next/image";
import Link from "next/link";

type HeaderQuoteProps = {
  step: number;
};
const HeaderQuote = ({ step }: HeaderQuoteProps) => {
  const linkClass =
    "relative pb-1  lg:flex gap-3 items-center z-20 bg-black px-2";
  const isStepDoneClass =
    "w-7 h-7 text-lg n27 text-white bg-violet hidden lg:flex items-center justify-center rounded-full font-bold";
  const isStepNotDoneClass =
    "w-7 h-7 text-lg n27 text-black bg-white hidden lg:flex items-center justify-center rounded-full font-bold opacity-40";
  return (
    <header className="bg-black fixed top-0 left-0 w-full md:relative z-50">
      <ContainerFullWidth className="md:px-10">
        <div className="flex items-center flex-wrap py-2 md:py-5 justify-between">
          <Link href={routes.HOME} className="cursor-pointer">
            <Image
              width={175}
              height={40}
              src="/icons/logo-horizontal-lg.svg"
              alt=""
              className="h-10 w-44 hidden md:block"
            />
            <Image
              width={40}
              height={40}
              src="/icons/logo.svg"
              alt=""
              className="md:hidden"
            />
          </Link>
          <nav className="flex justify-between sm:justify-start gap-2 sm:gap-8 lg:gap-16 relative">
            <div className="absolute left-0 w-full border-t border-white bg-white opacity-30 top-4"></div>
            <Link href={routes.HOME} className={linkClass}>
              <span className={step > 0 ? isStepDoneClass : isStepNotDoneClass}>
                1
              </span>
              <span>
                Durée <span className="hidden sm:inline ">du film</span>
              </span>
            </Link>
            <Link href={""} className={linkClass}>
              <span className={step > 1 ? isStepDoneClass : isStepNotDoneClass}>
                2
              </span>
              <span className=" opacity-40">Modèle</span>
            </Link>
            <Link href={""} className={linkClass}>
              <span className={step > 2 ? isStepDoneClass : isStepNotDoneClass}>
                3
              </span>
              <span className=" opacity-40">Fichiers</span>
            </Link>
            <Link href={""} className={linkClass}>
              Prix
            </Link>
          </nav>
          <div>
            <Image
              src="/icons/question.svg"
              height={12}
              width={30}
              alt="narrow"
              className="mt-1 hidden lg:block"
            />
          </div>
        </div>
      </ContainerFullWidth>
    </header>
  );
};

export default HeaderQuote;
