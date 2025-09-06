import React from "react";
import SEO from "../components/SEO";
const LegalModal = React.lazy(() => import("../components/Legal/Legal-modal"));
import { cookiePolicy } from "../components/Legal/legaldata";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useState, useRef, useEffect } from "react";
import SchemaMarkup from "../components/SchemaMarkup";
import "../AppCookiePolicy.css";
import { 
  generateLegalKeywords,
  generateLegalDescription,
  generateLegalTitle,
  generateLegalStructuredData,
  generateLegalOrganizationStructuredData,
  generateLegalBreadcrumbStructuredData,
  generateLegalFAQStructuredData
} from "../utils/legalSEO";

export default function CookiePolicyPage() {
  const [isOpen, setIsOpen] = useState(false);
  const closeBtnRef = useRef(null);
  useEffect(() => {
    if (isOpen && closeBtnRef.current) {
      closeBtnRef.current.focus();
    }
  }, [isOpen]);

  // Generate dynamic SEO data
  const pageId = 'cookie-policy';
  const cookieTitle = generateLegalTitle(pageId);
  const cookieDescription = generateLegalDescription(pageId);
  const cookieKeywords = generateLegalKeywords(pageId);
  const cookieStructuredData = generateLegalStructuredData(pageId);
  const organizationStructuredData = generateLegalOrganizationStructuredData();
  const breadcrumbStructuredData = generateLegalBreadcrumbStructuredData(pageId);
  const faqStructuredData = generateLegalFAQStructuredData(pageId);

  // Combine structured data
  const combinedStructuredData = [
    cookieStructuredData,
    organizationStructuredData,
    breadcrumbStructuredData,
    ...(faqStructuredData ? [faqStructuredData] : [])
  ];

  return (
    <>
      <SEO
        title={cookieTitle}
        description={cookieDescription}
        keywords={cookieKeywords}
        canonical="https://goodav.net/cookie-policy"
        schema={combinedStructuredData}
        noindex={false}
        breadcrumbs={[{ name: "Home", url: "/" }, { name: "Cookie Policy", url: "/cookie-policy" }]}
        openGraph={{
          title: cookieTitle,
          description: cookieDescription,
          type: 'website',
          url: 'https://goodav.net/cookie-policy',
          images: [{
            url: 'https://goodav.net/images/goodav-legal-cookies.jpg',
            width: 1200,
            height: 630,
            alt: 'GoodAV Cookie Policy - Website Privacy and Cookie Usage'
          }]
        }}
        twitter={{
          card: 'summary_large_image',
          title: cookieTitle,
          description: cookieDescription,
          image: 'https://goodav.net/images/goodav-legal-cookies.jpg'
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

        {/* FAQ Section */}
        <div className="mt-12 bg-gray-900/50 rounded-xl p-8 border border-gray-700">
          <h2 className="text-2xl font-bold text-orange-400 mb-6">Cookie Policy FAQ</h2>
          <div className="space-y-6">
            <div className="border-b border-gray-700 pb-4">
              <h3 className="text-lg font-semibold text-white mb-2">What types of cookies does GoodAV use?</h3>
              <p className="text-gray-300">We use essential cookies for website functionality, analytics cookies to understand user behavior, and preference cookies to remember your settings.</p>
            </div>
            <div className="border-b border-gray-700 pb-4">
              <h3 className="text-lg font-semibold text-white mb-2">Can I disable cookies on the GoodAV website?</h3>
              <p className="text-gray-300">Yes, you can control and disable cookies through your browser settings, though this may affect website functionality and user experience.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">How long do cookies remain on my device?</h3>
              <p className="text-gray-300">Cookie duration varies by type - session cookies are deleted when you close your browser, while persistent cookies remain for specific periods as outlined in our cookie policy.</p>
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
