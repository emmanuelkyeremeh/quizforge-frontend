import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';
import { Zap, FileText, Download, Sparkles, ArrowRight, CheckCircle } from 'lucide-react';
import Button from '../components/ui/Button.jsx';
import Header from '../components/layout/Header.jsx';

export default function Landing() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-bg-primary">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background gradient mesh */}
        <div className="absolute inset-0 gradient-mesh pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative max-w-[1280px] mx-auto px-6 pt-24 pb-32">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-subtle rounded-full border border-primary/20 mb-8">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary-light">AI-Powered Quiz Generation</span>
            </div>
            
            {/* Headline */}
            <h1 className="text-5xl md:text-6xl font-bold text-text-primary mb-6 leading-[1.1] tracking-tight">
              Generate Professional Quizzes
              <br />
              <span className="text-gradient-primary">in Under 2 Minutes</span>
            </h1>
            
            {/* Subheadline */}
            <p className="text-lg md:text-xl text-text-secondary mb-10 leading-relaxed max-w-2xl mx-auto">
              Save 2-3 hours per quiz. Upload your content, and QuizForge creates high-quality questions 
              with explanations and exportable formats.
            </p>
            
            {/* CTAs */}
            <div className="flex items-center justify-center gap-4 mb-8">
              {user ? (
                <Link to="/dashboard">
                  <Button size="lg" icon={ArrowRight} iconPosition="right">
                    Go to Dashboard
                  </Button>
                </Link>
              ) : (
                <>
                  <Link to="/create">
                    <Button size="lg">
                      Try Free — No Signup
                    </Button>
                  </Link>
                  <Link to="/signup">
                    <Button variant="secondary" size="lg">
                      Get Started Free
                    </Button>
                  </Link>
                </>
              )}
            </div>
            
            {/* Pricing hint */}
            <p className="text-sm text-text-tertiary">
              Free: 1 quiz (no signup) • 2 quizzes/month (after signup) • Pro: Unlimited
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-24 border-t border-border">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-text-primary mb-4">
              Built for educators who value their time
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              QuizForge uses advanced AI to understand your content and generate pedagogically sound questions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="card-hover p-8 group">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-subtle to-primary/5 flex items-center justify-center mb-6 group-hover:shadow-glow-primary transition-shadow">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-text-primary mb-3">Lightning Fast</h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                Generate professional quizzes in under 2 minutes. No more spending hours crafting questions.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="card-hover p-8 group">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-emerald/20 to-accent-emerald/5 flex items-center justify-center mb-6 group-hover:shadow-glow-success transition-shadow">
                <FileText className="w-6 h-6 text-accent-emerald" />
              </div>
              <h3 className="text-lg font-semibold text-text-primary mb-3">Multiple Formats</h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                Export to PDF, Moodle XML, Quizlet, or plain text. Works with any LMS system.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="card-hover p-8 group">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-violet/20 to-accent-violet/5 flex items-center justify-center mb-6">
                <Download className="w-6 h-6 text-accent-violet" />
              </div>
              <h3 className="text-lg font-semibold text-text-primary mb-3">Easy Export</h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                One-click export to your preferred format. Ready to use in your course immediately.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 border-t border-border">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-text-primary mb-4">
              How it works
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Upload Content', description: 'Upload a PDF, DOCX, or paste text directly' },
              { step: '02', title: 'Configure', description: 'Choose question count, difficulty, and types' },
              { step: '03', title: 'Generate & Export', description: 'AI creates questions, you review and export' },
            ].map((item, i) => (
              <div key={i} className="relative">
                <div className="text-6xl font-bold text-surface mb-4">{item.step}</div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">{item.title}</h3>
                <p className="text-sm text-text-secondary">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 border-t border-border">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div className="p-12 rounded-2xl bg-gradient-to-br from-primary-subtle to-transparent border border-primary/20 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
            <div className="relative">
              <h2 className="text-3xl font-bold text-text-primary mb-4">
                Ready to save hours on quiz creation?
              </h2>
              <p className="text-text-secondary mb-8">
                Join educators who trust QuizForge to create professional quizzes in minutes.
              </p>
              <Link to={user ? '/dashboard' : '/signup'}>
                <Button size="lg" icon={ArrowRight} iconPosition="right">
                  {user ? 'Go to Dashboard' : 'Get Started Free'}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border">
        <div className="max-w-[1280px] mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-text-secondary">QuizForge</span>
          </div>
          <p className="text-xs text-text-tertiary">
            © {new Date().getFullYear()} QuizForge. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
