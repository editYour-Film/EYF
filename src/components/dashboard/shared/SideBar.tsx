import { useEffect, useRef, useState } from "react";
import Image from "next/image";

import useMediaQuery from "@/hooks/useMediaQuery";

import { useUser } from "@/auth/authContext";

import { SignOut } from "@/auth/auth";
import { SignedInUser, SigninUser } from "@/components/model/signin";
import { Menu } from "./Menu";
import { DASHBOARD_EDITOR_MENU } from "../editor/data/menus";
import { MentionInteraction } from "@/components/_shared/buttons/MentionInteraction";

type SideBarProps = {
  type: "editor" | "client";
  className?: string;
};

export const SideBar = ({ type, className }: SideBarProps) => {
  const [menu, setMenu] = useState<any[]>([]);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [userInfos] = useUser();

  useEffect(() => {
    setMenu(DASHBOARD_EDITOR_MENU);
  }, []);

  if (!isMobile) {
    return (
      <SideBarDesktop className={className} menu={menu} userInfos={userInfos} />
    );
  } else {
    return <></>;
  }
};

type SidebarChildProps = {
  className?: string;
  menu: any;
  userInfos: SignedInUser;
};

const SideBarDesktop = ({ className, menu, userInfos }: SidebarChildProps) => {
  return (
    <div
      className={`sidebar sticky top-[30px] w-full h-[calc(100vh-130px)] flex md:flex-col items-start gap-16 ${className}`}
    >
      <Menu items={menu} />

      <div className="sidebar__infos mt-auto mb-0">
        <div className="sidebar__profil flex flex-row gap-dashboard-mention-padding-right-left py-4">
          <div className="profil__img rounded-full overflow-hidden w-[40px] h-[40px] lg:w-[60px] lg:h-[60px] shrink-0">
            {userInfos.details.picture &&
            userInfos.details.picture.data &&
            userInfos.details.picture.data.attributes ? (
              <Image
                src={userInfos.details.picture.data.attributes.url}
                alt={userInfos.user.username}
                width={52}
                height={52}
              ></Image>
            ) : (
              <Image
                src={
                  userInfos.details.picture && userInfos.details.picture.url
                    ? userInfos.details.picture.url
                    : "/img/profile/avatar.png"
                }
                alt={userInfos.user.username}
                width={52}
                height={52}
              ></Image>
            )}
          </div>
          <div className="w-full overflow-hidden">
            <div className="profile__name capitalize text-dashboard-text-description-base px-dashboard-mention-padding-right-left">{`${
              userInfos.details.f_name ? userInfos.details.f_name : ""
            } ${
              userInfos.details.l_name ? userInfos.details.l_name : ""
            }`}</div>

            <MentionInteraction
              className="text-medium"
              onClick={() => {
                SignOut();
              }}
            >
              Se déconnecter
            </MentionInteraction>
          </div>
        </div>
      </div>
    </div>
  );
};
