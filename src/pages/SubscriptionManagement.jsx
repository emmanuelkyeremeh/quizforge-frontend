import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';
import Card from '../components/ui/Card.jsx';
import Badge from '../components/ui/Badge.jsx';
import Button from '../components/ui/Button.jsx';
import Modal, { ModalHeader, ModalBody, ModalFooter } from '../components/ui/Modal.jsx';
import { api } from '../lib/api.js';
import toast from 'react-hot-toast';
import { 
  CreditCard, 
  BarChart3, 
  CheckCircle2, 
  XCircle, 
  AlertCircle,
  ArrowLeft,
  Calendar,
  Zap,
  TrendingUp,
  FileText
} from 'lucide-react';
import { format } from 'date-fns';

export default function SubscriptionManagement() {
  const { user, usage, refreshUsage } = useAuth();
  const navigate = useNavigate();
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingSubscription, setLoadingSubscription] = useState(true);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelling, setCancelling] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    // Allow Pro users and admin users (developer plan)
    if (usage?.plan !== 'pro' && usage?.plan !== 'developer') {
      navigate('/settings');
      return;
    }

    // Only load subscription status for Pro users (admin doesn't have subscription)
    if (usage?.plan === 'pro') {
      loadSubscriptionStatus();
    } else {
      setLoadingSubscription(false);
    }
  }, [user, usage]);

  const loadSubscriptionStatus = async () => {
    try {
      setLoadingSubscription(true);
      const status = await api.getSubscriptionStatus();
      setSubscription(status);
    } catch (error) {
      console.error('Failed to load subscription status:', error);
      toast.error('Failed to load subscription status');
    } finally {
      setLoadingSubscription(false);
    }
  };

  const handleCancelSubscription = async () => {
    try {
      setCancelling(true);
      await api.cancelSubscription();
      toast.success('Subscription cancelled successfully');
      await loadSubscriptionStatus();
      await refreshUsage();
      setShowCancelModal(false);
    } catch (error) {
      toast.error(error.message || 'Failed to cancel subscription');
    } finally {
      setCancelling(false);
    }
  };

  if (loadingSubscription) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-surface rounded w-1/3"></div>
          <div className="h-64 bg-surface rounded"></div>
        </div>
      </div>
    );
  }

  const isAdmin = usage?.plan === 'developer';
  const isPro = usage?.plan === 'pro';

  const isCancelled = subscription?.subscriptionStatus === 'cancelled';
  const isActive = subscription?.subscriptionStatus === 'active';
  const isPastDue = subscription?.subscriptionStatus === 'past_due';

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <Button
          variant="ghost"
          icon={ArrowLeft}
          onClick={() => navigate('/settings')}
          className="mb-4"
        >
          Back to Settings
        </Button>
        <h1 className="text-2xl font-bold text-text-primary mb-2">Subscription Management</h1>
        <p className="text-text-secondary">Track your usage and manage your Pro subscription.</p>
      </div>

      {/* Subscription Status - Only for Pro users */}
      {isPro && (
        <Card className="p-6 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-primary-subtle flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-text-primary">Subscription Status</h2>
              <p className="text-sm text-text-tertiary">Your current plan details</p>
            </div>
            <Badge variant="success" size="lg">
              Pro
            </Badge>
          </div>

        <div className="space-y-4">
          {subscription && (
            <>
              <div className="flex items-center gap-2">
                {isActive && <CheckCircle2 className="w-5 h-5 text-success" />}
                {isCancelled && <AlertCircle className="w-5 h-5 text-warning" />}
                {isPastDue && <XCircle className="w-5 h-5 text-error" />}
                <span className="text-sm font-medium text-text-primary">
                  Status: {subscription.subscriptionStatus || 'Unknown'}
                </span>
              </div>

              {subscription.subscriptionCreatedAt && (
                <div className="flex items-center gap-2 text-sm text-text-secondary">
                  <Calendar className="w-4 h-4" />
                  <span>
                    Started: {format(new Date(subscription.subscriptionCreatedAt), 'MMMM d, yyyy')}
                  </span>
                </div>
              )}

              {subscription.subscriptionCancelledAt && (
                <div className="flex items-center gap-2 text-sm text-text-secondary">
                  <Calendar className="w-4 h-4" />
                  <span>
                    Cancelled: {format(new Date(subscription.subscriptionCancelledAt), 'MMMM d, yyyy')}
                  </span>
                </div>
              )}
            </>
          )}

          {isCancelled && (
            <div className="p-4 rounded-lg bg-warning/10 border border-warning/20">
              <p className="text-sm text-text-primary">
                Your subscription is cancelled but remains active until the end of your billing period. 
                You'll continue to have access to Pro features until then.
              </p>
            </div>
          )}

          {isPastDue && (
            <div className="p-4 rounded-lg bg-error/10 border border-error/20">
              <p className="text-sm text-error">
                Payment failed. Please update your payment method to continue using Pro features.
              </p>
            </div>
          )}

          {isActive && (
            <div className="pt-4 border-t border-border">
              <Button
                variant="danger"
                onClick={() => setShowCancelModal(true)}
                disabled={cancelling}
              >
                Cancel Subscription
              </Button>
            </div>
          )}
        </div>
      </Card>
      )}

      {/* Admin Plan Badge */}
      {isAdmin && (
        <Card className="p-6 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-primary-subtle flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-text-primary">Plan Status</h2>
              <p className="text-sm text-text-tertiary">Your current plan details</p>
            </div>
            <Badge variant="primary" size="lg">
              Developer
            </Badge>
          </div>
          <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
            <p className="text-sm text-text-primary">
              You have unlimited access to all QuizForge features as an admin user.
            </p>
          </div>
        </Card>
      )}

      {/* Usage Tracking */}
      {usage && (
        <Card className="p-6 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-surface flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-text-tertiary" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-text-primary">Usage This Month</h2>
              <p className="text-sm text-text-tertiary">Track your quiz generation usage</p>
            </div>
          </div>

          <div className="space-y-6">
            {/* Monthly Usage */}
            <div className="p-4 rounded-lg bg-surface border border-border">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-text-primary">Quizzes Generated</span>
                </div>
                <span className="text-sm font-semibold text-text-primary">
                  {usage.quizzesCreatedThisMonth || 0} / {usage.limit === Infinity ? '∞' : usage.limit}
                </span>
              </div>
              {usage.limit !== Infinity && (
                <>
                  <div className="w-full h-2 bg-bg-tertiary rounded-full overflow-hidden mb-2">
                    <div
                      className="h-full bg-primary rounded-full transition-all duration-500"
                      style={{ width: `${Math.min((usage.quizzesCreatedThisMonth / usage.limit) * 100, 100)}%` }}
                    />
                  </div>
                  <p className="text-xs text-text-tertiary">
                    {usage.limit - (usage.quizzesCreatedThisMonth || 0)} quizzes remaining this month
                  </p>
                </>
              )}
              {usage.limit === Infinity && (
                <p className="text-xs text-text-tertiary">
                  Unlimited quizzes
                </p>
              )}
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-surface border border-border">
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="w-4 h-4 text-text-tertiary" />
                  <span className="text-xs text-text-tertiary">This Month</span>
                </div>
                <p className="text-2xl font-bold text-text-primary mb-1">
                  {usage.quizzesCreatedThisMonth || 0}
                </p>
                <p className="text-xs text-text-secondary">Quizzes created</p>
              </div>

              <div className="p-4 rounded-lg bg-surface border border-border">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-4 h-4 text-text-tertiary" />
                  <span className="text-xs text-text-tertiary">All Time</span>
                </div>
                <p className="text-2xl font-bold text-text-primary mb-1">
                  {usage.questionsGeneratedTotal || 0}
                </p>
                <p className="text-xs text-text-secondary">Questions generated</p>
              </div>

              <div className="p-4 rounded-lg bg-surface border border-border">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-4 h-4 text-text-tertiary" />
                  <span className="text-xs text-text-tertiary">Per Quiz</span>
                </div>
                <p className="text-2xl font-bold text-text-primary mb-1">
                  {usage.maxQuestionsPerQuiz === Infinity ? '∞' : usage.maxQuestionsPerQuiz || 100}
                </p>
                <p className="text-xs text-text-secondary">Max questions</p>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Plan Details */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4">
          {isAdmin ? 'Developer Plan Benefits' : 'Pro Plan Benefits'}
        </h3>
        <div className="space-y-3">
          {isAdmin ? (
            <>
              <div className="flex items-center gap-2 text-sm text-text-secondary">
                <CheckCircle2 className="w-4 h-4 text-success" />
                <span>Unlimited quiz generations</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-text-secondary">
                <CheckCircle2 className="w-4 h-4 text-success" />
                <span>Unlimited questions per quiz</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-text-secondary">
                <CheckCircle2 className="w-4 h-4 text-success" />
                <span>Priority support</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-text-secondary">
                <CheckCircle2 className="w-4 h-4 text-success" />
                <span>All export formats</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-text-secondary">
                <CheckCircle2 className="w-4 h-4 text-success" />
                <span>Admin dashboard access</span>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center gap-2 text-sm text-text-secondary">
                <CheckCircle2 className="w-4 h-4 text-success" />
                <span>50 quiz generations per month</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-text-secondary">
                <CheckCircle2 className="w-4 h-4 text-success" />
                <span>Up to 100 questions per quiz</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-text-secondary">
                <CheckCircle2 className="w-4 h-4 text-success" />
                <span>Priority support</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-text-secondary">
                <CheckCircle2 className="w-4 h-4 text-success" />
                <span>All export formats</span>
              </div>
            </>
          )}
        </div>
      </Card>

      {/* Cancel Confirmation Modal */}
      <Modal
        isOpen={showCancelModal}
        onClose={() => setShowCancelModal(false)}
      >
        <ModalHeader onClose={() => setShowCancelModal(false)}>
          <h3 className="text-lg font-semibold text-text-primary">Cancel Subscription</h3>
        </ModalHeader>
        <ModalBody>
          <p className="text-sm text-text-secondary">
            Are you sure you want to cancel your Pro subscription? You'll retain access to Pro features 
            until the end of your current billing period, after which you'll be downgraded to the Free plan.
          </p>
        </ModalBody>
        <ModalFooter>
          <Button
            variant="secondary"
            onClick={() => setShowCancelModal(false)}
            disabled={cancelling}
          >
            Keep Subscription
          </Button>
          <Button
            variant="danger"
            onClick={handleCancelSubscription}
            loading={cancelling}
            disabled={cancelling}
          >
            Cancel Subscription
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

