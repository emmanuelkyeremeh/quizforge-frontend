import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import Handlebars from 'handlebars';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Helper function to count words in text
function countWords(text) {
  return text.trim().split(/\s+/).filter(word => word.length > 0).length;
}

// Helper function to extract text content from HTML
function extractTextFromHTML(html) {
  // Remove script and style tags
  let text = html.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '');
  text = text.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '');
  // Remove HTML tags
  text = text.replace(/<[^>]+>/g, ' ');
  // Decode HTML entities
  text = text.replace(/&nbsp;/g, ' ');
  text = text.replace(/&amp;/g, '&');
  text = text.replace(/&lt;/g, '<');
  text = text.replace(/&gt;/g, '>');
  text = text.replace(/&quot;/g, '"');
  text = text.replace(/&#39;/g, "'");
  return text;
}

// Register Handlebars helpers
Handlebars.registerHelper('eq', function(a, b) {
  return a === b;
});

Handlebars.registerHelper('replace', function(str, find, replace) {
  return str.replace(new RegExp(find, 'g'), replace);
});

async function generateSEOPages() {
  try {
    console.log('🚀 Starting SEO page generation...\n');

    // Read subjects data
    const subjectsPath = path.join(rootDir, 'data', 'subjects.json');
    const subjects = await fs.readJson(subjectsPath);
    console.log(`📚 Loaded ${subjects.length} subjects\n`);

    // Read template
    const templatePath = path.join(rootDir, 'scripts', 'template.hbs');
    const templateContent = await fs.readFile(templatePath, 'utf-8');
    const template = Handlebars.compile(templateContent);

    // Ensure output directory exists
    const outputDir = path.join(rootDir, 'public', 'quiz-generator');
    await fs.ensureDir(outputDir);

    const results = {
      generated: 0,
      errors: [],
      warnings: [],
      wordCounts: []
    };

    // Generate pages
    for (const subject of subjects) {
      try {
        // Create short description for meta tag (max 160 chars)
        const fullDescription = `Generate ${subject.name} quiz questions instantly. Upload study materials and get AI-powered quizzes with answer keys. Perfect for ${subject.targetAudience}.`;
        const shortDescription = fullDescription.length > 160 
          ? fullDescription.substring(0, 157) + '...'
          : fullDescription;
        
        // Create short title (max 60 chars including " - Free AI Tool | QuizForge")
        const titleSuffix = " - Free AI Tool | QuizForge";
        const maxTitleLength = 60 - titleSuffix.length;
        const shortTitle = subject.name.length > maxTitleLength
          ? subject.name.substring(0, maxTitleLength - 3) + '...'
          : subject.name;
        
        // Add shortDescription and shortTitle to subject data
        const subjectWithMeta = {
          ...subject,
          shortDescription,
          shortTitle
        };
        
        // Compile template with subject data
        const html = template(subjectWithMeta);

        // Validate word count
        const textContent = extractTextFromHTML(html);
        const wordCount = countWords(textContent);

        results.wordCounts.push({
          slug: subject.slug,
          wordCount
        });

        if (wordCount < 800) {
          results.warnings.push(
            `⚠️  ${subject.slug}: Only ${wordCount} words (minimum 800 required)`
          );
        } else if (wordCount > 1500) {
          results.warnings.push(
            `⚠️  ${subject.slug}: ${wordCount} words (recommended max 1500)`
          );
        }

        // Write HTML file
        const outputPath = path.join(outputDir, `${subject.slug}.html`);
        await fs.writeFile(outputPath, html, 'utf-8');

        results.generated++;
        console.log(`✅ Generated: ${subject.slug}.html (${wordCount} words)`);
      } catch (error) {
        results.errors.push(`❌ ${subject.slug}: ${error.message}`);
        console.error(`❌ Error generating ${subject.slug}:`, error.message);
      }
    }

    // Print summary
    console.log('\n' + '='.repeat(50));
    console.log('📊 GENERATION SUMMARY');
    console.log('='.repeat(50));
    console.log(`✅ Successfully generated: ${results.generated} pages`);
    console.log(`⚠️  Warnings: ${results.warnings.length}`);
    console.log(`❌ Errors: ${results.errors.length}\n`);

    if (results.warnings.length > 0) {
      console.log('WARNINGS:');
      results.warnings.forEach(w => console.log(`  ${w}`));
      console.log('');
    }

    if (results.errors.length > 0) {
      console.log('ERRORS:');
      results.errors.forEach(e => console.log(`  ${e}`));
      console.log('');
    }

    // Word count statistics
    const avgWords = results.wordCounts.reduce((sum, w) => sum + w.wordCount, 0) / results.wordCounts.length;
    const minWords = Math.min(...results.wordCounts.map(w => w.wordCount));
    const maxWords = Math.max(...results.wordCounts.map(w => w.wordCount));

    console.log('WORD COUNT STATISTICS:');
    console.log(`  Average: ${Math.round(avgWords)} words`);
    console.log(`  Minimum: ${minWords} words`);
    console.log(`  Maximum: ${maxWords} words`);
    console.log(`  Pages < 800 words: ${results.wordCounts.filter(w => w.wordCount < 800).length}`);
    console.log(`  Pages 800-1500 words: ${results.wordCounts.filter(w => w.wordCount >= 800 && w.wordCount <= 1500).length}`);
    console.log(`  Pages > 1500 words: ${results.wordCounts.filter(w => w.wordCount > 1500).length}\n`);

    console.log('✨ SEO page generation complete!');
    console.log(`📁 Pages saved to: ${outputDir}\n`);

    return results;
  } catch (error) {
    console.error('❌ Fatal error:', error);
    process.exit(1);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  generateSEOPages();
}

export default generateSEOPages;

