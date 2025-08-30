import { useLocation } from "react-router-dom";
import { useEffect } from "react";

import SEO from '@/components/SEO';
import SchemaMarkup from '@/components/SchemaMarkup';
const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <>
      <SEO
        title="404 Not Found - GoodAV"
        description="Sorry, the page you are looking for does not exist. Return to GoodAV homepage."
        canonical={`https://goodav.net${location.pathname}`}
      />
      <SchemaMarkup
        schema={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "404 Not Found",
          "url": `https://goodav.net${location.pathname}`,
          "description": "Sorry, the page you are looking for does not exist. Return to GoodAV homepage."
        }}
      />
      <div className="min-h-screen bg-[#0f1012] flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <img src="" alt="Not-found" />
          <h1 className="text-4xl font-bold mb-4">404</h1>
          <p className="text-xl text-gray-600 mb-4">Oops! Page not found</p>
          <a href="/" className="text-blue-500 hover:text-blue-700 underline">
            Return to Home
          </a>
        </div>
      </div>
    </>
  );
};

export default NotFound;
