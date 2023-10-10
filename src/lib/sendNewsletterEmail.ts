import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

export const sendNewsletterEmail = async (to: string) => {
  const msg = {
    to,
    from: "contact@edityour.film",
    subject: "Bienvenue sur la newsletter",
    templateId: process.env.SENDGRID_TEMPLATE_ID as string,
    dynamic_template_data: {},
  };

  try {
    await sgMail.send(msg);
    console.log("Newsletter email sent");
  } catch (error) {
    console.log("Error sending newsletter email");
    console.error(error);
    throw new Error("Error sending newsletter email");
  }
};
