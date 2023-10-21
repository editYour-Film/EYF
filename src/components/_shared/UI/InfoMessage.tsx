type InfoMessageProps = {
  Icon?: () => JSX.Element;
  type?: "regular" | "danger";
  message: string;
};
export const InfoMessage = ({ Icon, type, message }: InfoMessageProps) => {
  return (
    <div className="flex no-wrap gap-[10px] max-w-[calc(100vw-32px)] w-max bg-soyMilk-100 rounded-dashboard-button-square-radius px-dashboard-mention-padding-right-left py-dashboard-button-separation-spacing">
      <div className="w-max">{Icon && <Icon />}</div>
      <div>{message}</div>
    </div>
  );
};
