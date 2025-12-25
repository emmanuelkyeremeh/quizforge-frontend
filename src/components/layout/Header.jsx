import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.js';
import { LogOut, Settings, LayoutDashboard, ChevronDown, Sparkles, Shield } from 'lucide-react';
import { Dropdown, DropdownItem, DropdownDivider } from '../ui/Dropdown.jsx';
import Button from '../ui/Button.jsx';

export default function Header() {
  const { user, signOut, usage } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 h-14 bg-bg-primary/80 backdrop-blur-lg border-b border-border">
      <div className="max-w-[1280px] mx-auto px-6 h-full flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent-violet flex items-center justify-center shadow-glow-primary group-hover:shadow-lg transition-shadow">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="text-lg font-semibold text-text-primary">QuizForge</span>
        </Link>

        {/* Right side */}
        {user ? (
          <Dropdown
            trigger={
              <button className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-surface transition-colors">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary to-accent-violet flex items-center justify-center text-white text-xs font-medium">
                  {user.email?.[0]?.toUpperCase() || 'U'}
                </div>
                <span className="text-sm text-text-secondary hidden sm:block">{user.email}</span>
                <ChevronDown className="w-4 h-4 text-text-tertiary" />
              </button>
            }
          >
            <div className="px-3 py-2 mb-1">
              <p className="text-xs text-text-tertiary">Signed in as</p>
              <p className="text-sm font-medium text-text-primary truncate">{user.email}</p>
            </div>
            <DropdownDivider />
            <DropdownItem icon={LayoutDashboard} onClick={() => navigate('/dashboard')}>
              Dashboard
            </DropdownItem>
            {usage?.isAdmin && (
              <DropdownItem icon={Shield} onClick={() => navigate('/admin')}>
                Admin Dashboard
              </DropdownItem>
            )}
            <DropdownItem icon={Settings} onClick={() => navigate('/settings')}>
              Settings
            </DropdownItem>
            <DropdownDivider />
            <DropdownItem icon={LogOut} onClick={handleSignOut}>
              Sign Out
            </DropdownItem>
          </Dropdown>
        ) : (
          <div className="flex items-center gap-3">
            <Link to="/login">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link to="/signup">
              <Button>Get Started</Button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
