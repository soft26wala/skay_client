import React from "react";

const TrustSection = ({ dimg, dname, title, dexperience, reverse }) => {
  return (
    <section className="bg-green-50 dark:bg-gray-800 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div
          className={`flex flex-col md:flex-row items-center gap-8 
          ${reverse ? "md:flex-row-reverse" : ""}`}
        >
          {/* Doctor Image */}
          <div className="flex-shrink-0">
            <img
              src={dimg}
              alt={dname}
              className="rounded-2xl shadow-lg w-48 md:w-60 object-cover"
            />
          </div>

          {/* Text */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-bold mb-3 text-gray-800 dark:text-white">
              {title}
            </h2>

            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {dexperience}
            </p>

            <ul className="space-y-1">
              <li>✓ All PostgreSQL table queries are already written — just connect and use them. </li>
              <li>✓ or the favicon, set your SVG file name to vite.svg and delete or rename the existing one.</li>
              <li>✓ Easy setup — just plug in and enjoy!</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );

};

export default TrustSection;