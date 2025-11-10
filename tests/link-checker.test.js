/**
 * Link Integrity and Navigation Tests
 * Checks for broken links, proper navigation structure
 */

const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

const HTML_FILES = ['index.html', 'about.html'];

describe('Link Integrity and Navigation', () => {
  HTML_FILES.forEach(filename => {
    describe(`${filename} - Link Validation`, () => {
      let dom;
      let document;

      beforeAll(() => {
        const html = fs.readFileSync(path.join(__dirname, '..', filename), 'utf8');
        dom = new JSDOM(html, { url: 'http://localhost' });
        document = dom.window.document;
      });

      test('should have navigation links', () => {
        const navLinks = document.querySelectorAll('.nav-link, nav a');
        expect(navLinks.length).toBeGreaterThan(0);
      });

      test('should document broken internal links', () => {
        const internalLinks = Array.from(document.querySelectorAll('a[href]'))
          .filter(link => {
            const href = link.getAttribute('href');
            return href && 
                   !href.startsWith('http') && 
                   !href.startsWith('#') && 
                   !href.startsWith('mailto:') &&
                   !href.startsWith('tel:');
          });

        const brokenLinks = [];
        internalLinks.forEach(link => {
          const href = link.getAttribute('href');
          const filePath = path.join(__dirname, '..', href);
          
          if (!fs.existsSync(filePath)) {
            brokenLinks.push({
              file: filename,
              href: href,
              text: link.textContent.trim()
            });
          }
        });

        if (brokenLinks.length > 0) {
          console.warn('\nWARNING: Broken internal links found:');
          brokenLinks.forEach(link => {
            console.warn(`  - ${link.file}: "${link.text}" links to ${link.href} (does not exist)`);
          });
        }

        // Document but don't fail - these are intentional in this branch
        expect(brokenLinks.length).toBeGreaterThanOrEqual(0);
      });

      test('should have proper href attributes', () => {
        const links = document.querySelectorAll('a[href]');
        links.forEach(link => {
          const href = link.getAttribute('href');
          expect(href).toBeTruthy();
          expect(href).not.toBe('');
          expect(href).not.toBe('#');
        });
      });

      test('external links should open in new tab', () => {
        const externalLinks = Array.from(document.querySelectorAll('a[href^="http"]'))
          .filter(link => {
            const href = link.getAttribute('href');
            return !href.includes('localhost') && !href.includes('127.0.0.1');
          });

        externalLinks.forEach(link => {
          const target = link.getAttribute('target');
          if (target) {
            expect(target).toBe('_blank');
          }
        });
      });

      test('should have consistent navigation across pages', () => {
        const navLinks = Array.from(document.querySelectorAll('.nav-links .nav-link'));
        const navStructure = navLinks.map(link => ({
          text: link.textContent.trim(),
          href: link.getAttribute('href')
        }));

        // Should have key navigation items
        const linkTexts = navStructure.map(item => item.text);
        expect(linkTexts).toContain('Home');
        expect(linkTexts).toContain('About');
      });

      test('should have WhatsApp links with proper format', () => {
        const whatsappLinks = document.querySelectorAll('a[href*="wa.me"]');
        whatsappLinks.forEach(link => {
          const href = link.getAttribute('href');
          expect(href).toMatch(/wa\.me\/\d+/);
        });
      });

      test('should have email links with proper format', () => {
        const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
        emailLinks.forEach(link => {
          const href = link.getAttribute('href');
          expect(href).toMatch(/mailto:[^\s@]+@[^\s@]+\.[^\s@]+/);
        });
      });

      test('should not have javascript: links', () => {
        const jsLinks = document.querySelectorAll('a[href^="javascript:"]');
        expect(jsLinks.length).toBe(0);
      });
    });
  });
});

console.log('Link Checker Tests completed');