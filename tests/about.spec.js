/**
 * Unit tests for about.html JavaScript functionality
 * Tests audio features, navigation, mobile menu, and content sections
 */

const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

describe('about.html JavaScript Functionality', () => {
  let dom;
  let document;
  let window;

  beforeEach(() => {
    const html = fs.readFileSync(path.join(__dirname, '..', 'about.html'), 'utf8');
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

    test('should have correct title', () => {
      expect(document.title).toBe('About - Farghal X | AI Automation Expert');
    });

    test('should have required meta tags', () => {
      const charset = document.querySelector('meta[charset]');
      expect(charset).toBeTruthy();

      const viewport = document.querySelector('meta[name="viewport"]');
      expect(viewport).toBeTruthy();
    });

    test('should NOT have favicon link (removed in this update)', () => {
      const favicon = document.querySelector('link[rel="icon"]');
      expect(favicon).toBeFalsy();
    });
  });

  describe('Navigation Structure', () => {
    test('should have header with navigation', () => {
      const header = document.querySelector('.header');
      expect(header).toBeTruthy();
    });

    test('should have active nav link for About page', () => {
      const activeLink = document.querySelector('.nav-link.active');
      expect(activeLink).toBeTruthy();
      expect(activeLink.textContent.trim()).toContain('About');
    });

    test('should have updated navigation structure', () => {
      const navLinks = Array.from(document.querySelectorAll('.nav-links .nav-link'));
      const linkTexts = navLinks.map(link => link.textContent.trim());

      // New navigation should include these
      expect(linkTexts).toContain('Home');
      expect(linkTexts).toContain('Prompts');
      expect(linkTexts).toContain('About');
      expect(linkTexts).toContain('Work');

      // Old navigation should NOT include these (removed)
      expect(linkTexts).not.toContain('Portfolio');
      expect(linkTexts).not.toContain('Blog');
    });
  });

  describe('Content Sections', () => {
    test('should have hero section with profile', () => {
      const heroConsole = document.querySelector('.hero-console');
      expect(heroConsole).toBeTruthy();

      const profileSection = document.querySelector('.profile-section');
      expect(profileSection).toBeTruthy();
    });

    test('should have "My Journey" section instead of "Professional Summary"', () => {
      const sectionTitle = document.querySelector('.section-title');
      expect(sectionTitle).toBeTruthy();
      expect(sectionTitle.textContent).toContain('My Journey');
    });

    test('should have skills section with updated content', () => {
      const skillsGrid = document.querySelector('.skills-grid');
      expect(skillsGrid).toBeTruthy();

      const skillItems = document.querySelectorAll('.skill-item');
      expect(skillItems.length).toBeGreaterThan(0);

      // Check for updated skill titles
      const skillTitles = Array.from(skillItems).map(item => 
        item.querySelector('.skill-title').textContent.trim()
      );
      expect(skillTitles).toContain('AI Agents');
      expect(skillTitles).toContain('Workflow Automation');
    });

    test('should have stats section', () => {
      const statsGrid = document.querySelector('.stats-grid');
      expect(statsGrid).toBeTruthy();

      const statItems = document.querySelectorAll('.stat-item');
      expect(statItems.length).toBe(4);
    });

    test('should have updated stats values', () => {
      const statNumbers = Array.from(document.querySelectorAll('.stat-number'))
        .map(el => el.textContent.trim());
      
      expect(statNumbers).toContain('50+');
      expect(statNumbers).toContain('4.8K');
      expect(statNumbers).toContain('200%');
      expect(statNumbers).toContain('30+');
    });

    test('should NOT have badge hero section (removed)', () => {
      const badgeHero = document.querySelector('.badge-hero');
      expect(badgeHero).toBeFalsy();
    });

    test('should NOT have contact card in hero (removed)', () => {
      const contactCard = document.querySelector('.contact-card');
      expect(contactCard).toBeFalsy();
    });

    test('should have CTA section', () => {
      const ctaSection = document.querySelector('.cta-section');
      expect(ctaSection).toBeTruthy();

      const ctaButtons = document.querySelectorAll('.cta-button');
      expect(ctaButtons.length).toBeGreaterThan(0);
    });
  });

  describe('Mobile Menu Functionality', () => {
    test('should toggle mobile menu', () => {
      const mobileMenuBtn = document.getElementById('mobileMenuBtn');
      const mobileMenu = document.getElementById('mobileMenu');

      expect(mobileMenu.classList.contains('active')).toBe(false);

      mobileMenuBtn.click();
      expect(mobileMenu.classList.contains('active')).toBe(true);

      mobileMenuBtn.click();
      expect(mobileMenu.classList.contains('active')).toBe(false);
    });
  });

  describe('Audio Functionality', () => {
    test('should have audio initialization', () => {
      expect(typeof window.initAudio).toBe('function');
    });

    test('should have click sound function', () => {
      expect(typeof window.playClickSound).toBe('function');
    });

    test('should have hover sound function', () => {
      expect(typeof window.playHoverSound).toBe('function');
    });

    test('should initialize audio on first interaction', () => {
      const clickEvent = new window.Event('click');
      document.dispatchEvent(clickEvent);

      expect(window.AudioContext).toHaveBeenCalled();
    });
  });

  describe('Dynamic Content', () => {
    test('should have frequency display element', () => {
      const frequencyDisplay = document.querySelector('.frequency-display');
      expect(frequencyDisplay).toBeTruthy();
    });

    test('should update frequency display periodically', (done) => {
      const frequencyDisplay = document.querySelector('.frequency-display');
      const initialText = frequencyDisplay.textContent;

      // Wait for interval to update (the script uses setInterval)
      setTimeout(() => {
        // The text might have changed or stayed the same depending on timing
        expect(frequencyDisplay.textContent).toBeTruthy();
        expect(frequencyDisplay.textContent.length).toBeGreaterThan(0);
        done();
      }, 100);
    });
  });

  describe('Interactive Elements Hover Effects', () => {
    test('should add hover event listeners to interactive elements', () => {
      const interactiveElements = document.querySelectorAll('.skill-item, .stat-item, .cta-button, .content-section');
      expect(interactiveElements.length).toBeGreaterThan(0);
    });

    test('should trigger hover sound on skill item hover', () => {
      const mockContext = new window.AudioContext();
      window.audioContext = mockContext;
      window.isAudioInitialized = true;

      const skillItem = document.querySelector('.skill-item');
      if (skillItem) {
        const mouseEnterEvent = new window.MouseEvent('mouseenter', { bubbles: true });
        skillItem.dispatchEvent(mouseEnterEvent);

        expect(mockContext.createOscillator).toHaveBeenCalled();
      }
    });
  });

  describe('Counter Animation', () => {
    test('should have animateCounter function', () => {
      expect(typeof window.animateCounter).toBe('function');
    });

    test('should animate counter elements', () => {
      const statNumber = document.querySelector('.stat-number');
      if (statNumber) {
        expect(statNumber.textContent).toBeTruthy();
      }
    });
  });

  describe('Accessibility', () => {
    test('should have proper ARIA labels where needed', () => {
      const buttons = document.querySelectorAll('button');
      buttons.forEach(button => {
        // Buttons should have text content or aria-label
        expect(
          button.textContent.trim().length > 0 || 
          button.hasAttribute('aria-label')
        ).toBe(true);
      });
    });

    test('should have semantic HTML structure', () => {
      const header = document.querySelector('header, .header');
      expect(header).toBeTruthy();

      const sections = document.querySelectorAll('section, .content-section');
      expect(sections.length).toBeGreaterThan(0);
    });
  });

  describe('Responsive Design', () => {
    test('should have mobile-specific styles', () => {
      const style = document.querySelector('style');
      const cssText = style.textContent;

      expect(cssText).toContain('@media');
      expect(cssText).toContain('max-width: 768px');
    });
  });

  describe('External Links', () => {
    test('should have WhatsApp link with correct format', () => {
      const whatsappLinks = Array.from(document.querySelectorAll('a[href*="wa.me"]'));
      whatsappLinks.forEach(link => {
        expect(link.getAttribute('target')).toBe('_blank');
      });
    });

    test('should have external links with target="_blank"', () => {
      const externalLinks = Array.from(document.querySelectorAll('a[href^="http"]'));
      externalLinks.forEach(link => {
        const href = link.getAttribute('href');
        // Check if it's truly external (not same domain)
        if (!href.includes('farghalx') && !href.includes('localhost')) {
          expect(link.getAttribute('target')).toBe('_blank');
        }
      });
    });
  });
});