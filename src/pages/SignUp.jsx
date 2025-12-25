import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';
import Button from '../components/ui/Button.jsx';
import Input from '../components/ui/Input.jsx';
import Card from '../components/ui/Card.jsx';
import Header from '../components/layout/Header.jsx';
import { Mail, Lock, User } from 'lucide-react';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [loading, setLoading] = useState(false);
  const { signUp, signInWithGoogle, user } = useAuth();
  const navigate = useNavigate();

  // Redirect to dashboard when user becomes authenticated
  useEffect(() => {
    if (user) {
      navigate('/dashboard', { replace: true });
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signUp(email, password, displayName);
      // Navigation will happen via useEffect when user state updates
    } catch (error) {
      // Error handled by useAuth hook
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      await signInWithGoogle();
      // Navigation will happen via useEffect when user state updates
    } catch (error) {
      // Error handled by useAuth hook
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
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-text-primary mb-2">Create your account</h1>
              <p className="text-sm text-text-secondary">
                Get started with QuizForge. Free plan includes 2 quizzes per month.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="label">Name (optional)</label>
                <Input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="Your name"
                  icon={User}
                />
              </div>

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

              <div>
                <label className="label">Password</label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  minLength={6}
                  icon={Lock}
                />
              </div>

              <Button
                type="submit"
                className="w-full"
                loading={loading}
              >
                Create Account
              </Button>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="bg-bg-secondary px-3 text-xs text-text-tertiary uppercase tracking-wider">or</span>
              </div>
            </div>

            <Button
              variant="secondary"
              className="w-full"
              onClick={handleGoogleSignIn}
              disabled={loading}
            >
              Continue with Google
            </Button>

            <div className="mt-6 text-center">
              <Link
                to="/login"
                className="text-sm text-primary hover:text-primary-light transition-colors"
              >
                Already have an account? Sign in
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
