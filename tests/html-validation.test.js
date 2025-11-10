/**
 * HTML Validation Tests
 * Validates HTML structure, semantics, and accessibility for modified files
 */

const fs = require('fs');
const path = require('path');

// Simple test framework
class TestRunner {
  constructor(suiteName) {
    this.suiteName = suiteName;
    this.tests = [];
    this.passed = 0;
    this.failed = 0;
  }

  test(name, fn) {
    this.tests.push({ name, fn });
  }

  async run() {
    console.log(`\n${'='.repeat(60)}`);
    console.log(`Running: ${this.suiteName}`);
    console.log('='.repeat(60));

    for (const test of this.tests) {
      try {
        await test.fn();
        this.passed++;
        console.log(`✓ ${test.name}`);
      } catch (error) {
        this.failed++;
        console.log(`✗ ${test.name}`);
        console.log(`  Error: ${error.message}`);
      }
    }

    console.log(`\n${'='.repeat(60)}`);
    console.log(`Results: ${this.passed} passed, ${this.failed} failed`);
    console.log(`${'='.repeat(60)}\n`);

    return this.failed === 0;
  }
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message || 'Assertion failed');
  }
}

function assertExists(value, message) {
  assert(value !== null && value !== undefined, message || 'Value should exist');
}

function assertIncludes(haystack, needle, message) {
  assert(
    haystack.includes(needle),
    message || `Expected "${haystack}" to include "${needle}"`
  );
}

function assertNotIncludes(haystack, needle, message) {
  assert(
    !haystack.includes(needle),
    message || `Expected "${haystack}" to not include "${needle}"`
  );
}

// Load HTML files
const indexHtml = fs.readFileSync(path.join(process.cwd(), 'index.html'), 'utf-8');
const aboutHtml = fs.readFileSync(path.join(process.cwd(), 'about.html'), 'utf-8');

const runner = new TestRunner('HTML Validation Tests');

// Basic HTML structure tests
runner.test('index.html should have valid DOCTYPE', () => {
  assertIncludes(indexHtml, '<!DOCTYPE html>', 'Missing DOCTYPE declaration');
});

runner.test('about.html should have valid DOCTYPE', () => {
  assertIncludes(aboutHtml, '<!DOCTYPE html>', 'Missing DOCTYPE declaration');
});

runner.test('index.html should have html lang attribute', () => {
  assertIncludes(indexHtml, '<html lang="en">', 'Missing lang attribute');
});

runner.test('about.html should have html lang attribute', () => {
  assertIncludes(aboutHtml, '<html lang="en">', 'Missing lang attribute');
});

runner.test('index.html should have UTF-8 charset', () => {
  assertIncludes(indexHtml, 'charset="UTF-8"', 'Missing UTF-8 charset');
});

runner.test('about.html should have UTF-8 charset', () => {
  assertIncludes(aboutHtml, 'charset="UTF-8"', 'Missing UTF-8 charset');
});

runner.test('index.html should have viewport meta tag', () => {
  assertIncludes(indexHtml, 'name="viewport"', 'Missing viewport meta tag');
  assertIncludes(indexHtml, 'width=device-width', 'Viewport should include width=device-width');
});

runner.test('about.html should have viewport meta tag', () => {
  assertIncludes(aboutHtml, 'name="viewport"', 'Missing viewport meta tag');
  assertIncludes(aboutHtml, 'width=device-width', 'Viewport should include width=device-width');
});

runner.test('index.html should have a title', () => {
  const titleMatch = indexHtml.match(/<title>(.*?)<\/title>/);
  assertExists(titleMatch, 'Missing title tag');
  assert(titleMatch[1].length > 0, 'Title should not be empty');
});

runner.test('about.html should have a title', () => {
  const titleMatch = aboutHtml.match(/<title>(.*?)<\/title>/);
  assertExists(titleMatch, 'Missing title tag');
  assert(titleMatch[1].length > 0, 'Title should not be empty');
});

// Navigation structure tests
runner.test('index.html should have navigation structure', () => {
  assertIncludes(indexHtml, '<nav', 'Missing nav element');
  assertIncludes(indexHtml, 'nav-link', 'Missing nav-link class');
});

runner.test('about.html should have navigation structure', () => {
  assertIncludes(aboutHtml, '<nav', 'Missing nav element');
  assertIncludes(aboutHtml, 'nav-link', 'Missing nav-link class');
});

