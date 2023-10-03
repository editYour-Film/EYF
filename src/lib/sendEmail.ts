import sgMail from '@sendgrid/mail';

export const sendEmail = async (to) => {
  sgMail.setApiKey("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");

  const msg = {
    to,
    from: "arthur.boucard@hotmail.fr",
    subject: "newsletter",
    text: "test",
    html: "<strong>test</strong>",
  };

  try {
    await sgMail.send(msg);
  } catch (error) {
    console.error(error);
  }
};
