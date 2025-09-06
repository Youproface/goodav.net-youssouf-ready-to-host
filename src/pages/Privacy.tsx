import React from "react";
import SEO from "../components/SEO";
const LegalModal = React.lazy(() => import("../components/Legal/Legal-modal"));
import { privacyPolicy } from "../components/Legal/legaldata";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useState, useRef, useEffect } from "react";
import SchemaMarkup from "../components/SchemaMarkup";
import "../AppPrivacyPolicy.css";
import { 
  generateLegalKeywords,
  generateLegalDescription,
  generateLegalTitle,
  generateLegalStructuredData,
  generateLegalOrganizationStructuredData,
  generateLegalBreadcrumbStructuredData,
  generateLegalFAQStructuredData
} from "../utils/legalSEO";

export default function PrivacyPage() {
  const [isOpen, setIsOpen] = useState(false);
  const closeBtnRef = useRef(null);

  // Accessibility: focus trap for modal
  useEffect(() => {
    if (isOpen && closeBtnRef.current) {
      closeBtnRef.current.focus();
    }
  }, [isOpen]);

  // Generate dynamic SEO data
  const pageId = 'privacy';
  const privacyTitle = generateLegalTitle(pageId);
  const privacyDescription = generateLegalDescription(pageId);
  const privacyKeywords = generateLegalKeywords(pageId);
  const privacyStructuredData = generateLegalStructuredData(pageId);
  const organizationStructuredData = generateLegalOrganizationStructuredData();
  const breadcrumbStructuredData = generateLegalBreadcrumbStructuredData(pageId);
  const faqStructuredData = generateLegalFAQStructuredData(pageId);

  // Combine structured data
  const combinedStructuredData = [
    privacyStructuredData,
    organizationStructuredData,
    breadcrumbStructuredData,
    ...(faqStructuredData ? [faqStructuredData] : [])
  ];

  return (
    <>
      <SEO
        title={privacyTitle}
        description={privacyDescription}
        keywords={privacyKeywords}
        canonical="https://goodav.net/privacy"
        schema={combinedStructuredData}
        noindex={false}
        breadcrumbs={[{ name: "Home", url: "/" }, { name: "Privacy Policy", url: "/privacy" }]}
        openGraph={{
          title: privacyTitle,
          description: privacyDescription,
          type: 'website',
          url: 'https://goodav.net/privacy',
          images: [{
            url: 'https://goodav.net/images/goodav-legal-privacy.jpg',
            width: 1200,
            height: 630,
            alt: 'GoodAV Privacy Policy - Data Protection and GDPR Compliance'
          }]
        }}
        twitter={{
          card: 'summary_large_image',
          title: privacyTitle,
          description: privacyDescription,
          image: 'https://goodav.net/images/goodav-legal-privacy.jpg'
        }}
      />
      <div
        className="container mx-auto py-10 px-4 max-w-2xl mt-24 privacy-policy-container"
      >
        <h1 className="text-3xl font-bold text-orange-500 mb-6">Privacy Policy</h1>
        <div className="mb-6 bg-orange-50 border-l-4 border-orange-500 p-4 rounded-lg text-gray-900">
          <strong>Summary:</strong> GoodAV is committed to protecting your privacy and personal data. We comply with GDPR and CCPA, never sell your data, and you can contact us at <a href="mailto:privacy@goodav.net" className="underline text-orange-600">privacy@goodav.net</a> for any privacy concerns.
        </div>
        <button
          className="bg-orange-500 text-white px-4 py-2 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-orange-400"
          onClick={() => setIsOpen(true)}
          aria-label="View Privacy Policy in Modal"
          ref={closeBtnRef}
        >
          View in Modal
        </button>
        <React.Suspense fallback={null}>
          <LegalModal
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            title="Privacy Policy"
            content={privacyPolicy}
          />
        </React.Suspense>
        <div className="prose prose-lg text-gray-100">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{privacyPolicy}</ReactMarkdown>
        </div>

        {/* FAQ Section */}
        <div className="mt-12 bg-gray-900/50 rounded-xl p-8 border border-gray-700">
          <h2 className="text-2xl font-bold text-orange-400 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="border-b border-gray-700 pb-4">
              <h3 className="text-lg font-semibold text-white mb-2">What personal data does GoodAV collect?</h3>
              <p className="text-gray-300">We collect personal information that you voluntarily provide, such as your name, email address, and any details submitted through our website forms, communications, or project requests.</p>
            </div>
            <div className="border-b border-gray-700 pb-4">
              <h3 className="text-lg font-semibold text-white mb-2">How does GoodAV protect my personal data?</h3>
              <p className="text-gray-300">We implement industry-standard security measures to protect your data from unauthorized access, disclosure, alteration, or destruction. All data is stored securely and accessed only by authorized personnel.</p>
            </div>
            <div className="border-b border-gray-700 pb-4">
              <h3 className="text-lg font-semibold text-white mb-2">Does GoodAV share my data with third parties?</h3>
              <p className="text-gray-300">We do not sell, rent, or share your personal data with third parties except as required by law or with your explicit consent.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">What are my rights regarding my personal data?</h3>
              <p className="text-gray-300">You have the right to access, correct, or delete your personal information, object to or restrict certain processing, withdraw consent at any time, and lodge a complaint with a supervisory authority.</p>
            </div>
          </div>
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
