import { sendEmail } from '../../lib/sendEmail';
import { addEmailToNewsletter } from '../../lib/addEmailToNewsletter';

export default async (req, res) => {
  const { email } = req.body;

  try {
    await sendEmail(email);
    await addEmailToNewsletter(email);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
