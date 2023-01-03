import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { FirebaseAuth } from "./config";

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(FirebaseAuth, googleProvider);
        //VER TOKEN
        const credentials = GoogleAuthProvider.credentialFromResult(result);
        console.log(credentials)
        const user = result.user;
        console.log("user:", user)

        const { displayName, email, photoURL, uid } = result.user

        return {
            ok: true,
            //user Info
            displayName, email, photoURL, uid
        }

    } catch (error) {
        console.log(error)
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);

        return {
            ok: false,
            errorCode, errorMessage, credential
        }
    }
}

export const registerUserWithEmailPassword = async ({ email, password, displayName }) => {
    try {
        //Funciond e firebase
        const resp = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
        console.log(resp)
        const { uid, photoURL } = resp.user;

        //TODO: actualizar displayName en firebase
        //El current user se obtiene al crearse
        await updateProfile(FirebaseAuth.currentUser, {
            displayName,
        })

        return {
            ok: true,
            uid, photoURL, email, displayName
        }

    } catch (error) {
        console.log("Error", error)
        return { ok: false, errorMessage: error.message }
    }
}

export const loginWithEmailAndPassword = async ({email, password}) => {
    try{
        const resp = await signInWithEmailAndPassword(FirebaseAuth, email, password)
        console.log(resp)
        const {uid, photoURL, displayName}=resp.user;
        return {
            ok:true,
            uid, photoURL, displayName
        }
    }catch(error){
        console.log("Error Login", error)
        return {ok: false, errorMessage: "No encontrado"}
        // return {ok: false, errorMessage: error.errorMessage}
    }
}

export const logoutFirebase = async()=>{
    return await FirebaseAuth.signOut();
    //Cierra google email o cualquier autenticacion
}