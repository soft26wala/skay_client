import React, { useState, useEffect } from 'react';
import './LoadingPage.css'; // Apni CSS file ka path yahan dein

const LoadingPage = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Aap is effect ka upyog karke loading state ko simulate kar sakte hain ya API call ke poora hone ka intezaar kar sakte hain
  useEffect(() => {
    // udaharan ke liye, 3 second baad loading state ko false par set karen
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    // cleanup function timer ko clear karne ke liye agar component unmount ho jaata hai
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`loading-page ${isLoading ? '' : 'fade-out'}`}>
      <div className="loading-content">
        <img src="path/to/anant_ayurveda_logo.png" alt="Anant Ayurveda Logo" className="loading-logo" />
        <h1 className="loading-name">Anant Ayurveda</h1>
        <div className="loading-spinner"></div>
      </div>
    </div>
  );
};

export default LoadingPage;