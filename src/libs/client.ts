import { createClient } from 'microcms-js-sdk'; //ES6

// Initialize Client SDK.
export const client = createClient({
  serviceDomain: 'shimabu-blog', // YOUR_DOMAIN is the XXXX part of XXXX.microcms.io
  apiKey: 'SDdcGyZxSQlbBTE0vryx8uadaIZdRaoBM0mM',
});
