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
              case 'header':
                switch (block.data.level) {
                  case 1 :
                    return <h1 className="mb-[36px]">{block.data.text}</h1>
                  case 2 :
                    return <h2 className="mb-[36px] text-title-medium leading-[120%] font-medium uppercase">{block.data.text}</h2>;
                  case 3 :
                    return <h3 className="mb-[36px] text-title-small leading-[120%] font-medium uppercase">{block.data.text}</h3>;
                  case 4 :
                    return <h4 className="mb-[36px]">{block.data.text}</h4>;
                  case 5 :
                    return <h5 className="mb-[36px]">{block.data.text}</h5>;
                  case 6 :
                    return <h6 className="mb-[36px]">{block.data.text}</h6>;
                }
                break;

              case "paragraph":
                return (
                  <div className="editorjs" key={i}>
                    <p
                      className="text-base text-dashboard-text-description-base font-normal"
                      dangerouslySetInnerHTML={{ __html: block.data.text }}
                    ></p>
                  </div>
                );

              case "quote":
                return (
                  <blockquote className="mb-4 editorjs" key={i}>
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
                  <div className="flex gap-4 items-start mb-4 editorjs" key={i}>
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
                  <table className="w-full mb-4 editorjs" key={i}>
                    {block.data.content.map((row: any, j: number) => {
                      return (
                        <tr className="border-y " key={j}>
                          {row.map((column: any, k: number) => {
                            return (
                              <td
                                className="text-dashboard-text-description-base opacity-80 border-x text-lg py-2 px-2"
                                dangerouslySetInnerHTML={{ __html: column }}
                                key={k}
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
                  <div className="my-[36px] rounded-dashboard-button-separation-spacing overflow-hidden editorjs" key={i}>
                    <img
                      src={block.data.file.url}
                      width={block.data.file.width}
                      className="max-w-full"
                    />
                    <p
                      className="text-dashboard-text-description-base opacity-80 text-sm mt-2"
                      dangerouslySetInnerHTML={{
                        __html: block.data.caption,
                      }}
                    />
                  </div>
                );

              case "checklist":
                return (
                  <div className="mb-4 editorjs" key={i}>
                    {block.data.items.map((checklist: any, j: number) => {
                      return (
                        <div className="flex gap-2 items-center py-2" key={j}>
                          <Image
                            width={20}
                            height={20}
                            src={"/icons/check.svg"}
                            alt=""
                          />
                          <p
                            className="text-dashboard-text-description-base opacity-80 text-lg"
                            dangerouslySetInnerHTML={{ __html: checklist.text }}
                          />
                        </div>
                      );
                    })}
                  </div>
                );

              case "LinkTool":
                return (
                  <div className="mb-4 editorjs" key={i}>
                    {block.data.meta.title && (
                      <p
                        className="text-dashboard-text-description-base opacity-80 text-xl font-medium"
                        dangerouslySetInnerHTML={{
                          __html: block.data.meta.title,
                        }}
                      />
                    )}
                    {block.data.meta.description && (
                      <p
                        className="text-dashboard-text-description-base opacity-80 text-lg mt-2"
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
                  <ul className="mb-4 editorjs" key={i}>
                    {block.data.items.map((item: any, j: number) => {
                      return (
                        <li
                          className="text-dashboard-text-description-base opacity-80 text-lg ml-4"
                          style={{ listStyle: "disc" }}
                          dangerouslySetInnerHTML={{
                            __html: item,
                          }}
                          key={j}
                        />
                      );
                    })}
                  </ul>
                );
              case "delimiter":
                return <hr className="my-8" key={i} />;
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
