import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase/firebase.git';

const provider = new GoogleAuthProvider();
const AuthProvider = ({children}) => {
      let [user, setUser] = useState(null)

      useEffect(()=>{
        let unsubscribe = onAuthStateChanged(auth, (currentuser)=>{
          setUser(currentuser)
        })
        return ()=> unsubscribe()
      }, [])

    let googleSignIn = ()=>{
        return signInWithPopup(auth, provider)
    }

let authinfo = {
        googleSignIn , 
        user 
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
