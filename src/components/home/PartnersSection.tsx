import Image from "next/image";

export const PartnersSection = () => {
  return (
    <div className=""> 
      <div className="text-dashboard-text-description-base-low text-title-small w-full text-center">Nos partenaires</div>
      <div className="flex flex-wrap gap-4 md:gap-dashboard-spacing-element-medium justify-center items-stretch max-w-7xl mx-auto mt-5">
        <div className="p-dashboard-spacing-element-medium rounded-dashboard-button-square-radius flex justify-center items-center border">
          <Image
            src="/img/home/partners/pool.svg"
            alt="Le pool"
            width={104}
            height={25}
            className="min-w-[150px]"
          />
        </div>
        <div className="p-dashboard-spacing-element-medium rounded-dashboard-button-square-radius flex justify-center items-center border">
          <Image
            src="/img/home/partners/FTRSM.svg"
            alt="FTRSM"
            width={104}
            height={25}
            className="min-w-[150px]"
          />
        </div>
      </div>
    </div>

  );
};
