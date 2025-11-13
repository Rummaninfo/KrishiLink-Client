import React, { use } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { Navigate, useLocation,  } from 'react-router';
import { Atom } from 'react-loading-indicators';


const Privatepage = ({children}) => {
    let {user, loading} = use(AuthContext)
    let location = useLocation()

    if(loading){
        return (
             <div className="flex justify-center items-center min-h-screen">
                    <Atom color="#32cd32" size="medium" text="" textColor="" />
                  </div>
        )
        
    }
    if(!user){
        return <Navigate state={{from:location}} replace to='/register'></Navigate>
    }
    return children
};

export default Privatepage;