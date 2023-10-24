export type layoutProps = {
  children: React.ReactNode;
  previousPath?: string;
};

const LayoutSignin: React.FC<layoutProps> = ({ children, previousPath }) => {
  return (
    <>
      <div className={"bg-black relative min-h-screen overflow-hidden"}>
        <div className="bg-signin absolute w-[50vw] min-w-[500px] h-[50vw] min-h-[500px] -z-1 pointer-events-none top-1/2 -translate-y-1/2 -left-1/2 sm:-left-0 sm:left-1/8"></div>
        <main
          className={`flex min-h-[calc(100vh)] w-full justify-center items-center`}
        >
          <div className="relative min-h-screen flex flex-col gap-9 justify-center items-center py-10 z-0">
            {children}
          </div>
        </main>
      </div>
    </>
  );
};

export default LayoutSignin;
