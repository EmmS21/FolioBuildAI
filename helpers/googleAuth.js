import React, { useEffect } from "react";
import { auth } from "../firebaseClient";
import { useRouter } from "next/router";
import {
    GoogleAuthProvider, 
    signInWithRedirect, 
    getRedirectResult,
} from "firebase/auth"

export const signInWithGoogle = async () => {
    try {
        const provider = new GoogleAuthProvider();
        await signInWithRedirect(auth, provider);
    } catch (error) {
        console.error("Error signing in with Google", error);
        throw error
    }
};

const GoogleSignInRedirect = () => {
    const router = useRouter();
    useEffect(() => {
        const handleRedirect = async () => {
            try {
                const result = await getRedirectResult(auth);
                if(result.user) {
                    router.push("/dashboard");
                } else {
                    console.log("User not logged in.");
                }
            } catch(error) {
                console.error("Error handling redirect", error);
            }
        }
        handleRedirect();
    }, []);
    return <></>;
}

export default GoogleSignInRedirect;

