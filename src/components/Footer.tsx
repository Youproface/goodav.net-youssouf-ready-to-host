import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import ContactSection from './ContactSection';
import BottomCTA from './BottomCTA';
import LegalModal from './Legal/Legal-modal';
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

  return (
    <footer className="bg-gradient-section border-t border-border" role="contentinfo">
      {!isServicePage && (
        <>
          <ContactSection />
          <BottomCTA />
        </>
      )}
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Company Info */}
            <div className="lg:col-span-1">
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-10 h-10 rounded-full flex items-center justify-center">
                  {/* <div className="w-4 h-4 bg-background rounded-full"></div> */}
                  <img src="src/assets/images/all_site_images/Assets/logo-fav.png" alt="brand-logo" />
                </div>
                <span className="text-2xl font-bold text-foreground">GoodAV</span>
              </div>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Africa's premier audiovisual agency transforming ideas into impactful visual stories. 
                Where African creativity meets global excellence.
              </p>
              <div className="space-y-3">
                <div className="flex items-center text-muted-foreground">
                  <Mail className="h-4 w-4 mr-3 text-primary" />
                  <span className="text-sm">info@goodav.africa</span>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Phone className="h-4 w-4 mr-3 text-primary" />
                  <span className="text-sm">+250 788 613 332</span>
                </div>
                <div className="flex items-center text-muted-foreground">
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
                      className="text-muted-foreground hover:text-primary transition-colors"
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
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {service.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h3 className="text-lg font-bold mb-6 text-foreground">Stay Connected</h3>
              <p className="text-muted-foreground mb-4">
                Subscribe to get the latest updates on African storytelling and our projects.
              </p>
              <div className="space-y-4">
                <div className="flex">
                <a
                href="https://wa.me/+250788613332"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-transparent px-6 py-3 font-semibold text-white shadow-md hover:bg-[#1ebe5d] transition-colors"
              >
              <FaWhatsapp className="h-5 w-5 text-green-400" />
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
    <Icon className="h-6 w-6 text-muted-foreground hover:text-primary transition-colors" />
  </a>
))}
                  <a target="_blank" href="https://www.flickr.com/photos/202425883@N07" rel="noopener noreferrer">
                  <img className="w-10 h-10 bg-card border border-border rounded-lg flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all duration-200"  src="https://cdn-icons-png.flaticon.com/512/5968/5968712.png" alt="Flickr" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
     
        {/* Bottom Bar */}
        <div className="py-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-muted-foreground text-sm">
              2024 GoodAV. All rights reserved. Made with in Africa.
            </div>
            <div className="flex space-x-6 text-sm">
              <a  className="cursor-pointer text-muted-foreground hover:text-primary transition-colors" onClick={() => {setIsOpen(true); setTitle("Privacy Policy"); setContent(privacyPolicy);}}>
                Privacy Policy
              </a>
              <a  className="cursor-pointer text-muted-foreground hover:text-primary transition-colors" onClick={() => {setIsOpen(true); setTitle("Terms of Service"); setContent(termsAndConditions);}}>
                Terms of Service
              </a>
              <a  className="cursor-pointer text-muted-foreground hover:text-primary transition-colors" onClick={() => {setIsOpen(true); setTitle("Cookie Policy"); setContent(cookiePolicy);}}>
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
      <LegalModal isOpen={isOpen} onClose={() => {setIsOpen(false)}} title={title} content={content} />
    </footer>
  );
};

export default Footer;