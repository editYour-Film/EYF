import { sendEmail } from '../../lib/sendEmail';

export default async (req, res) => {
  const { email } = req.body;

  try {
    await sendEmail(email);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
