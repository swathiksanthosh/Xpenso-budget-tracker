const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async (to, subject, text) => {
  const msg = {
    to:'swathiksanthoshggl@gmail.com',
    from: 'swathiksanthoshggl@gmail.com', // or verified sender from SendGrid
    subject,
    text,
  };
  await sgMail.send(msg);
};

module.exports = sendEmail;