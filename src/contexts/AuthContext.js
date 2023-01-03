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
import { auth, googleProvider, db } from '../firebase-config';
import { doc, getDoc, setDoc, collection } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
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

    async function lookupUserDetails(currentUser){
        const userID = currentUser.uid;
        const usersRef = collection(db, "users");
        const singleUserRef = doc(db, "users", userID);
        let userSnap = await getDoc(singleUserRef);
        if(userSnap.exists()){
            return userSnap.data();
        }
        else{
            await setDoc(doc(usersRef, userID), {
                email: currentUser.email,
                firstName: "",
                trip: [],
        })
            userSnap = await getDoc(singleUserRef);
            return userSnap.data(); 
        }
    }

    // async function updateUserDetails(currentUser){
    //     const userID = currentUser.uid;
    //     const usersRef = collection(db, "users");
    //     const singleUserRef = doc(db, "users", userID);
    //     let userSnap = await getDoc(singleUserRef);
    //     if(userSnap.exists()){
    //         return userSnap.data();
    //     }
    //     else{
    //         await setDoc(doc(usersRef, userID), {
    //             email: currentUser.email,
    //             firstName: "",
    //             trip: [],
    //     })
    //         userSnap = await getDoc(singleUserRef);
    //         return userSnap.data(); 
    //     }
    // }


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
        googleLogin,
        lookupUserDetails,
    }
    return(
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}