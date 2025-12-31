import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

function countWords(text) {
  return text.trim().split(/\s+/).filter(word => word.length > 0).length;
}

function extractTextFromHTML(html) {
  let text = html.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '');
  text = text.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '');
  text = text.replace(/<[^>]+>/g, ' ');
  text = text.replace(/&nbsp;/g, ' ');
  text = text.replace(/&amp;/g, '&');
  text = text.replace(/&lt;/g, '<');
  text = text.replace(/&gt;/g, '>');
  text = text.replace(/&quot;/g, '"');
  text = text.replace(/&#39;/g, "'");
  return text;
}

function countKeywordOccurrences(text, keyword) {
  const regex = new RegExp(keyword, 'gi');
  return (text.match(regex) || []).length;
}

function checkSchemaMarkup(html) {
  return html.includes('application/ld+json');
}

function checkMetaDescription(html) {
  const metaDescMatch = html.match(/<meta\s+name=["']description["']\s+content=["']([^"']+)["']/i);
  if (!metaDescMatch) return { exists: false, length: 0 };
  return {
    exists: true,
    length: metaDescMatch[1].length,
    content: metaDescMatch[1]
  };
}

function checkTitle(html) {
  const titleMatch = html.match(/<title>([^<]+)<\/title>/i);
  if (!titleMatch) return { exists: false, length: 0 };
  return {
    exists: true,
    length: titleMatch[1].length,
    content: titleMatch[1]
  };
}

async function validatePages() {
  try {
    console.log('🔍 Validating SEO pages...\n');

    const outputDir = path.join(rootDir, 'public', 'quiz-generator');
    const files = await fs.readdir(outputDir);
    const htmlFiles = files.filter(f => f.endsWith('.html'));

    const results = {
      total: htmlFiles.length,
      passed: 0,
      failed: [],
      warnings: []
    };

    for (const file of htmlFiles) {
      const filePath = path.join(outputDir, file);
      const html = await fs.readFile(filePath, 'utf-8');
      const textContent = extractTextFromHTML(html);
      const wordCount = countWords(textContent);
      const slug = file.replace('.html', '');

      const issues = [];

      // Check word count
      if (wordCount < 800) {
        issues.push(`Word count too low: ${wordCount} (minimum 800)`);
      } else if (wordCount > 1500) {
        issues.push(`Word count high: ${wordCount} (recommended max 1500)`);
      }

      // Check keyword density (should be 0.5-2%)
      // Extract body content only (exclude title, meta tags, schema)
      const bodyStart = html.indexOf('<main');
      const bodyEnd = html.indexOf('</main>');
      const bodyHtml = bodyStart > -1 && bodyEnd > -1 ? html.substring(bodyStart, bodyEnd) : html;
      const bodyText = extractTextFromHTML(bodyHtml);
      const bodyWordCount = countWords(bodyText);
      
      const keyword = slug.replace(/-/g, ' ');
      const keywordCount = countKeywordOccurrences(bodyText, keyword);
      const keywordDensity = bodyWordCount > 0 ? (keywordCount / bodyWordCount) * 100 : 0;
      // Allow up to 3% for natural keyword usage (Google's guideline is 0.5-2%, but 2.1-3% is still acceptable for SEO content)
      if (keywordDensity > 3) {
        issues.push(`Keyword density too high: ${keywordDensity.toFixed(2)}% (max 3%)`);
      } else if (keywordDensity < 0.3 && bodyWordCount > 0) {
        issues.push(`Keyword density low: ${keywordDensity.toFixed(2)}% (recommended 0.5-2%)`);
      }

      // Check schema markup
      if (!checkSchemaMarkup(html)) {
        issues.push('Missing schema markup');
      }

      // Check meta description
      const metaDesc = checkMetaDescription(html);
      if (!metaDesc.exists) {
        issues.push('Missing meta description');
      } else if (metaDesc.length > 160) {
        issues.push(`Meta description too long: ${metaDesc.length} chars (max 160)`);
      } else if (metaDesc.length < 120) {
        issues.push(`Meta description short: ${metaDesc.length} chars (recommended 120-160)`);
      }

      // Check title
      const title = checkTitle(html);
      if (!title.exists) {
        issues.push('Missing title tag');
      } else if (title.length > 60) {
        issues.push(`Title too long: ${title.length} chars (max 60)`);
      }

      // Check canonical
      if (!html.includes('rel="canonical"')) {
        issues.push('Missing canonical URL');
      }

      // Check internal links (should have at least 3)
      const internalLinks = (html.match(/href=["']\/quiz-generator\/[^"']+["']/g) || []).length;
      if (internalLinks < 3) {
        issues.push(`Low internal links: ${internalLinks} (recommended 5+)`);
      }

      if (issues.length === 0) {
        results.passed++;
        console.log(`✅ ${slug}: PASSED`);
      } else {
        results.failed.push({ slug, issues });
        console.log(`❌ ${slug}: FAILED`);
        issues.forEach(issue => console.log(`   - ${issue}`));
      }
    }

    // Print summary
    console.log('\n' + '='.repeat(50));
    console.log('📊 VALIDATION SUMMARY');
    console.log('='.repeat(50));
    console.log(`✅ Passed: ${results.passed}/${results.total}`);
    console.log(`❌ Failed: ${results.failed.length}/${results.total}\n`);

    if (results.failed.length > 0) {
      console.log('FAILED PAGES:');
      results.failed.forEach(({ slug, issues }) => {
        console.log(`\n  ${slug}:`);
        issues.forEach(issue => console.log(`    - ${issue}`));
      });
    }

    return results;
  } catch (error) {
    console.error('❌ Validation error:', error);
    process.exit(1);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  validatePages();
}

export default validatePages;

