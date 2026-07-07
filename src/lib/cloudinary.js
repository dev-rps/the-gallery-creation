/**
 * Optimizes a Cloudinary image URL by injecting transformation parameters.
 * Replaces raw original URLs with optimized dimensions, quality, and modern format flags.
 * 
 * @param {string} url - The original Cloudinary URL
 * @param {number} width - The target width for scaling the image (default: 800)
 * @returns {string} The optimized Cloudinary URL
 */
export function getCloudinaryUrl(url, width = 800) {
  if (!url || typeof url !== 'string' || !url.includes('cloudinary.com')) {
    return url;
  }
  
  // Inject q_auto (auto quality), f_auto (auto format like WebP/AVIF), and width constraints
  return url.replace('/image/upload/', `/image/upload/q_auto,f_auto,w_${width},c_limit/`);
}
