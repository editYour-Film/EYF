import { H1 } from "../_shared/typography/H1";
import Image from "next/image";
import Button from "../_shared/form/Button";
import { useRouter } from "next/router";
import routes from "@/routes";

export const TopSection = ({ data }: any) => {
  const router = useRouter();
  return (
    <div className="relative mt-16 lg:mt-24 w-full">
      <div className="absolute top-0 left-0 w-full h-[500px] -z-10 overflow-hidden">
        <div className="absolute left-1/2 translate-x-[-70%] translate-y-32 w-[500px] h-[500px] gradient-about-1 opacity-20">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="703"
            height="687"
            viewBox="0 0 703 687"
            fill="none"
          >
            <g opacity="0.6" filter="url(#filter0_f_1312_68817)">
              <path
                d="M140.724 329.922C148.636 220.048 219.272 135.115 298.494 140.218L433.158 148.893C512.38 153.997 570.188 247.204 562.276 357.078C554.364 466.952 483.728 551.885 404.506 546.782L269.842 538.107C190.62 533.003 132.812 439.796 140.724 329.922Z"
                fill="url(#paint0_radial_1312_68817)"
              />
            </g>
            <defs>
              <filter
                id="filter0_f_1312_68817"
                x="0.905914"
                y="0.905914"
                width="701.188"
                height="685.188"
                filterUnits="userSpaceOnUse"
                color-interpolation-filters="sRGB"
              >
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="BackgroundImageFix"
                  result="shape"
                />
                <feGaussianBlur
                  stdDeviation="69.547"
                  result="effect1_foregroundBlur_1312_68817"
                />
              </filter>
              <radialGradient
                id="paint0_radial_1312_68817"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(318.881 278.747) rotate(86.0317) scale(264.331 279.91)"
              >
                <stop stop-color="#4B68FF" />
                <stop offset="1" stop-color="#4B5DFF" stop-opacity="0" />
              </radialGradient>
            </defs>
          </svg>
        </div>
        <div className="absolute left-1/2 translate-x-[-30%] w-[500px] h-[500px]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="703"
            height="687"
            viewBox="0 0 703 687"
            fill="none"
          >
            <g opacity="0.6" filter="url(#filter0_f_1312_68816)">
              <path
                d="M140.724 329.922C148.636 220.048 219.272 135.115 298.494 140.218L433.158 148.893C512.38 153.997 570.188 247.204 562.276 357.078C554.364 466.952 483.728 551.885 404.506 546.782L269.842 538.107C190.62 533.003 132.812 439.796 140.724 329.922Z"
                fill="url(#paint0_radial_1312_68816)"
              />
            </g>
            <defs>
              <filter
                id="filter0_f_1312_68816"
                x="0.905914"
                y="0.905914"
                width="701.188"
                height="685.188"
                filterUnits="userSpaceOnUse"
                color-interpolation-filters="sRGB"
              >
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="BackgroundImageFix"
                  result="shape"
                />
                <feGaussianBlur
                  stdDeviation="69.547"
                  result="effect1_foregroundBlur_1312_68816"
                />
              </filter>
              <radialGradient
                id="paint0_radial_1312_68816"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(318.881 278.747) rotate(86.0317) scale(264.331 279.91)"
              >
                <stop stop-color="#4B68FF" />
                <stop offset="1" stop-color="#FFB74B" stop-opacity="0" />
              </radialGradient>
            </defs>
          </svg>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        <div className="max-w-2xl">
          <p className="text-white opacity-60 text-lg mb-4">{data.suptitle}</p>
          <H1 className="text-violet text-[45px] leading-[110%] font-medium">
            {data.title}
          </H1>
          <div className="relative text-base-text text-xl mt-10 z-10">
            {data.content}
          </div>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        <Button
          text="Voir les réalisations de nos monteur.ses"
          iconRight
          icon="arrow-right"
          variant="black"
          className="absolute text-xl top-5 right-5 w-max px-9 py-7"
          onClick={() => {
            router.push(routes.CATALOGUE);
          }}
        />
        {data.img && data.img.data && (
          <div className="relative w-full mt-14 ">
            <div className="top-0 left-0 w-full h-0 pb-[56%]">
              <Image
                src={data.img.data.attributes.url}
                alt={data.img.data.attributes.alternativeText}
                width={1216}
                height={600}
                className="w-full object-cover"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
