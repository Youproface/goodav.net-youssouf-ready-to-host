import SEO from "../components/SEO";
import LegalModal from "../components/Legal/Legal-modal";
import { privacyPolicy } from "../components/Legal/legaldata";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useState, useRef, useEffect } from "react";
import SchemaMarkup from "../components/SchemaMarkup";
import "../AppPrivacyPolicy.css";

export default function PrivacyPage() {
  const [isOpen, setIsOpen] = useState(false);
  const closeBtnRef = useRef(null);

  // Accessibility: focus trap for modal
  useEffect(() => {
    if (isOpen && closeBtnRef.current) {
      closeBtnRef.current.focus();
    }
  }, [isOpen]);

  return (
    <>
      <SEO
        title="Privacy Policy | GoodAV | Rwanda, Africa, Documentary, Kigali Convention Center, Visit Rwanda"
        description="Read GoodAV's professional privacy policy, compliant with GDPR and CCPA. Learn how we protect your data and your rights. GoodAV is your trusted audiovisual partner for Rwanda, Africa, documentary, conferences, tourism, Kigali Convention Center, Visit Rwanda, Kwita Izina gorilla naming, Rwanda visa, national parks, and more."
        keywords="privacy policy, GDPR, CCPA, data protection, GoodAV, Rwanda, Africa, documentary, Kigali Convention Center, Visit Rwanda, conference in Rwanda, Kwita Izina, gorilla naming, Rwanda visa, Rwandan national park, Rwanda Convention Bureau, audiovisual industry Rwanda, Trust Partner Rwanda, event media coverage, video production Rwanda, live streaming Rwanda, tourism Rwanda, international conference Rwanda, creative economy Rwanda, NGO storytelling Rwanda, African creative industries, cultural preservation Rwanda, pan-African media agency, impact storytelling Rwanda, professional media coverage, global events Rwanda, tourism investment Rwanda, e-learning Rwanda, documentary filmmaking Rwanda, branding Rwanda, high-quality video editing, media production Rwanda, creative direction Rwanda, audiovisual innovation Rwanda"
        canonical="https://goodav.net/privacy"
        noindex={false}
        breadcrumbs={[{ name: "Home", url: "/" }, { name: "Privacy Policy", url: "/privacy" }]}
      />
      <SchemaMarkup
        schema={{
          "@context": "https://schema.org",
          "@type": ["WebPage", "LegalService"],
          "name": "Privacy Policy",
          "url": "https://goodav.net/privacy",
          "description": "Read GoodAV's professional privacy policy, compliant with GDPR and CCPA. Learn how we protect your data and your rights.",
          "provider": {
            "@type": "Organization",
            "name": "GOODAV Ltd",
            "url": "https://goodav.net"
          },
          "areaServed": "RW",
          "datePublished": "2025-09-01",
          "inLanguage": "en"
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
        <LegalModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Privacy Policy"
          content={privacyPolicy}
        />
        <div className="prose prose-lg text-gray-100">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{privacyPolicy}</ReactMarkdown>
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
