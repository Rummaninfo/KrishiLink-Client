import React, { use, useEffect, useState } from "react";
import Navbar from "../Component/Navbar";
import { Outlet, useLocation } from "react-router";
import Footer from "../Component/Footer";
import Banner from "../Pages/Banner";
import { AuthContext } from "../Context/AuthContext";
import { Atom } from "react-loading-indicators";

const MainLayout = () => {
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setLoading(true);
    let timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen">
      <header>
        <div className="">
          <Navbar></Navbar>
        </div>
      </header>

      <main className=" bg-[#e1fade] flex-1 ">
        {
            loading? (
                <div className="flex justify-center items-center min-h-screen">
                                    <Atom color="#32cd32" size="medium" text="" textColor="" />
                                  </div>
            )
            
            
            :
            <div className="container mx-auto ">
          <Outlet></Outlet>
        </div>

            
            

        }
      </main>
      <footer>
        <Footer></Footer>
      </footer>
    </div>
  );
};

export default MainLayout;
