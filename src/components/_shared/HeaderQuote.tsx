import { ContainerFullWidth } from "@/components/_shared/UI/Container";
import routes from "@/routes";
import Image from "next/image";
import Link from "next/link";
import { Stepper } from "./UI/Stepper";
import { QuoteContext } from "../quote/_context/QuoteContext";
import { useContext, useEffect, useRef, useState } from "react";
import { useLenis } from "@studio-freight/react-lenis";

type HeaderQuoteProps = {
  step: number;
};
const HeaderQuote = ({ step }: HeaderQuoteProps) => {
  const quoteContext = useContext(QuoteContext)
  const lenis = useLenis()
  const [isUnderlined, setIsUnderlined] = useState(true)
  const header = useRef<HTMLElement>(null)
  
  useEffect(() => {
    const searchBar = document.querySelector('.catalog-searchbar')
    
    const onScroll = (e: Event) => {
      if(searchBar && searchBar.getBoundingClientRect().top < 60) {
        setIsUnderlined(false)
        header.current && header.current.classList.add('border-transparent')
        searchBar.classList.add('border-b-03')
      }
      else {
        setIsUnderlined(true)
        searchBar && searchBar.classList.remove('border-b-03')
        header.current && header.current.classList.remove('border-transparent')
      }
    }

    window.addEventListener('scroll', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

    return (
    <header 
      ref={header}
      className={`sticky md:fixed top-0 left-0 px-4 w-full z-header transition-all duration-700 bg-blackBerry-500 backdrop-blur-sm md:border-b-03`}>
      <ContainerFullWidth className="md:px-10">
        <div className="flex items-center flex-wrap py-2 md:py-2 justify-between">
          <Link href={routes.HOME} className="cursor-pointer">
            <Image
              width={125}
              height={25}
              src="/icons/logo-navbar.svg"
              alt=""
              className="lg:block max-w-[125px]"
            />
          </Link>
          <nav className="flex justify-between sm:justify-start gap-2 sm:gap-8 lg:gap-16 relative">

            <Stepper 
              steps={quoteContext.steps}
            />

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
