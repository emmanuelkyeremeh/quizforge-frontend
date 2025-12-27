import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';
import Card from '../components/ui/Card.jsx';
import Button from '../components/ui/Button.jsx';
import Badge from '../components/ui/Badge.jsx';
import { Check, Zap, Sparkles, ArrowLeft } from 'lucide-react';
import { api } from '../lib/api.js';
import toast from 'react-hot-toast';

export default function Pricing() {
  const { user, usage } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleUpgrade = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      setLoading(true);
      const { checkoutUrl } = await api.createCheckout();
      window.location.href = checkoutUrl;
    } catch (error) {
      toast.error(error.message || 'Failed to create checkout session');
      setLoading(false);
    }
  };

  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      description: 'Perfect for trying out QuizForge',
      features: [
        '3 quizzes per month',
        'Up to 50 questions per quiz',
        'All question types',
        'File upload support',
        'Quiz sharing',
        'Export to PDF, Moodle, Quizlet',
        'Basic analytics',
      ],
      limitations: [
        'Limited to 3 quizzes/month',
        'Max 50 questions per quiz',
      ],
      cta: user ? (usage?.plan === 'free' ? 'Current Plan' : 'Downgrade') : 'Get Started',
      variant: 'neutral',
      disabled: !user || usage?.plan !== 'free',
      onClick: user && usage?.plan === 'free' ? undefined : () => navigate('/signup'),
    },
    {
      name: 'Pro',
      price: '$10',
      period: 'per month',
      description: 'For educators and content creators',
      features: [
        '50 quizzes per month',
        'Up to 100 questions per quiz',
        'All question types',
        'File upload support (up to 5 files)',
        'Quiz sharing with custom forms',
        'Export to all formats',
        'Advanced analytics',
        'Priority support',
        'Timed quizzes',
        'Points-based scoring',
      ],
      limitations: [],
      cta: user && usage?.plan === 'pro' ? 'Current Plan' : 'Upgrade to Pro',
      variant: 'primary',
      highlighted: true,
      disabled: user && usage?.plan === 'pro',
      onClick: user && usage?.plan === 'pro' ? undefined : handleUpgrade,
    },
  ];

  return (
    <div className="min-h-screen bg-bg-primary py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <div className="mb-8">
          <Button
            variant="secondary"
            size="sm"
            icon={ArrowLeft}
            onClick={() => navigate(-1)}
            className="mb-4"
          >
            Back
          </Button>
        </div>

        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-text-primary mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Choose the plan that works best for you. All plans include our core features.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`p-8 relative ${
                plan.highlighted
                  ? 'border-2 border-primary bg-surface'
                  : 'border border-border'
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <Badge variant="primary" size="lg">
                    Most Popular
                  </Badge>
                </div>
              )}

              <div className="mb-6">
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-2xl font-bold text-text-primary">{plan.name}</h2>
                  {plan.name === 'Pro' && (
                    <Zap className="w-5 h-5 text-primary" />
                  )}
                  {plan.name === 'Free' && (
                    <Sparkles className="w-5 h-5 text-text-tertiary" />
                  )}
                </div>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-4xl font-bold text-text-primary">{plan.price}</span>
                  {plan.period && (
                    <span className="text-text-tertiary">/{plan.period}</span>
                  )}
                </div>
                <p className="text-sm text-text-secondary">{plan.description}</p>
              </div>

              <div className="mb-8">
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-text-secondary">{feature}</span>
                    </li>
                  ))}
                </ul>
                {plan.limitations.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-border">
                    <p className="text-xs font-medium text-text-tertiary mb-2">Limitations:</p>
                    <ul className="space-y-2">
                      {plan.limitations.map((limitation, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-xs text-text-tertiary">• {limitation}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <Button
                variant={plan.variant}
                size="lg"
                className="w-full"
                onClick={plan.onClick}
                disabled={plan.disabled || loading}
                loading={loading && plan.name === 'Pro'}
                icon={plan.name === 'Pro' ? Zap : undefined}
              >
                {plan.cta}
              </Button>
            </Card>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mt-20 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-text-primary mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-text-primary mb-2">
                What happens if I exceed my monthly limit?
              </h3>
              <p className="text-sm text-text-secondary">
                Free plan users will need to wait until the next month or upgrade to Pro. Pro plan users will need to wait until the monthly reset on the 1st of each month.
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-text-primary mb-2">
                Can I cancel my subscription anytime?
              </h3>
              <p className="text-sm text-text-secondary">
                Yes, you can cancel your Pro subscription at any time. You'll retain access until the end of your billing period.
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-text-primary mb-2">
                Do unused quizzes roll over?
              </h3>
              <p className="text-sm text-text-secondary">
                No, quiz limits reset monthly on the 1st of each month. Unused quizzes do not roll over.
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-text-primary mb-2">
                What payment methods do you accept?
              </h3>
              <p className="text-sm text-text-secondary">
                We accept all major credit cards, debit cards, and PayPal through our secure payment processor.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

