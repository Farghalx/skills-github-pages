import { marked } from 'marked';

// Configure marked
marked.setOptions({
  breaks: true,
  gfm: true,
});

function parseFrontMatter(fileContent) {
  // Simple regex to match YAML frontmatter block
  const match = fileContent.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) return { data: {}, content: fileContent };

  const rawFrontmatter = match[1];
  const markdownContent = match[2];
  const data = {};

  rawFrontmatter.split('\n').forEach(line => {
    const idx = line.indexOf(':');
    if (idx !== -1) {
      const key = line.slice(0, idx).trim();
      let value = line.slice(idx + 1).trim();
      
      // Remove surrounding quotes
      if (value.startsWith('"') && value.endsWith('"')) {
        value = value.slice(1, -1);
      } else if (value.startsWith("'") && value.endsWith("'")) {
        value = value.slice(1, -1);
      }
      
      // Handle simple arrays like: ["ai", "automation"]
      if (value.startsWith('[') && value.endsWith(']')) {
        const arrayStr = value.slice(1, -1);
        value = arrayStr ? arrayStr.split(',').map(s => {
          const v = s.trim();
          return (v.startsWith('"') && v.endsWith('"')) ? v.slice(1, -1) : v;
        }) : [];
      }
      
      data[key] = value;
    }
  });

  return { data, content: markdownContent };
}

/**
 * Calculates reading time based on 200 words per minute.
 * For Arabic, slightly adjusts word count logic if needed.
 */
function calculateReadingTime(text, lang) {
  const words = text.trim().split(/\s+/).length;
  const time = Math.ceil(words / 200);
  return time || 1;
}

/**
 * Get all blog posts, sorted by date (newest first).
 */
export function getAllPosts() {
  const files = import.meta.glob('/src/content/blog/*.md', { query: '?raw', import: 'default', eager: true });
  
  const posts = Object.entries(files).map(([path, content]) => {
    const { data: frontmatter, content: markdownContent } = parseFrontMatter(content);
    const readingTime = calculateReadingTime(markdownContent, frontmatter.lang || 'en');
    
    // Auto-generate a slug if not provided, fallback to filename
    const fallbackSlug = path.split('/').pop().replace(/\.md$/, '');
    const slug = frontmatter.slug || fallbackSlug;

    const cleanedContent = markdownContent.replace(/\\n/g, '\n');
    let htmlContent = marked(cleanedContent);
    // Add diagram placeholder replacement logic for Phase 3
    htmlContent = htmlContent.replace(/<p>\s*<img[^>]*src="[^{]*?\/images\/blog\/diagrams\/([^".]+)\.[^"]*"[^>]*>\s*<\/p>/g, '<!--DIAGRAM:$1-->');
    htmlContent = htmlContent.replace(/<img[^>]*src="[^{]*?\/images\/blog\/diagrams\/([^".]+)\.[^"]*"[^>]*>/g, '<!--DIAGRAM:$1-->');

    return {
      slug,
      ...frontmatter,
      readingTime,
      content: htmlContent,
    };
  });

  // Sort descending by date
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/**
 * Get a specific post by its slug.
 */
export function getPostBySlug(slug) {
  const posts = getAllPosts();
  return posts.find((post) => post.slug === slug);
}
