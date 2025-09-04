import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import { extractYouTubeVideoId, getYouTubeThumbnail, getYouTubeEmbedUrl } from '../utils/youtube';

interface YouTubeModalProps {
  videoId: string;
  title: string;
  thumbnailUrl?: string;
  className?: string;
  buttonClassName?: string;
  containerClassName?: string;
}

const YouTubeModal: React.FC<YouTubeModalProps> = ({
  videoId,
  title,
  thumbnailUrl,
  className = "w-full md:w-3/4 lg:w-2/3",
  buttonClassName = "w-16 h-16",
  containerClassName = "h-64 md:h-96"
}) => {
  const [play, setPlay] = useState(false);

  const cleanVideoId = extractYouTubeVideoId(videoId);
  const thumbnail = thumbnailUrl || getYouTubeThumbnail(cleanVideoId);
  const embedUrl = getYouTubeEmbedUrl(cleanVideoId, { 
    autoplay: true, 
    rel: false, 
    modestbranding: true 
  });

  return (
    <motion.div
      className={`relative ${className} glass-card rounded-xl overflow-hidden shadow-glow`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className={`flex items-center justify-center ${containerClassName} bg-transparent`}>
        {!play ? (
          <>
            {/* Thumbnail at full visibility */}
            <img
              src={thumbnail}
              alt={`${title} - Video Thumbnail`}
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
            />

            {/* Play button only (no dark overlay) */}
            <motion.button
              className={`absolute z-20 ${buttonClassName} flex items-center justify-center bg-gradient-primary rounded-full hover-lift shadow-glow group focus:outline-none focus:ring-4 focus:ring-orange-400 focus:ring-offset-2 focus:ring-offset-black`}
              whileHover={{
                scale: 1.1,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.95 }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
              onClick={() => setPlay(true)}
              aria-label={`Play video: ${title}`}
              type="button"
            >
              <Play className="w-8 h-8 text-primary-foreground ml-1 group-hover:scale-110 transition-transform duration-300" aria-hidden="true" />
            </motion.button>
          </>
        ) : (
          // YouTube iframe replaces thumbnail
          <>
            <iframe
              className="absolute inset-0 w-full h-full"
              src={embedUrl}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              loading="lazy"
            />
            <noscript>
              <a 
                href={`https://www.youtube.com/watch?v=${cleanVideoId}`} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="sr-only"
              >
                Open video in new tab
              </a>
            </noscript>
          </>
        )}
      </div>

      {/* Caption pill (non-blocking) - only show when not playing */}
      {!play && (
        <motion.div
          className="absolute bottom-4 left-4 right-4 text-white pointer-events-none"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <div className="flex items-center justify-between">
            <span className="px-2 py-1 bg-primary/90 text-primary-foreground text-xs font-medium rounded-full">
              Video
            </span>
          </div>
          <h3 className="mt-2 text-lg md:text-xl font-semibold line-clamp-2">{title}</h3>
        </motion.div>
      )}
    </motion.div>
  );
};

export default YouTubeModal;
