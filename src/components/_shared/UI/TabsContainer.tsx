import { dashBoardPanelType } from "@/components/dashboard/_context/DashBoardContext";
import { TabWindow } from "@/components/dashboard/shared/TabWindow";

type TabsContainerProps = {
  className?: string;
  panels: dashBoardPanelType[] | undefined;
  activePanel: number;
  onActivePannelChange: (newActivePanel: number) => void;
};

export const TabsContainer = ({ panels, activePanel, onActivePannelChange, className }:TabsContainerProps) => {
  return (
    <div
    className={`dashboard_container flex flex-col gap-dashboard-spacing-element-medium md:px-padding-medium pb-[68px] bg-dashboard-background-content-area md:border-03 rounded-dashboard-button-square-radius shadow-large ${
      className ?? ""
    }`}
  >
    <div className="dashboard_container__tabWrapper hidden md:flex border-x-03 flex-row w-full bg-dashboard-button-dark">
      {panels &&
        panels.map((pan, i) => {
          return (
            <TabWindow
              key={i}
              label={pan.title}
              locked={pan.locked}
              disabled={activePanel !== i}
              onClick={() => {
                onActivePannelChange(i)
              }}
            />
          );
        })}
    </div>

    {panels &&
      panels.map((pan, i) => {
        return (
          <div
            key={i}
            className={`${
              activePanel === i
                ? "z-10 block h-auto opacity-1 pointer-events-auto"
                : "hidden z-0 h-0 opacity-0 pointer-events-none"
            }`}
          >
            {pan.panel}
          </div>
        );
      })}
  </div>
  )
}