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
        title="404 Not Found - GoodAV | Rwanda, Africa, Documentary, Kigali Convention Center, Visit Rwanda"
        description="Sorry, the page you are looking for does not exist. Return to GoodAV homepage. GoodAV is your trusted audiovisual partner for Rwanda, Africa, documentary, conferences, tourism, Kigali Convention Center, Visit Rwanda, Kwita Izina gorilla naming, Rwanda visa, national parks, and more."
        keywords="404, not found, GoodAV, Rwanda, Africa, documentary, Kigali Convention Center, Visit Rwanda, conference in Rwanda, Kwita Izina, gorilla naming, Rwanda visa, Rwandan national park, Rwanda Convention Bureau, audiovisual industry Rwanda, Trust Partner Rwanda, event media coverage, video production Rwanda, live streaming Rwanda, tourism Rwanda, international conference Rwanda, creative economy Rwanda, NGO storytelling Rwanda, African creative industries, cultural preservation Rwanda, pan-African media agency, impact storytelling Rwanda, professional media coverage, global events Rwanda, tourism investment Rwanda, e-learning Rwanda, documentary filmmaking Rwanda, branding Rwanda, high-quality video editing, media production Rwanda, creative direction Rwanda, audiovisual innovation Rwanda"
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
