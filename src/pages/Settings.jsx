import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';
import Card from '../components/ui/Card.jsx';
import Badge from '../components/ui/Badge.jsx';
import Button from '../components/ui/Button.jsx';
import { api } from '../lib/api.js';
import toast from 'react-hot-toast';
import { Zap, User, CreditCard, BarChart3, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';

export default function Settings() {
  const { user, userData, usage, refreshUsage } = useAuth();
  const navigate = useNavigate();
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingSubscription, setLoadingSubscription] = useState(true);

  useEffect(() => {
    loadSubscriptionStatus();
  }, []);

  const loadSubscriptionStatus = async () => {
    try {
      setLoadingSubscription(true);
      const status = await api.getSubscriptionStatus();
      setSubscription(status);
    } catch (error) {
      console.error('Failed to load subscription status:', error);
    } finally {
      setLoadingSubscription(false);
    }
  };

  const handleUpgrade = () => {
    // Navigate to pricing page instead of directly to checkout
    navigate('/pricing');
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-text-primary mb-2">Settings</h1>
        <p className="text-text-secondary">Manage your account and subscription.</p>
      </div>

      {/* Account */}
      <Card className="p-6 mb-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-surface flex items-center justify-center">
            <User className="w-5 h-5 text-text-tertiary" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-text-primary">Account</h2>
            <p className="text-sm text-text-tertiary">Your profile information</p>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-border">
            <span className="text-sm text-text-secondary">Email</span>
            <span className="text-sm text-text-primary font-medium">{user?.email}</span>
          </div>
          {userData?.displayName && (
            <div className="flex items-center justify-between py-3 border-b border-border">
              <span className="text-sm text-text-secondary">Name</span>
              <span className="text-sm text-text-primary font-medium">{userData.displayName}</span>
            </div>
          )}
        </div>
      </Card>

      {/* Plan */}
      {usage && (
        <Card className="p-6 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-primary-subtle flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-text-primary">Subscription</h2>
              <p className="text-sm text-text-tertiary">Your current plan and usage</p>
            </div>
            <Badge 
              variant={usage.plan === 'developer' ? 'primary' : usage.plan === 'pro' ? 'success' : 'neutral'}
              size="lg"
            >
              {usage.plan === 'developer' ? 'Developer' : usage.plan === 'pro' ? 'Pro' : 'Free'}
            </Badge>
          </div>

          {/* Usage display for all plans */}
          <div className="p-4 rounded-lg bg-surface border border-border mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-text-secondary">Quizzes this month</span>
              <span className="text-sm font-semibold text-text-primary">
                {usage.quizzesCreatedThisMonth} / {usage.limit === Infinity ? '∞' : usage.limit}
              </span>
            </div>
            {usage.limit !== Infinity && (
              <>
                <div className="w-full h-2 bg-bg-tertiary rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-500"
                    style={{ width: `${Math.min((usage.quizzesCreatedThisMonth / usage.limit) * 100, 100)}%` }}
                  />
                </div>
                <p className="text-xs text-text-tertiary mt-2">
                  Resets on the 1st of each month
                </p>
              </>
            )}
            {usage.limit === Infinity && (
              <p className="text-xs text-text-tertiary mt-2">
                Unlimited quizzes
              </p>
            )}
          </div>

          {/* Subscription status for Pro users */}
          {usage.plan === 'pro' && subscription && (
            <div className="p-4 rounded-lg bg-surface border border-border mb-6">
              <div className="flex items-center gap-2 mb-3">
                {subscription.subscriptionStatus === 'active' && (
                  <CheckCircle2 className="w-5 h-5 text-success" />
                )}
                {subscription.subscriptionStatus === 'cancelled' && (
                  <AlertCircle className="w-5 h-5 text-warning" />
                )}
                {(subscription.subscriptionStatus === 'expired' || subscription.subscriptionStatus === 'past_due') && (
                  <XCircle className="w-5 h-5 text-error" />
                )}
                <span className="text-sm font-medium text-text-primary">
                  Subscription Status: {subscription.subscriptionStatus || 'Unknown'}
                </span>
              </div>
              {subscription.subscriptionStatus === 'cancelled' && (
                <p className="text-xs text-text-secondary">
                  Your subscription is cancelled but remains active until the end of your billing period.
                </p>
              )}
              {subscription.subscriptionStatus === 'past_due' && (
                <p className="text-xs text-error">
                  Payment failed. Please update your payment method to continue using Pro features.
                </p>
              )}
            </div>
          )}

          {/* Upgrade CTA for Free users */}
          {usage.plan === 'free' && (
            <div className="p-4 rounded-lg bg-surface border border-primary/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-text-primary mb-1">Upgrade to Pro</p>
                  <p className="text-xs text-text-secondary">
                    50 quizzes/month • Up to 100 questions per quiz • $10/month
                  </p>
                </div>
                <Button 
                  icon={Zap} 
                  onClick={handleUpgrade}
                  loading={loading}
                  disabled={loading}
                >
                  Upgrade
                </Button>
              </div>
            </div>
          )}
        </Card>
      )}

      {/* Usage stats */}
      {usage && (
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-surface flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-text-tertiary" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-text-primary">Usage Statistics</h2>
              <p className="text-sm text-text-tertiary">All-time usage data</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-surface">
              <p className="text-2xl font-bold text-text-primary mb-1">
                {usage.quizzesCreatedThisMonth || 0}
              </p>
              <p className="text-sm text-text-tertiary">Quizzes this month</p>
            </div>
            <div className="p-4 rounded-lg bg-surface">
              <p className="text-2xl font-bold text-text-primary mb-1">
                {usage.questionsGeneratedTotal || 0}
              </p>
              <p className="text-sm text-text-tertiary">Total questions generated</p>
            </div>
          </div>
          
          {usage.maxQuestionsPerQuiz && (
            <div className="mt-4 p-4 rounded-lg bg-surface border border-border">
              <p className="text-sm text-text-secondary mb-1">Max questions per quiz</p>
              <p className="text-lg font-semibold text-text-primary">
                {usage.maxQuestionsPerQuiz === Infinity ? 'Unlimited' : usage.maxQuestionsPerQuiz}
              </p>
            </div>
          )}
        </Card>
      )}
    </div>
  );
}
