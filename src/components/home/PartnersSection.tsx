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
            <PartnerCard key={i} logo={partner.logo.data.attributes.url} />
          );
        })}
      </div>
    </div>
  );
};

const PartnerCard = ({ logo }: { logo?: any }) => {
  return (
    <div className="p-dashboard-spacing-element-medium rounded-dashboard-button-square-radius flex justify-center items-center border h-[100px]">
      <Image
        src={logo}
        alt="FTRSM"
        width={104}
        height={25}
        className="h-full w-auto"
      />
    </div>
  );
};
