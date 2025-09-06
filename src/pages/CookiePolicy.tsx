import React from "react";
import SEO from "../components/SEO";
const LegalModal = React.lazy(() => import("../components/Legal/Legal-modal"));
import { cookiePolicy } from "../components/Legal/legaldata";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useState, useRef, useEffect } from "react";
import SchemaMarkup from "../components/SchemaMarkup";
import "../AppCookiePolicy.css";

export default function CookiePolicyPage() {
  const [isOpen, setIsOpen] = useState(false);
  const closeBtnRef = useRef(null);
  useEffect(() => {
    if (isOpen && closeBtnRef.current) {
      closeBtnRef.current.focus();
    }
  }, [isOpen]);

  return (
    <>
      <SEO
        title="Cookie Policy | GoodAV | Rwanda, Africa, Documentary, Kigali Convention Center, Visit Rwanda"
        description="Read the official Cookie Policy for GoodAV, compliant with Rwanda law. Learn how we use cookies and protect your privacy. GoodAV is your trusted audiovisual partner for Rwanda, Africa, documentary, conferences, tourism, Kigali Convention Center, Visit Rwanda, Kwita Izina gorilla naming, Rwanda visa, national parks, and more."
        keywords="cookie policy, privacy, GoodAV, Rwanda, Africa, documentary, Kigali Convention Center, Visit Rwanda, conference in Rwanda, Kwita Izina, gorilla naming, Rwanda visa, Rwandan national park, Rwanda Convention Bureau, audiovisual industry Rwanda, Trust Partner Rwanda, event media coverage, video production Rwanda, live streaming Rwanda, tourism Rwanda, international conference Rwanda, creative economy Rwanda, NGO storytelling Rwanda, African creative industries, cultural preservation Rwanda, pan-African media agency, impact storytelling Rwanda, professional media coverage, global events Rwanda, tourism investment Rwanda, e-learning Rwanda, documentary filmmaking Rwanda, branding Rwanda, high-quality video editing, media production Rwanda, creative direction Rwanda, audiovisual innovation Rwanda"
        canonical="https://goodav.net/cookie-policy"
        noindex={false}
        breadcrumbs={[{ name: "Home", url: "/" }, { name: "Cookie Policy", url: "/cookie-policy" }]}
      />
      <SchemaMarkup
        schema={{
          "@context": "https://schema.org",
          "@type": ["WebPage", "LegalService"],
          "name": "Cookie Policy",
          "url": "https://goodav.net/cookie-policy",
          "description": "Read the official Cookie Policy for GoodAV, compliant with Rwanda law. Learn how we use cookies and protect your privacy.",
          "provider": {
            "@type": "Organization",
            "name": "GoodAV",
            "url": "https://goodav.net"
          },
          "areaServed": "RW",
          "datePublished": "2025-09-01",
          "inLanguage": "en"
        }}
      />
      <div
        className="container mx-auto py-10 px-4 max-w-2xl mt-24 cookie-policy-container"
        aria-label="Cookie Policy Section"
      >
        <h1 className="text-3xl font-bold text-orange-500 mb-6">Cookie Policy</h1>
        <button
          className="bg-orange-500 text-white px-4 py-2 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-orange-400"
          onClick={() => setIsOpen(true)}
          aria-label="View Cookie Policy in Modal"
          ref={closeBtnRef}
        >
          View in Modal
        </button>
        <React.Suspense fallback={null}>
          <LegalModal
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            title="Cookie Policy"
            content={cookiePolicy}
          />
        </React.Suspense>
        <div className="prose prose-lg text-gray-100">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{cookiePolicy}</ReactMarkdown>
        </div>
        <div className="mt-8 flex flex-col gap-2">
          <a
            href="mailto:privacy@goodav.net"
            className="px-4 py-2 bg-orange-500 text-white rounded-lg w-fit focus:outline-none focus:ring-2 focus:ring-orange-400"
            aria-label="Contact Privacy Officer"
          >
            Contact for Privacy
          </a>
        </div>
      </div>
    </>
  );
}
