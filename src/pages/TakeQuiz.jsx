import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../lib/api.js';
import Button from '../components/ui/Button.jsx';
import Input from '../components/ui/Input.jsx';
import Card from '../components/ui/Card.jsx';
import Spinner from '../components/ui/Spinner.jsx';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';

export default function TakeQuiz() {
  const { shareId } = useParams();
  const navigate = useNavigate();
  
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState('info'); // 'info', 'quiz', 'results'
  const [studentInfo, setStudentInfo] = useState({});
  const [answers, setAnswers] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [results, setResults] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(null); // in seconds
  const [timerInterval, setTimerInterval] = useState(null);
  
  // Use refs to access current values in interval callbacks
  const answersRef = useRef(answers);
  const studentInfoRef = useRef(studentInfo);
  const submittingRef = useRef(submitting);
  
  // Keep refs in sync with state
  useEffect(() => {
    answersRef.current = answers;
  }, [answers]);
  
  useEffect(() => {
    studentInfoRef.current = studentInfo;
  }, [studentInfo]);
  
  useEffect(() => {
    submittingRef.current = submitting;
  }, [submitting]);

  useEffect(() => {
    const loadQuiz = async () => {
      try {
        const data = await api.getPublicQuiz(shareId);
        setQuiz(data);
        setAnswers(new Array(data.questions.length).fill(null));
      } catch (error) {
        toast.error(error.message || 'Failed to load quiz');
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    loadQuiz();
  }, [shareId, navigate]);

  const handleStudentInfoChange = (fieldName, value) => {
    setStudentInfo(prev => ({ ...prev, [fieldName]: value }));
  };

  const handleAnswerChange = (questionIndex, answer) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = answer;
    setAnswers(newAnswers);
  };

  const handleStudentInfoSubmit = (e) => {
    e.preventDefault();
    
    // Validate required fields
    const requiredFields = quiz.studentInfoFields.filter(f => f.required);
    const missingFields = requiredFields.filter(f => !studentInfo[f.name]);
    
    if (missingFields.length > 0) {
      toast.error(`Please fill in: ${missingFields.map(f => f.label).join(', ')}`);
      return;
    }
    
    // Start timer if enabled
    const settings = quiz.settings || {};
    if (settings.isTimed && settings.timeLimit) {
      const timeInSeconds = settings.timeLimit * 60;
      setTimeRemaining(timeInSeconds);
      
      // Start countdown
      const interval = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setTimerInterval(null);
            // Auto-submit when time runs out - use refs to get current values
            handleAutoSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      
      setTimerInterval(interval);
    }
    
    setStep('quiz');
  };

  const handleAutoSubmit = async () => {
    // Use refs to get current values (avoid stale closure)
    if (submittingRef.current) return; // Prevent double submission
    
    setSubmitting(true);
    try {
      // Use refs to get the most current answers and studentInfo
      const result = await api.submitQuizResponse(
        shareId, 
        studentInfoRef.current, 
        answersRef.current
      );
      setResults(result);
      setStep('results');
      
      // Clear timer
      if (timerInterval) {
        clearInterval(timerInterval);
        setTimerInterval(null);
      }
      
      toast.success('Time expired! Quiz auto-submitted with your responses.');
    } catch (error) {
      toast.error(error.message || 'Failed to submit quiz');
    } finally {
      setSubmitting(false);
    }
  };

  const handleSubmitQuiz = async (e) => {
    e.preventDefault();
    
    // Clear timer
    if (timerInterval) {
      clearInterval(timerInterval);
      setTimerInterval(null);
    }
    
    // Check if all questions are answered
    const unanswered = answers.filter(a => a === null || a === undefined);
    if (unanswered.length > 0) {
      if (!confirm(`You have ${unanswered.length} unanswered question(s). Submit anyway?`)) {
        return;
      }
    }
    
    setSubmitting(true);
    try {
      const result = await api.submitQuizResponse(shareId, studentInfo, answers);
      setResults(result);
      setStep('results');
    } catch (error) {
      toast.error(error.message || 'Failed to submit quiz');
    } finally {
      setSubmitting(false);
    }
  };

  // Format time remaining as MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Cleanup timer on unmount or when step changes
  useEffect(() => {
    return () => {
      if (timerInterval) {
        clearInterval(timerInterval);
        setTimerInterval(null);
      }
    };
  }, [timerInterval]);
  
  // Also cleanup when step changes to results
  useEffect(() => {
    if (step === 'results' && timerInterval) {
      clearInterval(timerInterval);
      setTimerInterval(null);
    }
  }, [step, timerInterval]);

  if (loading) {
    return (
      <div className="min-h-screen bg-bg-primary flex items-center justify-center">
        <div className="text-center">
          <Spinner size="lg" className="mx-auto mb-4" />
          <p className="text-sm text-text-secondary">Loading quiz...</p>
        </div>
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="min-h-screen bg-bg-primary flex items-center justify-center">
        <Card className="p-8 max-w-md">
          <div className="text-center">
            <AlertCircle className="w-12 h-12 text-error-text mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-text-primary mb-2">Quiz Not Found</h2>
            <p className="text-sm text-text-secondary mb-6">
              This quiz link is invalid or the quiz is no longer publicly shared.
            </p>
            <Button onClick={() => navigate('/')}>Go Home</Button>
          </div>
        </Card>
      </div>
    );
  }

  // Student Info Form
  if (step === 'info') {
    return (
      <div className="min-h-screen bg-bg-primary py-12 px-6">
        <div className="max-w-2xl mx-auto">
          <Card className="p-8">
            <h1 className="text-2xl font-bold text-text-primary mb-2">{quiz.title}</h1>
            <p className="text-sm text-text-secondary mb-8">
              Please provide your information before taking the quiz.
            </p>

            <form onSubmit={handleStudentInfoSubmit} className="space-y-5">
              {quiz.studentInfoFields.map((field) => (
                <div key={field.name}>
                  <label htmlFor={field.name} className="label">
                    {field.label}
                    {field.required && <span className="text-error-text ml-1">*</span>}
                  </label>
                  {field.type === 'textarea' ? (
                    <textarea
                      id={field.name}
                      value={studentInfo[field.name] || ''}
                      onChange={(e) => handleStudentInfoChange(field.name, e.target.value)}
                      className="input min-h-[100px] resize-none"
                      required={field.required}
                      placeholder={field.placeholder || `Enter your ${field.label.toLowerCase()}`}
                    />
                  ) : (
                    <Input
                      id={field.name}
                      type={field.type || 'text'}
                      value={studentInfo[field.name] || ''}
                      onChange={(e) => handleStudentInfoChange(field.name, e.target.value)}
                      required={field.required}
                      placeholder={field.placeholder || `Enter your ${field.label.toLowerCase()}`}
                    />
                  )}
                </div>
              ))}

              <Button type="submit" className="w-full" size="lg">
                Start Quiz
              </Button>
            </form>
          </Card>
        </div>
      </div>
    );
  }

  // Quiz Taking
  if (step === 'quiz') {
    const settings = quiz.settings || {};
    const isTimed = settings.isTimed || false;
    
    return (
      <div className="min-h-screen bg-bg-primary py-12 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-2xl font-bold text-text-primary">{quiz.title}</h1>
              {isTimed && timeRemaining !== null && (
                <div className={`
                  px-4 py-2 rounded-lg font-mono text-lg font-semibold
                  ${timeRemaining <= 60 ? 'bg-error-subtle text-error-text' : 'bg-warning-subtle text-warning-text'}
                `}>
                  {formatTime(timeRemaining)}
                </div>
              )}
            </div>
            <p className="text-sm text-text-secondary">
              Answer all questions. You can review your answers before submitting.
              {isTimed && ` Time limit: ${settings.timeLimit} minutes.`}
            </p>
          </div>

          <form onSubmit={handleSubmitQuiz} className="space-y-6">
            {quiz.questions.map((question, index) => (
              <Card key={question.id || index} className="p-6">
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-sm font-semibold text-text-secondary">Question {index + 1}</span>
                    {question.difficulty && (
                      <span className="text-xs px-2 py-0.5 bg-surface rounded-full text-text-tertiary capitalize">
                        {question.difficulty}
                      </span>
                    )}
                  </div>
                  <p className="text-base text-text-primary font-medium mb-4">{question.questionText}</p>
                </div>

                <div className="space-y-2">
                  {question.options && question.options.map((option, optIndex) => (
                    <label
                      key={optIndex}
                      className={`
                        flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors
                        ${answers[index] === optIndex
                          ? 'bg-primary-subtle border border-primary'
                          : 'bg-surface border border-transparent hover:bg-surface-hover'}
                      `}
                    >
                      <input
                        type="radio"
                        name={`question-${index}`}
                        value={optIndex}
                        checked={answers[index] === optIndex}
                        onChange={() => handleAnswerChange(index, optIndex)}
                        className="w-4 h-4 text-primary border-border focus:ring-primary focus:ring-offset-bg-primary"
                      />
                      <span className="text-sm text-text-primary flex-1">
                        <span className="font-medium mr-2">{String.fromCharCode(65 + optIndex)}.</span>
                        {option}
                      </span>
                    </label>
                  ))}
                </div>
              </Card>
            ))}

            <div className="flex items-center justify-between pt-6 border-t border-border">
              <p className="text-sm text-text-secondary">
                {answers.filter(a => a !== null && a !== undefined).length} of {quiz.questions.length} answered
              </p>
              <Button type="submit" size="lg" loading={submitting}>
                Submit Quiz
              </Button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // Results
  if (step === 'results' && results) {
    const showAnswers = results.showAnswers !== false; // Default to true if not specified
    const pointsPerQuestion = results.pointsPerQuestion || 1;
    
    return (
      <div className="min-h-screen bg-bg-primary py-12 px-6">
        <div className="max-w-3xl mx-auto">
          <Card className="p-8 mb-6">
            <div className="text-center mb-8">
              <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 ${
                results.score >= 70 ? 'bg-success-subtle' : results.score >= 50 ? 'bg-warning-subtle' : 'bg-error-subtle'
              }`}>
                <span className="text-3xl font-bold text-text-primary">{results.score}%</span>
              </div>
              <h2 className="text-2xl font-bold text-text-primary mb-2">Quiz Complete!</h2>
              <p className="text-sm text-text-secondary">
                You got {results.correctCount} out of {results.totalQuestions} questions correct.
                {results.totalPoints !== undefined && results.maxPoints !== undefined && (
                  <> ({results.totalPoints} / {results.maxPoints} points)</>
                )}
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-text-primary mb-4">Question Review</h3>
              {results.questionResults.map((result, index) => (
                <Card key={index} className={`p-5 ${
                  result.isCorrect ? 'bg-success-subtle/20 border-success/20' : 'bg-error-subtle/20 border-error/20'
                }`}>
                  <div className="flex items-start gap-3 mb-3">
                    {result.isCorrect ? (
                      <CheckCircle className="w-5 h-5 text-success-text flex-shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="w-5 h-5 text-error-text flex-shrink-0 mt-0.5" />
                    )}
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-medium text-text-primary">
                          Question {index + 1}
                        </p>
                        {result.points !== undefined && (
                          <span className="text-xs font-medium text-text-secondary">
                            {result.points} / {pointsPerQuestion} {pointsPerQuestion === 1 ? 'point' : 'points'}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-text-secondary">
                        Your answer: <span className="font-medium">{String.fromCharCode(65 + result.userAnswer)}</span>
                        {showAnswers && !result.isCorrect && result.correctAnswer !== undefined && (
                          <> • Correct answer: <span className="font-medium text-success-text">{String.fromCharCode(65 + result.correctAnswer)}</span></>
                        )}
                      </p>
                      {showAnswers && result.explanation && (
                        <p className="text-xs text-text-tertiary mt-2 italic">{result.explanation}</p>
                      )}
                      {!showAnswers && !result.isCorrect && (
                        <p className="text-xs text-text-tertiary mt-2">Correct answers are hidden by the instructor.</p>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return null;
}

