import { DashboardEditorCover } from "./DashboardEditorCover";
import { DashboardEditorModels } from "./DashboardEditorModels";
import { DashboardEditorKeyWords } from "./DashboardEditorKeyWords";
import { AddModel } from "./AddModel";

import { useContext, useEffect, useState } from "react";
import { useUser } from "@/auth/authContext";
import {
  AddModelContext,
  AddModelContextProvider,
} from "./_context/AddModelContext";

export const DashboardEditorHome = () => {
  return (
    <AddModelContextProvider>
      <Content />
    </AddModelContextProvider>
  );
};

const Content = () => {
  const context = useContext(AddModelContext);
  const user = useUser();
  const [highlightedVideo, setHighLightedVideo] = useState<any>(null);

  useEffect(() => {
    context.getCurrentModels();

    setHighLightedVideo(
      user.models && user.models.filter((x: any) => x.is_highlighted).length > 0
        ? user.models.filter((x: any) => x.is_highlighted)[0]
        : false
    );
  }, []);

  return (
    <div className="dashBoard_editor__home">
      {context.showAddModelInterface === false ? (
        <>
          <DashboardEditorCover highlightedModel={highlightedVideo} />
          <hr className="mt-7 mb-12 lg:my-12" />
          <DashboardEditorModels models={context.currentModels} />
          <hr className="my-12" />
          <DashboardEditorKeyWords />
        </>
      ) : (
        <AddModel />
      )}
    </div>
  );
};

export { AddModelContext };
