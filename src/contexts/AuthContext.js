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
import { doc, getDoc, setDoc, collection, updateDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}


export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();
    const [userData, setUserData] = useState("");
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    function signup(email, password){
       return createUserWithEmailAndPassword(auth, email, password);
    }


    async function login(email, password){
        await signInWithEmailAndPassword(auth, email, password)
            .then(async (result) => {
                // const credential = GoogleAuthProvider.credentialFromResult(result);
                // const token = credential.accessToken;
                const userID = currentUser.uid;
                const usersRef = collection(db, "users");
                const singleUserRef = doc(db, "users", userID);
                let userSnap = await getDoc(singleUserRef);
                if(userSnap.exists()){
                    await updateDoc(singleUserRef, {lastLogin: new Date()});
                }
                else{
                    await setDoc(doc(usersRef, userID), {
                        email: currentUser.email,
                        firstName: "",
                        trip: [],
                        lastLogin: new Date(),
                })}
            }).catch((err) => {return err.message});
            navigate("/");
     }

    async function googleLogin(){
        await signInWithPopup(auth, googleProvider)
            .then(async (result) => {
                // const credential = GoogleAuthProvider.credentialFromResult(result);
                // const token = credential.accessToken;
                const userID = currentUser.uid;
                const usersRef = collection(db, "users");
                const singleUserRef = doc(db, "users", userID);
                let userSnap = await getDoc(singleUserRef);
                if(userSnap.exists()){
                    await updateDoc(singleUserRef, {lastLogin: new Date()});
                }
                else{
                    await setDoc(doc(usersRef, userID), {
                        email: currentUser.email,
                        firstName: "",
                        trip: [],
                        lastLogin: new Date(),
                })}
            }).catch((err) => {
                return err.message;
            })
            navigate("/")
    }

    function logout(){
        signOut(auth);
    }

    function resetPassword(email){
        return sendPasswordResetEmail(auth, email);
    }

    async function lookupUserDetails(currentUser){
        const userID = await currentUser.uid;
        const usersRef = collection(db, "users");
        const singleUserRef = doc(db, "users", userID);
        let userSnap = await getDoc(singleUserRef);
        if(userSnap.exists()){
            await updateDoc(singleUserRef, {lastActivity: new Date()});
            setUserData(userSnap.data());
            return userSnap.data()
        }
        else{
            await setDoc(doc(usersRef, userID), {
                email: currentUser.email,
                firstName: "",
                trip: [],
                lastLogin: new Date(),
                lastActivity: new Date(),
        })
            userSnap = await getDoc(singleUserRef);
            setUserData(userSnap.data());
            return userSnap.data();
        }
    }

    async function updateUserDetails(userUpdate){
        const userID = await currentUser.uid;
        const singleUserRef = doc(db, "users", userID);
        await updateDoc(singleUserRef, userUpdate);
        let userSnap = await getDoc(singleUserRef);
        setUserData(userSnap.data());
        return userSnap.data(); 
    }



    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            async function setupUser(currentUser){
                await lookupUserDetails(currentUser);
            }
            if(currentUser !== null & currentUser !== undefined && currentUser.uid){
                setupUser(user);
            }
            setLoading(false);
        })

        return unsubscribe;
    }, [currentUser])

    const value = {
        currentUser,
        userData,
        login,
        logout,
        signup, 
        resetPassword, 
        googleLogin,
        lookupUserDetails,
        updateUserDetails,
    }
    return(
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}