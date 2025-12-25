import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';
import { useQuizzes } from '../hooks/useQuizzes.js';
import { getAnonymousQuizzes } from '../lib/indexedDB.js';
import QuestionCard from '../components/quiz/QuestionCard.jsx';
import Button from '../components/ui/Button.jsx';
import Input from '../components/ui/Input.jsx';
import Spinner from '../components/ui/Spinner.jsx';
import Badge from '../components/ui/Badge.jsx';
import { Download, Save, FileText, ArrowLeft, Share2, Users } from 'lucide-react';
import toast from 'react-hot-toast';
import { api } from '../lib/api.js';
import { Link } from 'react-router-dom';
import ShareQuizModal from '../components/quiz/ShareQuizModal.jsx';

export default function EditQuiz() {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const { fetchQuiz, updateQuiz } = useQuizzes();
  
  const [quiz, setQuiz] = useState(null);
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  useEffect(() => {
    const loadQuiz = async () => {
      try {
        if (quizId === 'anonymous' && location.state?.quiz) {
          setQuiz(location.state.quiz);
          setTitle(location.state.quiz.title || '');
        } else if (!user && quizId !== 'anonymous') {
          const anonymousQuizzes = await getAnonymousQuizzes();
          const found = anonymousQuizzes.find(q => q.localId === quizId);
          if (found) {
            setQuiz(found);
            setTitle(found.title || '');
          } else {
            toast.error('Quiz not found');
            navigate('/dashboard');
          }
        } else if (user) {
          const data = await fetchQuiz(quizId);
          setQuiz(data);
          setTitle(data.title || '');
        }
      } catch (error) {
        toast.error('Failed to load quiz');
        navigate('/dashboard');
      } finally {
        setLoading(false);
      }
    };

    loadQuiz();
  }, [quizId, user, location.state, fetchQuiz, navigate]);

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

    if (!quiz.id && !quiz.quizId) {
      toast.error('This quiz cannot be saved. Please generate a new one after signing up.');
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
      return updated; // Return updated quiz for ShareQuizModal
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
        <div className="text-center">
          <Spinner size="lg" className="mx-auto mb-4" />
          <p className="text-sm text-text-secondary">Loading quiz...</p>
        </div>
      </div>
    );
  }

  if (!quiz) return null;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link to="/dashboard">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div className="flex-1">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-2xl font-bold text-text-primary bg-transparent border-0 outline-none w-full placeholder:text-text-tertiary"
            placeholder="Quiz Title"
          />
          <div className="flex items-center gap-3 mt-1">
            <span className="text-sm text-text-tertiary">{quiz.questions?.length || 0} questions</span>
            {quiz.metadata?.difficulty && (
              <Badge variant="neutral" size="sm">{quiz.metadata.difficulty}</Badge>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          {user && (quiz.id || quiz.quizId) && (
            <>
              <Button 
                variant="secondary" 
                onClick={() => setShowShareModal(true)} 
                icon={Share2}
              >
                Share
              </Button>
              {quiz.isPublic && (
                <Link to={`/quiz/${quiz.id || quiz.quizId}/responses`}>
                  <Button variant="secondary" icon={Users}>
                    Responses
                  </Button>
                </Link>
              )}
              <Button variant="secondary" onClick={() => handleExport('pdf')} icon={Download}>
                PDF
              </Button>
              <Button variant="secondary" onClick={() => handleExport('moodle')} icon={FileText}>
                Moodle
              </Button>
              <Button onClick={handleSave} loading={saving} icon={Save}>
                Save
              </Button>
            </>
          )}
          {!user && (
            <Button onClick={() => navigate('/signup')}>
              Sign Up to Save
            </Button>
          )}
        </div>
      </div>

      {/* Questions */}
      <div className="space-y-4">
        {quiz.questions?.map((question, index) => (
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
        ))}
      </div>

      {quiz.questions?.length === 0 && (
        <div className="card p-12 text-center">
          <p className="text-text-secondary">No questions in this quiz</p>
        </div>
      )}

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
