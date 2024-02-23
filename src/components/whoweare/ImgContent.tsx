import { Title } from "../_shared/Title";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import Container from "../_shared/UI/Container";

type ImgContentProps = {
  data: any;
};

export const ImgContent = ({ data }: ImgContentProps) => {
  const { ref: section, inView } = useInView({
    triggerOnce: true,
  });

  return (
    <div ref={section} className="arrow-cards mb-32">
      <Container>
        <div className="mt-[238px]">
          <div className="arrow-cards__img relative h-0 pb-[70%] rounded-dashboard-button-separation-spacing overflow-hidden">
            <Image
              src={data.img.data.attributes.url}
              alt={data.img.alternativeText}
              fill
              className="object-cover"
              sizes="(max-width: 1280px) 100vw, 63vw"
            />
          </div>

          <div
            className={`flex flex-col lg:flex-row gap-4 lg:gap-16 px-4 mt-16 ${
              inView && "inView"
            }`}
          >
            <Title
              titleType="none"
              fake
              anim
              className="basis-[40%] text-title-medium leading-[110%]"
            >
              {data.title}
            </Title>

            <div className="basis-[60%] text-base text-dashboard-text-description-base">
              {data.content}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};
