import sgMail from '@sendgrid/mail';

sgMail.setApiKey("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");

export const sendEmail = async (to) => {
  const msg = {
    to,
    from: "arthur.boucard@hotmail.fr",
    subject: "newsletter",
    text: "test",
    html: "<strong>test</strong>",
  };

  try {
    await sgMail.send(msg);
    console.log('Newsletter email sent');
  } catch (error) {
    console.error(error);
  }
};
