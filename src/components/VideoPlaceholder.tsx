import React, { useEffect, useState } from 'react';
import { Play, X } from 'lucide-react';

interface VideoPlaceholderProps {
  videoId?: string; // YouTube ID
  embedUrl?: string; // full embed url (https://www.youtube.com/embed/..)
  thumbnail?: string;
  title?: string;
  subtitle?: string;
  category?: string;
  className?: string;
  aspectClass?: string;
  playing?: boolean; // controlled playing state
  onPlay?: () => void;
  onClose?: () => void;
  showClose?: boolean;
}

const VideoPlaceholder: React.FC<VideoPlaceholderProps> = ({
  videoId,
  embedUrl,
  thumbnail,
  title,
  subtitle,
  category,
  className = '',
  aspectClass = 'aspect-video',
  playing,
  onPlay,
  onClose,
  showClose = false,
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(!!playing);

  useEffect(() => {
    if (typeof playing === 'boolean') setIsPlaying(playing);
  }, [playing]);

  const handlePlay = () => {
    if (onPlay) onPlay();
    if (typeof playing !== 'boolean') setIsPlaying(true);
  };

  const handleClose = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (onClose) onClose();
    if (typeof playing !== 'boolean') setIsPlaying(false);
  };

  const baseThumbnail = thumbnail || (videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : undefined);
  const [currentThumb, setCurrentThumb] = useState<string | undefined>(
    // prefer a high-res thumbnail when caller requested it (e.g. maxres), otherwise use base
    thumbnail || (videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : undefined)
  );
  const [imgLoaded, setImgLoaded] = useState<boolean>(false);

  // on image error, fallback: maxres -> hqdefault -> local placeholder
  const handleImgError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const src = (e.target as HTMLImageElement).src || '';
    setImgLoaded(false);
    if (videoId) {
      if (src.includes('maxresdefault')) {
        setCurrentThumb(`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`);
        return;
      }
      if (src.includes('hqdefault')) {
        setCurrentThumb('/placeholder.svg');
        return;
      }
    }
    // final fallback
    setCurrentThumb('/placeholder.svg');
  };

  const handleImgLoad = () => {
    setImgLoaded(true);
  };
  const resolvedEmbed = embedUrl
    ? embedUrl.replace('www.youtube.com/embed', 'www.youtube-nocookie.com/embed')
    : videoId
    ? `https://www.youtube-nocookie.com/embed/${videoId}`
    : '';

  return (
    <div className={`relative rounded-xl overflow-hidden min-h-[200px] bg-gray-900 ${className} ${aspectClass}`}>
      {!isPlaying ? (
        <>
          {currentThumb && (
            <img
              src={currentThumb}
              alt={title || 'Video thumbnail'}
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
              onError={handleImgError}
              onLoad={handleImgLoad}
            />
          )}

          {/* If no image or image hasn't loaded, show visible fallback so users always see content */}
          {(!currentThumb || !imgLoaded) && (
            <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 flex items-center justify-center">
              <div className="text-center px-4">
                {title && <div className="text-white font-semibold mb-2 text-lg">{title}</div>}
                {subtitle && <div className="text-sm text-white/80 mb-3">{subtitle}</div>}
                {!title && !subtitle && <div className="text-white/60 text-sm">Video Preview</div>}
              </div>
            </div>
          )}

          {/* Debug overlay: hidden in production */}
          <div className="absolute top-2 left-2 text-xs text-white/70 bg-black/50 px-2 py-1 rounded debug-thumb z-50 hidden">
            {currentThumb || 'no-thumb'} | loaded: {imgLoaded ? 'yes' : 'no'}
          </div>

          {/* Centered Play Button (bring to front) */}
          <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
            <button
              onClick={(e) => { e.stopPropagation(); handlePlay(); }}
              aria-label={title ? `Play ${title}` : 'Play video'}
              className="pointer-events-auto w-16 h-16 flex items-center justify-center bg-primary/90 rounded-full shadow-lg text-primary-foreground focus:outline-none focus:ring-2 focus:ring-primary/60 z-30"
            >
              <Play className="w-6 h-6 text-white" aria-hidden="true" />
            </button>
          </div>

          {/* Caption pill */}
          {(category || title || subtitle) && (
            <div className="absolute left-4 bottom-4 bg-black/40 text-white px-3 py-2 rounded-full backdrop-blur-sm max-w-[85%] z-20">
              <div className="flex items-center gap-3">
                {category && (
                  <span className="px-2 py-1 bg-primary/90 text-primary-foreground text-xs font-medium rounded-full">{category}</span>
                )}
                <div className="text-left">
                  {title && <div className="font-semibold text-sm line-clamp-1">{title}</div>}
                  {subtitle && <div className="text-xs opacity-80 line-clamp-1">{subtitle}</div>}
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <>
          <iframe
            src={`${resolvedEmbed}?autoplay=1&rel=0&modestbranding=1&showinfo=0`}
            className="absolute inset-0 w-full h-full"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={title || 'Video player'}
            loading="lazy"
          />
          {showClose && (
            <button
              onClick={handleClose}
              aria-label="Close video"
              className="absolute top-3 right-3 z-10 bg-black/60 text-white rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-primary/60"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <noscript>
            <div className="p-3 text-center bg-black text-white">
              <a href={embedUrl || (videoId ? `https://www.youtube.com/watch?v=${videoId}` : '#')} target="_blank" rel="noopener noreferrer" className="underline">Open video in a new tab</a>
            </div>
          </noscript>
        </>
      )}
    </div>
  );
};

export default VideoPlaceholder;
