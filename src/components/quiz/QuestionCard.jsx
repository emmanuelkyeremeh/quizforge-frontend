import { useState } from 'react';
import { Trash2, RefreshCw, Edit2, Check, X, CheckCircle, ChevronUp, ChevronDown } from 'lucide-react';
import Card from '../ui/Card.jsx';
import Button from '../ui/Button.jsx';
import Input from '../ui/Input.jsx';
import Badge from '../ui/Badge.jsx';

export default function QuestionCard({ 
  question, 
  index, 
  onUpdate, 
  onDelete, 
  onRegenerate,
  onMove,
  canMoveUp = false,
  canMoveDown = false
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedQuestion, setEditedQuestion] = useState(question);

  const handleSave = () => {
    onUpdate(editedQuestion);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedQuestion(question);
    setIsEditing(false);
  };

  const difficultyColors = {
    easy: 'success',
    medium: 'warning',
    hard: 'error',
  };

  return (
    <Card className="p-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="flex flex-col gap-1">
          {onMove && (
            <>
              <button
                onClick={() => onMove('up')}
                disabled={!canMoveUp}
                className={`
                  p-0.5 rounded hover:bg-surface transition-colors
                  ${canMoveUp ? 'text-text-tertiary hover:text-text-primary cursor-pointer' : 'text-border cursor-not-allowed opacity-50'}
                `}
                aria-label="Move question up"
              >
                <ChevronUp className="w-3 h-3" />
              </button>
              <button
                onClick={() => onMove('down')}
                disabled={!canMoveDown}
                className={`
                  p-0.5 rounded hover:bg-surface transition-colors
                  ${canMoveDown ? 'text-text-tertiary hover:text-text-primary cursor-pointer' : 'text-border cursor-not-allowed opacity-50'}
                `}
                aria-label="Move question down"
              >
                <ChevronDown className="w-3 h-3" />
              </button>
            </>
          )}
        </div>
        <span className="text-sm font-semibold text-text-secondary">Q{index + 1}</span>
        <Badge variant="neutral" size="sm">
          {question.type?.replace('_', ' ') || 'multiple choice'}
        </Badge>
        {question.difficulty && (
          <Badge variant={difficultyColors[question.difficulty]} size="sm">
            {question.difficulty}
          </Badge>
        )}
      </div>

      {/* Content */}
      <div className="pl-7">
        {isEditing ? (
          <div className="space-y-4">
            {/* Question text */}
            <div>
              <label className="label">Question</label>
              <textarea
                value={editedQuestion.questionText}
                onChange={(e) => setEditedQuestion({ ...editedQuestion, questionText: e.target.value })}
                className="input min-h-[80px] resize-none"
                rows={3}
              />
            </div>

            {/* Options */}
            {editedQuestion.options && (
              <div>
                <label className="label">Options (select correct answer)</label>
                <div className="space-y-2">
                  {editedQuestion.options.map((option, optIndex) => (
                    <div key={optIndex} className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setEditedQuestion({ ...editedQuestion, correctAnswer: optIndex })}
                        className={`
                          w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors
                          ${optIndex === editedQuestion.correctAnswer 
                            ? 'border-success bg-success text-white' 
                            : 'border-border hover:border-text-tertiary'}
                        `}
                      >
                        {optIndex === editedQuestion.correctAnswer && <Check className="w-3 h-3" />}
                      </button>
                      <Input
                        type="text"
                        value={option}
                        onChange={(e) => {
                          const newOptions = [...editedQuestion.options];
                          newOptions[optIndex] = e.target.value;
                          setEditedQuestion({ ...editedQuestion, options: newOptions });
                        }}
                        placeholder={`Option ${String.fromCharCode(65 + optIndex)}`}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center gap-2 pt-2">
              <Button size="sm" onClick={handleSave} icon={Check}>
                Save
              </Button>
              <Button variant="ghost" size="sm" onClick={handleCancel} icon={X}>
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <div>
            {/* Question text */}
            <p className="text-base text-text-primary mb-4 leading-relaxed">
              {question.questionText}
            </p>
            
            {/* Options */}
            {question.options && (
              <div className="space-y-2 mb-4">
                {question.options.map((option, optIndex) => (
                  <div
                    key={optIndex}
                    className={`
                      flex items-center gap-3 p-3 rounded-lg transition-colors
                      ${optIndex === question.correctAnswer
                        ? 'bg-success-subtle border border-success/20'
                        : 'bg-surface border border-transparent'}
                    `}
                  >
                    <div className={`
                      w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0
                      ${optIndex === question.correctAnswer 
                        ? 'bg-success text-white' 
                        : 'bg-bg-tertiary text-text-tertiary'}
                    `}>
                      {optIndex === question.correctAnswer 
                        ? <Check className="w-3 h-3" />
                        : <span className="text-xs font-medium">{String.fromCharCode(65 + optIndex)}</span>
                      }
                    </div>
                    <span className={`text-sm ${optIndex === question.correctAnswer ? 'text-success-text font-medium' : 'text-text-secondary'}`}>
                      {option}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Explanation */}
            {question.explanation && (
              <div className="p-4 bg-surface rounded-lg border border-border mb-4">
                <p className="text-xs font-medium text-text-tertiary mb-1.5 uppercase tracking-wider">Explanation</p>
                <p className="text-sm text-text-secondary leading-relaxed">{question.explanation}</p>
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center gap-2 pt-4 border-t border-border">
              <Button variant="ghost" size="sm" onClick={() => setIsEditing(true)} icon={Edit2}>
                Edit
              </Button>
              {onRegenerate && (
                <Button variant="ghost" size="sm" onClick={() => onRegenerate(index)} icon={RefreshCw}>
                  Regenerate
                </Button>
              )}
              {onDelete && (
                <Button variant="ghost" size="sm" onClick={() => onDelete(index)} icon={Trash2} className="text-error-text hover:bg-error-subtle">
                  Delete
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
