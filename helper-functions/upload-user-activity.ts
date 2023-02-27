const uploadUserActivity = async (
  customerId: string,
  supabaseURL: string,
  prediction: any,
  confidence: number,
) => {
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
      confidence,
    }),
  });
  const res = await response.json();
  return res.response;
};

export default uploadUserActivity;
