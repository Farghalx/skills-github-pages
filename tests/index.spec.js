/**
 * Unit tests for index.html JavaScript functionality
 * Tests audio features, navigation, mobile menu, and interactive elements
 */

const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

describe('index.html JavaScript Functionality', () => {
  let dom;
  let document;
  let window;

  beforeEach(() => {
    // Load the HTML file
    const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
    dom = new JSDOM(html, {
      runScripts: 'dangerously',
      resources: 'usable',
      url: 'http://localhost'
    });
    document = dom.window.document;
    window = dom.window;

    // Mock Web Audio API
    window.AudioContext = jest.fn().mockImplementation(() => ({
      createOscillator: jest.fn().mockReturnValue({
        connect: jest.fn(),
        start: jest.fn(),
        stop: jest.fn(),
        frequency: {
          setValueAtTime: jest.fn(),
          exponentialRampToValueAtTime: jest.fn()
        },
        type: 'sine'
      }),
      createGain: jest.fn().mockReturnValue({
        connect: jest.fn(),
        gain: {
          setValueAtTime: jest.fn(),
          exponentialRampToValueAtTime: jest.fn()
        }
      }),
      destination: {},
      currentTime: 0
    }));
    window.webkitAudioContext = window.AudioContext;
  });

  afterEach(() => {
    dom.window.close();
  });

  describe('Page Structure', () => {
    test('should have proper document structure', () => {
      expect(document.doctype).toBeTruthy();
      expect(document.documentElement.lang).toBe('en');
    });

    test('should have required meta tags', () => {
      const charset = document.querySelector('meta[charset]');
      expect(charset).toBeTruthy();
      expect(charset.getAttribute('charset')).toBe('UTF-8');

      const viewport = document.querySelector('meta[name="viewport"]');
      expect(viewport).toBeTruthy();
      expect(viewport.getAttribute('content')).toContain('width=device-width');
    });

    test('should have proper title', () => {
      expect(document.title).toBe('Farghal X - Sell Smarter');
    });

    test('should load external stylesheets', () => {
      const googleFonts = document.querySelectorAll('link[href*="fonts.googleapis.com"]');
      expect(googleFonts.length).toBeGreaterThan(0);
    });

    test('should load Tailwind CSS', () => {
      const tailwind = document.querySelector('script[src*="tailwindcss"]');
      expect(tailwind).toBeTruthy();
    });
  });

  describe('Navigation Structure', () => {
    test('should have header with logo', () => {
      const logo = document.querySelector('.logo');
      expect(logo).toBeTruthy();
      expect(logo.textContent.trim()).toBe('FARGHAL X');
    });

    test('should have navigation links', () => {
      const navLinks = document.querySelectorAll('.nav-link');
      expect(navLinks.length).toBeGreaterThan(0);
    });

    test('should have correct navigation link structure', () => {
      const navLinks = Array.from(document.querySelectorAll('.nav-links .nav-link'));
      expect(navLinks.length).toBeGreaterThanOrEqual(5);
      
      // Check for key navigation items
      const linkTexts = navLinks.map(link => link.textContent.trim());
      expect(linkTexts).toContain('Home');
      expect(linkTexts).toContain('About');
    });

    test('should have mobile menu button', () => {
      const mobileMenuBtn = document.getElementById('mobileMenuBtn');
      expect(mobileMenuBtn).toBeTruthy();
      expect(mobileMenuBtn.textContent.trim()).toBe('☰');
    });

    test('should have mobile menu element', () => {
      const mobileMenu = document.getElementById('mobileMenu');
      expect(mobileMenu).toBeTruthy();
    });
  });

  describe('Mobile Menu Functionality', () => {
    test('should toggle mobile menu on button click', () => {
      const mobileMenuBtn = document.getElementById('mobileMenuBtn');
      const mobileMenu = document.getElementById('mobileMenu');

      // Initial state
      expect(mobileMenu.classList.contains('active')).toBe(false);
      expect(mobileMenuBtn.textContent.trim()).toBe('☰');

      // Simulate click
      mobileMenuBtn.click();
      expect(mobileMenu.classList.contains('active')).toBe(true);
      expect(mobileMenuBtn.textContent.trim()).toBe('✕');

      // Click again to toggle off
      mobileMenuBtn.click();
      expect(mobileMenu.classList.contains('active')).toBe(false);
      expect(mobileMenuBtn.textContent.trim()).toBe('☰');
    });

    test('should close mobile menu when clicking outside', () => {
      const mobileMenuBtn = document.getElementById('mobileMenuBtn');
      const mobileMenu = document.getElementById('mobileMenu');

      // Open menu
      mobileMenuBtn.click();
      expect(mobileMenu.classList.contains('active')).toBe(true);

      // Click outside (on document body)
      const clickEvent = new window.Event('click', { bubbles: true });
      document.body.dispatchEvent(clickEvent);

      // Menu should close
      expect(mobileMenu.classList.contains('active')).toBe(false);
      expect(mobileMenuBtn.textContent.trim()).toBe('☰');
    });
  });

  describe('Audio Functionality', () => {
    test('should have audio initialization function', () => {
      expect(typeof window.initAudio).toBe('function');
    });

    test('should have sound effect functions', () => {
      expect(typeof window.playClickSound).toBe('function');
      expect(typeof window.playHoverSound).toBe('function');
      expect(typeof window.playKnobSound).toBe('function');
    });

    test('should initialize audio context when initAudio is called', () => {
      window.initAudio();
      expect(window.AudioContext).toHaveBeenCalled();
    });

    test('should create oscillator and gain nodes for click sound', () => {
      const mockContext = new window.AudioContext();
      window.audioContext = mockContext;
      window.isAudioInitialized = true;

      window.playClickSound();

      expect(mockContext.createOscillator).toHaveBeenCalled();
      expect(mockContext.createGain).toHaveBeenCalled();
    });

    test('should create oscillator and gain nodes for hover sound', () => {
      const mockContext = new window.AudioContext();
      window.audioContext = mockContext;
      window.isAudioInitialized = true;

      window.playHoverSound();

      expect(mockContext.createOscillator).toHaveBeenCalled();
      expect(mockContext.createGain).toHaveBeenCalled();
    });
  });

  describe('Interactive Elements', () => {
    test('should have radio button elements', () => {
      const radioButtons = document.querySelectorAll('.radio-button');
      expect(radioButtons.length).toBeGreaterThan(0);
    });

    test('should have CTA buttons', () => {
      const ctaButtons = document.querySelectorAll('.cta-button, .whatsapp-btn');
      expect(ctaButtons.length).toBeGreaterThan(0);
    });

    test('should have modal element', () => {
      const modal = document.getElementById('modal');
      expect(modal).toBeTruthy();
    });

    test('should have modal close button', () => {
      const modalClose = document.getElementById('modalClose');
      expect(modalClose).toBeTruthy();
    });
  });

  describe('Modal Functionality', () => {
    test('should have showModal function', () => {
      expect(typeof window.showModal).toBe('function');
    });

    test('should have closeModal function', () => {
      expect(typeof window.closeModal).toBe('function');
    });

    test('should show modal when showModal is called', () => {
      const modal = document.getElementById('modal');
      window.showModal('Test Title', 'Test Content');

      expect(modal.classList.contains('active')).toBe(true);
    });

    test('should close modal when closeModal is called', () => {
      const modal = document.getElementById('modal');
      
      // First open it
      window.showModal('Test', 'Test');
      expect(modal.classList.contains('active')).toBe(true);

      // Then close it
      window.closeModal();
      expect(modal.classList.contains('active')).toBe(false);
    });

    test('should close modal on close button click', () => {
      const modal = document.getElementById('modal');
      const modalClose = document.getElementById('modalClose');

      window.showModal('Test', 'Test');
      expect(modal.classList.contains('active')).toBe(true);

      modalClose.click();
      expect(modal.classList.contains('active')).toBe(false);
    });

    test('should close modal on escape key press', () => {
      const modal = document.getElementById('modal');
      window.showModal('Test', 'Test');

      const escapeEvent = new window.KeyboardEvent('keydown', {
        key: 'Escape',
        bubbles: true
      });
      document.dispatchEvent(escapeEvent);

      expect(modal.classList.contains('active')).toBe(false);
    });
  });

  describe('Accessibility', () => {
    test('should have alt attributes on images', () => {
      const images = document.querySelectorAll('img');
      images.forEach(img => {
        expect(img.hasAttribute('alt')).toBe(true);
      });
    });

    test('should have proper heading hierarchy', () => {
      const h1 = document.querySelectorAll('h1');
      expect(h1.length).toBeGreaterThan(0);
      expect(h1.length).toBeLessThan(3); // Should not have too many h1 tags
    });

    test('should have lang attribute on html tag', () => {
      expect(document.documentElement.lang).toBeTruthy();
      expect(document.documentElement.lang).toBe('en');
    });
  });

  describe('CSS Variables', () => {
    test('should define CSS custom properties', () => {
      const style = document.querySelector('style');
      expect(style).toBeTruthy();
      const cssText = style.textContent;

      // Check for custom CSS variables
      expect(cssText).toContain('--black');
      expect(cssText).toContain('--orange');
      expect(cssText).toContain('--neon-yellow');
      expect(cssText).toContain('--off-white');
    });
  });

  describe('Responsive Design', () => {
    test('should have media queries for mobile', () => {
      const style = document.querySelector('style');
      const cssText = style.textContent;

      expect(cssText).toContain('@media');
      expect(cssText).toContain('max-width');
    });

    test('should have viewport meta tag for responsive design', () => {
      const viewport = document.querySelector('meta[name="viewport"]');
      expect(viewport).toBeTruthy();
      expect(viewport.getAttribute('content')).toContain('width=device-width');
      expect(viewport.getAttribute('content')).toContain('initial-scale=1.0');
    });
  });
});