const checkoutNodeJssdk = require('@paypal/checkout-server-sdk');
import {PAYPAL_CLIENT_ID,PAYPAL_CLIENT_SECRET} from '../config/index'
const environment = () => {
  const clientId =PAYPAL_CLIENT_ID;
  const  clientSecret = PAYPAL_CLIENT_SECRET;
  return new checkoutNodeJssdk.core.SandboxEnvironment(clientId, clientSecret);
};

export const client = () => {return new checkoutNodeJssdk.core.PayPalHttpClient(environment());
};
