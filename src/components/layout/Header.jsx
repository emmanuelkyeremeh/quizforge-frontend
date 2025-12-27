import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.js';
import { LogOut, Settings, LayoutDashboard, ChevronDown, Shield, User } from 'lucide-react';
import { Dropdown, DropdownItem, DropdownDivider } from '../ui/Dropdown.jsx';
import Button from '../ui/Button.jsx';
import Logo from '../ui/Logo.jsx';

export default function Header() {
  const { user, signOut, usage, userData } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const isAdmin = usage?.isAdmin || userData?.isAdmin;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-14 bg-bg-primary border-b border-border">
      <div className="max-w-[1440px] mx-auto px-6 h-full flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <Logo size="default" />
          <span className="text-sm font-semibold text-white tracking-tight">QuizForge</span>
        </Link>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <Link to="/pricing" className="hidden sm:block text-xs font-medium text-text-secondary hover:text-white transition-colors">
                Pricing
              </Link>
              <Link to="/create" className="hidden sm:block">
                <Button size="sm" variant="default" className="h-8 px-3 text-xs font-semibold">
                  Create Quiz
                </Button>
              </Link>
              
              <Dropdown
                trigger={
                  <button className="flex items-center gap-2 px-2 py-1 rounded hover:bg-bg-secondary transition-colors">
                    <div className="w-6 h-6 rounded-full bg-bg-secondary border border-border flex items-center justify-center text-[10px] font-bold text-text-secondary">
                      {user.email?.[0]?.toUpperCase() || 'U'}
                    </div>
                    <ChevronDown className="w-3.5 h-3.5 text-text-tertiary" />
                  </button>
                }
              >
                <div className="px-3 py-2">
                  <p className="text-[10px] font-semibold text-text-tertiary uppercase tracking-wider">Account</p>
                  <p className="text-xs text-white truncate font-medium mt-0.5">{user.email}</p>
                </div>
                <DropdownDivider />
                <DropdownItem icon={LayoutDashboard} onClick={() => navigate('/dashboard')}>
                  Dashboard
                </DropdownItem>
                {isAdmin && (
                  <DropdownItem icon={Shield} onClick={() => navigate('/admin')}>
                    Admin Dashboard
                  </DropdownItem>
                )}
                <DropdownItem icon={Settings} onClick={() => navigate('/settings')}>
                  Settings
                </DropdownItem>
                <DropdownDivider />
                <DropdownItem icon={LogOut} onClick={handleSignOut} className="text-error hover:bg-error/10 hover:text-error">
                  Sign Out
                </DropdownItem>
              </Dropdown>
            </>
          ) : (
            <>
              <Link to="/login" className="text-xs font-medium text-text-secondary hover:text-white transition-colors">
                Log in
              </Link>
              <Link to="/signup">
                <Button size="sm" variant="default" className="h-8 px-3 text-xs font-semibold">
                  Sign up
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
