import React, { Suspense } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
// Removed static imports for pages/components that are lazy loaded below to avoid conflicts
import { services } from "./data/services";
import { blogPosts } from "./data/blog";
import { 
  VideoProduction, 
  Photography, 
  Streaming, 
  AudioProduction, 
  SoundSystem,
  Lighting, 
} from "./components/services";
// ...existing code...
const Index = React.lazy(() => import("./pages/Index"));
const PrivacyPage = React.lazy(() => import("./pages/Privacy"));
const TermsPage = React.lazy(() => import("./pages/Terms"));
const CookiePolicyPage = React.lazy(() => import("./pages/CookiePolicy"));
const NotFound = React.lazy(() => import("./pages/NotFound"));
const BlogDetailsPage = React.lazy(() => import("./components/BlogDetailsPage"));
const Portfolio = React.lazy(() => import("./pages/PortFolio"));
const Header = React.lazy(() => import("./components/Header"));
const BlogArchive = React.lazy(() => import("./components/BlogArchives"));
const Footer = React.lazy(() => import("./components/Footer"));
const Contact = React.lazy(() => import("./components/Contact"));
const FaqSection = React.lazy(() => import("./pages/FAQSection"));
const About = React.lazy(() => import('./pages/About'));
const Partners = React.lazy(() => import('./pages/Partners'));
const CaseStudy = React.lazy(() => import('./components/CaseStudy'));
const GileadCaseStudy = React.lazy(() => import('./pages/case-studies/GileadCaseStudy'));
const CaseStudiesNew = React.lazy(() => import('./pages/CaseStudiesNew'));
const ScrollToTop = React.lazy(() => import('./components/ScrollToTop'));

const queryClient = new QueryClient();

// Wrapper component to handle blog post data fetching
const BlogPostWrapper = () => {
  const { slug } = useParams<{ slug: string }>();
  const blog = blogPosts.find(post => post.slug === slug);
  
  if (!blog) {
    return <div>Blog post not found</div>;
  }
  
  return <BlogDetailsPage blog={blog} />;
};

// Map of service IDs to their corresponding components
const serviceComponents: Record<string, React.ComponentType> = {
  'video-production': VideoProduction,
  'photography': Photography,
  'audio-production': AudioProduction,
  'live-streaming': Streaming,
  'lighting': Lighting,
  'sound-systems': SoundSystem,
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <Header />
        <ScrollToTop />
        <Suspense fallback={<div className="lazy-fallback">Loading layout...</div>}>
          <Header />
          <ScrollToTop />
        </Suspense>
        <main className=""> {/* Add padding-top to account for fixed header */}
          <Suspense fallback={<div className="lazy-fallback">Loading page...</div>}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/blog/:slug" element={<BlogPostWrapper />} />
              {services.map((service) => (
                <Route
                  key={service.id}
                  path={`/services/${service.id}`}
                  element={React.createElement(serviceComponents[service.id] || (() => <div>Service not found</div>))}
                />
              ))}
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/about-us" element={<About />} />
              <Route path="/faq" element={<FaqSection />} />
              <Route path="/partner" element={<Partners />} />
              <Route path="/blog" element={<BlogArchive />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/case-studies" element={<CaseStudiesNew />} />
              <Route path="/case-study/:slug" element={<CaseStudy />} />
              <Route path="/case-studies/gilead-ias-2025" element={<GileadCaseStudy />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/cookie-policy" element={<CookiePolicyPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Suspense fallback={null}>
              <Footer />
            </Suspense>
          </Suspense>
        </main>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

console.log('Route /case-studies accessed');

export default App;
