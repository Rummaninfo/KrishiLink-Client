import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import { auth } from '../firebase/firebase.git';

const provider = new GoogleAuthProvider();
const AuthProvider = ({children}) => {
      let [user, setUser] = useState(null)
      let [loading, setLoading] = useState(true)

      useEffect(()=>{
        let unsubscribe = onAuthStateChanged(auth, (currentuser)=>{
          setUser(currentuser)
          setLoading(false)
        })
        return ()=> unsubscribe()
      }, [])

    let googleSignIn = ()=>{
        return signInWithPopup(auth, provider)
    }
    let userSignOut = ()=>{
       return signOut(auth)
    }

let authinfo = {
        googleSignIn , 
        user, 
        userSignOut , 
        loading
       }

    return (
        <div>
            <AuthContext value={authinfo}>
                {children}
                </AuthContext> 
        </div>
    );
};

export default AuthProvider;
