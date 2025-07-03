'use client';
import React, { useState, useEffect } from 'react';
import { useUser } from '@/app/provider';
import { useRouter, usePathname } from 'next/navigation';
import { Shield } from 'lucide-react';

function AdminLayout({ children }) {
  const { user } = useUser();
  const router = useRouter();
  const pathname = usePathname();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    console.log('Admin Layout - Current user:', user);
    console.log('Admin Layout - User email:', user?.email);
    console.log('Admin Layout - Current path:', pathname);
    
    // If we're on the login page, don't check authentication
    if (pathname === '/admin/login') {
      setIsChecking(false);
      return;
    }
    
    // If user is still loading (undefined), wait
    if (user === undefined) {
      console.log('Admin Layout - User still loading...');
      return;
    }
    
    // Check if user is admin (you can modify this logic based on your admin criteria)
    if (!user) {
      console.log('Admin Layout - No user found, redirecting to admin login');
      router.push('/admin/login');
      return;
    }
    
    // For now, let's assume admin emails are hardcoded or stored in a specific way
    // You can modify this to check against a database field like user.role === 'admin'
    const adminEmails = ['iennaceur9@gmail.com', 'iennaceur92@gmail.com']; // Add your admin emails
    console.log('Admin Layout - Checking if', user.email, 'is in admin list:', adminEmails);
    
    if (!adminEmails.includes(user.email)) {
      console.log('Admin Layout - User not admin, redirecting to dashboard');
      router.push('/dashboard');
      return;
    }
    
    console.log('Admin Layout - User is admin, allowing access');
    setIsChecking(false);
  }, [user, router, pathname]);

  // If we're on the login page, render without admin layout
  if (pathname === '/admin/login') {
    return children;
  }

  if (user === undefined || isChecking) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Simple Admin Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <Shield className="w-8 h-8 text-blue-600" />
              <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Welcome, {user?.name || 'Admin'}
              </span>
              <button
                onClick={() => {
                  // Add sign out logic here if needed
                  router.push('/');
                }}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 py-3">
            <a
              href="/admin"
              className={`text-sm font-medium px-3 py-2 rounded-md ${
                pathname === '/admin' 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Dashboard
            </a>
            <a
              href="/admin/users"
              className={`text-sm font-medium px-3 py-2 rounded-md ${
                pathname === '/admin/users' 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Users
            </a>
            <a
              href="/admin/interviews"
              className={`text-sm font-medium px-3 py-2 rounded-md ${
                pathname === '/admin/interviews' 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Interviews
            </a>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}

export default AdminLayout; 