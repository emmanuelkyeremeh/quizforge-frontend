import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth.js';
import { api } from '../lib/api.js';
import Card from '../components/ui/Card.jsx';
import Spinner from '../components/ui/Spinner.jsx';
import { Users, FileText, MessageSquare, TrendingUp, Calendar, BarChart3 } from 'lucide-react';
import { format } from 'date-fns';

export default function AdminDashboard() {
  const { user, usage } = useAuth();
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const data = await api.getAdminMetrics();
        setMetrics(data);
      } catch (err) {
        setError(err.message || 'Failed to load metrics');
      } finally {
        setLoading(false);
      }
    };

    if (user && usage?.isAdmin) {
      fetchMetrics();
    }
  }, [user, usage]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Spinner size="lg" className="mx-auto mb-4" />
          <p className="text-sm text-text-secondary">Loading admin metrics...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Card className="p-8 text-center">
          <p className="text-error-text">{error}</p>
        </Card>
      </div>
    );
  }

  if (!metrics) {
    return null;
  }

  // Format month data for charts
  const formatMonthData = (data) => {
    return Object.entries(data)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([month, count]) => ({
        month: format(new Date(month + '-01'), 'MMM yyyy'),
        count,
      }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-text-primary mb-1">Admin Dashboard</h1>
        <p className="text-sm text-text-tertiary">Overview of QuizForge platform metrics</p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-text-secondary">Total Users</h3>
            <Users className="w-5 h-5 text-primary" />
          </div>
          <p className="text-3xl font-bold text-text-primary">{metrics.overview.totalUsers}</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-text-secondary">Total Quizzes</h3>
            <FileText className="w-5 h-5 text-primary" />
          </div>
          <p className="text-3xl font-bold text-text-primary">{metrics.overview.totalQuizzes}</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-text-secondary">Total Responses</h3>
            <MessageSquare className="w-5 h-5 text-primary" />
          </div>
          <p className="text-3xl font-bold text-text-primary">{metrics.overview.totalResponses}</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-text-secondary">Questions Generated</h3>
            <TrendingUp className="w-5 h-5 text-primary" />
          </div>
          <p className="text-3xl font-bold text-text-primary">{metrics.overview.totalQuestionsGenerated.toLocaleString()}</p>
        </Card>
      </div>

      {/* Plan Distribution */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold text-text-primary mb-4">User Plan Distribution</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-4 bg-surface rounded-lg">
            <p className="text-2xl font-bold text-text-primary">{metrics.planDistribution.free || 0}</p>
            <p className="text-sm text-text-secondary mt-1">Free Plan</p>
          </div>
          <div className="text-center p-4 bg-surface rounded-lg">
            <p className="text-2xl font-bold text-text-primary">{metrics.planDistribution.pro || 0}</p>
            <p className="text-sm text-text-secondary mt-1">Pro Plan</p>
          </div>
          <div className="text-center p-4 bg-surface rounded-lg">
            <p className="text-2xl font-bold text-text-primary">{metrics.planDistribution.admin || 0}</p>
            <p className="text-sm text-text-secondary mt-1">Admin</p>
          </div>
        </div>
      </Card>

      {/* Growth Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Users by Month */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Users by Month
          </h2>
          <div className="space-y-2">
            {formatMonthData(metrics.usersByMonth).slice(-6).map(({ month, count }) => (
              <div key={month} className="flex items-center justify-between">
                <span className="text-sm text-text-secondary">{month}</span>
                <span className="text-sm font-medium text-text-primary">{count}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Quizzes by Month */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Quizzes by Month
          </h2>
          <div className="space-y-2">
            {formatMonthData(metrics.quizzesByMonth).slice(-6).map(({ month, count }) => (
              <div key={month} className="flex items-center justify-between">
                <span className="text-sm text-text-secondary">{month}</span>
                <span className="text-sm font-medium text-text-primary">{count}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Recent Users */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold text-text-primary mb-4">Recent Users</h2>
        <div className="space-y-3">
          {metrics.recentUsers.map((user) => (
            <div key={user.id} className="flex items-center justify-between p-3 bg-surface rounded-lg">
              <div>
                <p className="text-sm font-medium text-text-primary">{user.email}</p>
                <p className="text-xs text-text-tertiary">
                  {user.displayName || 'No name'} • {user.plan} • {user.quizzesCreated} quizzes
                </p>
              </div>
              <span className="text-xs text-text-tertiary">
                {user.createdAt ? format(new Date(user.createdAt), 'MMM d, yyyy') : 'N/A'}
              </span>
            </div>
          ))}
        </div>
      </Card>

      {/* Recent Quizzes */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold text-text-primary mb-4">Recent Quizzes</h2>
        <div className="space-y-3">
          {metrics.recentQuizzes.map((quiz) => (
            <div key={quiz.id} className="flex items-center justify-between p-3 bg-surface rounded-lg">
              <div>
                <p className="text-sm font-medium text-text-primary">{quiz.title}</p>
                <p className="text-xs text-text-tertiary">
                  {quiz.questionCount} questions • {quiz.isPublic ? 'Public' : 'Private'} • {quiz.responseCount} responses
                </p>
              </div>
              <span className="text-xs text-text-tertiary">
                {quiz.createdAt ? format(new Date(quiz.createdAt), 'MMM d, yyyy') : 'N/A'}
              </span>
            </div>
          ))}
        </div>
      </Card>

      {/* Google Analytics Placeholder */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold text-text-primary mb-4">Analytics</h2>
        <div id="google-analytics-container" className="min-h-[400px] flex items-center justify-center bg-surface rounded-lg">
          <p className="text-sm text-text-tertiary">Google Analytics integration coming soon</p>
        </div>
      </Card>
    </div>
  );
}

