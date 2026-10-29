import React from 'react';

const HappyCustomersSection = () => {
  const customers = [
    '/clients/client1.jpg',
    '/clients/client2.jpg',
    '/clients/client3.jpg',
    '/clients/client4.jpg',
    '/clients/client5.jpg',
    '/clients/client6.jpg',
    
  ];

  return (
    <section className="py-12 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
            Trusted by Thousands of Happy Customers
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Real results from real people using our Skay Products
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {customers.map((image, index) => (
            <div key={index} className="relative overflow-hidden rounded-xl shadow-md group">
              <img
                src={image}
                alt={`Happy Customer ${index + 1}`}
                className="w-full h-32 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HappyCustomersSection;