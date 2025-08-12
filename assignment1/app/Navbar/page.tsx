import React from 'react';

const Services = () => {
  console.log("Hello from Services");

  return (
    <div className="flex-grow container mx-auto p-4 sm:p-6 md:p-8">
      <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-800 dark:text-gray-100">
        Navbar
      </h1>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md space-y-6">

        {/* personal details */}
        <div>
          <h2 className="text-2xl font-semibold mb-2 text-gray-700 dark:text-gray-200">
            Creator Details
          </h2>
          <p className="text-gray-600 dark:text-gray-300"><strong>Name:</strong> Baqir Al Musawi</p>
          <p className="text-gray-600 dark:text-gray-300"><strong>Student Number:</strong> 21612428</p>
        </div>

        {/* Video walkthrough */}
        <div>
          <h2 className="text-2xl font-semibold mb-2 text-gray-700 dark:text-gray-200">
            How to Use This Website
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            This video provides a walkthrough of the application's features and how to generate code.
          </p>

          {/* Placeholder for video */}
          <div className="aspect-w-16 aspect-h-9 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
            <p className="text-gray-500 dark:text-gray-400">Video placeholder</p>
          </div>
        </div>
      </div>
          </div>
  );
};
export default Services;