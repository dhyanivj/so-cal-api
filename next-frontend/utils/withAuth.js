import { withAuth0, useAuth0 } from "@auth0/auth0-react";
import { useRouter } from "next/router";

function withAuth(Component) {
  function AuthenticatedComponent(props) {
    const { isAuthenticated, isLoading } = useAuth0();
    const router = useRouter();

    if (!isAuthenticated && !isLoading) {
      router.push("/");
      return null;
    }

    return <Component {...props} />;
  }

  return withAuth0(AuthenticatedComponent);
}

export default withAuth;
