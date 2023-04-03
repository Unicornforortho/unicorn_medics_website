/*
  This function checks if a customer exists in the database.
*/
const doesCustomerExists = async (customerEmail: string) => {
  const URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/customer-exists`;
  const response = await fetch(URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: customerEmail,
    }),
  });
  const res = await response.json();
  return res.customerExists;
};

export default doesCustomerExists;
