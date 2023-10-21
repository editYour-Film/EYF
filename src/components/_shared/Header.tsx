import { ContainerFullWidth } from "@/components/_shared/UI/Container";
import Button from "@/components/_shared/form/Button";
import useMediaQuery from "@/hooks/useMediaQuery";
import routes from "@/routes";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { useDispatch } from "react-redux";
import { setJoinBetaVisible } from "@/store/slices/joinBetaSlice";

import FbIcon from "../../../public/icons/facebook.svg";
import TwtIcon from "../../../public/icons/twitter-x.svg";
import InstaIcon from "../../../public/icons/instagram.svg";
import LnkdnIcon from "../../../public/icons/linkedin.svg";
import { useRouter } from "next/router";

type HeaderProps = {
  activeNavItem?: string;
};
const Header = ({ activeNavItem = "" }: HeaderProps) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const isMobileScreen = useMediaQuery("(max-width: 1024px)");
  const [isOpen, setIsOpen] = useState(false);
  const [isScrollUp, setIsScrollUp] = useState<undefined | boolean>(undefined);
  const linkClass = "relative pb-1 ";

  const [isModalDisplayed, setIsModalDisplayed] = useState(false);
  const [waitingListType, setWaitingListType] = useState<"client" | "monteur">(
    "client"
  );

  useEffect(() => {
    !isMobileScreen && setIsOpen(false);
  }, [isMobileScreen]);

  useEffect(() => {
    var lastScrollTop = 0;

    if (!isMobileScreen) {
      document.addEventListener(
        "scroll",
        function () {
          var st = window.pageYOffset || document.documentElement.scrollTop;
          if (st < lastScrollTop) {
            if (st <= 80) setIsScrollUp(undefined);
            else setIsScrollUp(true);
          } else {
            if (st <= 80) setIsScrollUp(undefined);
            else setIsScrollUp(false);
          }
          lastScrollTop = st <= 0 ? 0 : st;
        },
        false
      );
    } else setIsScrollUp(false);
  }, []);

  const transitionMobile = `transform 0.5s ${isOpen ? "ease-out" : "ease-in"}`;

  return (
    <header
      className={
        "fixed left-0 px-4 w-full z-header transition-all duration-700 bg-black-transparent-light backdrop-blur-sm border-b " +
        (!isMobileScreen
          ? isScrollUp === true
            ? "translate-y-0"
            : isScrollUp === false
            ? "-translate-y-20"
            : ""
          : "top-0") +
        (isMobileScreen ? " py-2 " : "")
      }
    >
      <ContainerFullWidth className="md:px-10">
        <div className="flex items-center flex-wrap py-2 md:py-5 justify-between">
          <Link href={routes.HOME} className="cursor-pointer" scroll={false}>
            <Image
              width={175}
              height={40}
              src="/icons/logo-horizontal-lg.svg"
              alt=""
              className="h-10 w-44 hidden md:block"
            />
            <Image
              width={35}
              height={35}
              src="/icons/logo.svg"
              alt=""
              className="md:hidden"
            />
          </Link>
          <nav className="hidden lg:flex gap-6 xl:ml-28">
            <Link
              href={routes.HOME}
              scroll={false}
              className={
                linkClass +
                (activeNavItem === "home"
                  ? "border-b border-b-white"
                  : "bottom-inOutSpread")
              }
            >
              Accueil
            </Link>
            {/* <Link
              href={routes.CATALOGUE}
              className={
                linkClass +
                (activeNavItem === "catalog"
                  ? "border-b border-b-white"
                  : "bottom-inOutSpread")
              }
            >
              Catalogue
            </Link> */}

            <Link
              href={routes.WHOWEARE}
              scroll={false}
              className={
                linkClass +
                (activeNavItem === "who-we-are"
                  ? "border-b border-b-white"
                  : "bottom-inOutSpread")
              }
            >
              Notre histoire
            </Link>

            <Link
              href={routes.BLOG}
              scroll={false}
              className={
                linkClass +
                (activeNavItem === "blog"
                  ? "border-b border-b-white"
                  : "bottom-inOutSpread")
              }
            >
              Blog
            </Link>
          </nav>
          <div className="hidden lg:flex gap-4">
            <ConnectionOptions
              onClientClick={() => {
                setWaitingListType("client");
                setIsModalDisplayed(true);
                router.push(routes.SIGNIN);
              }}
              onMonteurClick={() => {
                setWaitingListType("monteur");
                setIsModalDisplayed(true);
                router.push(routes.SIGNIN);
              }}
            />

            {/*<Link href={routes.QUOTE_STEP1}>*/}
            <Button
              variant="primary"
              text="Rejoindre la beta"
              onClick={() => {
                dispatch(setJoinBetaVisible());
                setIsModalDisplayed(true);
              }}
            />
            {/*</Link>*/}
          </div>
          <div className="lg:hidden">
            {!isOpen && (
              <Image
                src="/icons/menu.svg"
                alt=""
                width={30}
                height={30}
                className="cursor-pointer"
                onClick={() => setIsOpen(true)}
              />
            )}
          </div>
        </div>

        <div
          className="fixed right-0 top-0 w-full h-[100vh] bg-opacity-80 bg-black z-10 border-r origin-top overflow-hidden"
          style={{
            transform: isOpen ? "translateY(0)" : "translateY(-100%)",
            transition: transitionMobile,
          }}
        >
          <div
            className="menu-mobile__inner relative w-full h-full"
            style={{
              transform: isOpen ? "translateY(0)" : "translateY(90%)",
              transition: transitionMobile,
            }}
          >
            <div className="absolute z-0 w-full h-full gradient-menu-mobile pointer-events-none"></div>

            <div className="absolute top-0 w-full flex justify-between gap-4 mt-0 px-5 py-4 sm:px-10 sm:py-5 z-20">
              <Image
                width={175}
                height={40}
                src="/icons/logo-horizontal-lg.svg"
                alt=""
                className="h-8 w-40"
              />
              <Button
                text="Fermer"
                variant="black"
                onClick={() => setIsOpen(false)}
                className="w-max"
              />
            </div>

            <div className="relative w-full h-full px-5 sm:px-10 sm:py-5 z-10">
              <div className="relative flex flex-col min-h-screen justify-end">
                <nav className="flex flex-col basis-1/2 grow mt-24 justify-center self-end gap-4 max-w-xs transition-all duration-500">
                  <Link
                    href={routes.HOME}
                    className="text-gray text-right"
                    scroll={false}
                    style={{
                      opacity: isOpen ? "1" : "0",
                      transition: "opacity 1s ease-in-out 0.3s",
                    }}
                  >
                    <span className="ml-4 text-title hover:text-violet transition-colors">
                      Accueil
                    </span>
                  </Link>
                  {/* <Link href={routes.CATALOGUE} className="text-gray text-right">
                    Modèles <span className="ml-4 text-2xl hover:text-violet transition-colors">Catalogue</span>
                  </Link> */}
                  <Link
                    href={routes.WHOWEARE}
                    className="text-gray text-right"
                    scroll={false}
                    style={{
                      opacity: isOpen ? "1" : "0",
                      transition: "opacity 1s ease-in-out 0.35s",
                    }}
                  >
                    <span className="ml-4 text-title hover:text-violet transition-colors">
                      Notre histoire
                    </span>
                  </Link>
                  <Link
                    href={routes.BLOG}
                    className="text-gray text-right"
                    scroll={false}
                    style={{
                      opacity: isOpen ? "1" : "0",
                      transition: "opacity 1s ease-in-out 0.40s",
                    }}
                  >
                    <span className="ml-4 text-title hover:text-violet transition-colors">
                      Blog
                    </span>
                  </Link>
                  {/* <Link
                    href=""
                    onClick={() => setIsModalDisplayed(true)}
                    href={routes.SIGNIN} className="text-gray text-right"
                  >
                    Commandes <span className="ml-4 text-2xl hover:text-violet transition-colors">Se connecter</span>
                  </Link> */}
                  <Link
                    onClick={() => setIsModalDisplayed(true)}
                    scroll={false}
                    href={routes.SIGNIN}
                    className="text-gray text-right"
                    style={{
                      opacity: isOpen ? "1" : "0",
                      transition: "opacity 1s ease-in-out 0.45s",
                    }}
                  >
                    <span className="ml-4 text-title hover:text-violet transition-colors">
                      Se connecter
                    </span>
                  </Link>
                </nav>

                <div
                  className="mt-10 regularH:mt-28"
                  style={{
                    opacity: isOpen ? "1" : "0",
                    transition: "opacity 1s ease-in-out 0.5s",
                  }}
                >
                  <div className="text-base-text">Social</div>
                  <div className="footer__icons group flex flex-wrap gap-1 sm:gap-2 md:gap-4 mt-6">
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

                {/*<Link href={routes.QUOTE_STEP1}>*/}
                <div
                  className="mt-16 mb-10"
                  style={{
                    opacity: isOpen ? "1" : "0",
                    transition: "opacity 1s ease-in-out 0.55s",
                  }}
                >
                  <Button
                    variant="primary"
                    text="Rejoindre la beta"
                    className="max-w-[100%] sm:max-w-[280px]"
                    onClick={() => {
                      dispatch(setJoinBetaVisible());
                      setIsModalDisplayed(true);
                    }}
                  />
                </div>
                {/*</Link>*/}
              </div>
            </div>
          </div>
        </div>
      </ContainerFullWidth>

      {/* <Modal
        isDisplayed={isModalDisplayed}
        onClose={() => setIsModalDisplayed(false)}
      >
        <WaitingListForm userType={waitingListType} />
      </Modal> */}
    </header>
  );
};

