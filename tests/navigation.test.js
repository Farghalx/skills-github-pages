/**
 * Navigation Consistency Tests
 * Ensures navigation structure is consistent across pages
 */

const fs = require('fs');
const path = require('path');

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

function extractNavLinks(html) {
  const navSection = html.match(/<nav[^>]*class="nav-links"[^>]*>([\s\S]*?)<\/nav>/);
  if (!navSection) return [];
  
  const linkMatches = navSection[1].match(/href="([^"]*)"/g) || [];
  return linkMatches.map(match => match.replace(/href="|"/g, ''));
}

function extractMobileNavLinks(html) {
  const mobileSection = html.match(/<div[^>]*class="mobile-menu"[^>]*>([\s\S]*?)<\/div>/);
  if (!mobileSection) return [];
  
  const linkMatches = mobileSection[1].match(/href="([^"]*)"/g) || [];
  return linkMatches.map(match => match.replace(/href="|"/g, ''));
}

// Load HTML files
const indexHtml = fs.readFileSync(path.join(process.cwd(), 'index.html'), 'utf-8');
const aboutHtml = fs.readFileSync(path.join(process.cwd(), 'about.html'), 'utf-8');

const runner = new TestRunner('Navigation Consistency Tests');

// Extract navigation links
const indexNavLinks = extractNavLinks(indexHtml);
const aboutNavLinks = extractNavLinks(aboutHtml);
const indexMobileLinks = extractMobileNavLinks(indexHtml);
const aboutMobileLinks = extractMobileNavLinks(aboutHtml);

// Expected navigation structure (new structure based on diff)
const expectedNavLinks = [
  'prompts.html',
  'vault.html',
  'about.html'
];

runner.test('index.html should have new navigation links', () => {
  assert(indexNavLinks.includes('prompts.html'), 'Missing prompts.html link');
  assert(indexNavLinks.includes('vault.html'), 'Missing vault.html link');
  assert(indexNavLinks.includes('about.html'), 'Missing about.html link');
});

runner.test('about.html should have new navigation links', () => {
  assert(aboutNavLinks.includes('prompts.html'), 'Missing prompts.html link');
  assert(aboutNavLinks.includes('vault.html'), 'Missing vault.html link');
  assert(aboutNavLinks.includes('about.html'), 'Missing about.html link');
});

runner.test('index.html should NOT link to deleted pages', () => {
  assert(!indexNavLinks.includes('blog.html'), 'Should not link to deleted blog.html');
  assert(!indexNavLinks.includes('portfolio.html'), 'Should not link to deleted portfolio.html');
  assert(!indexNavLinks.includes('terms.html'), 'Should not link to deleted terms.html');
});

runner.test('about.html should NOT link to deleted pages', () => {
  assert(!aboutNavLinks.includes('blog.html'), 'Should not link to deleted blog.html');
  assert(!aboutNavLinks.includes('portfolio.html'), 'Should not link to deleted portfolio.html');
  assert(!aboutNavLinks.includes('terms.html'), 'Should not link to deleted terms.html');
});

runner.test('index.html should not have old Products & Prompts external link in nav', () => {
  const navSection = indexHtml.match(/<nav[^>]*class="nav-links"[^>]*>([\s\S]*?)<\/nav>/)[1];
  assert(!navSection.includes('ko-fi.com/farghalx/shop'), 'Should not have old ko-fi shop link in nav');
});

runner.test('about.html should not have old Products & Prompts external link in nav', () => {
  const navSection = aboutHtml.match(/<nav[^>]*class="nav-links"[^>]*>([\s\S]*?)<\/nav>/)[1];
  assert(!navSection.includes('ko-fi.com/farghalx/shop'), 'Should not have old ko-fi shop link in nav');
});

runner.test('index.html mobile menu should match desktop navigation', () => {
  assert(indexMobileLinks.length > 0, 'Mobile menu should have links');
  
  // Check key links are present in both
  const keyLinks = ['prompts.html', 'vault.html', 'about.html'];
  keyLinks.forEach(link => {
    const inDesktop = indexNavLinks.includes(link);
    const inMobile = indexMobileLinks.includes(link);
    assert(inDesktop === inMobile, `Link ${link} should be in both desktop and mobile nav`);
  });
});

runner.test('about.html mobile menu should match desktop navigation', () => {
  assert(aboutMobileLinks.length > 0, 'Mobile menu should have links');
  
  // Check key links are present in both
  const keyLinks = ['prompts.html', 'vault.html', 'about.html'];
  keyLinks.forEach(link => {
    const inDesktop = aboutNavLinks.includes(link);
    const inMobile = aboutMobileLinks.includes(link);
    assert(inDesktop === inMobile, `Link ${link} should be in both desktop and mobile nav`);
  });
});

runner.test('about.html should have services.html link', () => {
  assert(aboutNavLinks.includes('services.html'), 'about.html should link to services.html');
});

runner.test('about.html should have consulting.html link', () => {
  assert(aboutNavLinks.includes('consulting.html'), 'about.html should link to consulting.html');
});

runner.test('index.html should have consulting.html link', () => {
  assert(indexNavLinks.includes('consulting.html'), 'index.html should link to consulting.html');
});

runner.test('Navigation links should be relative paths', () => {
  [...indexNavLinks, ...aboutNavLinks].forEach(link => {
    if (link.startsWith('http')) return; // Skip external links
    assert(!link.startsWith('/'), `Link ${link} should be relative, not absolute`);
  });
});

runner.test('about.html should indicate active page in navigation', () => {
  const activeMatch = aboutHtml.match(/class="nav-link active"/);
  assert(activeMatch !== null, 'About page should have active nav-link class');
});

// Run all tests
runner.run().then(success => {
  process.exit(success ? 0 : 1);
});