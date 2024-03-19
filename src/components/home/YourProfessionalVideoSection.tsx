import Image from "next/image";
import { useInView } from "react-intersection-observer";
import { forwardRef, useEffect, useRef } from "react";
import useMediaQuery from "@/hooks/useMediaQuery";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { CardsContainer } from "../_shared/UI/CardsContainer";
import { SimpleCard } from "../_shared/UI/CardSimple";
import { appearBottom } from "@/animations/appearBottom";

gsap.registerPlugin(ScrollTrigger);

export const YourProfessionalVideoSection = ({ data }: any) => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.15,
  });

  const wrapper = useRef<HTMLDivElement>(null);
  const cardsWrapper = useRef<HTMLDivElement>(null);
  const card1 = useRef<HTMLDivElement>(null);
  const card2 = useRef<HTMLDivElement>(null);
  const card3 = useRef<HTMLDivElement>(null);
  const card4 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isMobile) return;

    const tlWrapper = gsap.timeline({
      paused: true,
    });

    const tlCards = gsap.timeline({
      paused: true,
    });

    const ctx = gsap.context((self) => {
      self.add("cards", () => {
        tlWrapper.add(appearBottom({ elmts: cardsWrapper.current }), 0);
        tlWrapper.add(
          appearBottom({ elmts: card1.current, liteY: true, rotateX: true }),
          0.4
        );
        tlCards.add(
          appearBottom({
            elmts: [card2.current, card3.current, card4.current],
            liteY: true,
            rotateX: true,
          })
        );
      });
    });

    const trigger1 = ScrollTrigger.create({
      trigger: wrapper.current,
      start: `top+=${window.innerHeight * 0.3333} bottom`,
      end: `top+=${window.innerHeight * 0.3333 + 600} bottom`,
      id: "step1",
      onUpdate: (self) => {
        tlWrapper.progress(self.progress);
      },
    });

    const trigger2 = ScrollTrigger.create({
      trigger: wrapper.current,
      start: `top+=${window.innerHeight * 0.6666} bottom`,
      end: `top+=${window.innerHeight * 0.6666 + 600} bottom`,
      id: "step2",
      onUpdate: (self) => {
        tlCards.progress(self.progress);
      },
    });

    ctx.cards();

    return () => {
      ctx.revert();
      trigger1.kill();
      trigger2.kill();
    };
  }, [inView, isMobile]);

  return (
    <div ref={wrapper}>
      <CardsContainer
        ref={cardsWrapper}
        className="perspective"
        headingComp={
          <SimpleCard ref={card1} className="pb-0 md:px-[80px] overflow-hidden">
            <div className="flex flex-col items-center gap-dashboard-spacing-element-medium">
              <div className="flex flex-col items-center gap-dashboard-specific-radius text-center max-w-[520px]">
                {data.title && (
                  <div className="text-linear-sunset text-title-medium">
                    {data.title}
                  </div>
                )}

                {data.text && (
                  <div className="text-dashboard-text-description-base-low text-base">
                    {data.text}
                  </div>
                )}
              </div>
            </div>
            {data.image.data && (
              <div className="w-full flex justify-center md:px- mt-dashboard-spacing-element-medium">
                <Image
                  src={data.image.data.attributes.url}
                  alt=""
                  width={data.image.data.attributes.width}
                  height={data.image.data.attributes.height}
                  className="relative z-20 object-cover min-w-[600px]"
                />
              </div>
            )}
          </SimpleCard>
        }
      >
        {data.cards[0] && (
          <Card
            ref={card2}
            title={data.cards[0].title}
            text={data.cards[0].content}
            img={data.cards[0].img.data[0].attributes.formats.medium.url}
          />
        )}

        {data.cards[1] && (
          <Card
            ref={card3}
            title={data.cards[1].title}
            text={data.cards[1].content}
            img={data.cards[1].img.data[0].attributes.formats.medium.url}
          />
        )}

        {data.cards[2] && (
          <Card
            ref={card4}
            title={data.cards[2].title}
            text={data.cards[2].content}
            img={data.cards[2].img.data[0].attributes.formats.medium.url}
          />
        )}
      </CardsContainer>
    </div>
  );
};

type CardProps = {
  title: string;
  text: string;
  img?: string;
};
const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ title, text, img }, ref) => {
    return (
      <SimpleCard
        ref={ref}
        paddingMobileSmall
        className="relative overflow-hidden flex flex-col justify-between gap-[24px] pb-0"
      >
        <div>
          <div className="text-dashboard-text-description-base-low text-title-small">
            {title}
          </div>
          <div className="text-dashboard-text-description-base text-medium">
            {text}
          </div>
        </div>

        {img && (
          <div className="relative w-full h-0 pb-[110%] rounded-t-[8px] overflow-hidden">
            <Image
              src={img}
              alt={text}
              aria-hidden
              fill
              className="relative z-20 object-cover"
            />
          </div>
        )}
      </SimpleCard>
    );
  }
);
