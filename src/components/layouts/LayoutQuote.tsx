import { ContainerFullWidth } from "@/components/_shared/UI/Container";
import "react-multi-carousel/lib/styles.css";
import HeaderQuote from "../_shared/HeaderQuote";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { disableCustomCursor } from "@/store/slices/cursorSlice";

type LayoutMainProps = {
  children: React.ReactNode;
  step: number;
};

const LayoutQuote = ({ step, children }: LayoutMainProps) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(disableCustomCursor())
  }, [])

  return (
    <>
      <div className="bg-black min-h-screen flex flex-col gap-10 pt-20 md:pt-0">
        <HeaderQuote step={step} />
        <main>
          <ContainerFullWidth className="mt-8">
            <div className="your-video-bg md:left-1/2 md:-translate-x-1/2 w-4/5 hidden md:block"></div>
            <div className="max-w-7xl mx-auto bg-black rounded-3xl p-4 md:p-14 z-20 relative border">
              {children}
            </div>
          </ContainerFullWidth>
        </main>
      </div>
    </>
  );
};

export default LayoutQuote;
