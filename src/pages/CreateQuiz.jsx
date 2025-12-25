import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';
import { useQuizGeneration } from '../hooks/useQuizGeneration.js';
import { hasAnonymousQuiz } from '../lib/indexedDB.js';
import FileDropzone from '../components/upload/FileDropzone.jsx';
import Button from '../components/ui/Button.jsx';
import Input from '../components/ui/Input.jsx';
import Card from '../components/ui/Card.jsx';
import Badge from '../components/ui/Badge.jsx';
import Spinner from '../components/ui/Spinner.jsx';
import ProgressBar from '../components/ui/ProgressBar.jsx';
import { AlertCircle, Sparkles } from 'lucide-react';
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
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-text-primary mb-2">Create New Quiz</h1>
        <p className="text-text-secondary">Upload content and let AI generate questions for you.</p>
      </div>

      {/* Limit warnings */}
      {!user && anonymousLimitReached && (
        <Card className="p-4 mb-6 bg-warning-subtle border-warning/20">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-warning-text mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-text-primary mb-1">Anonymous limit reached</p>
              <p className="text-sm text-text-secondary">
                You've used your free anonymous quiz. <Link to="/signup" className="text-primary hover:underline">Sign up</Link> to generate more!
              </p>
            </div>
          </div>
        </Card>
      )}

      {user && usage && !usage.canCreateQuiz && (
        <Card className="p-4 mb-6 bg-error-subtle border-error/20">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-error-text mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-text-primary mb-1">Quota exceeded</p>
              <p className="text-sm text-text-secondary">
                You've reached your limit ({usage.quizzesCreatedThisMonth}/{usage.limit} quizzes). Upgrade to Pro for unlimited.
              </p>
            </div>
          </div>
        </Card>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Content Source */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-text-primary mb-5">Content Source</h2>
          
          <FileDropzone onFileSelect={setFiles} maxFiles={5} />

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-bg-secondary px-3 text-xs text-text-tertiary uppercase tracking-wider">or paste text</span>
            </div>
          </div>

          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="input min-h-[200px] resize-none"
            placeholder="Paste your content here..."
            disabled={files.length > 0}
          />
        </Card>

        {/* Configuration */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-text-primary mb-5">Quiz Configuration</h2>

          <div className="space-y-6">
            <div>
              <label className="label">Quiz Title (optional)</label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="My Quiz"
              />
            </div>

            <div>
              <label htmlFor="question-count" className="label">
                Number of Questions: <span className="text-primary-light font-semibold">{questionCount}</span>
              </label>
              <input
                id="question-count"
                type="range"
                min="5"
                max="50"
                step="5"
                value={questionCount}
                onChange={(e) => setQuestionCount(Number(e.target.value))}
                className="w-full h-2 bg-bg-tertiary rounded-full appearance-none cursor-pointer accent-primary"
              />
              <div className="flex justify-between text-xs text-text-tertiary mt-1.5">
                <span>5</span>
                <span>50</span>
              </div>
            </div>

            <div>
              <label className="label">Question Types</label>
              <div className="flex gap-4">
                {[
                  { value: 'multiple_choice', label: 'Multiple Choice' },
                  { value: 'true_false', label: 'True/False' },
                ].map((type) => (
                  <label key={type.value} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={types.includes(type.value)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setTypes([...types, type.value]);
                        } else {
                          setTypes(types.filter(t => t !== type.value));
                        }
                      }}
                      className="w-4 h-4 rounded bg-bg-tertiary border-border text-primary focus:ring-primary focus:ring-offset-bg-primary"
                    />
                    <span className="text-sm text-text-secondary">{type.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="label">Difficulty</label>
              <div className="flex gap-3">
                {['easy', 'medium', 'hard', 'mixed'].map((level) => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setDifficulty(level)}
                    className={`
                      px-4 py-2 text-sm font-medium rounded-md capitalize transition-all
                      ${difficulty === level 
                        ? 'bg-primary text-white' 
                        : 'bg-surface text-text-secondary hover:bg-surface-hover'}
                    `}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="label">Subject/Topic (optional)</label>
              <Input
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g., Biology, History, Math"
              />
            </div>
          </div>
        </Card>

        {/* Generation progress */}
        {generating && (
          <Card className="p-6 bg-primary-subtle/10 border-primary/20">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Spinner size="lg" className="text-primary" />
                <div className="flex-1">
                  <p className="text-base font-medium text-text-primary mb-1">
                    {progress || 'Generating quiz...'}
                  </p>
                  <p className="text-sm text-text-secondary">
                    {progress?.includes('Processing') 
                      ? 'Extracting text from your file...'
                      : progress?.includes('Generating')
                      ? 'AI is creating questions based on your content...'
                      : progress?.includes('Finalizing')
                      ? 'Almost done! Preparing your quiz...'
                      : 'This may take up to 30 seconds'}
                  </p>
                </div>
              </div>
              <ProgressBar 
                progress={
                  progress?.includes('Processing') ? 25 :
                  progress?.includes('Generating') ? 60 :
                  progress?.includes('Finalizing') ? 90 : 0
                } 
                animated={true}
              />
            </div>
          </Card>
        )}

        {/* Submit */}
        <Button
          type="submit"
          className="w-full"
          size="lg"
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
