import React from 'react';

const ClinicTeamSection = () => {
  const images = [
    { src: '/officepic/IMG_3313.jpg', label: 'Ayurvedic Specialist' },
    { src: '/officepic/IMG_3310.jpg', label: 'Clinic Interior' },
    { src: '/officepic/IMG_3314.jpg', label: 'Ayurvedic Specialist' },
    { src: '/officepic/IMG_3317.jpg', label: 'Treatment Room' },
    { src: '/officepic/IMG_3318.jpg', label: 'Natural Environment' },
    { src: '/officepic/IMG_3321.jpg', label: 'Our Team' },
    { src: '/officepic/IMG_3322.jpg', label: 'Experienced Doctor' },
    // { src: '/clinic/staff4.jpg', label: 'Wellness Expert' },
    // { src: '/clinic/clinic4.jpg', label: 'Clinic Exterior' },
  ];

  return (
    <section className="py-12 bg-green-50 dark:bg-gray-800">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
            Inside Our Ayurvedic Clinic
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Meet our experienced team and explore our natural healing environment
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {images.map((image, index) => (
            <div key={index} className="relative overflow-hidden rounded-xl shadow-md group">
              <img
                src={image.src}
                alt={image.label}
                className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white text-lg font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {image.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClinicTeamSection;