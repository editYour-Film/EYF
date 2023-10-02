import { useEffect, useState } from "react";
import Image from "next/image";
import routes from "@/routes";
import router from "next/router";
import Logo from "../../../../public/icons/logo-horizontal-lg.svg";
import house from "../../../../public/icons/house.svg";
import schedule from "../../../../public/icons/schedule.svg";
import camera from "../../../../public/icons/camera.svg";
import chartArrow from "../../../../public/icons/chart-arrow.svg";
import person from "../../../../public/icons/person.svg";
import useMediaQuery from "@/hooks/useMediaQuery";

import MenuIcon from "@/icons/menu.svg";
import { useDispatch } from "react-redux";
import { disableTransition } from "@/store/slices/transitionSlice";
import { useUser } from "@/auth/authContext";

import { SignOut } from "@/auth/auth";

type SideBarProps = {
  type: "editor" | "client";
  className?: string;
};

export const SideBar = ({ type, className }: SideBarProps) => {
  const [menu, setMenu] = useState<any[]>([]);
  const isMobile = useMediaQuery("(max-width: 1024px)");
  const [userInfos] = useUser();

  useEffect(() => {
    setMenu([
      {
        icon: house,
        label: "Bienvenue",
        link: routes.DASHBOARD_EDITOR_HOME,
      },
      {
        icon: schedule,
        label: "Agenda",
        link: routes.DASHBOARD_EDITOR_SCHEDULE,
      },
      {
        icon: camera,
        label: "Missions",
        link: routes.DASHBOARD_EDITOR_MISSIONS,
      },
      {
        icon: chartArrow,
        label: "Historique",
        link: routes.DASHBOARD_EDITOR_HISTORY,
      },
      {
        icon: person,
        label: "Profil",
        link: routes.DASHBOARD_EDITOR_PROFIL,
      },
    ]);
  }, []);

  if (isMobile) {
    return (
      <SideBarMobile className={className} menu={menu} userInfos={userInfos} />
    );
  } else {
    return (
      <SideBarDesktop className={className} menu={menu} userInfos={userInfos} />
    );
  }
};

type SidebarChildProps = {
  className?: string;
  menu: any;
  userInfos: any;
};

const SideBarMobile = ({ className, menu, userInfos }: SidebarChildProps) => {
  return (
    <div className="sidebar flex pl-4 pr-7 width-full justify-between items-center">
      <div className="sidebar__user flex flex-row items-center gap-5 n27 text-xl uppercase">
        <div className="profil__img rounded-full overflow-hidden">
          <Image
            src={"/img/profile/profile-pic.png"}
            alt={"Sebastien Soriano"}
            width={52}
            height={52}
          ></Image>
        </div>
        <div className="sidebar__userName">Sebastien S</div>
      </div>

      <div className="sidebar-switch">
        <MenuIcon />
      </div>
    </div>
  );
};

const SideBarDesktop = ({ className, menu, userInfos }: SidebarChildProps) => {
  const dispatch = useDispatch();

  return (
    <div
      className={`sidebar sticky top-0 h-max flex lg:flex-col items-start gap-16 ${className}`}
    >
      <div className="sidebar__logo w-max flex justify-center items-center pt-12 -translate-y-1">
        <Logo />
      </div>
      <div className="sidebar__menu flex flex-col gap-4 w-40">
        {menu &&
          menu.map((item: any, i: number) => {
            return (
              <div
                key={i}
                className="group flex items-center gap-5 px-5 py-[10px] w-full rounded-lg bg-transparent transition-colors duration-600 hover:bg-darkgrey"
                onClick={() => {
                  dispatch(disableTransition());
                  router.push(item.link, undefined, { scroll: false });
                }}
              >
                <div className="w-6 h-6 flex justify-center items-center">
                  {item.icon()}
                </div>
                <div>{item.label}</div>
              </div>
            );
          })}

        <div
          className="group flex items-center gap-5 px-5 py-[10px] w-full rounded-lg bg-transparent transition-colors duration-600 hover:bg-darkgrey"
          onClick={() => {
            SignOut();
          }}
        >
          <div className="w-6 h-6 flex justify-center items-center"></div>
          <div>Se déconnecter</div>
        </div>
      </div>
      <div className="sidebar__infos px-6">
        <div className="sidebar__profil flex flex-row gap-6 py-4">
          <div className="profil__img rounded-full overflow-hidden w-[52px] h-[52px] shrink-0">
            <Image
              src={
                userInfos.details.picture.data.attributes.formats.thumbnail
                  ? userInfos.details.picture.data.attributes.formats.thumbnail
                      .url
                  : userInfos.details.picture.data.attributes.url
              }
              alt={"Sebastien Soriano"}
              width={52}
              height={52}
              className="w-full h-full"
            ></Image>
          </div>
          <div className="w-full overflow-hidden">
            <div className="profile__name capitalize">{`${userInfos.details.f_name} ${userInfos.details.l_name[0]}`}</div>
            <div className="profil__adress text-base-text whitespace-nowrap">
              {userInfos.user.email.length > 17 &&
                userInfos.user.email.slice(0, 15) + "..."}
            </div>
          </div>
        </div>

        <div className="sidebar__contact mt-2">
          <div className="sidebar__contact-label text-lg font-bold">
            Besoins d&apos;aide ?
          </div>
          <div className="sidebar__contact-contact text-base-text">
            Nous contacter
          </div>
        </div>
      </div>
    </div>
  );
};
