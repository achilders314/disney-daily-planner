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
import { auth, googleProvider, rtdb, app } from '../firebase-config';
import { ref, set, get, update, child, getDatabase } from 'firebase/database';
import { useNavigate } from 'react-router-dom';

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}


export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();
    const [userData, setUserData] = useState('');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    function signup(email, password) {
        return createUserWithEmailAndPassword(auth, email, password);
    }


    async function login(email, password) {
        await signInWithEmailAndPassword(auth, email, password)
            .then(async (result) => {
                // const credential = GoogleAuthProvider.credentialFromResult(result);
                // const token = credential.accessToken;
                const userID = currentUser.uid;
                const dbref = ref(rtdb);
                await get(child(dbref, `users/${userID}`)).then((userSnap) => {
                    const updates = {}
                    updates[`users/${userID}/lastLogin`] = new Date();
                    if (userSnap.exists()) {
                        update(dbref, updates);
                    }
                    else {
                        set(ref(rtdb, `users/${userID}`), {
                            email: currentUser.email,
                            firstName: "",
                            trip: [],
                            lastLogin: new Date(),
                        })
                    }
                    navigate("/");
                })
            }).catch((err) => { return err.message });
    }

    async function googleLogin() {
        await signInWithPopup(auth, googleProvider)
            .then(async (result) => {
                // const credential = GoogleAuthProvider.credentialFromResult(result);
                // const token = credential.accessToken;
                const userID = currentUser.uid;
                const dbref = ref(rtdb);
                await get(child(dbref, `users/${userID}`)).then((userSnap) => {
                    const updates = {}
                    updates[`users/${userID}/lastLogin`] = new Date();
                    if (userSnap.exists()) {
                        update(dbref, updates);
                    }
                    else {
                        set(ref(rtdb, `users/${userID}`), {
                            email: currentUser.email,
                            firstName: "",
                            trip: [],
                            lastLogin: new Date(),
                        })
                    }
                    navigate("/");
                })
            }).catch((err) => {
                return err.message;
            })
    }

    function logout() {
        signOut(auth);
    }

    function resetPassword(email) {
        return sendPasswordResetEmail(auth, email);
    }

    async function lookupUserDetails() {
        const userID = await currentUser.uid;
        const userRef = child(ref(getDatabase(app)), `/users/${userID}`)
        let userInfo;

        await get(userRef).then((userSnap) => {
            if (userSnap.exists()) {
                setUserData({ ...userSnap.val() });
                userInfo = userSnap.val();
            }
            else {
                const newUser = {
                    email: currentUser.email,
                    firstName: "",
                    trip: [{
                        tripEnd: "",
                        tripStart: "",
                    }],
                    lastLogin: new Date(),
                    lastActivity: new Date(),
                }
                set(ref(rtdb, `users/${userID}`), newUser)
                setUserData({ ...newUser })
                userInfo = newUser;
            }
        }).catch((err) => console.log(err.message))
        return userInfo;
    }

    //used throughout the app when user needs to perform a CRUD operation on their selections in Firebase.
    async function updateUserDetails(userUpdate) {
        const userID = currentUser.uid;
        const dbref = ref(rtdb)
        const userRef = child(ref(getDatabase(app)), `/users/${userID}`)
        await update(dbref, userUpdate).catch((err) => console.log(err))
        await get(userRef).then((userSnap) => {
            setUserData(userSnap.val());
            return userSnap.val();
        }).catch((err) => console.log(err))
    }



    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setLoading(true)
            setCurrentUser(user);
            async function setupUser() {
                await lookupUserDetails();
            }
            if (user !== undefined && currentUser !== undefined && currentUser !== null && currentUser.uid) {
                setupUser();
                setLoading(false);
            }
            else{
                setLoading(false);
            }
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
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}