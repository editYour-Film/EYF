import { useState, useEffect, useRef } from "react";
import { H1 } from "../_shared/typography/H1";
import Image from "next/image";
import { useWhySectionFilter } from "./context/WhySectionFilter";
import Container from "../_shared/UI/Container";

type FaqSectionProps = {
  data: any;
  filter?: "about-us" | undefined;
};
export const FaqSection = ({ filter, data }: FaqSectionProps) => {
  const [whySectionFilter, setWhySectionFilter] = useWhySectionFilter();
  const [type, setType] = useState(whySectionFilter.filter)
  const [current, setCurrent] = useState<number>(0)
  const [filteredData, setFilteredData] = useState(data?.filter((x: any) => x.attributes.category === type))

  useEffect(() => {
    if(filter === 'about-us') {
      setFilteredData(data?.filter((x: any) => x.attributes.category === 'about-us'))
    }
  }, [])

  useEffect(() => {
    setWhySectionFilter({ filter: type });
    if(filter !== 'about-us') setFilteredData(data?.filter((x: any) => x.attributes.category === type))
  }, [type]);

  useEffect(() => {
    setCurrent(filteredData[0].id)
  }, [filteredData])
  
  return (
    <div className="bg-primary relative gradient-faq md:pt-28 border-b">
      <div className="absolute top-0 left-0 w-full h-full gradient-faq z-0"></div>
      <Container>
        <div className="relative mx-auto max-w-[1600px] bg-dashboard-background-content-area rounded-t-[24px] py-16 px-4 md:pl-16 md:pr-8 pr-3 border-t border-x z-10">
          <div className="flex flex-col xl:flex-row gap-10 xl:gap-20">
            <div className="basis-1/3 shrink-0">
              <H1 className="text-violet font-medium text-title md:mt-8 leading-[110%]" fake>VOS QUESTIONS FRÉQUENTES</H1>
              <div className={`${filter === 'about-us' ? 'hidden' : 'flex'} faq__toggler relative flex-row justify-between bg-darkgrey rounded-full mt-6 n27`}>
                <div 
                  className={`${type === 'creator' ? 'opacity-100' : 'opacity-50'} z-10 basis-[50%] shrink-0 text-center cursor-pointer py-2`}
                  onClick={() => {
                      setType('creator')
                    }
                  }
                >CRÉATEUR.RICE</div>
                <div 
                  className={`${type === 'creator' ? 'opacity-50' : 'opacity-100'} z-10 basis-[50%] shrink-0 text-center cursor-pointer py-2`}
                  onClick={() => {
                    setType('mentor')
                    }
                  }
                >MONTEUR.SE</div>
                <div className={`absolute left-0 top-0 w-1/2 h-full z-0 bg-black border border-white rounded-full transition-transform ${type === 'creator' ? 'translate-x-0' : 'translate-x-[100%]'}`}></div>
              </div>
            </div>

            <div className="basis-2/4 divide-y w-full md:min-w-2xl">
              {filteredData?.map((x: any) => {
                  return (
                    <FaqItem
                      title={x.attributes.question}
                      text={x.attributes.answer}
                      onOpen={() => { setCurrent(x.id) }}
                      isCurrent={current === x.id ? true : false}
                      key={x.id}
                    />
                  );
                })}
            </div>
          </div>
        </div>
      </Container>

    </div>
  );
};

type FaqItemProps = {
  title: string;
  text: string;
  onOpen: Function;
  isCurrent: boolean;
};

const FaqItem = ({ title, text, onOpen, isCurrent }: FaqItemProps) => {
  const [isDisplayed, setIsDisplayed] = useState(isCurrent? true : false)

  useEffect(() => {
    setIsDisplayed(isCurrent)    
  }, [isCurrent])

  return (
    <div className="py-4 md:py-8">
      <div
        className="flex gap-8 items-center justify-between cursor-pointer"
        onClick={() => {
          setIsDisplayed(!isDisplayed);
          !isDisplayed && onOpen();
        }}
      >
        <p className="uppercase text-lg md:text-2xl w-4/5">{title}</p>
        <Image
          src="/icons/right-arrow-white.svg"
          alt=""
          width={30}
          height={21}
          className={
            "transition-all duration-300 " + (isDisplayed ? "-rotate-90" : "")
          }
        />
      </div>
      <p
        className={
          " overflow-hidden transition-all ease-in-out duration-500 opacity-60 pr-8 w-11/12 " +
          (isDisplayed ? "max-h-[500px] mt-5" : "max-h-0")
        }
      >
        {text}
      </p>
    </div>
  );
};
