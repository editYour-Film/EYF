import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.NEXT_PUBLIC_SENDGRID_API_KEY as string);

export const sendNewsletterEmail = async (to: string) => {
  const msg = {
    to,
    from: "contact@edityour.film",
    subject: "Bienvenue sur la newsletter",
    templateId: process.env.SENDGRID_TEMPLATE_ID as string,
    dynamic_template_data: {},
  };

  return await sgMail.send(msg);
};
