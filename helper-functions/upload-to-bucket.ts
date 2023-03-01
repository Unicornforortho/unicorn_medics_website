import { showNotification } from '@mantine/notifications';
import supabaseClient from '../supabase';

/*
  Uploads the image to the bucket and returns the path to the image
*/
async function uploadToBucket(customerEmail: string, fileName: string, buffer: any) {
  const bucketName = process.env.NEXT_PUBLIC_SUPABASE_BUCKET;
  if (bucketName === undefined) {
    throw new Error('Bucket name not set');
  } else {
    const filePath = `${customerEmail}/${fileName}.png`;
    try {
      const { data, error: uploadError } = await supabaseClient.storage
        .from(bucketName)
        .upload(filePath, buffer);
      if (uploadError) {
        return undefined;
      }
      return data.path;
    } catch (e) {
      showNotification({
        title: 'Error uploading image',
        message: 'Please try again later',
        color: 'red',
        autoClose: true,
      });
    }
  }
  return undefined;
}

export default uploadToBucket;
