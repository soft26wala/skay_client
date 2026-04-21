import React, { useEffect } from "react";
import HeroSlider from "../components/Home/HeroSlider";
import CategoryGrid from "../components/Home/CategoryGrid";
import DoctorTrustSection from "../components/Home/DoctorTrustSection";
// import HappyCustomersSection from "../components/Home/HappyCustomersSection";
import ClinicTeamSection from "../components/Home/ClinicTeamSection";
import ProductSlider from "../components/Home/ProductSlider";
import FeatureSection from "../components/Home/FeatureSection";
import NewsletterSection from "../components/Home/NewsletterSection";
import { useSelector } from "react-redux";
import FeaturesSectionWay from "../components/Layout/FeaturesSectionWay";


const Index = () => {
  
   useEffect(() => {
   window.scrollTo(0, 0);
 }, []);

  const { topRatedProducts, newProducts } = useSelector(
    (state) => state.product
  );
  return (
    <div className="min-h-screen">
      <HeroSlider />
      <div className="container mx-auto px-4 pt-20">
        <CategoryGrid />
        <DoctorTrustSection 
          dimg="/officepic/IMG_3313.jpg"
          dname="Dr. Jaswinder Singh Rajsthani"
          title="Vade Jaswinder Singh Rajsthani"
          dexperience="Our expert Ayurvedic doctor has been helping patients naturally with safe and effective herbal treatments for over 35 years."
          
        />
        {/* <DoctorTrustSection 
          dimg="/about/jas2.png"
          dname="Dr. Rajesh Kumar"
          title="Trusted Ayurvedic Doctor with 35+ Years of Experience"
          dexperience="Our expert Ayurvedic doctor has been helping patients naturally with safe and effective herbal treatments for over 35 years."
          reverse={true}

        /> */}
        {/* <HappyCustomersSection /> */}

        <ClinicTeamSection />


        {newProducts.length > 0 && (
          <ProductSlider title="New Arrivals" products={newProducts} />
        )}
        {topRatedProducts.length > 0 && (
          <ProductSlider
            title="Top Rated Products"
            products={topRatedProducts}
          />
        )}
        <FeatureSection />
        <FeaturesSectionWay />
        <NewsletterSection />
        <iframe
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d372.27926543410337!2d75.49331886195283!3d31.346174701917242!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391a4f00432e5921%3A0x80f0f962e61eb435!2sAnant%20Ayurveda%20mand%20jalandhar!5e1!3m2!1sen!2sin!4v1776347323088!5m2!1sen!2sin"
  width="100%"
  height="300"
  style={{ border: 0 }}
  allowFullScreen=""
  loading="lazy"
  referrerPolicy="no-referrer-when-downgrade"
></iframe>

      </div>
    </div>
  );
};

export default Index;
