import React from 'react';

const CaseStudies: React.FC = () => {
  console.log('CaseStudies component is rendering - BASIC VERSION');
  
  return (
    <div className="bg-red-500 text-white p-8 m-8 min-h-screen">
      <h1 className="text-4xl">BASIC CASE STUDIES PAGE</h1>
      <p>If you can see this, the component is working</p>
      <p>Check the console for the log message</p>
    </div>
  );
};

export default CaseStudies;
