// components/admin/AdminFooter.tsx
import Link from "next/link";

export default function AdminFooter() {
  return (
    <footer className="bg-white border-t border-slate-200 py-6 px-6 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Copyright */}
        <div className="text-sm text-slate-600 text-center md:text-left">
          © 2025 eBantuan JKM. Hak Cipta Terpelihara. 
          <br className="md:hidden" />
          <span className="text-xs text-slate-500 ml-2">v2.0</span>
        </div>

        {/* Quick actions */}
        <div className="flex items-center space-x-6">
          <Link href="/admin/support" className="flex items-center text-sm text-slate-600 hover:text-orange-600 transition">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 0l-6.36 6.36m0 0l-6.36-6.36m6.36 6.36V21m0 0v-4.24m0 4.24h4.24M5.636 18.364l6.36-6.36m0 0l6.36 6.36M5.636 5.636l6.36 6.36M9 12l1.5 1.5L15 9" />
            </svg>
            Bantuan
          </Link>
          
          <a href="#" className="text-xs text-slate-500 hover:text-slate-700 transition">
            Kebijakan Privasi
          </a>
          
          <a href="#" className="text-xs text-slate-500 hover:text-slate-700 transition">
            Terma Penggunaan
          </a>
        </div>
      </div>
    </footer>
  );
}