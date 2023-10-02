import { ContainerSm } from "@/components/_shared/UI/Container";
import HeaderSignin from "../_shared/HeaderSignin";
import { FooterSignin } from "../_shared/FooterSignin";

export type layoutProps = {
  children: React.ReactNode;
  previousPath?: string;
};
const LayoutSignin: React.FC<layoutProps> = ({ children, previousPath }) => {
  const footerHeight = "75px";
  return (
    <>
      <HeaderSignin previousPath={previousPath} />
      <div className={"bg-black relative min-h-screen overflow-hidden"}>
        <div className="bg-signin absolute w-[50vw] h-[50vw] z-0 pointer-events-none top-1/2 -translate-y-1/2 left-1/8"></div>
        <main className={`flex min-h-[calc(100vh-75px)] w-full justify-center items-center`}>
          <ContainerSm>
            <div className="flex flex-col gap-9 justify-center min-h-screen py-10">
              {children}
            </div>
          </ContainerSm>
        </main>
        <FooterSignin height={footerHeight} />
      </div>
    </>
  );
};

export default LayoutSignin;
