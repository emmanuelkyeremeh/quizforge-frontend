import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';
import { useQuizGeneration } from '../hooks/useQuizGeneration.js';
import { hasAnonymousQuiz } from '../lib/indexedDB.js';
import FileDropzone from '../components/upload/FileDropzone.jsx';
import Button from '../components/ui/Button.jsx';
import Input from '../components/ui/Input.jsx';
import Card from '../components/ui/Card.jsx';
import Spinner from '../components/ui/Spinner.jsx';
import ProgressBar from '../components/ui/ProgressBar.jsx';
import { AlertCircle, Sparkles, ChevronLeft, Layout, FileText, Settings2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function CreateQuiz() {
  const { user, usage } = useAuth();
  const { generateQuiz, generating, progress } = useQuizGeneration();
  const navigate = useNavigate();

  const [content, setContent] = useState('');
  const [files, setFiles] = useState([]);
  const [questionCount, setQuestionCount] = useState(10);
  const [types, setTypes] = useState(['multiple_choice']);
  const [difficulty, setDifficulty] = useState('medium');
  const [subject, setSubject] = useState('');
  const [title, setTitle] = useState('');
  const [anonymousLimitReached, setAnonymousLimitReached] = useState(false);

  useEffect(() => {
    if (!user) {
      hasAnonymousQuiz().then(setAnonymousLimitReached);
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      if (anonymousLimitReached) {
        toast.error('You can only generate 1 quiz without signing up.');
        navigate('/signup');
        return;
      }
    } else if (usage && !usage.canCreateQuiz) {
      toast.error('You have reached your quiz limit.');
      return;
    }

    if (!content && files.length === 0) {
      toast.error('Please provide content or upload files');
      return;
    }

    try {
      const result = await generateQuiz(content, { questionCount, types, difficulty, subject, title }, files);

      if (result.quizId || result.id) {
        navigate(`/quiz/${result.quizId || result.id}/edit`);
      } else {
        navigate(`/quiz/anonymous/edit`, { state: { quiz: result } });
      }
    } catch (error) {
      // Error handled by hook
    }
  };

  return (
    <div className="max-w-[800px] mx-auto space-y-10 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <Button
          variant="ghost"
          size="sm"
          icon={ChevronLeft}
          onClick={() => navigate(user ? '/dashboard' : '/')}
          className="w-fit -ml-2"
        >
          Back
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Create New Quiz</h1>
          <p className="text-text-secondary mt-2">Upload documents or paste text to generate professional questions.</p>
        </div>
      </div>

      {/* Warnings */}
      {((!user && anonymousLimitReached) || (user && usage && !usage.canCreateQuiz)) && (
        <div className="p-4 rounded-lg bg-error/5 border border-error/20 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-error mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-white">Quota reached</p>
            <p className="text-sm text-text-secondary mt-1">
              {!user 
                ? "You've used your free anonymous quiz. Sign up to continue." 
                : `You've reached your limit (${usage.quizzesCreatedThisMonth}/${usage.limit}). Upgrade to Pro for unlimited quizzes.`
              }
            </p>
            <Link to={!user ? "/signup" : "/settings"} className="inline-block mt-3">
              <Button size="sm" variant="secondary">
                {!user ? "Sign up now" : "View Plans"}
              </Button>
            </Link>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Step 1: Content */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-text-primary font-semibold">
            <div className="w-6 h-6 rounded bg-bg-accent border border-border flex items-center justify-center text-xs">1</div>
            <h2>Content Source</h2>
          </div>
          
          <div className="space-y-6">
            <FileDropzone onFileSelect={setFiles} maxFiles={5} />
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border/50"></div>
              </div>
              <div className="relative flex justify-center text-[10px] font-bold tracking-widest uppercase">
                <span className="bg-bg-primary px-4 text-text-tertiary">or paste text</span>
              </div>
            </div>

            <div className="space-y-2">
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full min-h-[240px] p-4 bg-bg-secondary border border-border rounded-lg text-sm text-white placeholder:text-text-tertiary focus:outline-none focus:border-primary/50 transition-colors resize-none leading-relaxed"
                placeholder="Paste your source text, transcript, or notes here..."
                disabled={files.length > 0}
              />
              <p className="text-[11px] text-text-tertiary italic text-right">
                {content.length} characters
              </p>
            </div>
          </div>
        </section>

        {/* Step 2: Configuration */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-text-primary font-semibold">
            <div className="w-6 h-6 rounded bg-bg-accent border border-border flex items-center justify-center text-xs">2</div>
            <h2>Quiz Configuration</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-bg-secondary/50 border border-border p-6 rounded-xl">
            <div className="space-y-2">
              <label className="text-sm font-medium text-text-secondary">Quiz Title</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., F1 2024 Season Recap"
                className="w-full h-10 px-3 bg-bg-secondary border border-border rounded-md text-sm text-white placeholder:text-text-tertiary focus:outline-none focus:border-primary/50 transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="question-count" className="text-sm font-medium text-text-secondary flex justify-between">
                Number of Questions
                <span className="text-primary">{questionCount}</span>
              </label>
              <input
                id="question-count"
                type="range"
                min="5"
                max="50"
                step="5"
                value={questionCount}
                onChange={(e) => setQuestionCount(Number(e.target.value))}
                className="w-full h-1 bg-bg-accent rounded-full appearance-none cursor-pointer accent-primary mt-3"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-text-secondary">Difficulty</label>
              <div className="grid grid-cols-4 gap-2">
                {['easy', 'medium', 'hard', 'mixed'].map((level) => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setDifficulty(level)}
                    className={`
                      h-9 rounded border text-xs font-semibold capitalize transition-all
                      ${difficulty === level 
                        ? 'bg-primary border-primary text-white' 
                        : 'bg-bg-accent border-border text-text-tertiary hover:text-text-secondary hover:border-border-hover'}
                    `}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-text-secondary">Subject (Optional)</label>
              <input
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g., Science, Sports"
                className="w-full h-10 px-3 bg-bg-secondary border border-border rounded-md text-sm text-white placeholder:text-text-tertiary focus:outline-none focus:border-primary/50 transition-colors"
              />
            </div>
          </div>
        </section>

        {/* Generation State */}
        {generating && (
          <div className="p-6 bg-bg-accent/50 border border-border rounded-xl space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full border-2 border-primary/20 border-t-primary animate-spin" />
              <div className="flex-1">
                <p className="text-sm font-semibold text-white tracking-tight">{progress || 'Processing...'}</p>
                <p className="text-xs text-text-tertiary mt-0.5">Our AI is analyzing your content and generating questions.</p>
              </div>
            </div>
            <div className="w-full h-1 bg-bg-primary rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary transition-all duration-500"
                style={{ 
                  width: `${
                    progress?.includes('Processing') ? 30 :
                    progress?.includes('Generating') ? 70 :
                    progress?.includes('Finalizing') ? 95 : 10
                  }%` 
                }}
              />
            </div>
          </div>
        )}

        <Button
          type="submit"
          className="w-full h-12 text-base font-bold bg-white text-black hover:bg-white/90 border-none shadow-xl"
          disabled={generating || (!content && files.length === 0) || (user && usage && !usage.canCreateQuiz)}
          loading={generating}
          icon={Sparkles}
        >
          Generate Quiz
        </Button>
      </form>
    </div>
  );
}
