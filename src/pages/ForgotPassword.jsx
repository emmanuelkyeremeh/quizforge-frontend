import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';
import Button from '../components/ui/Button.jsx';
import Input from '../components/ui/Input.jsx';
import Card from '../components/ui/Card.jsx';
import Header from '../components/layout/Header.jsx';
import SEO from '../components/SEO.jsx';
import { Mail, ArrowLeft } from 'lucide-react';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const { resetPassword } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await resetPassword(email);
      setEmailSent(true);
    } catch (error) {
      // Error handled by useAuth hook
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg-primary">
      <Header />
      
      {/* Background */}
      <div className="absolute inset-0 gradient-mesh pointer-events-none opacity-50" />
      
      <div className="relative flex items-center justify-center min-h-[calc(100vh-56px)] px-6 py-12">
        <div className="w-full max-w-md">
          <Card className="p-8">
            {!emailSent ? (
              <>
                <div className="mb-8">
                  <h1 className="text-2xl font-bold text-text-primary mb-2">Reset your password</h1>
                  <p className="text-sm text-text-secondary">
                    Enter your email address and we'll send you a link to reset your password.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="label">Email</label>
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="you@example.com"
                      icon={Mail}
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    loading={loading}
                  >
                    Send reset link
                  </Button>
                </form>

                <div className="mt-6 text-center">
                  <Link
                    to="/login"
                    className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back to sign in
                  </Link>
                </div>
              </>
            ) : (
              <div className="text-center">
                <div className="mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 border border-primary/20 mb-4">
                    <Mail className="w-8 h-8 text-primary" />
                  </div>
                  <h2 className="text-xl font-bold text-text-primary mb-2">Check your email</h2>
                  <p className="text-sm text-text-secondary">
                    We've sent a password reset link to <strong className="text-text-primary">{email}</strong>
                  </p>
                </div>
                <p className="text-xs text-text-tertiary mb-6">
                  Didn't receive the email? Check your spam folder or try again.
                </p>
                <div className="space-y-3">
                  <Button
                    onClick={() => setEmailSent(false)}
                    variant="secondary"
                    className="w-full"
                  >
                    Send another email
                  </Button>
                  <Link to="/login">
                    <Button variant="neutral" className="w-full">
                      Back to sign in
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}

