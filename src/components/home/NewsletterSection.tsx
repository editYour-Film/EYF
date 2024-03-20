import { useEffect, useState } from "react";
import { H1 } from "../_shared/typography/H1";
import Button from "../_shared/form/Button";
import validator from "validator";
import { inputErrors } from "@/const";
import { useStrapi, useStrapiPost } from "@/hooks/useStrapi";
import { addEmailToNewsletter } from "@/lib/addEmailToNewsletter";
import FooterCircle from "@/img/footerImg.svg";

export const NewsletterSection = () => {
  const { data: newsletterData, mutate: getNewsLetterData } = useStrapi(
    "newsletter-section",
    false
  );

  const [email, setEmail] = useState("");
  const [emailResponse, setEmailResponse] = useState("");
  const [status, setStatus] = useState("");

  /*const handleResponse = (status: any, msg: string) => {
    if (status === 200)
      setEmailResponse("L'email a bien été ajouté à la newsletter.");
    else
      setEmailResponse(
        "L'envoi de l'email a échoué, veuillez réessayer plus tard."
      );
  };*/

  const sendgrid = async () => {
    /*   try {
      await sendNewsletterEmail(email)
        .then(async () => {
          await addEmailToNewsletter(email)
            .then(() => {
              setEmailResponse("L'email a bien été ajouté à la newsletter.");
            })
            .catch(() => {
              setEmailResponse(
                "L'envoi de l'email a échoué, veuillez réessayer plus tard."
              );
            });
        })
        .catch(() => {
          setEmailResponse(
            "L'envoi de l'email a échoué, veuillez réessayer plus tard."
          );
        });
    } catch (error) {
      setEmailResponse(
        "L'envoi de l'email a échoué, veuillez réessayer plus tard."
      );
    }*/

    /*const res = await fetch("/api/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(email),
    });
    const text = await res.text();
    handleResponse(res.status, text);*/

    const sendRes = await useStrapiPost(
      "send-mail",
      {
        email: email,
        subject: "Bienvenue sur la newsletter",
        text:
          "Bonjour " +
          email +
          ", merci de vous inscrire sur la newsletter de EditYour.film.",
      },
      false
    );
    if (sendRes.status === 200)
      await addEmailToNewsletter(email).then(() => {
        setStatus("ok");
        setEmailResponse("L'email a bien été ajouté à la newsletter.");
      });
  };

  useEffect(() => {
    getNewsLetterData();
  }, []);

  return (
    <>
      <div
        className={`gradient-card relative mb-dashboard-spacing-element-medium md:mb-[70px] px-dashboard-mention-padding-right-left py-[53px] lg:pt-[101px] lg:pb-[61px] lg:px-[53px] rounded-dashboard-button-square-radius overflow-hidden border border-dashboard-button-stroke-hover`}
      >
        {/* <div className="absolute left-0 top-0 w-full h-full bg-pattern z-30 opacity-20 pointer-events-none mix-blend-hard-light"></div> */}

        {/* <div className="absolute hidden md:flex justify-center items-center top-0 right-0 translate-x-[80%] -translate-y-[10%] md:translate-x-[40%] md:-translate-y-[40%] lg:translate-x-[20%] lg:-translate-y-[30%] w-[350px] h-[350px] z-10 pointer-events-none">
          <div className="absolute flex-shrink-0 w-[350px] h-[350px] rounded-full bg-darkpurple z-20 pointer-events-none"></div>
          <div className="flex-shrink-0 w-[500px] h-[500px] rounded-full bg-lightpurple z-10 pointer-events-none"></div>
        </div> */}

        <div className="relative z-50">
          <H1
            className="text-black xl:max-w-[800px] font-medium text-[45px] sm:text-[55px]"
            fake
          >
            {newsletterData?.title}
          </H1>
          <p className="text-xl  text-black md:max-w-md mt-2">
            {newsletterData?.content}
          </p>
          <form id="sb_form" className="relative max-w-3xl mt-4 md:mt-8">
            <div>
              <input
                type="text"
                id="input-email"
                onChange={(e) => setEmail(e.target.value)}
                className={
                  "border-2 rounded-2xl h-10 bg-blackBerry w-full px-4 text-soyMilk md:pr-56"
                }
                value={email}
                placeholder="Email"
                name="email"
                sb-form-input="true"
              />
              <div className="hidden md:block" id="div-submitInput">
                <button
                  className="absolute right-0 pr-8 border-l pl-4 top-2 text-soyMilk cursor-pointer"
                  type="button"
                  id="submitInput"
                  onClick={() => {
                    setEmailResponse("");

                    if (validator.isEmpty(email))
                      setEmailResponse(inputErrors.required);
                    else if (!validator.isEmail(email))
                      setEmailResponse(inputErrors.invalid);
                    else sendgrid();
                  }}
                >
                  Rejoindre la newsletter
                </button>
              </div>
            </div>
            {emailResponse && (
              <p className={`${status !== "ok" ? "text-red-500" : ""} mt-1.5 `}>
                {emailResponse}
              </p>
            )}

            <div id="div-submitInput">
              <Button
                variant="black"
                className="md:hidden mt-4 bg-blackBerry"
                text="Rejoindre la newsletter"
                id="submitInput"
                onClick={() => {
                  setEmailResponse("");

                  if (validator.isEmpty(email))
                    setEmailResponse(inputErrors.required);
                  else if (!validator.isEmail(email))
                    setEmailResponse(inputErrors.invalid);
                  else sendgrid();
                }}
              />
            </div>

            <div className="loader"></div>
          </form>
        </div>

        <div className="gradient-card__deco absolute w-full h-full top-0 left-0 z-0">
          <div className="absolute w-full h-full top-0 left-0 bg-pattern opacity-30 z-10"></div>
          <div className="absolute w-full h-full top-0 left-0 bg-rose-sunset linear-orientation-270 z-0"></div>
          <FooterCircle className="absolute hidden lg:block top-0 right-0 z-20" />
        </div>
      </div>
    </>
  );
};
