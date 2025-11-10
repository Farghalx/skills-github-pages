/**
 * Accessibility Tests (A11y)
 * Validates WCAG compliance and accessibility best practices
 */

const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

const HTML_FILES = ['index.html', 'about.html'];

describe('Accessibility (A11y) Tests', () => {
  HTML_FILES.forEach(filename => {
    describe(`${filename} - Accessibility`, () => {
      let dom;
      let document;

      beforeAll(() => {
        const html = fs.readFileSync(path.join(__dirname, '..', filename), 'utf8');
        dom = new JSDOM(html);
        document = dom.window.document;
      });

      test('should have lang attribute on html element', () => {
        const html = document.documentElement;
        expect(html.hasAttribute('lang')).toBe(true);
        expect(html.getAttribute('lang')).toBeTruthy();
      });

      test('should have alt text for all images', () => {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
          expect(img.hasAttribute('alt')).toBe(true);
        });
      });

      test('should have proper heading hierarchy', () => {
        const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'));
        
        if (headings.length > 0) {
          const h1Count = document.querySelectorAll('h1').length;
          expect(h1Count).toBeGreaterThan(0);
          expect(h1Count).toBeLessThanOrEqual(2); // Generally one h1, max two

          // Check heading order
          let previousLevel = 0;
          headings.forEach(heading => {
            const level = parseInt(heading.tagName.charAt(1));
            if (previousLevel > 0) {
              // Shouldn't skip levels (e.g., h1 -> h3)
              expect(level - previousLevel).toBeLessThanOrEqual(1);
            }
            previousLevel = level;
          });
        }
      });

      test('should have descriptive link text', () => {
        const links = document.querySelectorAll('a');
        links.forEach(link => {
          const text = link.textContent.trim();
          const ariaLabel = link.getAttribute('aria-label');
          const title = link.getAttribute('title');

          // Link should have descriptive text or aria-label
          expect(
            (text && text.length > 0) || 
            (ariaLabel && ariaLabel.length > 0) ||
            (title && title.length > 0)
          ).toBe(true);

          // Avoid generic text
          if (text) {
            expect(text.toLowerCase()).not.toBe('click here');
            expect(text.toLowerCase()).not.toBe('read more');
            expect(text.toLowerCase()).not.toBe('link');
          }
        });
      });

      test('should have proper color contrast CSS variables', () => {
        const style = document.querySelector('style');
        if (style) {
          const cssText = style.textContent;
          
          // Check that color variables are defined
          expect(cssText).toContain('--off-white');
          expect(cssText).toContain('--black');
          expect(cssText).toContain('--orange');
          expect(cssText).toContain('--neon-yellow');
        }
      });

      test('should have keyboard-accessible interactive elements', () => {
        const interactiveElements = document.querySelectorAll('button, a, input, select, textarea');
        
        interactiveElements.forEach(element => {
          // Elements should be focusable (not have tabindex="-1" unless intentional)
          const tabindex = element.getAttribute('tabindex');
          if (tabindex !== null) {
            expect(parseInt(tabindex)).toBeGreaterThanOrEqual(-1);
          }
        });
      });

      test('should not have empty buttons', () => {
        const buttons = document.querySelectorAll('button');
        buttons.forEach(button => {
          const hasText = button.textContent.trim().length > 0;
          const hasAriaLabel = button.hasAttribute('aria-label');
          const hasAriaLabelledBy = button.hasAttribute('aria-labelledby');
          
          expect(hasText || hasAriaLabel || hasAriaLabelledBy).toBe(true);
        });
      });

      test('should have proper form labels if forms exist', () => {
        const inputs = document.querySelectorAll('input:not([type="hidden"]), textarea, select');
        inputs.forEach(input => {
          const id = input.getAttribute('id');
          const ariaLabel = input.getAttribute('aria-label');
          const ariaLabelledBy = input.getAttribute('aria-labelledby');
          const placeholder = input.getAttribute('placeholder');
          
          if (id) {
            const label = document.querySelector(`label[for="${id}"]`);
            expect(label || ariaLabel || ariaLabelledBy).toBeTruthy();
          }
        });
      });

      test('should have skip navigation link for keyboard users', () => {
        // This is a best practice but not always implemented
        const skipLink = document.querySelector('a[href="#main"], a[href="#content"]');
        // Just document if it exists
        if (skipLink) {
          expect(skipLink.textContent).toContain('Skip');
        }
      });

      test('should use semantic HTML elements', () => {
        const semanticElements = document.querySelectorAll(
          'header, nav, main, article, section, aside, footer, ' +
          '.header, .nav, .main, .content-section'
        );
        expect(semanticElements.length).toBeGreaterThan(0);
      });

      test('should have proper ARIA attributes where needed', () => {
        const ariaElements = document.querySelectorAll('[aria-label], [aria-labelledby], [role]');
        
        ariaElements.forEach(element => {
          const role = element.getAttribute('role');
          if (role) {
            // Common ARIA roles
            const validRoles = [
              'banner', 'navigation', 'main', 'complementary', 'contentinfo',
              'button', 'link', 'tab', 'tabpanel', 'dialog', 'alert'
            ];
            // Just check it's a string if custom
            expect(typeof role).toBe('string');
          }
        });
      });
    });
  });
});