import React from 'react';

const Navbar = ({ userName, onLogout, handleLogout }) => {
  const logoutHandler = onLogout || handleLogout;
  const userInitial = userName ? userName.charAt(0).toUpperCase() : 'U';

  return (
    <header className="bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-6 py-4 flex justify-between items-center sticky top-0 z-40">
      <div className="max-w-7xl w-full mx-auto flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-sky-500 flex items-center justify-center text-white shadow-xs">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </div>
          <span className="font-bold text-slate-900 text-lg tracking-tight">
            Notelify
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2.5 bg-slate-50 border border-slate-200/80 rounded-full px-2.5 py-1.5">
            <div className="w-7 h-7 rounded-full bg-sky-100 text-sky-700 font-bold text-xs flex items-center justify-center">
              {userInitial}
            </div>
            <span className="text-slate-800 font-semibold text-sm pr-1">
              {userName || 'User'}
            </span>
          </div>

          <button
            onClick={logoutHandler}
            className="bg-white hover:bg-sky-50 text-sky-700 border border-sky-300 text-xs font-semibold px-4 py-2 rounded-xl transition-all cursor-pointer"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;