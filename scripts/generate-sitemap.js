import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

async function generateSitemap() {
  try {
    console.log('🗺️  Generating sitemap...\n');

    // Read subjects to get all slugs
    const subjectsPath = path.join(rootDir, 'data', 'subjects.json');
    const subjects = await fs.readJson(subjectsPath);

    // Get current date
    const today = new Date().toISOString().split('T')[0];

    // Start sitemap XML
    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Homepage -->
  <url>
    <loc>https://quizforge.pro/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  
  <!-- Main Pages -->
  <url>
    <loc>https://quizforge.pro/pricing</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  
  <url>
    <loc>https://quizforge.pro/login</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  
  <url>
    <loc>https://quizforge.pro/signup</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  
  <!-- SEO Pages -->
`;

    // Add each subject page
    subjects.forEach(subject => {
      sitemap += `  <url>
    <loc>https://quizforge.pro/quiz-generator/${subject.slug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
`;
    });

    // Close sitemap
    sitemap += `</urlset>`;

    // Write sitemap
    const sitemapPath = path.join(rootDir, 'public', 'sitemap.xml');
    await fs.writeFile(sitemapPath, sitemap, 'utf-8');

    console.log(`✅ Sitemap generated: ${sitemapPath}`);
    console.log(`📄 Total URLs: ${subjects.length + 4}\n`);

    return sitemapPath;
  } catch (error) {
    console.error('❌ Error generating sitemap:', error);
    process.exit(1);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  generateSitemap();
}

export default generateSitemap;

