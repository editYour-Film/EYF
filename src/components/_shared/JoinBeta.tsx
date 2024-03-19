import Button from "./form/Button";
import Image from "next/image";
import { Widget } from "@typeform/embed-react";

type JoinBetaProps = {
  isVisible: boolean;
  onClose: any;
};

export const JoinBeta = ({ isVisible = false, onClose }: JoinBetaProps) => {
  const handleClose = () => {
    onClose();
  };

  const sendgrid = async () => {
    // const sendRes = await useStrapiPost(
    //   "send-mail",
    //   {
    //     email: email,
    //     subject: "Bienvenue sur EditYourFilm",
    //     text:
    //       "Bonjour " +
    //       name +
    //       ", merci d'avoir rejoins la béta de EditYourFilm.",
    //   },
    //   false
    // );
    // if (sendRes.status === 200)
    //   await addEmailToNewsletter(email).then(() => {
    //     console.log("Vous avez rejoins la béta.");
    //     // setResponse("Vous avez rejoins la béta.");
    //   });
  };

  return (
    <div
      className={`joinBeta fixed top-0 left-0 w-full h-[100vh] min-h-[100vh] bg-blackBerry flex flex-col lg:flex-row justify-start lg:justify-around items-center gap-10 lg:gap-12 xl:gap-24 fullHd:gap-10 fullHd:justify-center transition-transform duration-700 ease-in-out z-popup overflow-scroll lg:overflow-hidden ${
        isVisible
          ? "translate-y-0 pointer-events-all"
          : "translate-y-[130%] pointer-events-none"
      }`}
    >
      <Button
        text="Fermer"
        variant="black"
        onClick={handleClose}
        className="sticky md:absolute md:right-10 top-10 ml-auto mr-10 px-[20px] py-[10px] border rounded-full z-20 w-max"
      ></Button>

      <div className="joinBeta__form relative px-10 md:px-16 lg:px-16 py-12 z-10 bg-blackBerry rounded-[24px] overflow-hidden w-[800px] h-[800px] flex flex-col justify-between">
        <Image
          src="/img/Logo-Long.png"
          alt="logo edit your film"
          width="50"
          height="50"
        />
        <div className="relative w-full h-full">
          <Widget
            fullScreen={true}
            id="HU01vHpL"
            style={{ width: "100%", height: "auto" }}
            className="my-form"
          />
        </div>
      </div>

      <div className="absolute w-full h-full bottom-0 z-0 overflow-hidden">
        <div className="absolute w-[2000px] h-[500px] -left-96 bottom-0 opacity-[0.9] translate-y-[75%] bg-top-section"></div>
        <div className="absolute w-[1500px] h-[500px] -right-96 bottom-0 translate-y-[50%] bg-top-section-2"></div>
      </div>
    </div>
  );
};
