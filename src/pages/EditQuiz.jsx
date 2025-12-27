import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';
import { useQuizzes } from '../hooks/useQuizzes.js';
import { getAnonymousQuizzes } from '../lib/indexedDB.js';
import QuestionCard from '../components/quiz/QuestionCard.jsx';
import Button from '../components/ui/Button.jsx';
import Spinner from '../components/ui/Spinner.jsx';
import Badge from '../components/ui/Badge.jsx';
import { Download, Save, FileText, ChevronLeft, Share2, Users, MoreHorizontal, Settings2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { api } from '../lib/api.js';
import { Dropdown, DropdownItem, DropdownDivider } from '../components/ui/Dropdown.jsx';
import ShareQuizModal from '../components/quiz/ShareQuizModal.jsx';

export default function EditQuiz() {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, loading: authLoading } = useAuth();
  const { fetchQuiz, updateQuiz } = useQuizzes();
  
  const [quiz, setQuiz] = useState(null);
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  useEffect(() => {
    // Don't load quiz until auth state is determined
    if (authLoading) {
      setLoading(true);
      return; // Still loading auth state
    }

    const loadQuiz = async () => {
      try {
        if (quizId === 'anonymous') {
          // Anonymous quiz - try location state first, then IndexedDB
          if (location.state?.quiz) {
            setQuiz(location.state.quiz);
            setTitle(location.state.quiz.title || '');
            setLoading(false);
            return;
          } else {
            const anonymousQuizzes = await getAnonymousQuizzes();
            const found = anonymousQuizzes.find(q => q.localId === quizId || q.id === quizId);
            if (found) {
              setQuiz(found);
              setTitle(found.title || '');
              setLoading(false);
              return;
            } else {
              toast.error('Quiz not found');
              navigate('/dashboard');
              return;
            }
          }
        }
        
        // For non-anonymous quizzes, check if user is authenticated
        if (user) {
          // Authenticated user - fetch from API
          try {
            const data = await fetchQuiz(quizId);
            if (data) {
              setQuiz(data);
              setTitle(data.title || '');
              setLoading(false);
              return;
            } else {
              toast.error('Quiz not found');
              navigate('/dashboard');
              return;
            }
          } catch (fetchError) {
            // Check if it's a 404 (quiz doesn't exist) vs other errors
            const errorMessage = fetchError.message || '';
            const is404 = errorMessage.toLowerCase().includes('not found') || 
                         errorMessage.includes('404') ||
                         errorMessage.toLowerCase().includes('404');
            
            if (is404) {
              // Quiz doesn't exist in database
              toast.error('Quiz not found');
              navigate('/dashboard');
              return;
            } else {
              // Other errors (network, auth, etc.) - show error but don't redirect
              console.error('Error fetching quiz:', fetchError);
              toast.error('Failed to load quiz. Please try refreshing the page.');
              setLoading(false);
              return;
            }
          }
        } else {
          // Not logged in - try IndexedDB as fallback
          const anonymousQuizzes = await getAnonymousQuizzes();
          const found = anonymousQuizzes.find(q => q.localId === quizId || q.id === quizId);
          if (found) {
            setQuiz(found);
            setTitle(found.title || '');
            setLoading(false);
            return;
          } else {
            // Quiz not found anywhere - show error but don't redirect to login
            // User might be in the process of logging in
            toast.error('Quiz not found. If you own this quiz, please sign in.');
            setLoading(false);
            return;
          }
        }
      } catch (error) {
        console.error('Error loading quiz:', error);
        toast.error('Failed to load quiz. Please try refreshing the page.');
        setLoading(false);
      }
    };

    loadQuiz();
  }, [quizId, user, authLoading, location.state, fetchQuiz, navigate]);

  const handleUpdateQuestion = (index, updatedQuestion) => {
    const newQuestions = [...quiz.questions];
    newQuestions[index] = updatedQuestion;
    setQuiz({ ...quiz, questions: newQuestions });
  };

  const handleDeleteQuestion = (index) => {
    const newQuestions = quiz.questions.filter((_, i) => i !== index);
    setQuiz({ ...quiz, questions: newQuestions });
  };

  const handleReorderQuestions = (fromIndex, toIndex) => {
    const newQuestions = [...quiz.questions];
    const [moved] = newQuestions.splice(fromIndex, 1);
    newQuestions.splice(toIndex, 0, moved);
    setQuiz({ ...quiz, questions: newQuestions });
  };

  const handleSave = async () => {
    if (!user) {
      toast.error('Please sign up to save quizzes');
      navigate('/signup');
      return;
    }

    setSaving(true);
    try {
      const updated = await updateQuiz(quiz.id || quiz.quizId, { title, questions: quiz.questions });
      setQuiz(updated);
      toast.success('Quiz saved');
    } catch (error) {
      toast.error('Failed to save quiz');
    } finally {
      setSaving(false);
    }
  };

  const handleUpdateShareSettings = async (settings) => {
    if (!user || (!quiz.id && !quiz.quizId)) {
      toast.error('Please sign up to share quizzes');
      return;
    }

    setSaving(true);
    try {
      const updated = await updateQuiz(quiz.id || quiz.quizId, settings);
      setQuiz(updated);
      return updated;
    } catch (error) {
      toast.error('Failed to update share settings');
      throw error;
    } finally {
      setSaving(false);
    }
  };

  const handleExport = async (format) => {
    if (!user || (!quiz.id && !quiz.quizId)) {
      toast.error('Please sign up to export quizzes');
      return;
    }

    try {
      const blob = await api.exportQuiz(quiz.id || quiz.quizId, format);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `quiz-${quiz.id || quiz.quizId}.${format === 'pdf' ? 'pdf' : format === 'moodle' ? 'xml' : 'txt'}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      toast.success('Quiz exported');
    } catch (error) {
      toast.error('Failed to export quiz');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!quiz) return null;

  return (
    <div className="max-w-[1000px] mx-auto animate-fade-in space-y-8">
      {/* Editor Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-border">
        <div className="flex-1 space-y-4">
          <Button
            variant="ghost"
            size="sm"
            icon={ChevronLeft}
            onClick={() => navigate(user ? '/dashboard' : '/create')}
            className="w-fit -ml-2"
          >
            Back
          </Button>
          
          <div className="space-y-2">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-3xl font-bold text-white bg-transparent border-none p-0 focus:outline-none w-full placeholder:text-text-tertiary"
              placeholder="Untitled Quiz"
            />
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold text-text-tertiary uppercase tracking-wider">
                {quiz.questions?.length || 0} questions
              </span>
              <span className="w-1 h-1 rounded-full bg-border" />
              <Badge variant="neutral" className="bg-bg-accent text-[10px] py-0.5 px-1.5 uppercase font-bold tracking-tight">
                {quiz.metadata?.difficulty || 'medium'}
              </Badge>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {user && (quiz.id || quiz.quizId) ? (
            <>
              <Button 
                variant="secondary" 
                size="sm"
                onClick={() => setShowShareModal(true)} 
                icon={Share2}
                className="h-9 px-4 font-semibold"
              >
                Share
              </Button>
              
              <Dropdown
                trigger={
                  <Button variant="secondary" size="sm" className="h-9 w-9 p-0">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                }
              >
                <DropdownItem 
                  icon={Users} 
                  onClick={() => navigate(`/quiz/${quiz.id || quiz.quizId}/responses`)}
                >
                  View Responses
                </DropdownItem>
                <DropdownDivider />
                <DropdownItem icon={Download} onClick={() => handleExport('pdf')}>
                  Export as PDF
                </DropdownItem>
                <DropdownItem icon={FileText} onClick={() => handleExport('moodle')}>
                  Export for Moodle
                </DropdownItem>
                <DropdownItem icon={FileText} onClick={() => handleExport('text')}>
                  Export as Text
                </DropdownItem>
              </Dropdown>

              <Button 
                onClick={handleSave} 
                loading={saving} 
                icon={Save}
                className="h-9 px-5 bg-white text-black hover:bg-white/90 border-none font-bold shadow-lg ml-2"
              >
                Save Changes
              </Button>
            </>
          ) : (
            <Button onClick={() => navigate('/signup')} className="bg-white text-black hover:bg-white/90 border-none font-bold shadow-lg">
              Sign Up to Save
            </Button>
          )}
        </div>
      </div>

      {/* Editor Content */}
      <div className="space-y-6">
        {quiz.questions?.length > 0 ? (
          quiz.questions.map((question, index) => (
            <QuestionCard
              key={question.id || index}
              question={question}
              index={index}
              onUpdate={(updated) => handleUpdateQuestion(index, updated)}
              onDelete={handleDeleteQuestion}
              onMove={(direction) => {
                if (direction === 'up' && index > 0) {
                  handleReorderQuestions(index, index - 1);
                } else if (direction === 'down' && index < quiz.questions.length - 1) {
                  handleReorderQuestions(index, index + 1);
                }
              }}
              canMoveUp={index > 0}
              canMoveDown={index < quiz.questions.length - 1}
            />
          ))
        ) : (
          <div className="py-20 border border-dashed border-border rounded-xl flex flex-col items-center text-center">
            <p className="text-text-tertiary">This quiz has no questions.</p>
          </div>
        )}
      </div>

      {/* Share Modal */}
      {user && (quiz.id || quiz.quizId) && (
        <ShareQuizModal
          isOpen={showShareModal}
          onClose={() => setShowShareModal(false)}
          quiz={quiz}
          onUpdate={handleUpdateShareSettings}
        />
      )}
    </div>
  );
}
