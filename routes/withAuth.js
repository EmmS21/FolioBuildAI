import { useRouter } from "next/router";
import { useEffect } from "react";
import { auth } from "../firebaseClient";

const withAuth = (Component) => {
  const AuthenticatedComponent = (props) => {
    const router = useRouter();

    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        if (!user) {
          router.push("/");
        }
      });

      return () => unsubscribe();
    }, []);

    return <Component {...props} />;
  };

  return AuthenticatedComponent;
};

export default withAuth;
