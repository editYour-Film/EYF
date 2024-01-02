import { TypographyProps } from "./H3";
import Image from "next/image";

export const H2: React.FC<TypographyProps> = ({
  children,
  arrow,
  className = "",
  fake = false,
  style
}) => {
return arrow ? (
    <Wrapper
      type = {fake ? 'none' : 'h2'}
      className={
        "text-linear-sunset text-lg md:text-xl flex items-start gap-5 " + className
      }
      style={style}
    >
      <Image
        src="/icons/right-arrow-violet.svg"
        height={20}
        width={41}
        alt="narrow"
        className="mt-1"
      />
      {children}
    </Wrapper>
  ) : (
    <Wrapper type={fake ? 'none' : 'h2'} className={"text-[40px] leading-[110%] " + className} style={style}>{children}</Wrapper>
  );
};

type WrapperProps = {
  type: string,
  className: string,
  children: React.ReactNode,
  style: any
}

const Wrapper = ({type, className, children, style}: WrapperProps) => <div className={className} style={style}>{children}</div>

