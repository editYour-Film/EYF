import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const sendNewsletterEmail = async (to) => {
  const msg = {
    to,
    from: "arthur.boucard@hotmail.fr",
    subject: "Bienvenue sur la newsletter",
    templateId: "d-b62b440eecd64fe18a62bb0545106ffc",
    dynamic_template_data: {
    }
  };

  try {
    await sgMail.send(msg);
    console.log('Newsletter email sent');
  } catch (error) {
    console.error(error);
  }
};
