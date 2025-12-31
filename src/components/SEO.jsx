import { Helmet } from 'react-helmet-async';

export default function SEO({ 
  title, 
  description, 
  canonical,
  ogImage = 'https://quizforge.pro/logo.svg',
  ogType = 'website'
}) {
  const fullTitle = title ? `${title} | QuizForge` : 'QuizForge - AI-Powered Quiz Generator';
  const defaultDescription = 'Generate professional quiz questions instantly with AI. Upload documents, create assessments, and export to your LMS. Perfect for educators and trainers.';
  const finalDescription = description || defaultDescription;
  const canonicalUrl = canonical || 'https://quizforge.pro';

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={finalDescription} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="QuizForge" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={ogImage} />

      {/* Additional SEO */}
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="author" content="QuizForge" />
    </Helmet>
  );
}

