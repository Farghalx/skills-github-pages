# Test Suite for Farghal X Website

This test suite validates the HTML structure, navigation consistency, and link integrity of the Farghal X static website.

## Test Files

### 1. html-validation.test.js
Validates HTML structure and semantics:
- DOCTYPE declarations
- HTML lang attributes
- Character encoding
- Viewport meta tags
- Title tags
- Navigation structure
- Removal of deleted assets and scripts
- CSS structure
- Font loading
- Responsive design elements
- Image accessibility

### 2. navigation.test.js
Ensures navigation consistency:
- Presence of new navigation links (prompts.html, vault.html, etc.)
- Absence of links to deleted pages
- Desktop and mobile navigation parity
- Active page indicators
- Relative path usage

### 3. link-integrity.test.js
Validates all links:
- Proper file extensions
- HTTPS usage for external links
- Valid URL structures
- No references to deleted files
- WhatsApp link format
- Google Fonts links
- No common typos
- Consistent internal linking

## Running Tests

### Install dependencies:
```bash
npm install
```

### Run all tests:
```bash
npm test
```

### Run specific test suites:
```bash
npm run test:validation
npm run test:navigation
npm run test:links
```

## Test Philosophy

These tests focus on:
1. **Structural Integrity**: Valid HTML5 structure
2. **Navigation Consistency**: Uniform navigation across pages
3. **Link Validity**: All links are properly formed and don't reference deleted content
4. **Accessibility**: Proper alt attributes and semantic HTML
5. **Responsive Design**: Mobile menu presence
6. **Migration Validation**: Ensuring old elements (Tally, deleted files) are removed

## Edge Cases Covered

- Empty or malformed links
- References to deleted assets
- Inconsistent navigation between desktop and mobile
- Missing accessibility attributes
- Invalid URL structures
- HTTP instead of HTTPS
- Typos in URLs
- Missing meta tags