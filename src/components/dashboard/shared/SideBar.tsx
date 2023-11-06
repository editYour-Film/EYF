import { useContext, useEffect, useState } from "react";
import Image from "next/image";

import useMediaQuery from "@/hooks/useMediaQuery";

import { SignedInUser } from "@/components/model/signin";
import { Menu } from "./Menu";
import { DASHBOARD_EDITOR_MENU } from "../editor/data/menus";
import { DASHBOARD_CLIENT_MENU } from "../editor/data/menus";

import { MentionInteraction } from "@/components/_shared/buttons/MentionInteraction";
import { AuthContext } from "@/context/authContext";

type SideBarProps = {
  type: "editor" | "client";
  className?: string;
};

export const SideBar = ({ type, className }: SideBarProps) => {
  const authContext = useContext(AuthContext);

  const [menu, setMenu] = useState<any[]>([]);
  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    if (authContext.user.user.role.type === "editor") {
      setMenu(DASHBOARD_EDITOR_MENU);
    } else {
      setMenu(DASHBOARD_CLIENT_MENU);
    }
  }, []);

  if (!isMobile) {
    return (
      <SideBarDesktop
        className={className}
        menu={menu}
        user={authContext.user}
      />
    );
  } else {
    return <></>;
  }
};

type SidebarChildProps = {
  className?: string;
  menu: any;
  user: SignedInUser;
};

const SideBarDesktop = ({ className, menu, user }: SidebarChildProps) => {
  const authContext = useContext(AuthContext);

  return (
    <div
      className={`sidebar sticky top-[30px] w-full h-[calc(100vh-130px)] flex md:flex-col items-start gap-16 ${className}`}
    >
      <Menu items={menu} />

      <div className="sidebar__infos mt-auto mb-0">
        <div className="sidebar__profil flex flex-row gap-dashboard-mention-padding-right-left py-4">
          <div className="profil__img relative rounded-full overflow-hidden w-[40px] h-[40px] lg:w-[60px] lg:h-[60px] shrink-0">
            {user.details.picture &&
            user.details.picture.data &&
            user.details.picture.data.attributes ? (
              <Image
                src={user.details.picture.data.attributes.url}
                alt={user.user.username}
                fill
              ></Image>
            ) : (
              <Image
                src={
                  user.details.picture && user.details.picture.url
                    ? user.details.picture.url
                    : "/img/profile/avatar.png"
                }
                alt={user.user.username}
                fill
              ></Image>
            )}
          </div>
          <div className="w-full overflow-hidden">
            <div className="profile__name capitalize text-dashboard-text-description-base px-dashboard-mention-padding-right-left">{`${
              user.details.f_name ? user.details.f_name : ""
            } ${user.details.l_name ? user.details.l_name : ""}`}</div>

            <MentionInteraction
              className="text-medium"
              onClick={() => {
                authContext.SignOut();
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
