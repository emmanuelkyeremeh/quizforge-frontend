import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';
import { useQuizzes } from '../hooks/useQuizzes.js';
import { getAnonymousQuizzes } from '../lib/indexedDB.js';
import QuizCard from '../components/quiz/QuizCard.jsx';
import Button from '../components/ui/Button.jsx';
import EmptyState from '../components/ui/EmptyState.jsx';
import Spinner from '../components/ui/Spinner.jsx';
import { Plus, FileQuestion, Search, ArrowUpDown, SlidersHorizontal, ChevronDown } from 'lucide-react';
import Input from '../components/ui/Input.jsx';
import { api } from '../lib/api.js';
import toast from 'react-hot-toast';
import { Dropdown, DropdownItem, DropdownDivider } from '../components/ui/Dropdown.jsx';

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

  // Ensure allQuizzes is always an array
  const allQuizzes = Array.isArray(user ? quizzes : anonymousQuizzes) 
    ? (user ? quizzes : anonymousQuizzes) 
    : [];
  
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

    try {
      await api.duplicateQuiz(quiz.id);
      toast.success('Quiz duplicated successfully');
      await fetchQuizzes();
    } catch (error) {
      toast.error('Failed to duplicate quiz');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Spinner size="lg" />
      </div>
    );
  }

  const sortLabel = {
    date: 'Recent',
    name: 'Name',
    questionCount: 'Count'
  }[sortBy];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">My Quizzes</h1>
          <p className="text-xs text-text-tertiary mt-1">
            {allQuizzes.length} total {allQuizzes.length === 1 ? 'quiz' : 'quizzes'}
          </p>
        </div>
        <Link to="/create">
          <Button icon={Plus} variant="default" className="h-9 px-4 text-xs font-semibold">
            Create Quiz
          </Button>
        </Link>
      </div>

      {/* Search and Sort */}
      {allQuizzes.length > 0 && (
        <div className="flex items-center gap-2">
          <div className="relative flex-1 max-w-sm group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-text-tertiary group-focus-within:text-primary transition-colors" />
            <input
              placeholder="Search your quizzes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-9 pl-9 pr-3 bg-bg-secondary border border-border rounded-md text-xs text-white placeholder:text-text-tertiary focus:outline-none focus:border-primary/50 transition-colors"
            />
          </div>
          
          <Dropdown
            trigger={
              <button className="h-9 px-3 flex items-center gap-2 bg-bg-secondary border border-border rounded-md text-xs text-text-secondary hover:text-white hover:bg-bg-tertiary transition-colors font-medium">
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Sort: {sortLabel}</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
            }
          >
            <DropdownItem onClick={() => setSortBy('date')}>Recent</DropdownItem>
            <DropdownItem onClick={() => setSortBy('name')}>Name</DropdownItem>
            <DropdownItem onClick={() => setSortBy('questionCount')}>Question Count</DropdownItem>
            <DropdownDivider />
            <DropdownItem onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}>
              {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
            </DropdownItem>
          </Dropdown>
        </div>
      )}

      {/* Content */}
      {allQuizzes.length === 0 ? (
        <div className="py-16 border border-dashed border-border rounded-lg flex flex-col items-center text-center">
          <div className="w-10 h-10 rounded-full bg-bg-secondary flex items-center justify-center mb-3 border border-border">
            <FileQuestion className="w-5 h-5 text-text-tertiary" />
          </div>
          <h3 className="text-base font-semibold text-white mb-1.5">No quizzes yet</h3>
          <p className="text-xs text-text-tertiary max-w-[240px] mb-6">
            Create your first AI-powered quiz to get started.
          </p>
          <Link to="/create">
            <Button icon={Plus} variant="default" size="sm" className="h-8 px-3 text-xs font-semibold">
              Create Quiz
            </Button>
          </Link>
        </div>
      ) : filteredQuizzes.length === 0 ? (
        <div className="py-16 flex flex-col items-center text-center">
          <Search className="w-6 h-6 text-text-tertiary mb-3 opacity-20" />
          <p className="text-xs text-text-secondary font-medium">No results match your search</p>
        </div>
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
