// sanity.js

import { createClient } from '@sanity/client';

const sanityClient = createClient({
  projectId: 'eo3yixtt',
  dataset: 'production',
  useCdn: true,
});

export default sanityClient;
