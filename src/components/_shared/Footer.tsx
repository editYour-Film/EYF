import Container from "@/components/_shared/UI/Container";
import routes from "@/routes";
import Image from "next/image";
import Link from "next/link";

import FbIcon from "../../../public/icons/facebook.svg";
import TwtIcon from "../../../public/icons/twitter-x.svg";
import InstaIcon from "../../../public/icons/instagram.svg";
import LnkdnIcon from "../../../public/icons/linkedin.svg";
import WaitingListForm from "./WaitingListForm";
import Modal from "./UI/Modal";
import { useState } from "react";
import useMediaQuery from "@/hooks/useMediaQuery";

const Footer = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  const linksTitleClass = "text-white opacity-70 mt-8 md:mt-0";
  const linksClass =
    "urbanist text-primary-middle opacity-70 transition-opacity duration-100 hover:opacity-100";
  const [isModalDisplayed, setIsModalDisplayed] = useState(false);
  const year = new Date().getFullYear().toString()

  return (
    <footer>
      <Container>
        <div className="footer grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 pb-6 md:pb-16 gap-4 lg:gap-10 max-w-5xl mx-auto">
          <div className="md:col-span-3 bg-primary rounded-3xl p-2 md:py-8 md:px-6">
            <div className="flex flex-col lg:flex-row gap-5">
              <Image
                width={52}
                height={52}
                src="/icons/logo.svg"
                className="bg-black rounded-xl p-2 shrink-0 grow-0 h-[52px]"
                alt="editYour.film"
              />
              <div>
                <p className="text-white font-medium text-lg">
                  Un peu de nous dans votre feed ?
                </p>
                <p>
                  <span className=" opacity-40">Suivez-nous</span> 👋
                </p>
              </div>
            </div>
            <div className="footer__icons group flex flex-wrap gap-1 sm:gap-2 md:gap-4 mt-5">
              <a
                href="https://www.facebook.com/edityour.film"
                target="_blank"
                rel="noopener"
              >
                <FbIcon />
              </a>

              <a
                href="https://www.instagram.com/edityour.film/"
                target="_blank"
                rel="noopener"
              >
                <InstaIcon />
              </a>

              <a
                href="https://www.linkedin.com/in/francois-herard/"
                target="_blank"
                rel="noopener"
              >
                <LnkdnIcon />
              </a>

              <a
                href="https://twitter.com/edityourfilmFR"
                target="_blank"
                rel="noopener"
                className="flex justify-center items-center w-[35px] h-[35px]"
              >
                <TwtIcon />
              </a>
            </div>
          </div>

          { !isMobile && 
          <>
            <div className="text-left sm:text-left">
              <p className={linksTitleClass}>Services</p>
              <p className="mt-5">
                <span
                  onClick={() => setIsModalDisplayed(true)}
                  className={linksClass + " cursor-pointer"}
                >
                  Créer un film
                </span>
              </p>
              <p className="mt-5">
                <Link href={routes.BLOG} className={linksClass}>
                  Blog
                </Link>
              </p>
              <p className="mt-5">
                <Link href={routes.CATALOGUE} className={linksClass}>
                  Catalogue
                </Link>
              </p>
            </div>
            <div className="text-right sm:text-left">
              <p className={linksTitleClass}>Outils</p>
              <p className="mt-5">
                <span
                  onClick={() => setIsModalDisplayed(true)}
                  className={linksClass + " cursor-pointer"}
                >
                  Mes commandes
                </span>
              </p>
              <p className="mt-5" onClick={() => setIsModalDisplayed(true)}>
                <span
                  onClick={() => setIsModalDisplayed(true)}
                  className={linksClass + " cursor-pointer"}
                >
                  Espace client
                </span>
              </p>
              <p className="mt-5">
                <Link href={routes.MENTOR_CATALOGUE} className={linksClass}>
                  Espace monteur
                </Link>
              </p>
            </div>
            <div className="text-right sm:text-left">
              <p className={linksTitleClass}>Entreprise</p>
              <p className="mt-5">
                <Link href={routes.WHOWEARE} className={linksClass}>
                  Notre histoire
                </Link>
              </p>
              <p className="mt-5">
                <Link href={routes.ML} className={linksClass}>
                  Mentions légales
                </Link>
              </p>
  
              <p className="mt-5">
                <a href="mailto:contact@edityour.film" className={linksClass}>
                  Nous contacter
                </a>
              </p>
            </div>                 
          </>
          }
        </div>
      </Container>

      <div className="border-t">
        <div className="flex flex-col md:flex-row flex-wrap md:items-center justify-center md:justify-between py-8 gap-y-4 gap-x-4 w-full px-6 md:px-10">
          <div className={linksClass}>© {year} Prodyour.film. Tous droits réservés.</div>
          <Link href={routes.CGUCLIENTS} className={linksClass}>
            CGU
          </Link>
          <Link href={routes.CGUEDITOR} className={linksClass}>
            CGU monteur
          </Link>
          <Link href={routes.PC} className={linksClass}>
            Politique de cookies
          </Link>
          <Link href={routes.CP} className={linksClass}>
            Politique de confidentialité
          </Link>
          <Link href={routes.ML} className={linksClass}>
            Mentions légales
          </Link>
        </div>
      </div>

      <Modal
        isDisplayed={isModalDisplayed}
        onClose={() => setIsModalDisplayed(false)}
      >
        <WaitingListForm userType="client" />
      </Modal>
    </footer>
  );
};

export default Footer;
