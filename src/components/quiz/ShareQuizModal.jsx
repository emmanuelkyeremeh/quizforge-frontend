import { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from '../ui/Modal.jsx';
import Button from '../ui/Button.jsx';
import Input from '../ui/Input.jsx';
import Card from '../ui/Card.jsx';
import { Share2, Copy, Check, Plus, X, Settings, ChevronUp, ChevronDown } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ShareQuizModal({ isOpen, onClose, quiz, onUpdate }) {
  const [shareLink, setShareLink] = useState('');
  const [copied, setCopied] = useState(false);
  const [isPublic, setIsPublic] = useState(quiz?.isPublic || false);
  const [studentInfoFields, setStudentInfoFields] = useState(
    quiz?.studentInfoFields || [
      { name: 'name', label: 'Name', type: 'text', required: true },
      { name: 'email', label: 'Email', type: 'email', required: true }
    ]
  );
  const [settings, setSettings] = useState(
    quiz?.settings || {
      showAnswers: true,
      isTimed: false,
      timeLimit: 30,
      pointsPerQuestion: 1
    }
  );

  // Generate share link when quiz becomes public
  useEffect(() => {
    if (isOpen && quiz?.shareId) {
      const baseUrl = window.location.origin;
      setShareLink(`${baseUrl}/quiz/${quiz.shareId}/take`);
    }
    // Update state when quiz changes
    if (quiz) {
      setIsPublic(quiz.isPublic || false);
      if (quiz.studentInfoFields && quiz.studentInfoFields.length > 0) {
        setStudentInfoFields(quiz.studentInfoFields);
      }
      if (quiz.settings) {
        setSettings({
          showAnswers: quiz.settings.showAnswers !== undefined ? quiz.settings.showAnswers : true,
          isTimed: quiz.settings.isTimed || false,
          timeLimit: quiz.settings.timeLimit || 30,
          pointsPerQuestion: quiz.settings.pointsPerQuestion || 1
        });
      }
    }
  }, [isOpen, quiz]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareLink);
    setCopied(true);
    toast.success('Link copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleTogglePublic = async () => {
    const newIsPublic = !isPublic;
    
      try {
        const updated = await onUpdate({
          isPublic: newIsPublic,
          studentInfoFields,
          settings
        });
      
      setIsPublic(newIsPublic);
      
      if (newIsPublic && updated?.shareId) {
        const baseUrl = window.location.origin;
        setShareLink(`${baseUrl}/quiz/${updated.shareId}/take`);
      }
      
      toast.success(newIsPublic ? 'Quiz is now public' : 'Quiz is now private');
    } catch (error) {
      toast.error('Failed to update quiz settings');
    }
  };

  const handleAddField = () => {
    setStudentInfoFields([
      ...studentInfoFields,
      { name: `field_${Date.now()}`, label: '', type: 'text', required: false }
    ]);
  };

  const handleRemoveField = (index) => {
    if (studentInfoFields.length <= 1) {
      toast.error('At least one field is required');
      return;
    }
    setStudentInfoFields(studentInfoFields.filter((_, i) => i !== index));
  };

  const handleFieldChange = (index, field, value) => {
    const newFields = [...studentInfoFields];
    newFields[index] = { ...newFields[index], [field]: value };
    setStudentInfoFields(newFields);
  };

  const handleSaveFields = async () => {
    try {
      await onUpdate({
        isPublic,
        studentInfoFields,
        settings
      });
      toast.success('Student info fields updated');
    } catch (error) {
      toast.error('Failed to update fields');
    }
  };

  const handleSaveSettings = async () => {
    try {
      await onUpdate({
        isPublic,
        studentInfoFields,
        settings
      });
      toast.success('Quiz settings updated');
    } catch (error) {
      toast.error('Failed to update settings');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalHeader onClose={onClose}>
        <div className="flex items-center gap-2">
          <Share2 className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-semibold text-text-primary">Share Quiz</h2>
        </div>
      </ModalHeader>

      <ModalBody>
        <div className="space-y-6">
          {/* Public Toggle */}
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-text-primary mb-1">Make Quiz Public</h3>
                <p className="text-xs text-text-secondary">
                  Allow students to take this quiz via a shareable link
                </p>
              </div>
              <button
                onClick={handleTogglePublic}
                className={`
                  relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                  ${isPublic ? 'bg-primary' : 'bg-surface border border-border'}
                `}
              >
                <span
                  className={`
                    inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                    ${isPublic ? 'translate-x-6' : 'translate-x-1'}
                  `}
                />
              </button>
            </div>
          </Card>

          {/* Share Link */}
          {isPublic && quiz?.shareId && (
            <div>
              <label className="label">Share Link</label>
              <div className="flex items-center gap-2">
                <Input
                  value={shareLink}
                  readOnly
                  className="flex-1 font-mono text-sm"
                />
                <Button
                  variant="secondary"
                  onClick={handleCopyLink}
                  icon={copied ? Check : Copy}
                >
                  {copied ? 'Copied!' : 'Copy'}
                </Button>
              </div>
              <p className="text-xs text-text-tertiary mt-2">
                Share this link with students to let them take the quiz
              </p>
            </div>
          )}

          {/* Student Info Fields */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-semibold text-text-primary mb-1">Student Information Form</h3>
                <p className="text-xs text-text-secondary">
                  Customize what information students must provide before taking the quiz
                </p>
              </div>
              <Button size="sm" variant="ghost" onClick={handleAddField} icon={Plus}>
                Add Field
              </Button>
            </div>

            <div className="space-y-3">
              {studentInfoFields.map((field, index) => (
                <Card key={index} className="p-4">
                  <div className="grid grid-cols-12 gap-3">
                    <div className="col-span-5">
                      <Input
                        placeholder="Field label (e.g., Name)"
                        value={field.label}
                        onChange={(e) => handleFieldChange(index, 'label', e.target.value)}
                      />
                    </div>
                    <div className="col-span-3">
                      <select
                        value={field.type}
                        onChange={(e) => handleFieldChange(index, 'type', e.target.value)}
                        className="w-full h-10 px-3 text-sm border rounded-md transition-colors hover:border-border-hover focus:outline-none"
                      >
                        <option value="text">Text</option>
                        <option value="email">Email</option>
                        <option value="number">Number</option>
                        <option value="textarea">Textarea</option>
                      </select>
                    </div>
                    <div className="col-span-2 flex items-center">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={field.required}
                          onChange={(e) => handleFieldChange(index, 'required', e.target.checked)}
                          className="w-4 h-4 text-primary border-border rounded"
                        />
                        <span className="text-xs text-text-secondary">Required</span>
                      </label>
                    </div>
                    <div className="col-span-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveField(index)}
                        className="text-error-text hover:bg-error-subtle"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <Button
              variant="secondary"
              onClick={handleSaveFields}
              className="w-full mt-4"
            >
              Save Fields
            </Button>
          </div>

          {/* Quiz Settings */}
          <div>
            <div className="mb-4">
              <h3 className="text-sm font-semibold text-text-primary mb-1">Quiz Settings</h3>
              <p className="text-xs text-text-secondary">
                Configure how students take and view results
              </p>
            </div>

            <div className="space-y-4">
              {/* Show Answers */}
              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-text-primary mb-1">Show Correct Answers</h4>
                    <p className="text-xs text-text-secondary">
                      Display correct answers and explanations after quiz completion
                    </p>
                  </div>
                  <button
                    onClick={() => setSettings({ ...settings, showAnswers: !settings.showAnswers })}
                    className={`
                      relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                      ${settings.showAnswers ? 'bg-primary' : 'bg-surface border border-border'}
                    `}
                  >
                    <span
                      className={`
                        inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                        ${settings.showAnswers ? 'translate-x-6' : 'translate-x-1'}
                      `}
                    />
                  </button>
                </div>
              </Card>

              {/* Timer */}
              <Card className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="text-sm font-medium text-text-primary mb-1">Enable Timer</h4>
                    <p className="text-xs text-text-secondary">
                      Set a time limit for the quiz (quiz will auto-submit when time expires)
                    </p>
                  </div>
                  <button
                    onClick={() => setSettings({ ...settings, isTimed: !settings.isTimed })}
                    className={`
                      relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                      ${settings.isTimed ? 'bg-primary' : 'bg-surface border border-border'}
                    `}
                  >
                    <span
                      className={`
                        inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                        ${settings.isTimed ? 'translate-x-6' : 'translate-x-1'}
                      `}
                    />
                  </button>
                </div>
                {settings.isTimed && (
                  <div className="mt-3">
                    <label htmlFor="time-limit" className="label">Time Limit (minutes)</label>
                    <div className="flex items-center gap-2">
                      <div className="relative flex-1">
                        <Input
                          id="time-limit"
                          type="text"
                          inputMode="numeric"
                          value={settings.timeLimit === '' ? '' : settings.timeLimit}
                          onChange={(e) => {
                            const value = e.target.value;
                            // Allow empty string for deletion
                            if (value === '') {
                              setSettings({ ...settings, timeLimit: '' });
                              return;
                            }
                            // Only allow numbers
                            if (/^\d+$/.test(value)) {
                              const numValue = parseInt(value, 10);
                              // Validate: ensure value is between 1 and 300
                              if (numValue >= 1 && numValue <= 300) {
                                setSettings({ ...settings, timeLimit: numValue });
                              }
                            }
                          }}
                          onBlur={(e) => {
                            // Validate on blur - set to default if empty or invalid
                            const value = e.target.value;
                            if (value === '' || isNaN(parseInt(value, 10))) {
                              setSettings({ ...settings, timeLimit: 30 });
                            } else {
                              const numValue = parseInt(value, 10);
                              if (numValue < 1) {
                                setSettings({ ...settings, timeLimit: 1 });
                              } else if (numValue > 300) {
                                setSettings({ ...settings, timeLimit: 300 });
                              }
                            }
                          }}
                          className="w-full"
                          placeholder="30"
                        />
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <button
                          type="button"
                          onClick={() => {
                            const current = settings.timeLimit || 30;
                            const newValue = Math.min(current + 1, 300);
                            setSettings({ ...settings, timeLimit: newValue });
                          }}
                          className="h-5 w-7 flex items-center justify-center rounded-t border border-border bg-bg-secondary hover:bg-bg-tertiary transition-colors"
                        >
                          <ChevronUp className="w-3 h-3 text-text-secondary" />
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            const current = settings.timeLimit || 30;
                            const newValue = Math.max(current - 1, 1);
                            setSettings({ ...settings, timeLimit: newValue });
                          }}
                          className="h-5 w-7 flex items-center justify-center rounded-b border border-border bg-bg-secondary hover:bg-bg-tertiary transition-colors"
                        >
                          <ChevronDown className="w-3 h-3 text-text-secondary" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </Card>

              {/* Points Per Question */}
              <Card className="p-4">
                <div>
                  <label htmlFor="points-per-question" className="text-sm font-medium text-text-primary mb-1 block">
                    Points Per Question
                  </label>
                  <p className="text-xs text-text-secondary mb-3">
                    Points awarded for each correct answer
                  </p>
                  <Input
                    id="points-per-question"
                    type="number"
                    min="1"
                    max="100"
                    value={settings.pointsPerQuestion}
                    onChange={(e) => {
                      const value = parseInt(e.target.value, 10);
                      // Validate: ensure value is between 1 and 100
                      const validValue = (!isNaN(value) && value >= 1 && value <= 100) ? value : 1;
                      setSettings({ ...settings, pointsPerQuestion: validValue });
                    }}
                    className="w-full"
                  />
                </div>
              </Card>
            </div>

            <Button
              variant="secondary"
              onClick={handleSaveSettings}
              className="w-full mt-4"
            >
              Save Settings
            </Button>
          </div>
        </div>
      </ModalBody>

      <ModalFooter>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
}

