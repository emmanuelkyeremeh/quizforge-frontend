import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';
import { useQuizzes } from '../hooks/useQuizzes.js';
import { getAnonymousQuizzes } from '../lib/indexedDB.js';
import QuizCard from '../components/quiz/QuizCard.jsx';
import Button from '../components/ui/Button.jsx';
import EmptyState from '../components/ui/EmptyState.jsx';
import Spinner from '../components/ui/Spinner.jsx';
import { Plus, FileQuestion, Search, ArrowUpDown } from 'lucide-react';
import Input from '../components/ui/Input.jsx';
import { api } from '../lib/api.js';
import toast from 'react-hot-toast';

export default function Dashboard() {
  const { user } = useAuth();
  const { quizzes, fetchQuizzes, deleteQuiz } = useQuizzes();
  const [anonymousQuizzes, setAnonymousQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('date'); // 'date', 'name', 'questionCount'
  const [sortOrder, setSortOrder] = useState('desc'); // 'asc', 'desc'

  useEffect(() => {
    if (user) {
      fetchQuizzes().catch((error) => {
        console.error('Error fetching quizzes:', error);
      }).finally(() => setLoading(false));
    } else {
      getAnonymousQuizzes().then(setAnonymousQuizzes).catch((error) => {
        console.error('Error fetching anonymous quizzes:', error);
      }).finally(() => setLoading(false));
    }
  }, [user, fetchQuizzes]);

  const allQuizzes = user ? quizzes : anonymousQuizzes;
  
  const filteredQuizzes = allQuizzes.filter(quiz => 
    quiz.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort quizzes
  const sortedQuizzes = [...filteredQuizzes].sort((a, b) => {
    let comparison = 0;
    
    if (sortBy === 'date') {
      const dateA = a.createdAt?.toDate ? a.createdAt.toDate() : (a.createdAt ? new Date(a.createdAt) : new Date(0));
      const dateB = b.createdAt?.toDate ? b.createdAt.toDate() : (b.createdAt ? new Date(b.createdAt) : new Date(0));
      comparison = dateA.getTime() - dateB.getTime();
    } else if (sortBy === 'name') {
      comparison = (a.title || '').localeCompare(b.title || '');
    } else if (sortBy === 'questionCount') {
      const countA = a.questions?.length || 0;
      const countB = b.questions?.length || 0;
      comparison = countA - countB;
    }
    
    return sortOrder === 'asc' ? comparison : -comparison;
  });

  const handleDuplicateQuiz = async (quiz) => {
    if (!user) {
      toast.error('Please sign up to duplicate quizzes');
      return;
    }

    if (!quiz.id && !quiz.quizId) {
      toast.error('Cannot duplicate anonymous quiz');
      return;
    }

    try {
      await api.duplicateQuiz(quiz.id || quiz.quizId);
      toast.success('Quiz duplicated successfully');
      // Refresh quizzes list
      await fetchQuizzes();
    } catch (error) {
      toast.error('Failed to duplicate quiz');
      console.error('Error duplicating quiz:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Spinner size="lg" className="mx-auto mb-4" />
          <p className="text-sm text-text-secondary">Loading quizzes...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-text-primary mb-1">My Quizzes</h1>
          <p className="text-sm text-text-tertiary">
            {allQuizzes.length} {allQuizzes.length === 1 ? 'quiz' : 'quizzes'}
          </p>
        </div>
        <Link to="/create">
          <Button icon={Plus}>
            Create Quiz
          </Button>
        </Link>
      </div>

      {/* Search and Sort (if has quizzes) */}
      {allQuizzes.length > 0 && (
        <div className="mb-6 flex items-center gap-4 flex-wrap">
          <Input
            placeholder="Search quizzes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            icon={Search}
            className="max-w-sm"
          />
          <div className="flex items-center gap-2">
            <ArrowUpDown className="w-4 h-4 text-text-tertiary" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="input text-sm py-1.5 px-3"
            >
              <option value="date">Date</option>
              <option value="name">Name</option>
              <option value="questionCount">Questions</option>
            </select>
            <button
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              className="px-3 py-1.5 text-sm bg-surface border border-border rounded-md hover:bg-surface-hover transition-colors"
              aria-label={`Sort ${sortOrder === 'asc' ? 'descending' : 'ascending'}`}
            >
              {sortOrder === 'asc' ? '↑' : '↓'}
            </button>
          </div>
        </div>
      )}

      {/* Content */}
      {allQuizzes.length === 0 ? (
        <EmptyState
          icon={FileQuestion}
          title="No quizzes yet"
          description={user 
            ? "Create your first quiz to get started"
            : "Generate your first quiz to see it here"}
          action={{
            label: "Create Quiz",
            icon: Plus,
            onClick: () => window.location.href = '/create'
          }}
        />
      ) : filteredQuizzes.length === 0 ? (
        <EmptyState
          icon={Search}
          title="No results found"
          description={`No quizzes match "${searchQuery}"`}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sortedQuizzes.map((quiz) => (
            <QuizCard
              key={quiz.id || quiz.localId}
              quiz={quiz}
              onDelete={user ? deleteQuiz : undefined}
              onDuplicate={user ? handleDuplicateQuiz : undefined}
            />
          ))}
        </div>
      )}
    </div>
  );
}
