/**
 * Generate SEO-friendly slugs from titles
 */

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    // Replace French accented characters
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    // Replace spaces and special characters with hyphens
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    // Remove leading/trailing hyphens
    .replace(/^-+|-+$/g, '')
    // Limit length to 100 characters
    .slice(0, 100)
    .replace(/-+$/, ''); // Remove trailing hyphens after slicing
}

/**
 * Generate unique slug by appending number if needed
 */
export function generateUniqueSlug(title: string, existingSlugs: string[] = []): string {
  const baseSlug = generateSlug(title);

  if (!existingSlugs.includes(baseSlug)) {
    return baseSlug;
  }

  let counter = 1;
  let uniqueSlug = `${baseSlug}-${counter}`;

  while (existingSlugs.includes(uniqueSlug)) {
    counter++;
    uniqueSlug = `${baseSlug}-${counter}`;
  }

  return uniqueSlug;
}

/**
 * Generate article excerpt from content
 */
export function generateExcerpt(content: string, maxLength: number = 160): string {
  // Remove markdown syntax and HTML tags
  const cleanContent = content
    .replace(/#{1,6}\s+/g, '') // Remove headers
    .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold
    .replace(/\*(.*?)\*/g, '$1') // Remove italic
    .replace(/\[(.*?)\]\(.*?\)/g, '$1') // Remove links
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/\n+/g, ' ') // Replace newlines with spaces
    .trim();

  if (cleanContent.length <= maxLength) {
    return cleanContent;
  }

  // Find the last complete sentence within the limit
  const truncated = cleanContent.slice(0, maxLength);
  const lastPeriod = truncated.lastIndexOf('.');
  const lastSpace = truncated.lastIndexOf(' ');

  if (lastPeriod > maxLength * 0.7) {
    return truncated.slice(0, lastPeriod + 1);
  } else if (lastSpace > 0) {
    return truncated.slice(0, lastSpace) + '...';
  } else {
    return truncated + '...';
  }
}

/**
 * Estimate reading time for article content
 */
export function estimateReadingTime(content: string): string {
  const wordsPerMinute = 200; // Average reading speed
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);

  if (minutes === 1) {
    return '1 min de lecture';
  } else {
    return `${minutes} min de lecture`;
  }
}