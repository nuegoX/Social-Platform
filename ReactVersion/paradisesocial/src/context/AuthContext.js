import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { setDoc, doc } from "firebase/firestore";

const AuthContext = createContext()

export function AuthContextProvider({children}) {
    const [user, setUser] = useState({})

    function signUp(email, password) {
        createUserWithEmailAndPassword(auth, email, password)
        setDoc(doc(db, 'users', email), {
            postCount: 0,
            commentCount: 0,
            role: "User",
        });
        setDoc(doc(db, 'posts', email), {
            id: 8,
            publisher: "HugoAdmin",
            title: "Horrible design is not a thing on this website!",
            description: "uIt's truly good!",
        });
        setDoc(doc(db, 'comments', email), {
            postId: 8,
            publisher: "Critic",
            text: "Here is a comment. Whats up?",
        });
    }
    function logIn(email, password) {
        return signInWithEmailAndPassword(auth, email, password)
    }
    function logOut() {
        return signOut(auth)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
        })
        return () => {
            unsubscribe();
        };
    });

    return (
        <AuthContext.Provider value={{ signUp, logIn, logOut, user }}>
            {children}
        </AuthContext.Provider>
    )
}
export function UserAuth() {
    return useContext(AuthContext)
}