import React, { useEffect } from "react";
import HeroSlider from "../components/Home/HeroSlider";
import CategoryGrid from "../components/Home/CategoryGrid";
import TrustSection from "../components/Home/TrustSection";
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
        <TrustSection
          dimg="/new/hero/trust/trust.png"  // Replace with actual image path
          dname="Cortex Web Solutions"  // Replace with actual name
          title="Mr. Anmolsingh Co founder of Cortex Web Solutions" // Replace with actual title
          dexperience="This product is built with React.js (frontend & dashboard) and Node.js (backend). It includes Razorpay & COD payments, PostgreSQL database, and Cloudinary for image handling. Everything is already set up — just configure the environment variables to get started." // Replace with actual experience

        />

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
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2762.8412882432917!2d73.44479607450093!3d29.659018975119974!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x393d873845407ca7%3A0xa6310eab46f2e97!2sCortex%20web%20solutions!5e1!3m2!1sen!2sin!4v1777008464268!5m2!1sen!2sin"
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
