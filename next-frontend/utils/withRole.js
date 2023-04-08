import { useAuth0 } from "@auth0/auth0-react";
import { useRouter } from "next/router";

export default function withRole(role) {
  return function (WrappedComponent) {
    return function () {
      const { user, isLoading } = useAuth0();
      const router = useRouter();

      if (isLoading) {
        return <div>Loading...</div>;
      }

      if (!user) {
        // User is not authenticated, redirect to login page
        router.push("/login");
        return null;
      }

      if (user[process.env.NEXT_PUBLIC_AUTH0_NAMESPACE + "/roles"] !== role) {
        // User does not have the required role, redirect to unauthorized page
        router.push("/unauthorized");
        return null;
      }

      // User has the required role, render the page
      return <WrappedComponent />;
    };
  };
}
