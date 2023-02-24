const getUserFromEmail = async (email: string) => {
  const URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/customer-activity/get-customer-by-email`;
  const response = await fetch(URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
    }),
  });
  const data = await response.json();
  return data.response.customerId;
};

export default getUserFromEmail;
