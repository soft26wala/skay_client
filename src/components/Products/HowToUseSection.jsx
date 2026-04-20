import React from 'react';

const HowToUseSection = ({ steps }) => {
  if (!steps || steps.length === 0) return null;

  return (
    <section className="py-12 bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-8">
          How to Use
        </h2>

        <div className="space-y-8">
          {steps.map((step, index) => {
            const hasImage = step.img && step.img.trim() !== "";

            return (
              <div
                key={index}
                className="flex flex-col md:flex-row items-center gap-6"
              >
                {hasImage ? (
                  <>
                    {index % 2 === 0 ? (
                      <>
                        <div className="w-full md:w-1/2">
                          <img
                            src={step.img}
                            alt={step.title}
                            className="w-full h-48 object-cover rounded-xl shadow hover:scale-105 transition"
                          />
                        </div>

                        <div className="flex-1 text-center md:text-left">
                          <StepContent step={step} index={index} />
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex-1 text-center md:text-right">
                          <StepContent step={step} index={index} />
                        </div>

                        <div className="w-full md:w-1/2">
                          <img
                            src={step.img}
                            alt={step.title}
                            className="w-full h-48 object-cover rounded-xl shadow hover:scale-105 transition"
                          />
                        </div>
                      </>
                    )}
                  </>
                ) : (
                  <div className="w-full text-center">
                    <StepContent step={step} index={index} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// 🔥 reusable component
const StepContent = ({ step, index }) => (
  <>
    <div className="inline-flex items-center justify-center w-12 h-12 bg-green-500 text-white rounded-full font-bold mb-3">
      {index + 1}
    </div>

    <h3 className="text-xl font-semibold mb-2">
      {step.title}
    </h3>

    <p className="text-gray-600">
      {step.description}
    </p>
  </>
);

export default HowToUseSection;