/**
 * Extracts YouTube video ID from various YouTube URL formats
 * @param url - YouTube URL or video ID
 * @returns YouTube video ID
 */
export function extractYouTubeVideoId(url: string): string {
  if (!url) return '';
  
  // If it's already just a video ID (11 characters, alphanumeric and dashes/underscores)
  if (/^[a-zA-Z0-9_-]{11}$/.test(url)) {
    return url;
  }
  
  // Handle various YouTube URL formats
  const patterns = [
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/,
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/embed\/([a-zA-Z0-9_-]+)/,
    /(?:https?:\/\/)?youtu\.be\/([a-zA-Z0-9_-]+)/,
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/v\/([a-zA-Z0-9_-]+)/
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }
  
  // If no pattern matches, return the original string (might be a video ID already)
  return url;
}

/**
 * Creates a YouTube thumbnail URL from video ID
 * @param videoId - YouTube video ID
 * @param quality - Thumbnail quality (default: 'hqdefault')
 * @returns YouTube thumbnail URL
 */
export function getYouTubeThumbnail(videoId: string, quality: 'default' | 'mqdefault' | 'hqdefault' | 'sddefault' | 'maxresdefault' = 'hqdefault'): string {
  const cleanVideoId = extractYouTubeVideoId(videoId);
  return `https://img.youtube.com/vi/${cleanVideoId}/${quality}.jpg`;
}

/**
 * Creates a YouTube embed URL from video ID
 * @param videoId - YouTube video ID
 * @param options - Embed options
 * @returns YouTube embed URL
 */
export function getYouTubeEmbedUrl(
  videoId: string, 
  options: {
    autoplay?: boolean;
    rel?: boolean;
    modestbranding?: boolean;
    controls?: boolean;
  } = {}
): string {
  const cleanVideoId = extractYouTubeVideoId(videoId);
  const params = new URLSearchParams();
  
  if (options.autoplay) params.set('autoplay', '1');
  if (options.rel === false) params.set('rel', '0');
  if (options.modestbranding) params.set('modestbranding', '1');
  if (options.controls === false) params.set('controls', '0');
  
  const paramString = params.toString();
  return `https://www.youtube-nocookie.com/embed/${cleanVideoId}${paramString ? `?${paramString}` : ''}`;
}
