import { ContainerFullWidth } from "@/components/_shared/UI/Container";
import Button from "@/components/_shared/form/Button";
import useMediaQuery from "@/hooks/useMediaQuery";
import routes from "@/routes";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { setJoinBetaVisible } from "@/store/slices/joinBetaSlice";

import Burger from '@/icons/burger.svg'

import { useRouter } from "next/router";
import { IslandButton } from "./buttons/IslandButton";
import { RootState } from "@/store/store";
import { Menu } from "../dashboard/shared/Menu";
import { LANDING_MENU } from "../dashboard/editor/data/menus";
import { openMenu } from "@/store/slices/menuSlice";
import { closeNavbar, openNavbar } from "@/store/slices/navbarSlice";

type HeaderProps = {
  activeNavItem?: string;
};
const Header = ({ activeNavItem = "" }: HeaderProps) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const isMobileScreen = useMediaQuery("(max-width: 768px)");
  const [isOpen, setIsOpen] = useState(false);
  const isScrollUp = useSelector((store:RootState) => store.navbar.isOpen);;

  const [isModalDisplayed, setIsModalDisplayed] = useState(false);
  const [waitingListType, setWaitingListType] = useState<"client" | "monteur">("client");

  const routeName = useSelector((store: RootState) => store.routes.routeName)

  const linkClass = "text-small relative pb-1 focus-visible:outline-blueBerry ";

  useEffect(() => {
    !isMobileScreen && setIsOpen(false);
  }, [isMobileScreen]);

  const [lastScrollTop, setLastScrollTop] = useState(0);

  useEffect(() => {
    const handleScroll = function () {
      let st = window.pageYOffset || document.documentElement.scrollTop;
      if (st < lastScrollTop) {
        if (st <= 80) dispatch(closeNavbar());
        else dispatch(openNavbar());
      } else {
        if (st <= 80) dispatch(closeNavbar());
        else dispatch(closeNavbar());
      }
      setLastScrollTop(st <= 0 ? 0 : st);
    }

    if (!isMobileScreen) {
      document.addEventListener("scroll", handleScroll, false);
    } else dispatch(openNavbar());

    return () => {
      document.removeEventListener( "scroll", handleScroll, false);
    }
  }, [isMobileScreen, lastScrollTop]);

  const transitionMobile = `transform 0.5s ${isOpen ? "ease-out" : "ease-in"}`;

  return (
    <>
    <header
      className={
        "sticky md:fixed mt-[60px] md:mt-0 top-0 left-0 px-4 w-full z-header transition-all duration-700 bg-black-transparent-light backdrop-blur-sm md:border-b-03 " +
         (isScrollUp === true
            ? "translate-y-0"
            : "-translate-y-20") +
        (isMobileScreen ? " py-2 " : "")
      }
    >
      <ContainerFullWidth className="md:px-10">
        <div 
          className="flex items-center py-2 md:py-[10px] h-[50px] justify-between"
        >
          <Link 
            href={routes.HOME} className="cursor-pointer basis-full md:basis-auto flex justify-center shrink focus-visible:outline-blueBerry" scroll={false}>
            <Image
              width={125}
              height={25}
              src="/icons/logo-navbar.svg"
              alt=""
              className="lg:block max-w-[125px]"
            />
            {/* <Image
              width={35}
              height={35}
              src="/icons/logo.svg"
              alt=""
              className="lg:hidden"
            /> */}
          </Link>

          <nav className="hidden md:flex gap-6 xl:ml-28">
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
          <div className="hidden md:flex gap-4">
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
            <IslandButton
              type="primary"
              label="Rejoindre la beta"
              className="max-w-[100%] sm:max-w-[280px] py-[5px] text-small"
              enableTwist
              onClick={() => {
                dispatch(setJoinBetaVisible());
                setIsModalDisplayed(true);
              }}
            />
            {/*</Link>*/}
          </div>

          <div className="md:hidden flex flex-row items-center gap-dashboard-button-separation-spacing">
            {routeName !== 'accueil' && <div className="text-dashboard-text-description-base text-title-m uppercase">{routeName}</div>}
            {!isOpen && (
              <IslandButton
                type="secondary"
                Icon={Burger}
                onClick={() => { dispatch(openMenu()) }}
              />
            )}
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

    <div
      className="fixed right-0 top-0 w-full h-[100vh] bg-blackBerry origin-top overflow-hidden z-header"
      style={{
        transform: isOpen ? "translateX(0)" : "translateX(100%)",
        transition: transitionMobile,
      }}
    >
      <div
        className="menu-mobile__inner relative w-full h-full"
      >        
        <div className="relative w-full h-full px-5 sm:px-10 sm:py-5 z-10">
          <div className="relative flex flex-col min-h-screen justify-end">
            <nav>
              <Menu 
                items={LANDING_MENU}
              />
            </nav>

            {/* <div
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
            </div> */}

            {/*<Link href={routes.QUOTE_STEP1}>*/}
            <div
              className="mt-16 mb-10"
              style={{
                opacity: isOpen ? "1" : "0",
                transition: "opacity 1s ease-in-out 0.55s",
              }}
            >
              <IslandButton
                type="primary"
                label="Rejoindre la beta"
                className="max-w-[100%] sm:max-w-[280px] py-[5px]"
                enableTwist
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
    </>
  );
};

export default Header;

const ConnectionOptions = ({ onClientClick, onMonteurClick }: any) => {
  const [displayCnx, setDisplayCnx] = useState(false);

  return (
    <div
      className="relative h-max"
      onMouseEnter={() => setDisplayCnx(true)}
      onMouseLeave={() => setDisplayCnx(false)}
      onClick={() => {
        // onMonteurClick()
        // setDisplayCnx(!displayCnx)
      }}
    >
      <IslandButton
        type="tertiary"
        label="Connexion"
        // icon="menu"
        // iconLeft
        onClick={() => {onMonteurClick()}}
        className={`py-[5px] text-small`}
      />
      {/* <div
        className={
          "absolute bg-black top-14 md:top-12 left-0 border rounded-2xl p-2 z-20 w-72 transition-transform-opacity duration-300 " +
          (displayCnx
            ? "opacity-100 translate-y-0"
            : "opacity-0 pointer-events-none translate-y-2")
        }
      >
        <div className="absolute -top-2 left-0 w-full h-full z-0"></div> */}
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
        {/* <div
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
        </div> */}
        {/* </Link>*/}
      {/* </div> */}
    </div>
  );
};
