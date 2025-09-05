import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import ContactSection from './ContactSection';
import BottomCTA from './BottomCTA';
const LegalModal = React.lazy(() => import('./Legal/Legal-modal'));
import { Suspense } from 'react';
import { useState } from 'react';
import { cookiePolicy, privacyPolicy, termsAndConditions } from './Legal/legaldata';
const Footer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const socialLinks = [
    { icon: Facebook, href: "https://www.facebook.com/goodaudiovisuals", label: "Facebook" },
    { icon: Twitter, href: "https://x.com/AudiovisualGood", label: "Twitter | X" },
    { icon: Instagram, href: "https://www.instagram.com/goodaudiovisual", label: "Instagram" },
    { icon: Linkedin, href: "https://www.linkedin.com/company/goodav", label: "LinkedIn" },
    { icon: Youtube, href: "https://www.youtube.com/@goodaudiovisuals", label: "YouTube" },
    // { icon: Flickr, href: "https://www.flickr.com/photos/202425883@N07", label: "Flickr" }, // new from footer
  ];
  

  const quickLinks = [
    { name: "About Us", href: "/about-us" },
    { name: "FAQ", href: "/faq" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Partner", href: "/partner" },
    { name: "Blog", href: "/blog" },
    { name: "Case Studies", href: "/case-studies" },
    { name: "Contact", href: "/contact" }
  ];

  const services = [
    { name: "Video Production", href: "/services/video-production" },
    { name: "Photography", href: "/services/photography" },
    { name: "Live Streaming", href: "/services/live-streaming" },
    { name: "Audio Production", href: "/services/audio-production" },
    { name: "Sound Systems", href: "/services/sound-systems" },
    { name: "Lighting", href: "/services/lighting" }
  ];

  const location = useLocation();
  const isServicePage = location.pathname.startsWith('/services');
  const isContactPage = location.pathname === '/contact' || location.pathname.startsWith('/contact');
  const isHomePage = location.pathname === '/';

  return (
    <footer className="bg-gradient-section border-t border-border" role="contentinfo">
      <div>
        {/* Always show Contact section at the top of the footer for all pages, including services */}
        <ContactSection />
        {!isContactPage && !isHomePage && <BottomCTA />}
        <div className="container mx-auto px-4">
          {/* Main Footer Content */}
          <div className="py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
              {/* Company Info */}
              <div className="lg:col-span-1">
                <div className="flex items-center space-x-2 mb-6">
                  <Link to="/" className="flex items-center space-x-2">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center">
                      <img src="/images/all_site_images/Assets/logo-icon-white.svg" alt="brand-logo" className="cursor-pointer" />
                    </div>
                    <span className="text-2xl font-bold text-foreground cursor-pointer">GoodAV</span>
                  </Link>
                </div>
                <p className="text-gray-200 mb-6 leading-relaxed">
                  Africa's premier audiovisual agency transforming ideas into impactful visual stories. 
                  Where African creativity meets global excellence.
                </p>
                <div className="space-y-3">
                  {/* Removed standalone phone number as requested */}
                </div>
                <div className="space-y-3">
                  <div className="flex items-center text-gray-200">
                    <Mail className="h-4 w-4 mr-3 text-primary" />
                    <span className="text-sm">info@goodav.net</span>
                  </div>
                  <div className="flex items-center text-gray-200">
                    <Phone className="h-4 w-4 mr-3 text-primary" />
                    <span className="text-sm">+250 788 613 332</span>
                  </div>
                  <div className="flex items-center text-gray-200">
                    <MapPin className="h-4 w-4 mr-3 text-primary" />
                    <span className="text-sm">Kigali, Rwanda, Africa</span>
                  </div>
                </div>
              </div>
              {/* Quick Links */}
              <div>
                <h3 className="text-lg font-bold mb-6 text-foreground">Quick Links</h3>
                <ul className="space-y-3">
                  {quickLinks.map((link, index) => (
                    <li key={index}>
                      <Link
                        to={link.href}
                        className="text-gray-200 hover:text-primary transition-colors"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              {/* Services */}
              <div>
                <h3 className="text-lg font-bold mb-6 text-foreground">Our Services</h3>
                <ul className="space-y-3">
                  {services.map((service, index) => (
                    <li key={index}>
                      <Link
                        to={service.href}
                        className="text-gray-200 hover:text-primary transition-colors"
                      >
                        {service.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              {/* Newsletter & Social Links */}
              <div>
                <h3 className="text-lg font-bold mb-6 text-foreground">Stay Connected</h3>
                <div className="space-y-4">
                  <div className="flex">
                    <a
                      href="https://wa.me/+250788613332"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg bg-transparent px-6 py-3 font-semibold text-white shadow-md hover:bg-orange-400 transition-colors group"
                    >
                      <FaWhatsapp className="h-5 w-5 text-orange-400 group-hover:text-white transition-colors duration-200" />
                      Chat with us on WhatsApp
                    </a>
                  </div>
                  {/* Social Links */}
                  <div className="flex space-x-4 pt-4">
                    {socialLinks.map(({ icon: Icon, href, label }) => (
                      <a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={label}
                        className="inline-block mr-4"
                      >
                        <Icon className="h-6 w-6 text-gray-200 hover:text-primary transition-colors" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Bottom Bar */}
          <div className="py-8 border-t border-border">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-gray-200 text-sm">
                2024 GoodAV. All rights reserved. Made with in Africa.
              </div>
              <div className="flex space-x-6 text-sm">
                <a  className="cursor-pointer text-gray-200 hover:text-primary transition-colors" onClick={() => {setIsOpen(true); setTitle("Privacy Policy"); setContent(privacyPolicy);}}>
                  Privacy Policy
                </a>
                <a  className="cursor-pointer text-gray-200 hover:text-primary transition-colors" onClick={() => {setIsOpen(true); setTitle("Terms of Service"); setContent(termsAndConditions);}}>
                  Terms of Service
                </a>
                <a  className="cursor-pointer text-gray-200 hover:text-primary transition-colors" onClick={() => {setIsOpen(true); setTitle("Cookie Policy"); setContent(cookiePolicy);}}>
                  Cookie Policy
                </a>
              </div>
            </div>
          </div>
        </div>
        <Suspense fallback={null}>
          <LegalModal isOpen={isOpen} onClose={() => {setIsOpen(false)}} title={title} content={content} />
        </Suspense>
      </div>
    </footer>
  );
};

export default Footer;