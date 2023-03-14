import { encrypt } from './encryption';

/*
  Updates user password to the database.
*/
const changePassword = async (email: string, password: string) => {
  const URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/update-new-password`;
  const response = await fetch(URL, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password: encrypt(password),
    }),
  });
  const res = await response.json();
  return res.response;
};

export default changePassword;
