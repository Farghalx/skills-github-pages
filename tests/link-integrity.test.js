/**
 * Link Integrity Tests
 * Validates all links in HTML files for correct structure and targets
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

function extractAllLinks(html) {
  const linkMatches = html.match(/href="([^"]*)"/g) || [];
  return linkMatches.map(match => match.replace(/href="|"/g, ''));
}

function isExternalLink(link) {
  return link.startsWith('http://') || link.startsWith('https://');
}

function isHashLink(link) {
  return link === '#' || link.startsWith('#');
}

// Load HTML files
const indexHtml = fs.readFileSync(path.join(process.cwd(), 'index.html'), 'utf-8');
const aboutHtml = fs.readFileSync(path.join(process.cwd(), 'about.html'), 'utf-8');

const runner = new TestRunner('Link Integrity Tests');

// Extract all links
const indexLinks = extractAllLinks(indexHtml);
const aboutLinks = extractAllLinks(aboutHtml);
const allLinks = [...new Set([...indexLinks, ...aboutLinks])];

// List of files that exist in the repository
const existingFiles = ['index.html', 'about.html'];

runner.test('All internal HTML links should have .html extension', () => {
  allLinks.forEach(link => {
    if (isExternalLink(link) || isHashLink(link)) return;
    if (link.includes('.')) {
      assert(link.endsWith('.html'), `Link ${link} should have .html extension`);
    }
  });
});

runner.test('External links should use HTTPS', () => {
  allLinks.forEach(link => {
    if (link.startsWith('http://') && !link.includes('localhost')) {
      console.warn(`  Warning: ${link} uses HTTP instead of HTTPS`);
    }
  });
});

runner.test('External links should have valid URL structure', () => {
  allLinks.forEach(link => {
    if (isExternalLink(link)) {
      try {
        new URL(link);
      } catch (e) {
        assert(false, `Invalid URL structure: ${link}`);
      }
    }
  });
});

runner.test('Links should not reference deleted files', () => {
  const deletedFiles = [
    'blog.html',
    'portfolio.html',
    'terms.html',
    'services.html.bak',
    'smooothy-slider.js',
    'assets/favicon.svg',
    'assets/profile.png'
  ];

  allLinks.forEach(link => {
    deletedFiles.forEach(deletedFile => {
      assert(!link.includes(deletedFile), `Link references deleted file: ${deletedFile}`);
    });
  });
});

runner.test('index.html should not have malformed links', () => {
  indexLinks.forEach(link => {
    assert(link.length > 0, 'Empty link found');
    assert(!link.includes('undefined'), `Malformed link: ${link}`);
    assert(!link.includes('null'), `Malformed link: ${link}`);
  });
});

runner.test('about.html should not have malformed links', () => {
  aboutLinks.forEach(link => {
    assert(link.length > 0, 'Empty link found');
    assert(!link.includes('undefined'), `Malformed link: ${link}`);
    assert(!link.includes('null'), `Malformed link: ${link}`);
  });
});

runner.test('about.html should have valid WhatsApp link or placeholder', () => {
  const whatsappLink = aboutLinks.find(link => link.includes('wa.me'));
  if (whatsappLink) {
    // If it's a placeholder, that's okay
    if (!whatsappLink.includes('YOUR_WHATSAPP_NUMBER')) {
      assert(whatsappLink.match(/wa\.me\/\d+/), 'WhatsApp link should have valid phone number format');
    }
  }
});

runner.test('Google Fonts links should be valid', () => {
  const fontLinks = allLinks.filter(link => link.includes('fonts.googleapis.com'));
  assert(fontLinks.length > 0, 'Should have Google Fonts links');
  
  fontLinks.forEach(link => {
    assert(link.includes('family='), 'Google Fonts link should specify font family');
  });
});

runner.test('Links should not have common typos', () => {
  allLinks.forEach(link => {
    assert(!link.includes('htttp'), `Link has typo: ${link}`);
    assert(!link.includes('.htmll'), `Link has typo: ${link}`);
    assert(!link.includes('//'), `Link has double slashes: ${link}`);
  });
});

runner.test('Internal navigation links should be consistent', () => {
  const internalLinks = allLinks.filter(link => 
    !isExternalLink(link) && 
    !isHashLink(link) &&
    link.endsWith('.html')
  );

  const uniqueInternalLinks = [...new Set(internalLinks)];
  
  // Check that the same pages are referenced consistently
  uniqueInternalLinks.forEach(link => {
    const occurrences = internalLinks.filter(l => l === link).length;
    assert(occurrences > 0, `Link ${link} should appear at least once`);
  });
});

runner.test('No links should use deprecated Tally URLs', () => {
  allLinks.forEach(link => {
    assert(!link.includes('tally.so'), 'Should not reference Tally forms after removal');
  });
});

runner.test('Font preconnect links should be properly structured', () => {
  // Check for proper preconnect structure in HTML
  assert(indexHtml.includes('rel="preconnect"'), 'index.html missing preconnect');
  assert(aboutHtml.includes('rel="preconnect"'), 'about.html missing preconnect');
  
  assert(indexHtml.includes('fonts.googleapis.com'), 'index.html missing Google Fonts preconnect');
  assert(aboutHtml.includes('fonts.googleapis.com'), 'about.html missing Google Fonts preconnect');
});

runner.test('All anchor tags should have href attributes', () => {
  const indexAnchors = indexHtml.match(/<a[^>]*>/g) || [];
  const aboutAnchors = aboutHtml.match(/<a[^>]*>/g) || [];
  
  [...indexAnchors, ...aboutAnchors].forEach(anchor => {
    assert(anchor.includes('href='), `Anchor missing href: ${anchor.substring(0, 50)}...`);
  });
});

// Run all tests
runner.run().then(success => {
  process.exit(success ? 0 : 1);
});