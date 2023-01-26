import { loginWithEmailAndPassword, logoutFirebase, registerUserWithEmailPassword, signInWithGoogle } from "../../firebase/provider"
import { clearNotesLogout } from "../journal/journalSlice"
import { checkingCredentials, logout, login } from "./"

export const checkingAuthentication = (email, password) => {
    return async (dispatch) => {
        dispatch(checkingCredentials())
    }
}

export const startGoogleSignIn = () => {
    return async (dispatch) => {
        dispatch(checkingCredentials());
        const result = await signInWithGoogle();
        console.log("result Sign In ", result);
        if (!result.ok) return dispatch(logout(result.errorMessage));
        delete result.ok // eliminar la propiedad ok
        dispatch(login(result))
    }
}

export const startCreatingUserWithEmailPassword = ({ email, password, displayName }) => {
    return async (dispatch) => {
        dispatch(checkingCredentials());
        const { ok, uid, photoURL, errorMessage } = await registerUserWithEmailPassword({ email, password, displayName })
        // console.log("resp en tunk", resp)

        if (!ok) return dispatch(logout({ errorMessage }))

        dispatch(login({ uid, displayName, email, photoURL }));
    }
}

export const startLoginWithEmailAndPassword = ({email, password}) => {
    return async (dispatch)=>{
        dispatch(checkingCredentials());
        const resp = await loginWithEmailAndPassword({email, password});
        console.log(resp)

        if(!resp.ok) return dispatch(logout(resp))

        dispatch(login(resp));
    }
}
export const startLogout = () =>{
    return async (dispatch) =>{
        await logoutFirebase();
        dispatch(clearNotesLogout())
        dispatch(logout());
    }
}

