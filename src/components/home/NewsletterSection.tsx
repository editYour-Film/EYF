import { useEffect, useState } from "react";
import { H1 } from "../_shared/typography/H1";
import Button from "../_shared/form/Button";
import Image from "next/image";
import validator from "validator";
import { inputErrors } from "@/const";
import { useStrapi } from "@/hooks/useStrapi";
import { sendEmail } from '../../lib/sendEmail';

type NewsletterSectionProps = {
  type?: 'newsletter' | 'sponsor'
}

export const NewsletterSection = ({type = 'newsletter'}:NewsletterSectionProps) => {  
  const { data: newsletterData, mutate: getNewsLetterData } = useStrapi("newsletter-section", false);

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const sendgrid = async () => {
    try {
      await sendEmail(email);

      setEmailError("Email sent successfully");
    } catch (error) {
      if (error) {
        setEmailError("Email sending failed: " + error);
      } else {
        setEmailError("Email sending failed. Please try again later.");
      }
    }
  };

  useEffect(() => { 
    getNewsLetterData();   
  }, []);

  return (
    <>
      <div className="relative p-8 md:p-14 my-10 md:my-24 rounded-4xl max-w-5xl mx-auto bg-newsletter overflow-hidden">
        <div className="absolute left-0 top-0 w-full h-full bg-pattern z-30 opacity-20 pointer-events-none mix-blend-hard-light"></div>

        <div className="absolute hidden md:flex justify-center items-center top-0 right-0 translate-x-[80%] -translate-y-[10%] md:translate-x-[40%] md:-translate-y-[40%] lg:translate-x-[20%] lg:-translate-y-[30%] w-[350px] h-[350px] z-10 pointer-events-none">
          <div className="absolute flex-shrink-0 w-[350px] h-[350px] rounded-full bg-darkpurple z-20 pointer-events-none"></div>
          <div className="flex-shrink-0 w-[500px] h-[500px] rounded-full bg-lightpurple z-10 pointer-events-none"></div>
        </div>

        <div className="relative z-50">
          <H1 className="text-black max-w-sm font-bold text-[45px] leading-[110%]" fake>{newsletterData?.title}</H1>
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
                  "border-2 rounded-2xl h-10 bg-black w-full px-4 text-white md:pr-56"
                }
                value={email}
                placeholder="Email"
                name="email"
                sb-form-input="true"
              />
              <div className="hidden md:block" id="div-submitInput">
                <button
                  className="absolute right-0 pr-8 border-l pl-4 top-2 text-white cursor-pointer"
                  type="button"
                  id="submitInput"
                  onClick={() => {
                    setEmailError("");

                    if (validator.isEmpty(email))
                      setEmailError(inputErrors.required);
                    else if (!validator.isEmail(email))
                      setEmailError(inputErrors.invalid);
                    else
                      sendgrid();
                  }}
                >
                  Rejoindre la newsletter
                </button>
              </div>
            </div>
            {emailError && <p className="text-red-500 mt-1.5 ">{emailError}</p>}

            <div id="div-submitInput">
              <Button
                variant="black"
                className="md:hidden mt-4 bg-black"
                text="Rejoindre la newsletter"
                id="submitInput"
                onClick={() => {
                  setEmailError("");

                  if (validator.isEmpty(email))
                    setEmailError(inputErrors.required);
                  else if (!validator.isEmail(email))
                    setEmailError(inputErrors.invalid);
                  else
                    sendgrid();
                }}
              />
            </div>

            <div className="loader"></div>
          </form>
        </div>
      </div>
    </>
  );
};
