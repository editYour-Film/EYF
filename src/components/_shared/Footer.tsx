import Container from "@/components/_shared/UI/Container";
import routes from "@/routes";
import Image from "next/image";
import Link from "next/link";

import FbIcon from "../../../public/icons/facebook.svg";
import YtIcon from "../../../public/icons/youtube.svg";
import InstaIcon from "../../../public/icons/instagram.svg";
import LnkdnIcon from "../../../public/icons/linkedin.svg";
import WaitingListForm from "./WaitingListForm";
import Modal from "./UI/Modal";
import { useState } from "react";
import useMediaQuery from "@/hooks/useMediaQuery";

const Footer = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [isModalDisplayed, setIsModalDisplayed] = useState(false);
  const year = new Date().getFullYear().toString();

  const linksTitleClass = "text-base text-soyMilk mt-8 md:mt-0";
  const linksClass =
    "text-base text-dashboard-text-description-base opacity-70 transition-opacity duration-100 hover:opacity-100 py-[10px]";

  return (
    <footer>
      <div className="footer grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 lg:grid-cols-7 pb-6 md:pb-[70px] gap-4 lg:gap-10 mx-auto md:px-dashboard-spacing-element-medium xl:px-[167px]">
        <div className="md:col-span-3 rounded-3xl p-2 md:py-[20px]">
          <div className="flex flex-col lg:flex-row gap-5">
            <Image
              width={52}
              height={52}
              src="/icons/logo.svg"
              className="bg-blackBerry rounded-xl p-2 shrink-0 grow-0 h-[52px]"
              alt="editYour.film"
            />
            <div>
              <p className="text-soyMilk font-medium text-lg">
                Un peu de nous dans votre feed ?
              </p>
              <p>
                <span className=" opacity-40">Suivez-nous</span> 👋
              </p>
            </div>
          </div>
          <div className="group flex flex-wrap gap-1 sm:gap-2 md:gap-4 mt-5">
            <a
              href="https://www.facebook.com/edityour.film"
              target="_blank"
              rel="noopener"
            >
              <FbIcon
                className={
                  "w-[35px] h-[35px] svg-color-dashboard-text-description-base hover:svg-color-blueBerry transition-colors duration-500"
                }
              />
            </a>

            <a
              href="https://www.instagram.com/edityour.film/"
              target="_blank"
              rel="noopener"
            >
              <InstaIcon
                className={
                  "w-[35px] h-[35px] svg-color-dashboard-text-description-base hover:svg-color-blueBerry transition-colors duration-500"
                }
              />
            </a>

            <a
              href="https://www.linkedin.com/in/francois-herard/"
              target="_blank"
              rel="noopener"
            >
              <LnkdnIcon
                className={
                  "w-[35px] h-[35px] svg-color-dashboard-text-description-base hover:svg-color-blueBerry transition-colors duration-500"
                }
              />
            </a>

            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener"
              className="flex justify-center items-center w-[35px] h-[35px]"
            >
              <YtIcon
                className={
                  "w-[35px] h-[35px] svg-color-dashboard-text-description-base hover:svg-color-blueBerry transition-colors duration-500"
                }
              />
            </a>
          </div>
        </div>

        {!isMobile && (
          <>
            <div className="text-left sm:text-left flex flex-col gap-1 lg:col-start-5">
              <p className={linksTitleClass}>Services</p>
              <span
                onClick={() => setIsModalDisplayed(true)}
                className={linksClass + " cursor-pointer"}
              >
                Créer un film
              </span>
              <Link href={routes.BLOG} className={linksClass}>
                Blog
              </Link>
              <Link href={routes.CATALOGUE} className={linksClass}>
                Catalogue
              </Link>
            </div>
            <div className="text-right sm:text-left flex flex-col gap-1">
              <p className={linksTitleClass}>Outils</p>
              <div
                onClick={() => setIsModalDisplayed(true)}
                className={linksClass + " cursor-pointer"}
              >
                Mes commandes
              </div>
              <span
                onClick={() => setIsModalDisplayed(true)}
                className={linksClass + " cursor-pointer"}
              >
                Espace client
              </span>
              <Link href={routes.MENTOR_CATALOGUE} className={linksClass}>
                Espace monteur
              </Link>
            </div>
            <div className="text-right sm:text-left flex flex-col gap-1">
              <p className={linksTitleClass}>Entreprise</p>
              <Link href={routes.WHOWEARE} className={linksClass}>
                Notre histoire
              </Link>
              <Link href={routes.ML} className={linksClass}>
                Mentions légales
              </Link>
              <a href="mailto:contact@edityour.film" className={linksClass}>
                Nous contacter
              </a>
            </div>
          </>
        )}
      </div>

      <div className="border-t">
        <div className="flex flex-col md:flex-row flex-wrap md:items-center justify-center md:justify-start py-[15px] gap-y-4 gap-x-[40px] w-full px-6 md:px-[167px]">
          <div className={linksClass}>
            © {year} Prodyour.film. Tous droits réservés.
          </div>
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
