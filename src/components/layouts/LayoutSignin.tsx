import { disableCustomCursor } from "@/store/slices/cursorSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { GradientFollowMouse } from "../_shared/UI/GradientFollowMouse";

export type layoutProps = {
  children: React.ReactNode;
  previousPath?: string;
};

const LayoutSignin: React.FC<layoutProps> = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(disableCustomCursor());
  }, []);

  return (
    <>
      <div className={"bg-blackBerry relative min-h-screen overflow-hidden"}>
        <GradientFollowMouse/>
        <main
          className={`flex min-h-[calc(100vh)] w-full justify-center items-center perspective`}
          >
          <div
            className="relative min-h-screen flex flex-col gap-9 justify-center items-center py-10 z-0"
            style={{ transformOrigin: "center center -250px" }}
          >
            {children}
          </div>
        </main>
      </div>
    </>
  );
};

export default LayoutSignin;
