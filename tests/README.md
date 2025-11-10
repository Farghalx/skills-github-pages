# Test Suite for Farghal X Website

This test suite provides comprehensive testing for the static HTML website, including:

## Test Categories

### 1. Unit Tests (`*.spec.js`)
- **index.spec.js**: Tests for index.html functionality
  - Page structure and meta tags
  - Navigation and mobile menu
  - Audio functionality
  - Interactive elements
  - Modal functionality
  - Accessibility

- **about.spec.js**: Tests for about.html functionality
  - Content sections
  - Updated navigation structure
  - Skills and stats sections
  - Dynamic content updates
  - Interactive hover effects

### 2. HTML Validation (`html-validation.test.js`)
- Valid HTML5 structure
- Proper meta tags
- Semantic HTML usage
- Unique IDs
- Accessible markup

### 3. Link Integrity (`link-checker.test.js`)
- Internal link validation
- External link safety (target="_blank")
- Broken link detection
- Navigation consistency

### 4. Accessibility (`accessibility.spec.js`)
- WCAG compliance
- Alt text for images
- Proper heading hierarchy
- Keyboard accessibility
- ARIA attributes

### 5. Performance (`performance.spec.js`)
- Resource optimization
- CSS best practices
- File size validation
- DOM depth analysis
- Responsive design

## Running Tests

### Install Dependencies
```bash
npm install
```

### Run All Tests
```bash
npm test
```

### Run Specific Test Suites
```bash
npm run test:html    # HTML validation
npm run test:links   # Link checking
npm run test:all     # All tests including validation
```

### Watch Mode
```bash
npm run test:watch
```

### Coverage Report
```bash
npm run test:coverage
```

## Test Results

Tests validate the changes made in this branch:
- Removed favicon reference
- Simplified navigation structure
- Removed badge/contact card from about.html
- Updated navigation links (added Prompts, Vault, Community, Work)
- Maintained audio functionality and interactive features

## Notes

Some tests document broken internal links (prompts.html, vault.html, etc.) as these pages
are expected to be created in future branches. The tests are designed to be flexible
and will pass when these files are added.