// Removed elements tests (files that were deleted)
runner.test('index.html should not reference deleted favicon', () => {
  assertNotIncludes(indexHtml, 'assets/favicon.svg', 'Should not reference deleted favicon');
});

runner.test('about.html should not reference deleted favicon', () => {
  assertNotIncludes(aboutHtml, 'assets/favicon.svg', 'Should not reference deleted favicon');
});

runner.test('index.html should not reference deleted profile image', () => {
  assertNotIncludes(indexHtml, 'assets/profile.png', 'Should not reference deleted profile image');
});

runner.test('about.html should not reference deleted profile image', () => {
  assertNotIncludes(aboutHtml, 'assets/profile.png', 'Should not reference deleted profile image');
});

runner.test('index.html should not reference deleted slider', () => {
  assertNotIncludes(indexHtml, 'smooothy-slider.js', 'Should not reference deleted slider script');
});

runner.test('about.html should not reference deleted slider', () => {
  assertNotIncludes(aboutHtml, 'smooothy-slider.js', 'Should not reference deleted slider script');
});

// Tally integration removal tests
runner.test('index.html should not have Tally embed script', () => {
  assertNotIncludes(indexHtml, 'tally.so/widgets/embed.js', 'Tally script should be removed');
});

runner.test('index.html should not have Tally button styles', () => {
  assertNotIncludes(indexHtml, '.tally-popup-btn', 'Tally button styles should be removed');
  assertNotIncludes(indexHtml, '.tally-button', 'Tally button class should be removed');
});

// CSS structure tests
runner.test('index.html should have valid CSS color variables', () => {
  assertIncludes(indexHtml, '--black:', 'Missing --black CSS variable');
  assertIncludes(indexHtml, '--orange:', 'Missing --orange CSS variable');
  assertIncludes(indexHtml, '--neon-yellow:', 'Missing --neon-yellow CSS variable');
});

runner.test('about.html should have valid CSS color variables', () => {
  assertIncludes(aboutHtml, '--black:', 'Missing --black CSS variable');
  assertIncludes(aboutHtml, '--orange:', 'Missing --orange CSS variable');
  assertIncludes(aboutHtml, '--neon-yellow:', 'Missing --neon-yellow CSS variable');
});

// Font loading tests
runner.test('index.html should preconnect to Google Fonts', () => {
  assertIncludes(indexHtml, 'fonts.googleapis.com', 'Missing Google Fonts preconnect');
  assertIncludes(indexHtml, 'fonts.gstatic.com', 'Missing Google Fonts static preconnect');
});

runner.test('about.html should preconnect to Google Fonts', () => {
  assertIncludes(aboutHtml, 'fonts.googleapis.com', 'Missing Google Fonts preconnect');
  assertIncludes(aboutHtml, 'fonts.gstatic.com', 'Missing Google Fonts static preconnect');
});

runner.test('index.html should load Orbitron and Inter fonts', () => {
  assertIncludes(indexHtml, 'Orbitron', 'Missing Orbitron font');
  assertIncludes(indexHtml, 'Inter', 'Missing Inter font');
});

runner.test('about.html should load Orbitron and Inter fonts', () => {
  assertIncludes(aboutHtml, 'Orbitron', 'Missing Orbitron font');
  assertIncludes(aboutHtml, 'Inter', 'Missing Inter font');
});

// Responsive design tests
runner.test('index.html should have mobile menu structure', () => {
  assertIncludes(indexHtml, 'mobile-menu', 'Missing mobile menu');
  assertIncludes(indexHtml, 'mobile-menu-btn', 'Missing mobile menu button');
});

runner.test('about.html should have mobile menu structure', () => {
  assertIncludes(aboutHtml, 'mobile-menu', 'Missing mobile menu');
  assertIncludes(aboutHtml, 'mobile-menu-btn', 'Missing mobile menu button');
});

// Accessibility tests
runner.test('index.html images should have alt attributes', () => {
  const images = indexHtml.match(/<img[^>]+>/g) || [];
  images.forEach(img => {
    assert(img.includes('alt='), `Image missing alt attribute: ${img.substring(0, 50)}...`);
  });
});

runner.test('about.html images should have alt attributes', () => {
  const images = aboutHtml.match(/<img[^>]+>/g) || [];
  images.forEach(img => {
    assert(img.includes('alt='), `Image missing alt attribute: ${img.substring(0, 50)}...`);
  });
});

// Run all tests
runner.run().then(success => {
  process.exit(success ? 0 : 1);
});