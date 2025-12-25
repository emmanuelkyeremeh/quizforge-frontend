import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Plus, Settings, Zap } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth.js';
import Button from '../ui/Button.jsx';

export default function Sidebar() {
  const location = useLocation();
  const { usage } = useAuth();

  const isActive = (path) => location.pathname === path;

  const navItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/create', icon: Plus, label: 'Create Quiz' },
    { path: '/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <aside className="w-60 h-[calc(100vh-56px)] bg-bg-secondary border-r border-border flex flex-col">
      {/* Navigation */}
      <nav className="p-3 flex-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`
                flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium
                transition-all duration-150 mb-0.5
                ${active
                  ? 'bg-primary-subtle text-primary-light'
                  : 'text-text-secondary hover:bg-surface hover:text-text-primary'
                }
              `}
            >
              <Icon className={`w-4 h-4 ${active ? 'text-primary' : ''}`} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Usage widget */}
      {usage && (
        <div className="p-4 border-t border-border">
          <div className="p-3 rounded-lg bg-surface">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-text-tertiary uppercase tracking-wider">Plan</span>
              <span className={`text-xs font-semibold uppercase ${
                usage.plan === 'developer' ? 'text-primary-light' : 'text-text-secondary'
              }`}>
                {usage.plan === 'developer' ? 'Dev' : usage.plan}
              </span>
            </div>
            
            {usage.plan === 'free' && (
              <div className="mt-3">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs text-text-tertiary">Quizzes</span>
                  <span className="text-xs font-medium text-text-secondary">
                    {usage.quizzesCreatedThisMonth} / {usage.limit}
                  </span>
                </div>
                <div className="w-full h-1.5 bg-bg-tertiary rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-accent-violet rounded-full transition-all duration-500"
                    style={{ width: `${Math.min((usage.quizzesCreatedThisMonth / usage.limit) * 100, 100)}%` }}
                  />
                </div>
              </div>
            )}

            {usage.plan === 'free' && (
              <Button variant="secondary" size="sm" className="w-full mt-3" icon={Zap}>
                Upgrade to Pro
              </Button>
            )}
          </div>
        </div>
      )}
    </aside>
  );
}
