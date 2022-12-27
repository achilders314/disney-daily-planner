import { 
    createUserWithEmailAndPassword, 
    onAuthStateChanged, 
    signInWithEmailAndPassword, 
    signOut, 
    sendPasswordResetEmail, 
    signInWithPopup,
    // GoogleAuthProvider
} from 'firebase/auth';
import React, { useContext, useEffect, useState } from 'react';
import { auth, googleProvider } from '../firebase-config';
import { useNavigate } from 'react-router-dom';

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    function signup(email, password){
       return createUserWithEmailAndPassword(auth, email, password);
    }


    function login(email, password){
        return signInWithEmailAndPassword(auth, email, password);
     }

    function googleLogin(){
        signInWithPopup(auth, googleProvider)
            .then((result) => {
                // const credential = GoogleAuthProvider.credentialFromResult(result);
                // const token = credential.accessToken;
                const user = result.user;
                navigate("/")

            }).catch((err) => {
                return err.message;
            })
    }

    function logout(){
        signOut(auth);
    }

    function resetPassword(email){
        return sendPasswordResetEmail(auth, email);
    }


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);
        })

        return unsubscribe;
    }, [])

    const value = {
        currentUser,
        login,
        logout,
        signup, 
        resetPassword, 
        googleLogin
    }
    return(
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}