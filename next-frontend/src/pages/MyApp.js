import { withAuth0 } from "@auth0/auth0-react";

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default withAuth0(MyApp);
