import { Auth0Provider } from "@auth0/auth0-react";
import { authConfig } from "../auth0-config";

function MyApp({ Component, pageProps }) {
  return (
    <Auth0Provider
      domain={authConfig.domain}
      clientId={authConfig.clientId}
      redirectUri={typeof window !== "undefined" && window.location.origin}
    >
      <Component {...pageProps} />
    </Auth0Provider>
  );
}

export default MyApp;