export default Header;

const ConnectionOptions = ({ onClientClick, onMonteurClick }: any) => {
  const [displayCnx, setDisplayCnx] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setDisplayCnx(true)}
      onMouseLeave={() => setDisplayCnx(false)}
      onClick={() => setDisplayCnx(!displayCnx)}
    >
      <Button
        variant="secondary"
        text="Connexion"
        icon="menu"
        iconLeft
        className={displayCnx ? "border-white" : ""}
      />
      <div
        className={
          "absolute bg-black top-14 md:top-12 left-0 border rounded-2xl p-2 z-20 w-72 transition-transform-opacity duration-300 " +
          (displayCnx
            ? "opacity-100 translate-y-0"
            : "opacity-0 pointer-events-none translate-y-2")
        }
      >
        <div className="absolute -top-2 left-0 w-full h-full z-0"></div>
        {/*<Link href={routes.SIGNIN + "?type=client"}>*/}
        {/* <div
          className="relative flex items-start gap-4 transition-colors duration-300 hover:bg-black-light p-2 rounded-xl cursor-pointer z-1"
          onClick={onClientClick}
        >
          <Image
            src="/icons/right-arrow-violet.svg"
            height={12}
            width={30}
            alt="narrow"
            className="mt-1"
          />
          <div>
            <p className="n27 text-violet">Client</p>
            <p className="mt-1 text-sm">
              Accéder à votre profil pour retrouver vos commandes.
            </p>
          </div>
        </div> */}
        {/* </Link>*/}
        {/* <Link href={routes.SIGNIN + "?type=editor"}>*/}
        <div
          className="relative flex items-start gap-4 transition-colors duration-300 hover:bg-black-light p-2 rounded-xl z-1"
          onClick={onMonteurClick}
        >
          <Image
            src="/icons/right-arrow-violet.svg"
            height={12}
            width={30}
            alt="narrow"
            className="mt-1"
          />
          <div>
            <p className="n27 text-violet">Monteur</p>
            <p className="mt-1 text-sm">
              S&apos;inscrire ou se connecter pour accéder à votre espace de
              travail.
            </p>
          </div>
        </div>
        {/* </Link>*/}
      </div>
    </div>
  );
};
