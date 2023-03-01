import crypto from 'crypto';

const IV_LENGTH = 16;
const ENCODING = 'hex';
const ALGORITHM = process.env.NEXT_PUBLIC_ENCRYPTION_ALGORITHM!;
const KEY = process.env.NEXT_PUBLIC_ENCRYPTION_KEY!;

/*
  Encrypts the password
*/
export const encrypt = (data: string) => {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(ALGORITHM, Buffer.from(KEY), iv);
  return Buffer.concat([cipher.update(data), cipher.final(), iv]).toString(ENCODING);
};

/*
  Decrypts the password
*/
export const decrypt = (data: string) => {
  const binaryData = Buffer.from(data, ENCODING);
  const iv = binaryData.subarray(-IV_LENGTH);
  const encryptedData = binaryData.subarray(0, binaryData.length - IV_LENGTH);
  const decipher = crypto.createDecipheriv(ALGORITHM, Buffer.from(KEY), iv);
  return Buffer.concat([decipher.update(encryptedData), decipher.final()]).toString();
};
