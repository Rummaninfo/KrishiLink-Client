import React, { use } from 'react';
import Navbar from '../Component/Navbar';
import { Outlet } from 'react-router';
import Footer from '../Component/Footer';
import Banner from '../Pages/Banner';
import { AuthContext } from '../Context/AuthContext';
import { Atom } from 'react-loading-indicators';

const MainLayout = () => {
    // let {loading} = use(AuthContext)
    // if(loading){
    //     return(
    //        <div className="flex justify-center items-center min-h-screen">
    //                 <Atom color="#32cd32" size="medium" text="" textColor="" />
    //               </div> 
    //     )
    // }
    return (
        <div className='flex flex-col min-h-screen'>
            <header>
               <div className=''>
                 <Navbar></Navbar>
               </div>
                
            </header>
            
            <main className=' bg-[#e1fade] flex-1 '>
               <div className='container mx-auto '> 
                
                <Outlet></Outlet>
                </div> 
            </main>
            <footer>
              
                    <Footer></Footer>
            
            </footer>
           
        </div>
    );
};

export default MainLayout;