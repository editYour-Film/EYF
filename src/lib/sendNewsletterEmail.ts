import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const sendNewsletterEmail = async (to) => {
  const msg = {
    to,
    from: "contact@edityour.film",
    subject: "Bienvenue sur la newsletter",
    templateId: "d-d3ef58b024e345e4aaee5effe7970ffa",
    dynamic_template_data: {
    }
  };

  try {
    await sgMail.send(msg);
    console.log('Newsletter email sent');
  } catch (error) {
    console.log('Error sending newsletter email');
    console.error(error);
    throw new Error('Error sending newsletter email');
  }
};
