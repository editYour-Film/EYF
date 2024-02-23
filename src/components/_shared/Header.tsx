import { ContainerFullWidth } from "@/components/_shared/UI/Container";
import useMediaQuery from "@/hooks/useMediaQuery";
import routes from "@/routes";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { setJoinBetaVisible } from "@/store/slices/joinBetaSlice";

import Burger from "@/icons/burger.svg";

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
  const isScrollUp = useSelector((store: RootState) => store.navbar.isOpen);

  const [isModalDisplayed, setIsModalDisplayed] = useState(false);
  const [waitingListType, setWaitingListType] = useState<"client" | "monteur">(
    "client"
  );

  const routeName = useSelector((store: RootState) => store.routes.routeName);

  const linkClass =
    "text-small block relative pb-1 focus-visible:outline-blueBerry ";

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

      if (st <= 200) dispatch(openNavbar());

      setLastScrollTop(st <= 0 ? 0 : st);
    };

    if (!isMobileScreen) {
      document.addEventListener("scroll", handleScroll, false);
    } else dispatch(openNavbar());

    return () => {
      document.removeEventListener("scroll", handleScroll, false);
    };
  }, [isMobileScreen, lastScrollTop]);

  const transitionMobile = `transform 0.5s ${isOpen ? "ease-out" : "ease-in"}`;

  return (
    <>
      <header
        className={
          "sticky md:fixed mt-[60px] md:mt-0 top-0 left-0 px-4 w-full z-header transition-all duration-700 bg-blackBerry-500 backdrop-blur-sm md:border-b-03 " +
          (isScrollUp === true ? "translate-y-0" : "-translate-y-20") +
          (isMobileScreen ? " py-2 " : "")
        }
      >
        <ContainerFullWidth className="md:px-10">
          <div className="flex items-center py-2 md:py-[10px] h-[50px] justify-between">
            <Link
              href={routes.HOME}
              className="cursor-pointer basis-full md:basis-auto flex justify-center shrink focus-visible:outline-blueBerry"
              scroll={false}
            >
              <Image
                width={125}
                height={25}
                src="/icons/logo-navbar.svg"
                alt=""
                className="lg:block max-w-[125px]"
              />
            </Link>

            <nav className="hidden md:flex gap-6 xl:ml-28">
              <Link
                href={routes.HOME}
                scroll={false}
                className={
                  linkClass +
                  (activeNavItem === "home"
                    ? "border-b border-b-soyMilk"
                    : "bottom-inOutSpread")
                }
              >
                Accueil
              </Link>

              <Link
                href={routes.WHOWEARE}
                scroll={false}
                className={
                  linkClass +
                  (activeNavItem === "who-we-are"
                    ? "border-b border-b-soyMilk"
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
                    ? "border-b border-b-soyMilk"
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
              <IslandButton
                type="primary"
                label="Obtenir mon devis"
                className="max-w-[100%] sm:max-w-[280px] py-[5px] text-small"
                enableTwist
                // onClick={() => {
                //   dispatch(setJoinBetaVisible());
                //   setIsModalDisplayed(true);
                // }}
                href={routes.QUOTE}
              />
            </div>

            <div className="md:hidden flex flex-row items-center gap-dashboard-button-separation-spacing">
              {/* {routeName !== "accueil" && (
                <div className="text-dashboard-text-description-base text-title-M">
                  {routeName}
                </div>
              )} */}
              {!isOpen && (
                <IslandButton
                  type="secondary"
                  Icon={Burger}
                  onClick={() => {
                    dispatch(openMenu());
                  }}
                />
              )}
            </div>
          </div>
        </ContainerFullWidth>
      </header>

      <div
        className="fixed right-0 top-0 w-full h-[100vh] bg-blackBerry origin-top overflow-hidden z-header"
        style={{
          transform: isOpen ? "translateX(0)" : "translateX(100%)",
          transition: transitionMobile,
        }}
      >
        <div className="menu-mobile__inner relative w-full h-full">
          <div className="relative w-full h-full px-5 sm:px-10 sm:py-5 z-10">
            <div className="relative flex flex-col min-h-screen justify-end">
              <nav>
                <Menu items={LANDING_MENU} />
              </nav>

              <div
                className="mt-16 mb-10"
                style={{
                  opacity: isOpen ? "1" : "0",
                  transition: "opacity 1s ease-in-out 0.55s",
                }}
              >
                <IslandButton
                  type="primary"
                  label="Obtenir mon devis"
                  className="max-w-[100%] sm:max-w-[280px] py-[5px]"
                  enableTwist
                  // onClick={() => {
                  //   dispatch(setJoinBetaVisible());
                  //   setIsModalDisplayed(true);
                  // }}
                  href={routes.QUOTE}
                />
              </div>
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
    >
      <IslandButton
        type="tertiary"
        label="Connexion"
        onClick={() => {
          onMonteurClick();
        }}
        className={`py-[5px] text-small`}
      />
    </div>
  );
};
