/*
  Sends a mail to `iimpro.contact.us@gmail.com` from the customer's email address.
*/
const sendOTPToCustomer = async (from: string, to: string, subject: string, message: string) => {
  const URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/customer-activity/send-password-change-otp`;
  const response = await fetch(URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to,
      subject,
      text: message,
    }),
  });
  const res = await response.json();
  if (res.error) {
    return {
      error: true,
      title: 'Internal Server Error',
      message: 'We were unable to send the email. Please try again later.',
    };
  }
  return res.response;
};

export default sendOTPToCustomer;
