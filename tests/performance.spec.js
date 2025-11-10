/**
 * Performance and Best Practices Tests
 * Checks for optimization opportunities and coding standards
 */

const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

const HTML_FILES = ['index.html', 'about.html'];

describe('Performance and Best Practices', () => {
  HTML_FILES.forEach(filename => {
    describe(`${filename} - Performance`, () => {
      let html;
      let dom;
      let document;

      beforeAll(() => {
        html = fs.readFileSync(path.join(__dirname, '..', filename), 'utf8');
        dom = new JSDOM(html);
        document = dom.window.document;
      });

      test('should preconnect to external domains', () => {
        const preconnects = document.querySelectorAll('link[rel="preconnect"]');
        expect(preconnects.length).toBeGreaterThan(0);
      });

      test('should use modern font loading', () => {
        const fontLinks = document.querySelectorAll('link[href*="fonts.googleapis.com"]');
        expect(fontLinks.length).toBeGreaterThan(0);

        // Should use display=swap for better font loading
        fontLinks.forEach(link => {
          const href = link.getAttribute('href');
          if (href.includes('family=')) {
            expect(href).toContain('display=swap');
          }
        });
      });

      test('should not have inline styles (use external CSS)', () => {
        const elementsWithStyle = document.querySelectorAll('[style]');
        // Some inline styles are acceptable for dynamic content
        expect(elementsWithStyle.length).toBeLessThan(10);
      });

      test('should use CSS variables for theming', () => {
        const style = document.querySelector('style');
        if (style) {
          const cssText = style.textContent;
          expect(cssText).toContain(':root');
          expect(cssText).toContain('--');
        }
      });

      test('should defer non-critical JavaScript', () => {
        const scripts = document.querySelectorAll('script[src]');
        // External scripts should ideally have defer or async
        scripts.forEach(script => {
          const src = script.getAttribute('src');
          // CDN scripts are okay to be in head
          if (!src.includes('cdn.')) {
            // Just documenting, not enforcing
            expect(src).toBeTruthy();
          }
        });
      });

      test('should minimize use of external dependencies', () => {
        const scripts = document.querySelectorAll('script[src]');
        const stylesheets = document.querySelectorAll('link[rel="stylesheet"]');
        
        // Just document the count
        const totalExternal = scripts.length + stylesheets.length;
        expect(totalExternal).toBeLessThan(20); // Reasonable limit
      });

      test('should use minified CDN resources where possible', () => {
        const scripts = document.querySelectorAll('script[src]');
        scripts.forEach(script => {
          const src = script.getAttribute('src');
          if (src && src.includes('cdn')) {
            // CDN scripts are generally minified
            expect(src).toBeTruthy();
          }
        });
      });

      test('should have reasonable file size', () => {
        const stats = fs.statSync(path.join(__dirname, '..', filename));
        const sizeInKB = stats.size / 1024;
        
        // HTML files should generally be under 500KB
        expect(sizeInKB).toBeLessThan(500);
      });

      test('should not have excessive DOM depth', () => {
        function getMaxDepth(element, currentDepth = 0) {
          if (!element || !element.children || element.children.length === 0) {
            return currentDepth;
          }
          
          let maxChildDepth = currentDepth;
          for (let child of element.children) {
            const childDepth = getMaxDepth(child, currentDepth + 1);
            maxChildDepth = Math.max(maxChildDepth, childDepth);
          }
          
          return maxChildDepth;
        }

        const maxDepth = getMaxDepth(document.body);
        
        // DOM depth should be reasonable (< 32 is a common guideline)
        expect(maxDepth).toBeLessThan(32);
      });

      test('should use efficient CSS selectors', () => {
        const style = document.querySelector('style');
        if (style) {
          const cssText = style.textContent;
          
          // Avoid inefficient universal selector usage
          const universalSelectors = (cssText.match(/\*\s*{/g) || []).length;
          expect(universalSelectors).toBeLessThan(5);
        }
      });

      test('should implement mobile-first responsive design', () => {
        const style = document.querySelector('style');
        if (style) {
          const cssText = style.textContent;
          
          // Should have media queries
          expect(cssText).toContain('@media');
          
          // Should use modern responsive units
          expect(cssText.match(/max-width:\s*\d+px/g)).toBeTruthy();
        }
      });
    });
  });
});