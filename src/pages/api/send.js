const sgMail = require("@sendgrid/mail");

export default async function handler(req, res) {
  sgMail.setApiKey(process.env.NEXT_PUBLIC_SENDGRID_API_KEY);

  const { email } = req.body;

  const msg = {
    to: [email],
    from: "contact@edityour.film",
    subject: "Bienvenue sur la newsletter",
    templateId: process.env.SENDGRID_TEMPLATE_ID,
    dynamic_template_data: {},
  };

  try {
    await sgMail.send(msg);
    res.status(200).send("Message sent successfully.");
  } catch (error) {
    console.log("ERROR", error);
    res.status(400).send("Message not sent.");
  }
}
