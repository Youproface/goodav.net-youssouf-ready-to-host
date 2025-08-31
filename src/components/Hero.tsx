import { motion, useAnimation, useInView } from 'framer-motion';
import { Play, Video, Camera, Mic, Users, Trophy, Eye, Handshake } from 'lucide-react';
import React, { useRef, useState } from 'react';
import './Hero.css';

// Animated counter component
interface AnimatedCounterProps {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ 
  value, 
  duration = 2, 
  prefix = '', 
  suffix = '' 
}) => {
  const [displayValue, setDisplayValue] = React.useState(0);
  const ref = React.useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const controls = useAnimation();
  
  React.useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const increment = end / (duration * 60); // 60fps
      
      const updateCounter = () => {
        start += increment;
        if (start < end) {
          setDisplayValue(Math.round(start));
          requestAnimationFrame(updateCounter);
        } else {
          setDisplayValue(end);
        }
      };
      
      updateCounter();
    }
  }, [isInView, value, duration]);

  return (
    <motion.span ref={ref}>
      {prefix}{displayValue}{suffix}
    </motion.span>
  );
};
import heroBackground from '../assets/images/all_site_images/Home/Banner/Home_Video_Banner_Optimized.gif';
import { useNavigate } from 'react-router-dom';
import ProjectStartingModal from './forms/ProjectStartingModal';
const Hero = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <section className="relative">
      {/* Background Image */}
      <motion.div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat hero-bg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div 
          className="absolute inset-0 bg-gradient-hero"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20 text-center">
        <motion.div 
          className="max-w-5xl mx-auto"
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3
              }
            }
          }}
        >
          <motion.div 
            className="mb-8 flex justify-center"
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { 
                opacity: 1, 
                y: 0,
                transition: { duration: 0.6, ease: "easeOut" }
              }
            }}
          >
            <div className="px-8 py-6 rounded-lg bg-black/10 border border-orange-500 flex flex-col items-center min-w-[340px] max-w-full mt-5">
              <motion.div 
                className="text-white text-base font-semibold tracking-wide mb-2 uppercase"
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                }}
              >WELCOME TO</motion.div>
              <motion.div 
                className="text-orange-500 text-2xl font-bold mb-2 uppercase tracking-wide"
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.1 } }
                }}
              >AFRICA'S PREMIER</motion.div>
              <motion.div 
                className="text-white text-lg font-bold mb-2 uppercase tracking-wide"
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2 } }
                }}
              >AV AGENCY GOODAV</motion.div>
              <motion.div 
                className="w-16 h-0.5 bg-orange-500 mt-2 mb-1"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.8, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          </motion.div>

          {/* Tagline */}
          <motion.div 
            className="mb-8"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                  delayChildren: 0.8
                }
              }
            }}
          >
            <h2 className="text-2xl md:text-4xl font-bold mb-4">
              <motion.span 
                className="gradient-text inline-block mr-2"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
                }}
              >Transforming</motion.span>
              <motion.span 
                className="text-foreground inline-block mr-2"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.1 } }
                }}
              >Ideas</motion.span>
              <motion.span 
                className="text-foreground inline-block mr-2"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.2 } }
                }}
              >Into</motion.span>
              <motion.span 
                className="gradient-text inline-block"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.3 } }
                }}
              >Impactful</motion.span>
            </h2>
            <motion.h2 
              className="text-2xl md:text-4xl font-bold mb-6"
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { 
                  opacity: 1, 
                  y: 0, 
                  transition: { 
                    duration: 0.6, 
                    delay: 0.4,
                    ease: [0.22, 1, 0.36, 1]
                  } 
                }
              }}
            >
              <span className="gradient-text">Visual Stories</span>
            </motion.h2>
            <motion.p 
              className="text-lg text-muted-foreground italic max-w-2xl mx-auto"
              variants={{
                hidden: { opacity: 0, y: 10 },
                show: { 
                  opacity: 1, 
                  y: 0, 
                  transition: { 
                    duration: 0.8, 
                    delay: 0.6,
                    ease: [0.22, 1, 0.36, 1]
                  } 
                }
              }}
            >
              Where African creativity meets global excellence
            </motion.p>
          </motion.div>

          {/* Service Icons */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 max-w-2xl mx-auto"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                  delayChildren: 1
                }
              }
            }}
          >
            {[
              { icon: <Video className="h-8 w-8 text-primary mb-2" />, text: 'Documentaries' },
              { icon: <Users className="h-8 w-8 text-primary mb-2" />, text: 'Live Events' },
              { icon: <Camera className="h-8 w-8 text-primary mb-2" />, text: 'Corporate Films' },
              { icon: <Mic className="h-8 w-8 text-primary mb-2" />, text: 'International' }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center p-4 glass-card rounded-lg hover-lift"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { 
                    opacity: 1, 
                    y: 0,
                    transition: { 
                      duration: 0.5,
                      ease: [0.22, 1, 0.36, 1]
                    }
                  }
                }}
                whileHover={{ 
                  y: -5,
                  scale: 1.03,
                  transition: { duration: 0.2 }
                }}
              >
                {item.icon}
                <span className="text-sm font-medium">{item.text}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div 
            className="flex justify-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              transition: { 
                delay: 1.2,
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1]
              }
            }}
          >
            <div className="flex flex-col sm:flex-row gap-8 px-2 py-2 rounded-2xl card-bg">
              <motion.button 
                onClick={()=>navigate('/portfolio')}
                className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold text-lg px-8 py-4 rounded-full shadow-lg transition-all duration-200"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
                }}
                whileTap={{ scale: 0.98 }}
              >
                <Play className="h-5 w-5" />
                Experience Our Portfolio
              </motion.button>
              <motion.button 
                onClick={()=>setOpen(true)}
                className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold text-lg px-8 py-4 rounded-full shadow-lg transition-all duration-200"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
                }}
                whileTap={{ scale: 0.98 }}
              >
                <Video className="h-5 w-5" />
                Start Your Journey
              </motion.button>
            </div>
          </motion.div>
          <ProjectStartingModal open={open} onClose={() => setOpen(false)} />
          {/* Trust Indicators */}
          <div className="flex flex-col md:flex-row gap-8 justify-center items-center mt-4 mb-2">
            <div className="flex items-center gap-3 px-6 py-4 rounded-xl card-bg">
              <span className="text-white font-medium text-base"><span className="font-bold">Trusted by 200+</span> Organizations</span>
            </div>
            <div className="flex items-center gap-3 px-6 py-4 rounded-xl card-bg">
              <span className="text-orange-500"><Play className="h-5 w-5" /></span>
              <span className="text-white font-medium text-base"><span className="font-bold">Award-Winning Excellence</span></span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Stats Section */}
      <div className="relative py-16 bg-gradient-to-b from-black/80 to-black/90">
        <div className="container mx-auto px-4">
          {/* Stats Tagline */}
          <motion.div 
            className="text-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Our Impact Speaks Volumes
            </h2>
            <p className="text-orange-300 max-w-2xl mx-auto">
              Numbers that tell our story of excellence
            </p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.2,
                  delayChildren: 0.2
                }
              }
            }}
          >
            {[
              {
                number: <AnimatedCounter value={10} suffix="+" />,
                label: "Years of Excellence",
                icon: <Trophy className="h-8 w-8 text-orange-500" />,
              },
              {
                number: <><AnimatedCounter value={95} suffix="+" /><span className="text-orange-500 text-2xl">M</span></>,
                label: "Global Reach",
                icon: <Eye className="h-8 w-8 text-orange-500" />,
              },
              {
                number: <AnimatedCounter value={200} suffix="+" />,
                label: "Success Stories",
                icon: <Handshake className="h-8 w-8 text-orange-500" />,
              },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center justify-center text-center p-8 rounded-lg border border-orange-500/20 hover:bg-orange-900/20 transition-all duration-300 hover:shadow-[0_0_32px_8px_rgba(255,122,0,0.15)]"
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  show: { 
                    opacity: 1, 
                    y: 0,
                    transition: {
                      duration: 0.6,
                      ease: [0.22, 1, 0.36, 1]
                    }
                  }
                }}
                whileHover={{ 
                  y: -5,
                  transition: { duration: 0.2 }
                }}
              >
                <div className="text-orange-500 mb-4">
                  {stat.icon}
                </div>
                <div className="mb-2">
                  <div className="text-4xl font-bold text-white">{stat.number}</div>
                  <div className="text-sm text-orange-300 mt-2 uppercase tracking-wider">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;