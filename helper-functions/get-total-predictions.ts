/*
  This function counts the number of user uploads.
*/
const getUploads = async () => {
  const URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/user-stats/get-total-uploads`;
  const response = await fetch(URL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const res = await response.json();
  return res.count;
};

export default getUploads;
