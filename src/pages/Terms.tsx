import SEO from "../components/SEO";
import LegalModal from "../components/Legal/Legal-modal";
import { termsAndConditions } from "../components/Legal/legaldata";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useState, useRef, useEffect } from "react";
import SchemaMarkup from "../components/SchemaMarkup";

export default function TermsPage() {
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
        title="Terms of Service | GoodAV"
        description="Read the official Terms of Service for GoodAV, compliant with Rwanda law. Learn your rights and obligations as a user."
        keywords="terms of service, legal, GoodAV, Rwanda, audiovisual, user rights"
        canonical="https://goodav.net/terms"
        noindex={false}
        breadcrumbs={[{ name: "Home", url: "/" }, { name: "Terms of Service", url: "/terms" }]}
      />
      <SchemaMarkup
        schema={{
          "@context": "https://schema.org",
          "@type": ["WebPage", "LegalService"],
          "name": "Terms of Service",
          "url": "https://goodav.net/terms",
          "description": "Read the official Terms of Service for GoodAV, compliant with Rwanda law. Learn your rights and obligations as a user.",
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
      <div className="container mx-auto py-10 px-4 max-w-2xl mt-24"
        style={{
          background: "linear-gradient(180deg, rgba(30,30,30,0.98) 0%, rgba(20,20,20,0.96) 100%)",
          borderRadius: "1rem",
          boxShadow: "0 10px 40px -10px rgba(0,0,0,0.6)",
        }}
        aria-label="Terms of Service Section"
      >
        <h1 className="text-3xl font-bold text-orange-500 mb-6">Terms of Service</h1>
        <button
          className="bg-orange-500 text-white px-4 py-2 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-orange-400"
          onClick={() => setIsOpen(true)}
          aria-label="View Terms of Service in Modal"
          ref={closeBtnRef}
        >
          View in Modal
        </button>
        <LegalModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Terms of Service"
          content={termsAndConditions}
        />
        <div className="prose prose-lg text-gray-100">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{termsAndConditions}</ReactMarkdown>
        </div>
        <div className="mt-8 flex flex-col gap-2">
          <a
            href="mailto:legal@goodav.net"
            className="px-4 py-2 bg-orange-500 text-white rounded-lg w-fit focus:outline-none focus:ring-2 focus:ring-orange-400"
            aria-label="Contact Legal Officer"
          >
            Contact for Legal
          </a>
        </div>
      </div>
    </>
  );
}
