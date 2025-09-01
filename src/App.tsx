import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import BlogDetailsPage from "./components/BlogDetailsPage";
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
import Portfolio from "./pages/PortFolio";
import Header from "./components/Header";
import BlogArchive from "./components/BlogArchives";
import Footer from "./components/Footer";
import Contact from "./components/Contact";
import FaqSection from "./pages/FAQSection";
import About from './pages/About';
import Partners from './pages/Partners';
import CaseStudy from './components/CaseStudy';
import ScrollToTop from './components/ScrollToTop';

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
        <main className=""> {/* Add padding-top to account for fixed header */}
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
            <Route path="/case-study/:slug" element={<CaseStudy />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
