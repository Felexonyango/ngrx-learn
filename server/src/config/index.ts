export const IS_PROD = process.env.NODE_ENV === "production";
export const PORT = process.env.PORT || 3000;
export const JWT_SECRET_KEY = `${process.env.JWT_SECRET}`;
export const Access_Key =`${process.env.Access_Key }`;
export const Secret_Access=`${process.env.Secret_Access}`;
export const PAYPAL_CLIENT_SECRET=`${process.env.PAYPAL_CLIENT_SECRET}`;
export const PAYPAL_CLIENT_ID=`${process.env.PAYPAL_CLIENT_ID}`;
export const GOOGLE_WEB_CLIENT_ID=`${process.env.Google_ID}`