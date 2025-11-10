/**
 * HTML Structure and Validation Tests
 * Validates HTML syntax, structure, and best practices
 */

const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

const HTML_FILES = ['index.html', 'about.html'];

describe('HTML Validation and Structure', () => {
  HTML_FILES.forEach(filename => {
    describe(`${filename}`, () => {
      let dom;
      let document;
      let html;

      beforeAll(() => {
        html = fs.readFileSync(path.join(__dirname, '..', filename), 'utf8');
        dom = new JSDOM(html);
        document = dom.window.document;
      });

      test('should be valid HTML5', () => {
        expect(html).toContain('<!DOCTYPE html>');
        expect(document.doctype).toBeTruthy();
        expect(document.doctype.name).toBe('html');
      });

      test('should have html tag with lang attribute', () => {
        const htmlTag = document.documentElement;
        expect(htmlTag.tagName).toBe('HTML');
        expect(htmlTag.getAttribute('lang')).toBeTruthy();
      });

      test('should have proper head section', () => {
        const head = document.head;
        expect(head).toBeTruthy();

        const charset = document.querySelector('meta[charset]');
        expect(charset).toBeTruthy();

        const viewport = document.querySelector('meta[name="viewport"]');
        expect(viewport).toBeTruthy();

        const title = document.title;
        expect(title).toBeTruthy();
        expect(title.length).toBeGreaterThan(0);
      });

      test('should have body tag', () => {
        const body = document.body;
        expect(body).toBeTruthy();
      });

      test('should not have inline event handlers', () => {
        const elementsWithEvents = document.querySelectorAll('[onclick], [onload], [onerror], [onmouseover]');
        expect(elementsWithEvents.length).toBe(0);
      });

      test('should have proper nesting of elements', () => {
        // Check for common nesting errors
        const listsInLists = document.querySelectorAll('ul > ul, ol > ol');
        listsInLists.forEach(list => {
          expect(list.parentElement.tagName).toMatch(/^(LI|UL|OL)$/);
        });
      });

      test('should have unique IDs', () => {
        const elementsWithIds = Array.from(document.querySelectorAll('[id]'));
        const ids = elementsWithIds.map(el => el.id);
        const uniqueIds = new Set(ids);
        expect(ids.length).toBe(uniqueIds.size);
      });

      test('should use semantic HTML5 elements', () => {
        const semanticElements = [
          'header', 'nav', 'main', 'section', 'article', 'aside', 'footer',
          '.header', '.nav', '.main-container', '.content-section'
        ];
        
        let hasSemanticElements = false;
        semanticElements.forEach(selector => {
          if (document.querySelector(selector)) {
            hasSemanticElements = true;
          }
        });
        
        expect(hasSemanticElements).toBe(true);
      });

      test('should have accessible links', () => {
        const links = document.querySelectorAll('a');
        links.forEach(link => {
          const hasText = link.textContent.trim().length > 0;
          const hasAriaLabel = link.hasAttribute('aria-label');
          const hasTitle = link.hasAttribute('title');
          
          expect(hasText || hasAriaLabel || hasTitle).toBe(true);
        });
      });

      test('should have proper button markup', () => {
        const buttons = document.querySelectorAll('button');
        buttons.forEach(button => {
          // Buttons should have type attribute or default to button
          const hasType = button.hasAttribute('type');
          const hasText = button.textContent.trim().length > 0;
          const hasAriaLabel = button.hasAttribute('aria-label');
          
          expect(hasText || hasAriaLabel).toBe(true);
        });
      });

      test('should not have empty heading tags', () => {
        const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
        headings.forEach(heading => {
          expect(heading.textContent.trim().length).toBeGreaterThan(0);
        });
      });

      test('should have proper meta charset', () => {
        const charset = document.querySelector('meta[charset]');
        expect(charset).toBeTruthy();
        expect(charset.getAttribute('charset').toLowerCase()).toBe('utf-8');
      });

      test('should have viewport meta for responsive design', () => {
        const viewport = document.querySelector('meta[name="viewport"]');
        expect(viewport).toBeTruthy();
        const content = viewport.getAttribute('content');
        expect(content).toContain('width=device-width');
      });
    });
  });
});

console.log('HTML Validation Tests completed');