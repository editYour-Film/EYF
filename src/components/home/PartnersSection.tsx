import Image from "next/image";

export const PartnersSection = ({ data }: { data: any }) => {
  return (
    <div className="flex flex-col gap-dashboard-spacing-element-medium">
      {data.title && (
        <div className="text-dashboard-text-description-base-low text-title-small w-full text-center">
          {data.title}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex px-dashboard-spacing-element-medium lg:px-0 justify-center gap-[16px]">
        {data.partner.map((partner: any, i: number) => {
          return (
            <PartnerCard
              key={i}
              logo={partner.logo.data.attributes}
              orientation={partner.orientation}
            />
          );
        })}
      </div>
    </div>
  );
};

const PartnerCard = ({
  logo,
  orientation,
}: {
  logo?: any;
  orientation: "vertical" | "horizontal";
}) => {
  const cn =
    orientation === "vertical"
      ? "w-full min-w-[50px] h-auto max-h-[50px]"
      : "h-full max-h-[25px] w-auto";

  return (
    <div className="p-dashboard-spacing-element-medium rounded-dashboard-button-square-radius flex justify-center items-center border h-[100px]">
      <Image
        src={logo.url}
        alt="FTRSM"
        width={logo.width}
        height={logo.height}
        className={cn}
      />
    </div>
  );
};
