import Image from "next/image";
import { user_info } from "../editor/_context/EditorContext";
import { GeneratedAvatar } from "@/components/_shared/badges/GeneratedAvatar";

type ProfilPictureProps = {
  user?: user_info;
  size?: "default" | "lg" | "md" | "sm";
};

export const ProfilPicture = ({ user, size }: ProfilPictureProps) => {
  let sizeClass;
  switch (size) {
    case "lg":
      sizeClass = "w-[] h-[]";
      break;
    case "md":
      sizeClass = "w-[] h-[]";
      break;

    case "sm":
      sizeClass = "w-[] h-[]";
      break;

    default:
      sizeClass = "w-[60px] h-[60px]";
      break;
  }

  const pic = (
    <GeneratedAvatar
      type="blue"
      label={(
        user?.f_name.substring(0, 1) +
        " " +
        user?.l_name.substring(0, 1)
      ).toUpperCase()}
      img={user && user.picture && user.picture.formats.thumbnail.url}
      className="w-full h-full"
      textSize="sm"
      noHover
    />
  );

  return (
    <div
      className={`profil-pic rounded-full overflow-hidden ${sizeClass}`}
      onClick={
        // TODO:Integration push the corresponding user profil route

        () => {
          // router.push()
        }
      }
    >
      {pic}
    </div>
  );
};
