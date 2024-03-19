import { PropsWithChildren, forwardRef } from "react";
import { ReactElement } from "react-markdown/lib/react-markdown";

type CardsContainerProps = {
  headingComp?: ReactElement;
  className?: string;
};

export const CardsContainer = forwardRef<
  HTMLDivElement,
  PropsWithChildren<CardsContainerProps>
>(function CardsContainer({ headingComp, children, className }, ref) {
  return (
    <div
      ref={ref}
      className={`flex flex-col gap-dashboard-spacing-element-medium w-full shadow-large bg-dashboard-background-content-area md:p-dashboard-spacing-element-medium rounded-dashboard-button-square-radius border-03 ${
        className ?? ""
      }`}
    >
      {headingComp && <div className="perspective">{headingComp}</div>}
      <div className="grid md:grid-cols-3 gap-dashboard-spacing-element-medium perspective">
        {children}
      </div>
    </div>
  );
});
