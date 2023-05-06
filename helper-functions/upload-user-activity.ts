/*
  Uploads user activity to the database including the image URL, prediction made and confidence.
*/
const uploadUserActivity = async (customerId: string, supabaseURL: string, prediction: any) => {
  const URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/customer-activity/add-user-activity`;
  const response = await fetch(URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      customerId,
      uploadedImageURL: supabaseURL,
      predictionMade: prediction,
    }),
  });
  const res = await response.json();
  alert(JSON.stringify(res, null, 2));
  return res.response;
};

export default uploadUserActivity;
