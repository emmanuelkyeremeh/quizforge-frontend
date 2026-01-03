import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';
import { Zap, FileText, Download, ArrowRight, ChevronRight, Check, Clock, Share2, BarChart3, Brain, Target, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '../components/ui/Button.jsx';
import Header from '../components/layout/Header.jsx';
import Logo from '../components/ui/Logo.jsx';
import SEO from '../components/SEO.jsx';
import screenshot1 from '../assets/screenshot_1.png';
import screenshot2 from '../assets/screenshot_2.png';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const staggerContainer = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

export default function Landing() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-bg-primary">
      <SEO 
        title="AI-Powered Quiz Generator"
        description="Generate professional quiz questions instantly with AI. Upload documents, create assessments, and export to your LMS. Perfect for educators and trainers."
        canonical="https://quizforge.pro"
      />
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex flex-col items-center text-center">
            {/* Announcement Badge */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-bg-secondary border border-border mb-8 group cursor-default hover:border-border-hover transition-colors"
            >
              <span className="text-[10px] font-bold tracking-wider uppercase bg-primary text-white px-2 py-0.5 rounded">New</span>
              <span className="text-xs font-medium text-text-secondary">Multiple document support is now live</span>
              <ChevronRight className="w-3 h-3 text-text-tertiary group-hover:text-text-secondary transition-colors" />
            </motion.div>
            
            {/* Headline */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-text-primary mb-6 max-w-5xl leading-[1.05]"
            >
              The system for professional <br className="hidden md:block" />
              <span className="text-text-secondary">AI quiz generation.</span>
            </motion.h1>
            
            {/* Subheadline */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base md:text-lg text-text-secondary mb-10 max-w-2xl leading-relaxed"
            >
              Streamline your education workflow. Upload documents, and let AI build 
              pedagogically sound quizzes in seconds. Purpose-built for educators.
            </motion.p>
            
            {/* CTAs */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center gap-3 mb-16"
            >
              {user ? (
                <Link to="/dashboard">
                  <Button size="lg" className="h-12 px-8 text-sm font-semibold">
                    Open Dashboard
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              ) : (
                <>
                  <Link to="/signup">
                    <Button size="lg" className="h-12 px-8 text-sm font-semibold bg-white text-black hover:bg-white/90 border-none">
                      Start building for free
                    </Button>
                  </Link>
                  <Link to="/create">
                    <Button variant="secondary" size="lg" className="h-12 px-8 text-sm font-semibold">
                      Try demo
                    </Button>
                  </Link>
                </>
              )}
            </motion.div>

            {/* Hero Mockup - Combined Images */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative w-full max-w-6xl"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Image 1 - Always visible */}
                <motion.div 
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl" />
                  <div className="relative rounded-xl border border-border bg-bg-secondary overflow-hidden shadow-xl">
                    {/* Top bar simulation */}
                    <div className="h-8 bg-bg-primary border-b border-border flex items-center px-4 gap-2">
                      <div className="w-2 h-2 rounded-full bg-border" />
                      <div className="w-2 h-2 rounded-full bg-border" />
                      <div className="w-2 h-2 rounded-full bg-border" />
                    </div>
                    <div className="relative overflow-hidden">
                      <img 
                        src={screenshot1}
                        alt="Quiz Editor Interface" 
                        className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                      />
                      {/* Subtle overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/40 via-transparent to-transparent pointer-events-none" />
                    </div>
                  </div>
                  {/* Glow effect */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0 rounded-xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300 -z-10" />
                </motion.div>

                {/* Image 2 - Hidden on smaller screens, visible on lg+ */}
                <motion.div 
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2, delay: 0.1 }}
                  className="relative group hidden lg:block"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl" />
                  <div className="relative rounded-xl border border-border bg-bg-secondary overflow-hidden shadow-xl">
                    {/* Top bar simulation */}
                    <div className="h-8 bg-bg-primary border-b border-border flex items-center px-4 gap-2">
                      <div className="w-2 h-2 rounded-full bg-border" />
                      <div className="w-2 h-2 rounded-full bg-border" />
                      <div className="w-2 h-2 rounded-full bg-border" />
                    </div>
                    <div className="relative overflow-hidden">
                      <img 
                        src={screenshot2}
                        alt="Quiz Creation Interface" 
                        className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                      />
                      {/* Subtle overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/40 via-transparent to-transparent pointer-events-none" />
                    </div>
                  </div>
                  {/* Glow effect */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0 rounded-xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300 -z-10" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section id="features" className="py-24 border-t border-border">
        <div className="max-w-[1400px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4 tracking-tight">
              Everything you need to create professional quizzes
            </h2>
            <p className="text-base text-text-secondary max-w-2xl mx-auto">
              Built with educators in mind. Every feature designed to save you time and improve learning outcomes.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <FeatureCard 
              icon={<Zap className="w-6 h-6 text-primary" />}
              title="Lightning generation"
              description="From document to structured quiz in under 60 seconds. Our custom LLM workflow is optimized for speed."
            />
            <FeatureCard 
              icon={<FileText className="w-6 h-6 text-primary" />}
              title="Smart extraction"
              description="Deep analysis of PDF and DOCX files. We extract core concepts and ignore the noise."
            />
            <FeatureCard 
              icon={<Brain className="w-6 h-6 text-primary" />}
              title="Pedagogical accuracy"
              description="Questions designed to test understanding, not just recall. Built on Bloom's Taxonomy principles."
            />
            <FeatureCard 
              icon={<Download className="w-6 h-6 text-primary" />}
              title="Universal export"
              description="Support for Moodle, Canvas, Blackboard and simple PDF. One-click integration with your LMS."
            />
            <FeatureCard 
              icon={<Share2 className="w-6 h-6 text-primary" />}
              title="Share & Collaborate"
              description="Generate shareable links for students. Track responses and scores in real-time."
            />
            <FeatureCard 
              icon={<Clock className="w-6 h-6 text-primary" />}
              title="Timed Quizzes"
              description="Set time limits and auto-submit. Perfect for assessments and exams."
            />
            <FeatureCard 
              icon={<BarChart3 className="w-6 h-6 text-primary" />}
              title="Analytics & Insights"
              description="View detailed response data, identify knowledge gaps, and improve your content."
            />
            <FeatureCard 
              icon={<Target className="w-6 h-6 text-primary" />}
              title="Customizable Scoring"
              description="Set points per question, control answer visibility, and customize student experience."
            />
            <FeatureCard 
              icon={<Sparkles className="w-6 h-6 text-primary" />}
              title="AI Explanations"
              description="Every answer comes with a generated explanation to help students learn from their mistakes."
            />
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 border-t border-border bg-bg-secondary/30">
        <div className="max-w-[1400px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4 tracking-tight">
              How it works
            </h2>
            <p className="text-base text-text-secondary max-w-2xl mx-auto">
              Three simple steps to create your first professional quiz
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <StepCard 
              number="01"
              title="Upload Content"
              description="Upload PDF, DOCX files, or paste text directly. Support for multiple documents at once."
              icon={<FileText className="w-8 h-8 text-primary" />}
            />
            <StepCard 
              number="02"
              title="Configure Settings"
              description="Choose question count, difficulty level, and question types. Set your preferences."
              icon={<Target className="w-8 h-8 text-primary" />}
            />
            <StepCard 
              number="03"
              title="Generate & Export"
              description="AI creates questions instantly. Review, edit, and export to your preferred format."
              icon={<Sparkles className="w-8 h-8 text-primary" />}
            />
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 border-t border-border">
        <div className="max-w-[1400px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            <StatCard number="60s" label="Average generation time" />
            <StatCard number="100%" label="Pedagogically sound" />
            <StatCard number="5+" label="Export formats" />
            <StatCard number="∞" label="Questions per quiz" />
          </motion.div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-24 border-t border-border bg-bg-secondary/30">
        <div className="max-w-[1400px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-text-primary mb-4 tracking-tight">
              Ready to transform your quiz creation?
            </h2>
            <p className="text-lg text-text-secondary mb-10 max-w-2xl mx-auto">
              Join educators who save hours every week with AI-powered quiz generation.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              {user ? (
                <Link to="/dashboard">
                  <Button size="lg" className="h-12 px-8 text-sm font-semibold">
                    Go to Dashboard
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              ) : (
                <>
                  <Link to="/signup">
                    <Button size="lg" className="h-12 px-8 text-sm font-semibold bg-white text-black hover:bg-white/90 border-none">
                      Get started for free
                    </Button>
                  </Link>
                  <Link to="/create">
                    <Button variant="secondary" size="lg" className="h-12 px-8 text-sm font-semibold">
                      Try without signing up
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Logo size="sm" />
              <span className="text-sm font-semibold text-text-primary tracking-tight">QuizForge</span>
            </div>
            <p className="text-[10px] text-text-tertiary">
              © {new Date().getFullYear()} QuizForge. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <motion.div
      variants={fadeInUp}
      className="p-6 bg-bg-secondary border border-border rounded-lg hover:border-border-hover hover:bg-bg-tertiary transition-all group"
    >
      <div className="mb-4 p-3 rounded-lg bg-bg-primary border border-border inline-block group-hover:border-primary/30 transition-colors">
        {icon}
      </div>
      <h3 className="text-base font-semibold text-text-primary mb-2 tracking-tight">{title}</h3>
      <p className="text-sm text-text-secondary leading-relaxed">{description}</p>
    </motion.div>
  );
}

function StepCard({ number, title, description, icon }) {
  return (
    <motion.div
      variants={fadeInUp}
      className="text-center"
    >
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-bg-secondary border border-border mb-6 group">
        {icon}
      </div>
      <div className="text-5xl font-bold text-text-tertiary mb-4">{number}</div>
      <h3 className="text-lg font-semibold text-text-primary mb-3 tracking-tight">{title}</h3>
      <p className="text-sm text-text-secondary leading-relaxed max-w-sm mx-auto">{description}</p>
    </motion.div>
  );
}

function StatCard({ number, label }) {
  return (
    <motion.div
      variants={fadeInUp}
      className="text-center"
    >
      <div className="text-4xl md:text-5xl font-bold text-text-primary mb-2">{number}</div>
      <div className="text-xs text-text-tertiary uppercase tracking-wider font-semibold">{label}</div>
    </motion.div>
  );
}
