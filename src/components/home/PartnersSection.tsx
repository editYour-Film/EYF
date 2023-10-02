import Image from "next/image";

export const PartnersSection = () => {
  return (
    <div className="mt-24 md:mt-32"> 
      <div className="flex flex-wrap gap-4 md:gap-20 justify-center items-center max-w-7xl mx-auto mt-5">
        <Image
          src="/img/home/partners/pool.svg"
          alt="Le pool"
          width={104}
          height={25}
          className="min-w-[150px]"
        />
        <Image
          src="/img/home/partners/FTRSM.svg"
          alt="FTRSM"
          width={104}
          height={25}
          className="min-w-[150px]"
        />
      </div>
    </div>

  );
};
