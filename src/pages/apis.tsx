import Head from "next/head";
import LayoutMain from "@/components/layouts/LayoutMain";
import { useStrapiPost } from "@/hooks/useStrapi";
import Input from "@/components/_shared/form/Input";
import Container from "@/components/_shared/UI/Container";
import { useState } from "react";
import Button from "@/components/_shared/form/Button";

export default function Apis() {
  const [title, setTitle] = useState();
  const [length, setLength] = useState();
  const [model, setModel] = useState("Mobile");
  const [description, setDescription] = useState();
  const [tags, setTags] = useState();
  const [userInfo, setUserInfo] = useState("1");

  const handleUpload = async () => {
    const form = document.getElementById("form") as any;

    if (form) {
      const formData = new FormData();
      const elementData: any = {};

      Array.from(form.elements).map((input: any) => {
        if (!["file"].includes(input.type))
          elementData[input.name] = input.value;
        else if (input.type === "file")
          for (let i = 0; i < input.files.length; i++)
            formData.append(
              `files.${input.name}`,
              input.files[i],
              input.files[i].name
            );
      });

      formData.append("data", JSON.stringify(elementData));
      await useStrapiPost("editor-videos", formData, true, true);
    }
  };

  return (
    <>
      <Head>
        <title>EditYour.Film</title>
        <meta name="description" content="" />
      </Head>

      <LayoutMain>
        <Container className="w-full">
          <p className="mb-4 text-xl">
            Upload video API{" "}
            <span className="text-red-500 font-bold text-sm">
              (token required)
            </span>
          </p>

          <form className="flex flex-col gap-8" id="form">
            <Input
              type="text"
              label="title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Input
              type="text"
              label="length"
              name="length"
              value={length}
              onChange={(e) => setLength(e.target.value)}
            />
            <Input
              type="text"
              label="model"
              name="model"
              value={model}
              onChange={(e) => setModel(e.target.value)}
            />
            <Input
              type="text"
              label="description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <Input
              type="text"
              label="tags"
              name="tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
            <Input
              type="text"
              name="user_info"
              label="user info"
              value={userInfo}
            />

            <div>
              <label className=" flex flex-wrap items-center gap-3 mb-2 text-sm text-base-text">
                Thumbnail
              </label>
              <input type="file" name="thumbnail" accept="image/*" />
            </div>
            <div>
              <label className=" flex flex-wrap items-center gap-3 mb-2 text-sm text-base-text">
                Video
              </label>
              <input
                type="file"
                name="video"
                accept="video/mp4,video/x-m4v,video/*"
              />
            </div>
            <div>
              <label className=" flex flex-wrap items-center gap-3 mb-2 text-sm text-base-text">
                Ressources
              </label>
              <input type="file" name="resources" multiple={true} />
            </div>
            <Button onClick={() => handleUpload()} text="upload" />
          </form>
        </Container>
      </LayoutMain>
    </>
  );
}
