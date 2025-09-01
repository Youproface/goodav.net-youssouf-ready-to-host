import React, { useMemo } from 'react';
import { motion, Variants } from 'framer-motion';
import { Target, Eye, CheckCircle, Star, LucideIcon } from 'lucide-react';

interface FoundationItem {
  title: string;
  description: string;
  icon: LucideIcon;
}

const OurFoundationSection: React.FC = () => {
  const missionItems: FoundationItem[] = useMemo(() => [
    {
      title: "Cultural Authenticity",
      description: "Preserving Africa's rich heritage through genuine storytelling",
      icon: CheckCircle
    },
    {
      title: "Technical Excellence",
      description: "World-class production standards and cutting-edge technology",
      icon: Star
    },
    {
      title: "Global Standards",
      description: "Meeting international benchmarks while honoring local contexts",
      icon: Target
    }
  ], []);

  const visionItems: FoundationItem[] = useMemo(() => [
    {
      title: "Industry Leadership",
      description: "Setting new standards for African audiovisual excellence",
      icon: Star
    },
    {
      title: "Global Impact",
      description: "Creating content that resonates worldwide and drives change",
      icon: Target
    },
    {
      title: "Cultural Bridge",
      description: "Connecting African stories with global audiences authentically",
      icon: CheckCircle
    }
  ], []);

  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    },
  };

  return (
    <motion.section
      className="py-20 bg-gradient-to-b from-background via-muted/30 to-background"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      aria-labelledby="foundation-heading"
      role="region"
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2
            id="foundation-heading"
            className="text-4xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            <span className="gradient-text">OUR FOUNDATION</span>
          </motion.h2>
          <motion.p
            className="text-lg text-muted-foreground max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Built on purpose, driven by passion, defined by excellence
          </motion.p>
        </motion.div>

        {/* Mission and Vision Cards */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {/* Mission Card */}
          <motion.div
            className="glass-card rounded-2xl p-8 hover-lift"
            variants={item}
            whileHover={{
              y: -5,
              transition: { duration: 0.2 }
            }}
            role="article"
            aria-labelledby="mission-title"
          >
            {/* Mission Header */}
            <motion.div
              className="flex items-center mb-8"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <div className="bg-gradient-primary rounded-full p-3 mr-4 shadow-glow">
                <Target className="w-8 h-8 text-primary-foreground" />
              </div>
              <span className="bg-primary text-primary-foreground text-xs font-bold tracking-wider rounded-full px-4 py-2">
                MISSION
              </span>
            </motion.div>

            <motion.h3
              id="mission-title"
              className="text-3xl font-bold mb-6 text-foreground"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              EMPOWERING AFRICAN VOICES
            </motion.h3>

            <motion.p
              className="text-muted-foreground mb-8 text-base leading-relaxed"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              We elevate African narratives through world-class audiovisual excellence, authentically showcasing our continent's rich cultures and transformative stories with unparalleled creativity and technical mastery.
            </motion.p>

            {/* Mission Items */}
            <motion.div
              className="space-y-4"
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              {missionItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={index}
                    className="bg-muted/50 rounded-lg p-4 flex items-center border-l-4 border-primary hover:bg-muted/70 transition-colors duration-300"
                    variants={item}
                    whileHover={{
                      x: 5,
                      transition: { duration: 0.15 }
                    }}
                    role="listitem"
                    aria-labelledby={`mission-item-${index}-title`}
                  >
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <Icon className="w-4 h-4 text-primary-foreground" />
                    </div>
                    <div>
                      <h4
                        id={`mission-item-${index}-title`}
                        className="text-foreground font-semibold text-base"
                      >
                        {item.title}
                      </h4>
                      <p className="text-muted-foreground text-sm">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>

          {/* Vision Card */}
          <motion.div
            className="glass-card rounded-2xl p-8 hover-lift"
            variants={item}
            whileHover={{
              y: -5,
              transition: { duration: 0.2 }
            }}
            role="article"
            aria-labelledby="vision-title"
          >
            {/* Vision Header */}
            <motion.div
              className="flex items-center mb-8"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <div className="bg-gradient-primary rounded-full p-3 mr-4 shadow-glow">
                <Eye className="w-8 h-8 text-primary-foreground" />
              </div>
              <span className="bg-primary text-primary-foreground text-xs font-bold tracking-wider rounded-full px-4 py-2">
                VISION
              </span>
            </motion.div>

            <motion.h3
              id="vision-title"
              className="text-3xl font-bold mb-6 text-foreground"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              AFRICA'S PREMIER STORYTELLERS
            </motion.h3>

            <motion.p
              className="text-muted-foreground mb-8 text-base leading-relaxed"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              To become Africa's most trusted audiovisual partner, inspiring global audiences with authentic, impactful narratives that celebrate our continent's diversity and drive meaningful change worldwide.
            </motion.p>

            {/* Vision Items */}
            <motion.div
              className="space-y-4"
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              {visionItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={index}
                    className="bg-muted/50 rounded-lg p-4 flex items-center border-l-4 border-primary hover:bg-muted/70 transition-colors duration-300"
                    variants={item}
                    whileHover={{
                      x: 5,
                      transition: { duration: 0.15 }
                    }}
                    role="listitem"
                    aria-labelledby={`vision-item-${index}-title`}
                  >
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <Icon className="w-4 h-4 text-primary-foreground" />
                    </div>
                    <div>
                      <h4
                        id={`vision-item-${index}-title`}
                        className="text-foreground font-semibold text-base"
                      >
                        {item.title}
                      </h4>
                      <p className="text-muted-foreground text-sm">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default OurFoundationSection;
