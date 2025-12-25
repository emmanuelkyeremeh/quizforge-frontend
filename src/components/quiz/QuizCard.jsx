import { Link } from 'react-router-dom';
import { MoreVertical, Edit, Copy, Trash2, FileText } from 'lucide-react';
import { format } from 'date-fns';
import Card from '../ui/Card.jsx';
import Badge from '../ui/Badge.jsx';
import { Dropdown, DropdownItem, DropdownDivider } from '../ui/Dropdown.jsx';

export default function QuizCard({ quiz, onDelete, onDuplicate }) {
  const questionCount = quiz.questions?.length || quiz.metadata?.questionCount || 0;
  
  // Safely parse date with validation
  let createdDate = null;
  try {
    if (quiz.createdAt) {
      if (quiz.createdAt.toDate && typeof quiz.createdAt.toDate === 'function') {
        // Firestore timestamp
        createdDate = quiz.createdAt.toDate();
      } else if (quiz.createdAt instanceof Date) {
        // Already a Date object
        createdDate = quiz.createdAt;
      } else if (typeof quiz.createdAt === 'string' || typeof quiz.createdAt === 'number') {
        // String or timestamp
        createdDate = new Date(quiz.createdAt);
      }
    } else if (quiz.timestamp) {
      createdDate = new Date(quiz.timestamp);
    }
    
    // Validate the date
    if (createdDate && (isNaN(createdDate.getTime()) || !createdDate.getTime())) {
      createdDate = null;
    }
  } catch (error) {
    console.error('Error parsing date:', error);
    createdDate = null;
  }
  
  // Fallback to current date if invalid
  if (!createdDate) {
    createdDate = new Date();
  }

  const difficultyColors = {
    easy: 'success',
    medium: 'warning',
    hard: 'error',
  };

  return (
    <Card hoverable className="p-5 group">
      <div className="flex items-start justify-between">
        <Link
          to={`/quiz/${quiz.id || quiz.localId}/edit`}
          className="flex-1 min-w-0"
        >
          <h3 className="text-lg font-semibold text-text-primary mb-3 group-hover:text-primary-light transition-colors truncate">
            {quiz.title}
          </h3>
          
          <div className="flex items-center gap-3 mb-3">
            <div className="flex items-center gap-1.5 text-text-secondary">
              <FileText className="w-4 h-4" />
              <span className="text-sm">{questionCount} questions</span>
            </div>
            {quiz.metadata?.difficulty && (
              <Badge variant={difficultyColors[quiz.metadata.difficulty] || 'neutral'} size="sm">
                {quiz.metadata.difficulty}
              </Badge>
            )}
          </div>
          
          <p className="text-xs text-text-tertiary">
            {createdDate ? format(createdDate, 'MMM d, yyyy') : 'Date unavailable'}
          </p>
        </Link>

        <Dropdown
          trigger={
            <button className="p-1.5 rounded-md hover:bg-surface transition-colors opacity-0 group-hover:opacity-100">
              <MoreVertical className="w-4 h-4 text-text-tertiary" />
            </button>
          }
        >
          <DropdownItem 
            icon={Edit} 
            onClick={() => window.location.href = `/quiz/${quiz.id || quiz.localId}/edit`}
          >
            Edit
          </DropdownItem>
          {onDuplicate && (
            <DropdownItem icon={Copy} onClick={() => onDuplicate(quiz)}>
              Duplicate
            </DropdownItem>
          )}
          {onDelete && (
            <>
              <DropdownDivider />
              <DropdownItem 
                icon={Trash2} 
                danger
                onClick={() => {
                  if (confirm('Are you sure you want to delete this quiz?')) {
                    onDelete(quiz.id || quiz.localId);
                  }
                }}
              >
                Delete
              </DropdownItem>
            </>
          )}
        </Dropdown>
      </div>
    </Card>
  );
}
