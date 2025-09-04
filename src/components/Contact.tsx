import { useState, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaInstagram, FaYoutube, FaFacebook, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { useForm } from 'react-hook-form';

const heroBackground = '/images/all_site_images/Home/BG/Home_BG.png';

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  message: string;
}

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const sectionRef = useRef(null);
  const controls = useAnimation();
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      const payload = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        subject: data.service ? `Service Inquiry: ${data.service}` : 'General Contact',
        message: `Phone: ${data.phone || 'Not provided'}\nCompany: ${data.company || 'Not provided'}\n\n${data.message}`,
        hp_field: '' // Honeypot field
      };

      const response = await fetch('/process_contact.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus('success');
        reset();
        setTimeout(() => setSubmitStatus('idle'), 5000);
      } else {
        throw new Error(result.error || 'Failed to send message');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const contactInfo = [
    {
      icon: <FaMapMarkerAlt />,
      label: "Location",
      value: "Kigali, Rwanda",
      details: "Gasabo District, Kimisagara Sector"
    },
    {
      icon: <FaPhone />,
      label: "Phone",
      value: "+250 788 613 332",
      details: "Available 24/7 for urgent projects"
    },
    {
      icon: <FaEnvelope />,
      label: "Email",
      value: "info@goodav.net",
      details: "Response within 24 hours"
    },
    {
      icon: <FaClock />,
      label: "Business Hours",
      value: "Mon - Fri: 8AM - 6PM",
      details: "Weekend consultations available"
    }
  ];

  const socialLinks = [
    { icon: <FaInstagram />, href: "https://www.instagram.com/goodaudiovisual", label: "Follow us on Instagram" },
    { icon: <FaYoutube />, href: "https://www.youtube.com/@goodaudiovisuals", label: "Subscribe to our YouTube" },
    { icon: <FaFacebook />, href: "https://www.facebook.com/goodaudiovisuals", label: "Connect on Facebook" },
    { icon: <FaLinkedin />, href: "https://www.linkedin.com/company/goodav", label: "Connect on LinkedIn" },
    { icon: <FaTwitter />, href: "https://twitter.com/goodav_official", label: "Follow us on Twitter" }
  ];

  return (
    <main
      ref={sectionRef}
      className="bg-[#0f1012] text-zinc-100 min-h-screen"
      itemScope
      itemType="https://schema.org/ContactPage"
    >
      {/* SEO Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ContactPage",
          "name": "Contact GoodAV - Professional Audiovisual Services",
          "description": "Get in touch with GoodAV for professional audiovisual production services in Rwanda and Africa. Contact us for video production, photography, live streaming, and more.",
          "url": "https://goodav.net/contact",
          "mainEntity": {
            "@type": "Organization",
            "name": "GoodAV",
            "url": "https://goodav.net",
            "logo": "https://goodav.net/images/all_site_images/Assets/logo-full-color.svg",
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+250788613332",
              "email": "info@goodav.net",
              "contactType": "Customer Support",
              "areaServed": ["Rwanda", "Africa", "International"],
              "availableLanguage": ["en", "fr"]
            },
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Kigali",
              "addressCountry": "RW"
            },
            "sameAs": [
              "https://www.instagram.com/goodaudiovisual",
              "https://www.youtube.com/@goodaudiovisuals",
              "https://www.facebook.com/goodaudiovisuals",
              "https://www.linkedin.com/company/goodav"
            ]
          }
        })}
      </script>

      {/* Hero Section */}
      <motion.section
        className="relative mt-10 py-32 px-4 bg-transparent"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img
            src={heroBackground}
            alt="Contact GoodAV - Professional Audiovisual Services in Rwanda"
            className="w-full h-full object-cover opacity-30"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#0f1012]" />
        </div>

        {/* Content */}
        <div className="relative max-w-6xl mx-auto text-center">
          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-orange-200 to-amber-200 bg-clip-text text-transparent"
            variants={itemVariants}
            itemProp="name"
          >
            CONTACT AND CONNECT WITH US
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-zinc-300 max-w-3xl mx-auto"
            variants={itemVariants}
          >
            Ready to bring your vision to life? Let's discuss your next audiovisual project
            and create something extraordinary together.
          </motion.p>
        </div>
      </motion.section>

      {/* Contact Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

            {/* Contact Form */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div>
                <h2 className="text-3xl font-bold mb-4" id="contact-form">Send us a Message</h2>
                <p className="text-zinc-400">
                  Fill out the form below and we'll get back to you within 24 hours.
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-zinc-300 mb-2">
                      First Name *
                    </label>
                    <input
                      {...register("firstName", { required: "First name is required" })}
                      type="text"
                      id="firstName"
                      className="w-full rounded-xl bg-white/[0.06] px-4 py-3 text-zinc-100 placeholder-zinc-400 outline-none ring-1 ring-white/10 focus:ring-2 focus:ring-orange-400/60 transition-all duration-300"
                      placeholder="Your first name"
                      aria-describedby={errors.firstName ? "firstName-error" : undefined}
                    />
                    {errors.firstName && (
                      <p id="firstName-error" className="mt-1 text-sm text-red-400" role="alert">
                        {errors.firstName.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-zinc-300 mb-2">
                      Last Name *
                    </label>
                    <input
                      {...register("lastName", { required: "Last name is required" })}
                      type="text"
                      id="lastName"
                      className="w-full rounded-xl bg-white/[0.06] px-4 py-3 text-zinc-100 placeholder-zinc-400 outline-none ring-1 ring-white/10 focus:ring-2 focus:ring-orange-400/60 transition-all duration-300"
                      placeholder="Your last name"
                      aria-describedby={errors.lastName ? "lastName-error" : undefined}
                    />
                    {errors.lastName && (
                      <p id="lastName-error" className="mt-1 text-sm text-red-400" role="alert">
                        {errors.lastName.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-zinc-300 mb-2">
                    Email Address *
                  </label>
                  <input
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address"
                      }
                    })}
                    type="email"
                    id="email"
                    className="w-full rounded-xl bg-white/[0.06] px-4 py-3 text-zinc-100 placeholder-zinc-400 outline-none ring-1 ring-white/10 focus:ring-2 focus:ring-orange-400/60 transition-all duration-300"
                    placeholder="your@email.com"
                    aria-describedby={errors.email ? "email-error" : undefined}
                  />
                  {errors.email && (
                    <p id="email-error" className="mt-1 text-sm text-red-400" role="alert">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-zinc-300 mb-2">
                      Phone Number
                    </label>
                    <input
                      {...register("phone")}
                      type="tel"
                      id="phone"
                      className="w-full rounded-xl bg-white/[0.06] px-4 py-3 text-zinc-100 placeholder-zinc-400 outline-none ring-1 ring-white/10 focus:ring-2 focus:ring-orange-400/60 transition-all duration-300"
                      placeholder="+250 XXX XXX XXX"
                    />
                  </div>

                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-zinc-300 mb-2">
                      Company/Organization
                    </label>
                    <input
                      {...register("company")}
                      type="text"
                      id="company"
                      className="w-full rounded-xl bg-white/[0.06] px-4 py-3 text-zinc-100 placeholder-zinc-400 outline-none ring-1 ring-white/10 focus:ring-2 focus:ring-orange-400/60 transition-all duration-300"
                      placeholder="Your company name"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-zinc-300 mb-2">
                    Service Interested In
                  </label>
                  <select
                    {...register("service")}
                    id="service"
                    className="w-full rounded-xl bg-white/[0.06] px-4 py-3 text-zinc-100 outline-none ring-1 ring-white/10 focus:ring-2 focus:ring-orange-400/60 transition-all duration-300"
                  >
                    <option value="">Select a service</option>
                    <option value="video-production">Video Production</option>
                    <option value="photography">Photography</option>
                    <option value="live-streaming">Live Streaming</option>
                    <option value="audio-production">Audio Production</option>
                    <option value="lighting">Lighting & Sound Systems</option>
                    <option value="consultation">Consultation</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-zinc-300 mb-2">
                    Project Details *
                  </label>
                  <textarea
                    {...register("message", { required: "Message is required" })}
                    id="message"
                    rows={5}
                    className="w-full rounded-xl bg-white/[0.06] px-4 py-3 text-zinc-100 placeholder-zinc-400 outline-none ring-1 ring-white/10 focus:ring-2 focus:ring-orange-400/60 transition-all duration-300 resize-none"
                    placeholder="Tell us about your project, timeline, and any specific requirements..."
                    aria-describedby={errors.message ? "message-error" : undefined}
                  />
                  {errors.message && (
                    <p id="message-error" className="mt-1 text-sm text-red-400" role="alert">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-orange-500 to-amber-400 hover:from-orange-400 hover:to-amber-300 disabled:from-gray-600 disabled:to-gray-500 text-zinc-900 font-semibold py-4 px-8 rounded-xl transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 focus:ring-offset-[#0f1012]"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  aria-describedby={submitStatus !== 'idle' ? "submit-status" : undefined}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <motion.div
                        className="w-5 h-5 border-2 border-zinc-900 border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                      Sending...
                    </span>
                  ) : (
                    "Send Message"
                  )}
                </motion.button>

                {submitStatus === 'success' && (
                  <motion.div
                    id="submit-status"
                    className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    role="alert"
                  >
                    <p className="text-green-400 font-medium">Message sent successfully!</p>
                    <p className="text-green-300 text-sm">We'll get back to you within 24 hours.</p>
                  </motion.div>
                )}

                {submitStatus === 'error' && (
                  <motion.div
                    id="submit-status"
                    className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    role="alert"
                  >
                    <p className="text-red-400 font-medium">Failed to send message</p>
                    <p className="text-red-300 text-sm">Please try again or contact us directly.</p>
                  </motion.div>
                )}
              </form>
            </motion.div>

            {/* Contact Information & Map */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div>
                <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
                <p className="text-zinc-400 mb-6">
                  Ready to start your project? Reach out to us through any of these channels.
                </p>
              </div>

              {/* Contact Info Cards */}
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={index}
                    className="rounded-xl border border-white/10 bg-white/5 px-6 py-4 backdrop-blur hover:bg-white/10 transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                  >
                    <div className="flex items-center gap-4">
                      <div className="grid h-12 w-12 place-items-center rounded-lg bg-orange-500/15 text-xl text-orange-300 ring-1 ring-white/10">
                        {info.icon}
                      </div>
                      <div>
                        <div className="text-sm text-zinc-400">{info.label}</div>
                        <div className="text-lg font-semibold text-zinc-100">{info.value}</div>
                        <div className="text-xs text-zinc-500">{info.details}</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Social Media Links */}
              <div>
                <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
                <div className="flex gap-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group grid h-12 w-12 place-items-center rounded-lg bg-white/5 text-zinc-400 hover:bg-orange-500/20 hover:text-orange-300 ring-1 ring-white/10 hover:ring-orange-400/50 transition-all duration-300"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label={social.label}
                    >
                      <span className="text-lg group-hover:scale-110 transition-transform duration-300">
                        {social.icon}
                      </span>
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Map Placeholder */}
              <motion.div
                className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 1.2 }}
              >
                <h3 className="text-xl font-semibold mb-4">Our Location</h3>
                <div className="aspect-video bg-gradient-to-br from-orange-500/10 to-amber-400/10 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <FaMapMarkerAlt className="text-4xl text-orange-400 mx-auto mb-2" />
                    <p className="text-zinc-400">Interactive map coming soon</p>
                    <p className="text-sm text-zinc-500">Kigali, Rwanda</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
  