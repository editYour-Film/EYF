import { PropsWithChildren, useContext } from "react";
import { dashBoardPanelType } from "../_context/DashBoardContext";
import { DashBoardContext } from "../_context/DashBoardContext";
import { TabsContainer } from "@/components/_shared/UI/TabsContainer";

type DashboardContainerProps = {
  className?: string;
};

export const DashboardContainer = ({
  className,
}: PropsWithChildren<DashboardContainerProps>) => {
  const context = useContext(DashBoardContext);

  return <TabsContainer className={className} panels={context.panels} activePanel={context.activePanel} onActivePannelChange={(index) => context.setActivePanel(index)}/>
};
