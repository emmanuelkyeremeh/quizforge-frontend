import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth.js';
import { api } from '../lib/api.js';
import Card from '../components/ui/Card.jsx';
import Spinner from '../components/ui/Spinner.jsx';
import Button from '../components/ui/Button.jsx';
import { Users, FileText, MessageSquare, TrendingUp, Calendar, BarChart3, Shield, ChevronRight } from 'lucide-react';
import { format } from 'date-fns';
import Badge from '../components/ui/Badge.jsx';

export default function AdminDashboard() {
  const { user, usage, userData } = useAuth();
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        setLoading(true);
        const data = await api.getAdminMetrics();
        setMetrics(data);
        setError(null);
      } catch (err) {
        setError(err.message || 'Failed to load metrics');
      } finally {
        setLoading(false);
      }
    };

    const isAdmin = usage?.isAdmin || userData?.isAdmin;
    if (user && isAdmin) {
      fetchMetrics();
    } else if (user && !isAdmin) {
      setError('You do not have admin access');
      setLoading(false);
    }
  }, [user, usage, userData]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-error/10 flex items-center justify-center mx-auto border border-error/20">
            <Shield className="w-6 h-6 text-error" />
          </div>
          <h2 className="text-xl font-bold text-white">Access Denied</h2>
          <p className="text-text-secondary max-w-sm mx-auto">{error}</p>
        </div>
      </div>
    );
  }

  if (!metrics) return null;

  const formatMonthData = (data) => {
    return Object.entries(data || {})
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([month, count]) => ({
        month: format(new Date(month + '-01'), 'MMM yyyy'),
        count,
      }));
  };

  return (
    <div className="space-y-10 animate-fade-in">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-primary font-semibold text-sm uppercase tracking-wider">
          <Shield className="w-4 h-4" />
          Admin Platform
        </div>
        <h1 className="text-3xl font-bold text-white tracking-tight">System Overview</h1>
        <p className="text-text-secondary">Comprehensive analytics and platform metrics for QuizForge.</p>
      </div>

      {/* Overview Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard 
          label="Total Users" 
          value={metrics.overview?.totalUsers || metrics.totalUsers || 0} 
          icon={<Users className="w-4 h-4" />}
        />
        <StatsCard 
          label="Total Quizzes" 
          value={metrics.overview?.totalQuizzes || metrics.totalQuizzes || 0} 
          icon={<FileText className="w-4 h-4" />}
        />
        <StatsCard 
          label="Total Responses" 
          value={metrics.overview?.totalResponses || metrics.totalResponses || 0} 
          icon={<MessageSquare className="w-4 h-4" />}
        />
        <StatsCard 
          label="Questions Generated" 
          value={(metrics.overview?.totalQuestionsGenerated || metrics.totalQuestionsGenerated || 0).toLocaleString()} 
          icon={<TrendingUp className="w-4 h-4" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Growth */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6 bg-bg-secondary border-border/50">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-6 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-text-tertiary" />
              User Growth
            </h3>
            <div className="space-y-4">
              {formatMonthData(metrics.usersByMonth).slice(-6).reverse().map(({ month, count }) => (
                <div key={month} className="flex items-center gap-4">
                  <span className="text-xs font-medium text-text-tertiary w-20">{month}</span>
                  <div className="flex-1 h-2 bg-bg-accent rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary rounded-full transition-all duration-1000"
                      style={{ width: `${Math.min((count / (metrics.overview?.totalUsers || 100)) * 100, 100)}%` }}
                    />
                  </div>
                  <span className="text-xs font-bold text-white w-8 text-right">{count}</span>
                </div>
              ))}
            </div>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Recent Quizzes */}
            <Card className="p-6 bg-bg-secondary border-border/50">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-6">Recent Quizzes</h3>
              <div className="space-y-4">
                {metrics.recentQuizzes?.length > 0 ? (
                  metrics.recentQuizzes.slice(0, 5).map((quiz) => (
                    <div key={quiz.id} className="flex items-center justify-between group">
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-white truncate group-hover:text-primary transition-colors cursor-default">
                          {quiz.title || 'Untitled Quiz'}
                        </p>
                        <p className="text-[11px] text-text-tertiary uppercase font-bold mt-0.5">
                          {quiz.questionCount} Qs • {quiz.responseCount} Res
                        </p>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-text-tertiary opacity-0 group-hover:opacity-100 transition-all" />
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-text-tertiary italic text-center py-4">No recent quizzes</p>
                )}
              </div>
            </Card>

            {/* Plan Distribution */}
            <Card className="p-6 bg-bg-secondary border-border/50">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-6">User Distribution</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-text-secondary">Free Plan</span>
                  <Badge variant="neutral" className="bg-bg-accent text-white">{metrics.planDistribution?.free || 0}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-text-secondary">Pro Plan</span>
                  <Badge variant="neutral" className="bg-primary/20 text-primary-hover border-primary/20">{metrics.planDistribution?.pro || 0}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-text-secondary">Admins</span>
                  <Badge variant="neutral" className="bg-white/10 text-white border-white/10">{metrics.planDistribution?.admin || 0}</Badge>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Recent Users Column */}
        <Card className="p-6 bg-bg-secondary border-border/50 flex flex-col h-full">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-6">New Users</h3>
          <div className="space-y-6 flex-1">
            {metrics.recentUsers?.length > 0 ? (
              metrics.recentUsers.slice(0, 8).map((user) => (
                <div key={user.id} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-bg-accent border border-border flex items-center justify-center text-[10px] font-bold text-text-secondary">
                    {user.email?.[0]?.toUpperCase() || 'U'}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-white truncate">{user.email}</p>
                    <p className="text-[11px] text-text-tertiary font-medium">
                      Joined {user.createdAt ? format(new Date(user.createdAt), 'MMM d') : 'Recently'}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-xs text-text-tertiary italic text-center py-4">No users found</p>
            )}
          </div>
          <Button variant="secondary" size="sm" className="w-full mt-6 bg-bg-accent h-8 text-[11px] uppercase tracking-widest font-bold">
            View All Users
          </Button>
        </Card>
      </div>
    </div>
  );
}

function StatsCard({ label, value, icon }) {
  return (
    <Card className="p-5 bg-bg-secondary border-border/50 hover:border-border transition-colors group">
      <div className="flex items-center gap-3 mb-3">
        <div className="p-1.5 rounded bg-bg-accent text-text-tertiary group-hover:text-primary transition-colors">
          {icon}
        </div>
        <span className="text-[11px] font-bold text-text-tertiary uppercase tracking-wider">{label}</span>
      </div>
      <p className="text-2xl font-bold text-white tabular-nums">{value}</p>
    </Card>
  );
}
