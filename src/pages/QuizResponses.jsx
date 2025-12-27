import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { api } from '../lib/api.js';
import Card from '../components/ui/Card.jsx';
import Spinner from '../components/ui/Spinner.jsx';
import Badge from '../components/ui/Badge.jsx';
import { ArrowLeft, Download, Users } from 'lucide-react';
import { format } from 'date-fns';
import Button from '../components/ui/Button.jsx';

export default function QuizResponses() {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadResponses = async () => {
      try {
        const data = await api.getQuizResponses(quizId);
        setResponses(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Failed to load responses:', error);
        setResponses([]); // Set to empty array on error
      } finally {
        setLoading(false);
      }
    };

    if (quizId) {
      loadResponses();
    } else {
      setLoading(false);
    }
  }, [quizId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Spinner size="lg" className="mx-auto mb-4" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="sm"
          icon={ArrowLeft}
          onClick={() => navigate(`/quiz/${quizId}/edit`)}
          className="w-fit -ml-2"
        >
          Back
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-white tracking-tight mb-2">Quiz Responses</h1>
          <p className="text-sm text-text-secondary">
            {responses.length} {responses.length === 1 ? 'response' : 'responses'}
          </p>
        </div>
      </div>

      {responses.length === 0 ? (
        <Card className="p-12 text-center border border-dashed border-border">
          <div className="w-12 h-12 rounded-full bg-bg-secondary flex items-center justify-center mb-4 border border-border mx-auto">
            <Users className="w-6 h-6 text-text-tertiary" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">No responses yet</h3>
          <p className="text-sm text-text-tertiary max-w-[240px] mx-auto">
            Share your quiz link to start receiving responses.
          </p>
        </Card>
      ) : (
        <div className="space-y-4">
          {responses.map((response) => (
            <Card key={response.id} className="p-6 border border-border">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-white">
                      {response.studentInfo?.name || 'Anonymous'}
                    </h3>
                    <Badge 
                      variant={response.score >= 70 ? 'success' : response.score >= 50 ? 'warning' : 'error'}
                    >
                      {response.score}%
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-text-secondary">
                    {response.studentInfo?.email && (
                      <span>{response.studentInfo.email}</span>
                    )}
                    <span>
                      {response.correctCount} / {response.totalQuestions} correct
                    </span>
                    {response.submittedAt && (
                      <span>
                        {(() => {
                          try {
                            let date = null;
                            if (response.submittedAt.toDate && typeof response.submittedAt.toDate === 'function') {
                              date = response.submittedAt.toDate();
                            } else if (response.submittedAt instanceof Date) {
                              date = response.submittedAt;
                            } else {
                              date = new Date(response.submittedAt);
                            }
                            if (date && !isNaN(date.getTime())) {
                              return format(date, 'MMM d, yyyy h:mm a');
                            }
                            return 'Date unavailable';
                          } catch (error) {
                            return 'Date unavailable';
                          }
                        })()}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Student Info */}
              {Object.keys(response.studentInfo || {}).length > 0 && (
                <div className="mb-4 p-3 bg-bg-secondary rounded-lg border border-border">
                  <p className="text-xs font-medium text-text-tertiary mb-2 uppercase tracking-wider">Student Information</p>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    {Object.entries(response.studentInfo).map(([key, value]) => (
                      <div key={key}>
                        <span className="text-text-tertiary capitalize">{key}:</span>{' '}
                        <span className="text-white">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

