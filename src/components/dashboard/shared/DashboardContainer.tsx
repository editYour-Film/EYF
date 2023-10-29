import { PropsWithChildren, useContext, useState } from "react";
import { TabWindow } from "./TabWindow";
import {
  DashBoardContext,
  dashBoardPanelType,
} from "../_context/DashBoardContext";

type DashboardContainerProps = {
  className?: string;
};

export const DashboardContainer = ({
  children,
  className,
}: PropsWithChildren<DashboardContainerProps>) => {
  const context = useContext(DashBoardContext);

  return (
    <div
      className={`dashboard_container flex flex-col gap-dashboard-spacing-element-medium md:px-padding-medium pb-padding-medium bg-dashboard-background-content-area md:border-03 rounded-dashboard-button-square-radius shadow-large ${
        className ?? ""
      }`}
    >
      <div className="dashboard_container__tabWrapper hidden md:flex border-x-03 flex-row w-full bg-dashboard-button-dark">
        {context.panels &&
          context.panels.map((pan, i) => {
            return (
              <TabWindow
                key={i}
                label={pan.title}
                disabled={context.activePanel !== i}
                onClick={() => {
                  context.setActivePanel(i);
                }}
              />
            );
          })}
      </div>

      {context.panels &&
        context.panels.map((pan, i) => {
          return (
            <pan.panel
              key={i}
              active={context.activePanel === i}
              className={`${
                context.activePanel === i
                  ? "z-10 block h-auto opacity-1 pointer-events-auto"
                  : "hidden z-0 h-0 opacity-0 pointer-events-none"
              }`}
            />
          );
        })}
    </div>
  );
};
