import { forwardRef } from 'react';
import { format } from 'date-fns';
import { FileText, MoreVertical, Trash2, Edit3, Share2, Copy, FileQuestion } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Dropdown, DropdownItem, DropdownDivider } from '../ui/Dropdown.jsx';
import Badge from '../ui/Badge.jsx';

export default function QuizCard({ quiz, onDelete, onDuplicate }) {
  const { id, title, metadata, createdAt, questions, localId } = quiz;
  const questionCount = questions?.length || metadata?.questionCount || 0;
  const difficulty = metadata?.difficulty || 'medium';
  
  // Format date safely
  const formattedDate = createdAt ? (() => {
    try {
      const date = createdAt?.toDate ? createdAt.toDate() : new Date(createdAt);
      return format(date, 'MMM d, yyyy');
    } catch (e) {
      return 'Recently';
    }
  })() : 'Recently';

  const quizId = id || localId;

  return (
    <div className="group relative bg-bg-secondary border border-border rounded-lg p-4 hover:border-border-hover transition-colors">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="p-1.5 rounded bg-bg-primary border border-border">
            <FileQuestion className="w-3.5 h-3.5 text-text-tertiary" />
          </div>
          
          <Dropdown
            trigger={
              <button className="p-1 rounded opacity-0 group-hover:opacity-100 hover:bg-bg-tertiary transition-all text-text-tertiary">
                <MoreVertical className="w-3.5 h-3.5" />
              </button>
            }
          >
            <DropdownItem icon={Edit3} as={Link} to={`/quiz/${quizId}/edit`}>
              Edit Quiz
            </DropdownItem>
            {onDuplicate && (
              <DropdownItem icon={Copy} onClick={() => onDuplicate(quiz)}>
                Duplicate
              </DropdownItem>
            )}
            <DropdownDivider />
            <DropdownItem 
              icon={Trash2} 
              onClick={() => onDelete(quizId)}
              className="text-error hover:bg-error/10 hover:text-error"
            >
              Delete
            </DropdownItem>
          </Dropdown>
        </div>

        {/* Content */}
        <Link to={`/quiz/${quizId}/edit`} className="flex-1">
          <h3 className="text-sm font-semibold text-text-primary mb-2 line-clamp-2 leading-snug group-hover:text-primary transition-colors">
            {title || 'Untitled Quiz'}
          </h3>
          
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1.5 text-[11px] text-text-tertiary font-medium">
              <FileText className="w-3 h-3" />
              {questionCount} {questionCount === 1 ? 'question' : 'questions'}
            </div>
            <span className="w-0.5 h-0.5 rounded-full bg-border" />
            <span className="text-[11px] text-text-tertiary font-medium capitalize">
              {difficulty}
            </span>
          </div>
        </Link>

        {/* Footer */}
        <div className="mt-4 pt-3 border-t border-border flex items-center justify-between">
          <span className="text-[10px] font-semibold text-text-tertiary uppercase tracking-wider">
            {formattedDate}
          </span>
          <Link 
            to={`/quiz/${quizId}/edit`}
            className="text-[10px] font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-wider"
          >
            Open →
          </Link>
        </div>
      </div>
    </div>
  );
}
