import { sendNewsletterEmail } from "../../lib/sendNewsletterEmail";
import { addEmailToNewsletter } from "../../lib/addEmailToNewsletter";

export default async (req: any, res: any) => {
  const { email } = req.body;

  try {
    await sendNewsletterEmail(email).then(async () => {
      await addEmailToNewsletter(email).then(() => {
        res.status(200).json({ message: "Email sent successfully" });
      });
    });
  } catch (error) {
    console.log(
      "Error sending newsletter email or adding user to newsletter contact list"
    );
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
