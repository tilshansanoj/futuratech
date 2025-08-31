import React, { useEffect, useState } from "react";


export default function Footer() {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
          const userloging = sessionStorage.getItem("isLogin");
          setIsLogin(userloging);
  
      
        }, []);

if (isLogin === "true") {
    return (
<footer className="bg-gray-900 text-white py-1 fixed bottom-0 left-0 w-full">
  <div className="container mx-auto px-4 text-center">
    <p className="text-sm">
      &copy; {new Date().getFullYear()} FuturaTech University. All rights reserved.
    </p>
    
  </div>
</footer>

  )
    }
   else {
    return (
     <footer className="bg-gray-900 text-white py-6 mt-20">
  <div className="container mx-auto px-4 text-center">
    <p className="text-sm">
      &copy; {new Date().getFullYear()} FuturaTech University. All rights reserved.
    </p>
    <div className="mt-2 space-x-4">
      <a href="#about" className="hover:text-blue-400">About Us</a>
      <a href="#courses" className="hover:text-blue-400">Courses</a>
      <a href="#contact" className="hover:text-blue-400">Contact</a>
     
    </div>
  </div>
</footer>
    );
  }
}
