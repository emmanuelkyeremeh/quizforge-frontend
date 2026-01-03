import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Plus, Settings, Zap, Shield, FileText, CreditCard } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth.js';
import Button from '../ui/Button.jsx';

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { usage, userData } = useAuth();

  const isActive = (path) => location.pathname === path;
  const isAdmin = usage?.isAdmin || userData?.isAdmin;

  const navItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    ...(isAdmin ? [{ path: '/admin', icon: Shield, label: 'Admin Dashboard' }] : []),
    { path: '/create', icon: Plus, label: 'Create Quiz' },
    { path: '/pricing', icon: CreditCard, label: 'Pricing' },
    { path: '/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <aside className="w-60 hidden md:flex flex-col h-[calc(100vh-56px)] bg-bg-primary border-r border-border sticky top-14">
      <div className="flex-1 py-2 px-2 flex flex-col gap-0.5">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`
                flex items-center gap-2.5 px-2.5 py-1.5 rounded text-sm font-medium
                transition-colors duration-100
                ${active
                  ? 'bg-bg-secondary text-text-primary'
                  : 'text-text-secondary hover:bg-bg-secondary hover:text-text-primary'
                }
              `}
            >
              <Icon className={`w-4 h-4 ${active ? 'text-primary' : 'text-text-tertiary'}`} />
              {item.label}
            </Link>
          );
        })}
      </div>

      {/* Usage widget */}
      {usage && (
        <div className="p-3 mt-auto border-t border-border">
          <div className="p-3 rounded-md bg-bg-secondary border border-border">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-bold text-text-tertiary uppercase tracking-wider">Plan</span>
              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border border-border ${
                isAdmin ? 'bg-primary/20 text-primary border-primary/30' : 'bg-bg-primary text-text-secondary'
              }`}>
                {isAdmin ? 'ADMIN' : (usage.plan || 'FREE').toUpperCase()}
              </span>
            </div>
            
            {usage.plan === 'free' && !isAdmin && (
              <div className="space-y-2.5">
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="text-text-tertiary font-medium">Quizzes used</span>
                    <span className="text-text-primary font-semibold">
                      {usage.quizzesCreatedThisMonth} / {usage.limit}
                    </span>
                  </div>
                  <div className="w-full h-0.5 bg-bg-primary rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all duration-500"
                      style={{ width: `${Math.min((usage.quizzesCreatedThisMonth / usage.limit) * 100, 100)}%` }}
                    />
                  </div>
                </div>
                <Button 
                  variant="secondary" 
                  size="sm" 
                  className="w-full h-7 text-xs font-semibold" 
                  icon={Zap}
                  onClick={() => navigate('/pricing')}
                >
                  Upgrade to Pro
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </aside>
  );
}
