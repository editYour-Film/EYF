import React from "react";
import Image from "next/image";

type EditorJsParserProps = {
  JSONContent: string;
};
export const EditorJsParser = ({ JSONContent }: EditorJsParserProps) => {
  {
    if (JSONContent) {
      try {
        const content = JSON.parse(JSONContent);

        if (content)
          return content.blocks?.map((block: any, i: number) => {
            switch (block.type) {
              case "paragraph":
                return (
                  <div className="editorjs">
                    <p
                      className="text-lg mb-4"
                      dangerouslySetInnerHTML={{ __html: block.data.text }}
                    ></p>
                  </div>
                );

              case "quote":
                return (
                  <blockquote className="mb-4 editorjs">
                    &ldquo;
                    <p
                      className="text-lg"
                      dangerouslySetInnerHTML={{ __html: block.data.text }}
                    />
                    &rdquo;
                    {block.data.caption && (
                      <cite className="text-sm">- {block.data.caption}</cite>
                    )}
                  </blockquote>
                );

              case "warning":
                return (
                  <div className="flex gap-4 items-start mb-4 editorjs">
                    <div className="pt-1">
                      <Image
                        width={20}
                        height={20}
                        src={"/icons/warning.svg"}
                        alt=""
                      />
                    </div>
                    <div>
                      {block.data.title && (
                        <p
                          dangerouslySetInnerHTML={{ __html: block.data.title }}
                          className="text-xl font-medium"
                        />
                      )}
                      {block.data.message && (
                        <p
                          className="text-base"
                          dangerouslySetInnerHTML={{
                            __html: block.data.message,
                          }}
                        />
                      )}
                    </div>
                  </div>
                );

              case "table":
                return (
                  <table className="w-full mb-4 editorjs">
                    {block.data.content.map((row: any, i: number) => {
                      return (
                        <tr className="border-y " key={i}>
                          {row.map((column: any, i: number) => {
                            return (
                              <td
                                className="text-gray opacity-80 border-x text-lg py-2 px-2"
                                dangerouslySetInnerHTML={{ __html: column }}
                                key={i}
                              />
                            );
                          })}
                        </tr>
                      );
                    })}
                  </table>
                );

              case "image":
                return (
                  <div className="mb-4 editorjs">
                    <img
                      src={block.data.file.url}
                      width={block.data.file.width}
                      className="max-w-full"
                    />
                    <p
                      className="text-gray opacity-80 text-sm mt-2"
                      dangerouslySetInnerHTML={{
                        __html: block.data.caption,
                      }}
                    />
                  </div>
                );

              case "checklist":
                return (
                  <div className="mb-4 editorjs">
                    {block.data.items.map((checklist: any, i: number) => {
                      return (
                        <div className="flex gap-2 items-center py-2" key={i}>
                          <Image
                            width={20}
                            height={20}
                            src={"/icons/check.svg"}
                            alt=""
                          />
                          <p
                            className="text-gray opacity-80 text-lg"
                            dangerouslySetInnerHTML={{ __html: checklist.text }}
                          />
                        </div>
                      );
                    })}
                  </div>
                );

              case "LinkTool":
                return (
                  <div className="mb-4 editorjs">
                    {block.data.meta.title && (
                      <p
                        className="text-gray opacity-80 text-xl font-medium"
                        dangerouslySetInnerHTML={{
                          __html: block.data.meta.title,
                        }}
                      />
                    )}
                    {block.data.meta.description && (
                      <p
                        className="text-gray opacity-80 text-lg mt-2"
                        dangerouslySetInnerHTML={{
                          __html: block.data.meta.description,
                        }}
                      />
                    )}
                    {block.data.meta && block.data.meta.image && (
                      <a href={block.data.link} target="_blank">
                        <Image
                          width={40}
                          height={40}
                          src={block.data.meta.image.url}
                          alt=""
                          className="w-full mt-2"
                        />
                      </a>
                    )}
                  </div>
                );

              case "list":
                return (
                  <ul className="mb-4 editorjs">
                    {block.data.items.map((item: any, i: number) => {
                      return (
                        <li
                          className="text-gray opacity-80 text-lg ml-4"
                          style={{ listStyle: "disc" }}
                          dangerouslySetInnerHTML={{
                            __html: item,
                          }}
                          key={i}
                        />
                      );
                    })}
                  </ul>
                );

              case "delimiter":
                return <hr className="my-8" />;
            }
          });
        return <></>;
      } catch {
        return <></>;
      }
    }
    return <></>;
  }
};
