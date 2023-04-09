import "@/styles/globals.css";

import { Auth0Provider } from "@auth0/auth0-react";

export default function App({ Component, pageProps }) {
  return (
    <Auth0Provider
      domain="sleepingowls.us.auth0.com"
      clientId="XhW0cVDhZNTFZSk2FroEe0bm0RZix4zB"
      redirectUri={typeof window !== "undefined" && window.location.origin}
    >
      <Component {...pageProps} />
    </Auth0Provider>
  );
}
