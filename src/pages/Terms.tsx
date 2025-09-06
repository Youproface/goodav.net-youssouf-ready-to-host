import React from "react";
import SEO from "../components/SEO";
const LegalModal = React.lazy(() => import("../components/Legal/Legal-modal"));
import { termsAndConditions } from "../components/Legal/legaldata";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useState, useRef, useEffect } from "react";
import SchemaMarkup from "../components/SchemaMarkup";
import "../AppTermsPage.css";
import { 
  generateLegalKeywords,
  generateLegalDescription,
  generateLegalTitle,
  generateLegalStructuredData,
  generateLegalOrganizationStructuredData,
  generateLegalBreadcrumbStructuredData,
  generateLegalFAQStructuredData
} from "../utils/legalSEO";

export default function TermsPage() {
  const [isOpen, setIsOpen] = useState(false);
  const closeBtnRef = useRef(null);
  useEffect(() => {
    if (isOpen && closeBtnRef.current) {
      closeBtnRef.current.focus();
    }
  }, [isOpen]);

  // Generate dynamic SEO data
  const pageId = 'terms';
  const termsTitle = generateLegalTitle(pageId);
  const termsDescription = generateLegalDescription(pageId);
  const termsKeywords = generateLegalKeywords(pageId);
  const termsStructuredData = generateLegalStructuredData(pageId);
  const organizationStructuredData = generateLegalOrganizationStructuredData();
  const breadcrumbStructuredData = generateLegalBreadcrumbStructuredData(pageId);
  const faqStructuredData = generateLegalFAQStructuredData(pageId);

  // Combine structured data
  const combinedStructuredData = [
    termsStructuredData,
    organizationStructuredData,
    breadcrumbStructuredData,
    ...(faqStructuredData ? [faqStructuredData] : [])
  ];

  return (
    <>
      <SEO
        title={termsTitle}
        description={termsDescription}
        keywords={termsKeywords}
        canonical="https://goodav.net/terms"
        schema={combinedStructuredData}
        noindex={false}
        breadcrumbs={[{ name: "Home", url: "/" }, { name: "Terms of Service", url: "/terms" }]}
        openGraph={{
          title: termsTitle,
          description: termsDescription,
          type: 'website',
          url: 'https://goodav.net/terms',
          images: [{
            url: 'https://goodav.net/images/goodav-legal-terms.jpg',
            width: 1200,
            height: 630,
            alt: 'GoodAV Terms of Service - Professional Audiovisual Services Agreement'
          }]
        }}
        twitter={{
          card: 'summary_large_image',
          title: termsTitle,
          description: termsDescription,
          image: 'https://goodav.net/images/goodav-legal-terms.jpg'
        }}
      />
      <div
        className="container mx-auto py-10 px-4 max-w-2xl mt-24 terms-page-container"
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
        <React.Suspense fallback={null}>
          <LegalModal
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            title="Terms of Service"
            content={termsAndConditions}
          />
        </React.Suspense>
        <div className="prose prose-lg text-gray-100">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{termsAndConditions}</ReactMarkdown>
        </div>

        {/* FAQ Section */}
        <div className="mt-12 bg-gray-900/50 rounded-xl p-8 border border-gray-700">
          <h2 className="text-2xl font-bold text-orange-400 mb-6">Terms of Service FAQ</h2>
          <div className="space-y-6">
            <div className="border-b border-gray-700 pb-4">
              <h3 className="text-lg font-semibold text-white mb-2">What services are covered by these terms?</h3>
              <p className="text-gray-300">These terms cover all GoodAV audiovisual services including video production, photography, live streaming, audio production, sound systems, and lighting services.</p>
            </div>
            <div className="border-b border-gray-700 pb-4">
              <h3 className="text-lg font-semibold text-white mb-2">How can I contact GoodAV for legal matters?</h3>
              <p className="text-gray-300">For legal matters, you can contact us at legal@goodav.net or through our general contact information at info@goodav.net.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Are these terms compliant with Rwanda law?</h3>
              <p className="text-gray-300">Yes, our terms of service are designed to comply with Rwanda law and applicable international regulations for our services.</p>
            </div>
          </div>
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
