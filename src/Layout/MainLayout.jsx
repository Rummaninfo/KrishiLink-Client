import React from 'react';
import Navbar from '../Component/Navbar';
import { Outlet } from 'react-router';
import Footer from '../Component/Footer';
import Banner from '../Pages/Banner';

const MainLayout = () => {
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