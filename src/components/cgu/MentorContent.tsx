import { H1 } from "../_shared/typography/H1";
import { EditorJsParser } from "@/utils/EditorJsParser";

export const MentorContent = ({ data }: any) => {
  return (
    <div className="max-w-7xl mx-auto md:px-4">
      <H1>{data.title}</H1>
      <EditorJsParser JSONContent={data.content} />
    </div>
  );
};
