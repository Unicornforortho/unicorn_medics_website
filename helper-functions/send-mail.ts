const sendCustomerEmail = async (from: string, to: string, subject: string, message: string) => {
  const URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/customer-activity/send-mail`;
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

export default sendCustomerEmail;
