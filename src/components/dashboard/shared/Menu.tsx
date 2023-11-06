import { TabMenu } from "@/components/_shared/buttons/TabMenu";
import { closeDashboardMenu } from "@/store/slices/dashboardMenuSlice";
import { disableTransition } from "@/store/slices/transitionSlice";
import { useRouter } from "next/router";
import React from "react";
import { useDispatch } from "react-redux";

interface MenuItem {
  icon?: any;
  label: string;
  link: string;
}

type MenuProps = {
  items: MenuItem[];
};

export const Menu = ({ items }: MenuProps) => {
  const dispatch = useDispatch();
  const router = useRouter();

  return (
    <div className="sidebar__menu flex flex-col gap-dashboard-mention-padding-right-left w-full dashboard-button-dark">
      {items &&
        items.map((item: any, i: number) => {
          return (
            <React.Fragment key={i}>
              {i !== 0 && <hr />}
              <TabMenu
                label={item.label}
                Icon={item.icon}
                onClick={() => {
                  dispatch(disableTransition());
                  dispatch(closeDashboardMenu());
                  router.push(item.link, undefined, { scroll: false });
                }}
                isMenu
                disabled={item.disabled}
              />
              {i === items.length - 1 && <hr />}
            </React.Fragment>
          );
        })}
    </div>
  );
};
