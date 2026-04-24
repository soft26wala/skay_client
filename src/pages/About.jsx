import React, {useEffect} from "react";

export default function AboutPage() {

  useEffect(() => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }, []);


  return (
    <div className="min-h-screen bg-[url('your-image-url')] bg-cover bg-center relative mt-16 z-10">
      
     <h1>Your About Page created</h1>
      
      <p>Code to create your about page </p>
     
    </div>
  );
}
