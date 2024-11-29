import { onRequest } from 'firebase-functions/v2/https';
import * as logger from 'firebase-functions/logger';

export const fetchSetagayaAvailability = onRequest(
  {
    cors: process.env.IS_LOCAL ? '*' : process.env.CORS_URL?.split(', '),
  },
  (request, response) => handler(request, response)
);

const handler = (request: any, response: any) => {
  console.log('req', request?.body);
  const html = 'hello from fetchSetagayaAvailability';
  logger.info(html, { structuredData: true });
  return response.send(html);
};
